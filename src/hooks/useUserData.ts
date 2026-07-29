import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { fetchUserById, User } from "@/services/api";

export function useUserData(userId: string) {
  const queryClient = useQueryClient();
  const [localUser, setLocalUser] = useState<User | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const cached = localStorage.getItem(`lendsqr_user_${userId}`);
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          const overrideStatus = localStorage.getItem(`lendsqr_user_status_${userId}`);
          if (overrideStatus) {
            parsed.status = overrideStatus;
          }
          setLocalUser(parsed);
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, [userId]);

  const { data: serverUser, error, isLoading } = useQuery({
    queryKey: ["user-detail", userId],
    queryFn: () => fetchUserById(userId),
    enabled: !localUser,
  });

  useEffect(() => {
    if (serverUser && !localUser) {
      if (typeof window !== "undefined") {
        const overrideStatus = localStorage.getItem(`lendsqr_user_status_${userId}`);
        const userToSave = { ...serverUser };
        if (overrideStatus) {
          userToSave.status = overrideStatus as any;
        } else {
          localStorage.setItem(`lendsqr_user_status_${userId}`, serverUser.status);
        }
        localStorage.setItem(`lendsqr_user_${userId}`, JSON.stringify(userToSave));
        setLocalUser(userToSave);
      }
    }
  }, [serverUser, localUser, userId]);

  const updateStatus = (newStatus: "active" | "blacklisted") => {
    if (localUser && typeof window !== "undefined") {
      const updated = { ...localUser, status: newStatus };
      localStorage.setItem(`lendsqr_user_${userId}`, JSON.stringify(updated));
      localStorage.setItem(`lendsqr_user_status_${userId}`, newStatus);
      setLocalUser(updated);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    }
  };

  const blacklist = () => updateStatus("blacklisted");
  const activate = () => updateStatus("active");

  return {
    user: localUser,
    isLoading: !localUser && isLoading,
    error,
    blacklist,
    activate,
  };
}

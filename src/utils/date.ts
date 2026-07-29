import { format, parseISO } from "date-fns";


export function formatUserDate(date: string | Date | undefined | null): string {
  if (!date) {
    return "";
  }

  try {
    const dateObj = typeof date === "string" ? parseISO(date) : date;
    

    if (isNaN(dateObj.getTime())) {
      return "";
    }
    
    return format(dateObj, "MMM d, yyyy h:mm a");
  } catch (error) {
    console.error("Error formatting date:", error);
    return "";
  }
}

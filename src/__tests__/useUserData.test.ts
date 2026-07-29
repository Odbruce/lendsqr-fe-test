import { renderHook, act } from "@testing-library/react";
import { useUserData } from "../hooks/useUserData";

const mockInvalidateQueries = jest.fn();
jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(() => ({
    data: { id: "1", userName: "test", status: "inactive" },
    isLoading: false,
    error: null,
  })),
  useQueryClient: jest.fn(() => ({
    invalidateQueries: mockInvalidateQueries,
  })),
}));

describe("useUserData hook", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it("should initialize status and write to localStorage on blacklist trigger", () => {
    const { result } = renderHook(() => useUserData("1"));
    
    act(() => {
      result.current.blacklist();
    });

    expect(localStorage.getItem("lendsqr_user_status_1")).toBe("blacklisted");
    expect(mockInvalidateQueries).toHaveBeenCalledWith({ queryKey: ["users"] });
  });

  it("should write to localStorage on activate trigger", () => {
    const { result } = renderHook(() => useUserData("1"));

    act(() => {
      result.current.activate();
    });

    expect(localStorage.getItem("lendsqr_user_status_1")).toBe("active");
    expect(mockInvalidateQueries).toHaveBeenCalledWith({ queryKey: ["users"] });
  });
});

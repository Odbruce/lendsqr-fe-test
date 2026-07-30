

export interface UserProfile {
  firstName: string;
  lastName: string;
  avatar: string;
  gender: string;
  bvn: string;
  accountBalance: string;
  accountNumber: string;
  bankName: string;
  maritalStatus: string;
  children: string;
  residenceType: string;
}

export interface UserEducation {
  levelOfEducation: string;
  employmentStatus: string;
  sectorOfEmployment: string;
  durationOfEmployment: string;
  officeEmail: string;
  monthlyIncome: string[];
  loanRepayment: string;
}

export interface UserSocials {
  facebook: string;
  instagram: string;
  twitter: string;
}

export interface UserGuarantor {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  relationship: string;
}

export interface User {
  id: string;
  orgName: string;
  userName: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
  status: "active" | "inactive" | "pending" | "blacklisted";
  profile: UserProfile;
  education: UserEducation;
  socials: UserSocials;
  guarantor: UserGuarantor;
}

export interface FetchUsersResponse {
  users: User[];
  total: number;
}

export interface FetchUsersParams {
  page: number;
  limit: number;
  search?: string;
  orgName?: string;
  userName?: string;
  email?: string;
  phoneNumber?: string;
  status?: string;
  date?: string;
}

const API_BASE_URL = "https://lendsqr-mock-api-s384.onrender.com";


export async function fetchUsers({
  page,
  limit,
  search,
  orgName,
  userName,
  email,
  phoneNumber,
  status,
  date,
}: FetchUsersParams): Promise<FetchUsersResponse> {
  const url = new URL(`${API_BASE_URL}/users`);
  

  url.searchParams.append("_page", page.toString());
  url.searchParams.append("_limit", limit.toString());
  
  if (search) {

    url.searchParams.append("q", search);
  }
  

  if (orgName) {
    url.searchParams.append("orgName", orgName);
  }
  
  if (userName) {
    url.searchParams.append("userName_like", userName);
  }
  
  if (email) {
    url.searchParams.append("email_like", email);
  }
  
  if (phoneNumber) {
    url.searchParams.append("phoneNumber_like", phoneNumber);
  }
  
  if (status) {
    url.searchParams.append("status", status);
  }

  if (date) {

    url.searchParams.append("createdAt_like", date);
  }

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`Failed to fetch users: ${response.statusText}`);
  }

  const users: User[] = await response.json();
  

  const totalHeader = response.headers.get("x-total-count");
  const total = totalHeader ? parseInt(totalHeader, 10) : 500;

  return {
    users,
    total,
  };
}


export async function fetchUserById(id: string): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/users/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch user with id ${id}: ${response.statusText}`);
  }
  return response.json();
}

export interface UserStats {
  users: number;
  activeUsers: number;
  usersWithLoans: number;
  usersWithSavings: number;
}

export async function fetchUserStats(): Promise<UserStats> {
  const response = await fetch(`${API_BASE_URL}/stats`);
  if (!response.ok) {
    throw new Error(`Failed to fetch user stats: ${response.statusText}`);
  }
  return response.json();
}


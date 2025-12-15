export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  avatar: string;
  phone: string;
  address: string;
  status: "ACTIVE" | "BLOCKED";
  created_at: string;
  updated_at: string;
}

export interface InitialUserState {
  status: "idle" | "pending" | "success" | "failed";
  data: User[];
  error: null | string | undefined;
  user: User | null;
}
  
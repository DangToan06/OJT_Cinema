export interface InitialStateType<T> {
  status: "idle" | "pending" | "success" | "failed";
  data: T[];
  error: string | null;
}

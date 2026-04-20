export type TUser = {
  name: string;
  email: string;
  password?: string;
  status?: "active" | "inactive";
};

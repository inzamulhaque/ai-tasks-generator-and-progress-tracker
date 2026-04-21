export type TOtp = {
  email: string;
  otp: number;
  otpFor: "account-activation" | "password-reset" | "resend-otp";
  createdAt?: Date;
  updatedAt?: Date;
};

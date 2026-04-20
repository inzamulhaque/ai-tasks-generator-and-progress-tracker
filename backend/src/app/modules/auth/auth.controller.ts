import catchAsync from "../../utils/catchAsync";

export const signUpWithEmail = catchAsync(async (req, res) => {
  console.log("ok");

  res
    .status(200)
    .json({ success: true, message: "User signed up successfully" });
});

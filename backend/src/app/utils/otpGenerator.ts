import { Otp } from "../modules/auth/auth.model";

const generateOtp = async () => {
  const otp = Math.floor(10000 + Math.random() * 90000);

  const existOtp = await Otp.findOne({
    otp,
  });

  if (existOtp) {
    return generateOtp();
  } else {
    return otp;
  }
};

export default generateOtp;

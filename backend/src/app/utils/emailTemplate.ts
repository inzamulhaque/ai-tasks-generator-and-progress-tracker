type TEmailData = {
  title: string;
  message: string;
  otp: string | number;
};

const emailTemplate = ({ title, message, otp }: TEmailData) => {
  return `
    <!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>${title}</title>
</head>
<body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color:#f4f6f8;">
  <div style="max-width:600px; margin:30px auto; background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 4px 10px rgba(0,0,0,0.1);">

    <!-- Header -->
    <div style="background:#4f46e5; color:#ffffff; padding:20px; text-align:center;">
      <h2 style="margin:0;">AI Tasks Generator</h2>
    </div>

    <!-- Body -->
    <div style="padding:30px; text-align:center;">
      <h3 style="margin-bottom:10px;">${title}</h3>
      <p style="color:#555;">${message}</p>

      <!-- OTP -->
      <div style="margin:25px 0; font-size:30px; font-weight:bold; letter-spacing:6px; color:#4f46e5;">
        ${otp}
      </div>

      <p style="color:#777;">This OTP will expire in 5 minutes.</p>
      <p style="color:#777;">If you didn’t request this, please ignore this email.</p>
    </div>

    <!-- Footer -->
    <div style="background:#f4f6f8; text-align:center; padding:15px; font-size:12px; color:#999;">
      © 2026 AI Tasks Generator & Progress Tracker
    </div>

  </div>
</body>
</html>
    `;
};

export default emailTemplate;

import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import User from "@/models/user.model";

interface SendMailType {
  email: string;
  emailType: string;
  userId: string;
}

export const sendEail = async ({ email, emailType, userId }: SendMailType) => {
  try {
    const hashedToken = await bcrypt.hash(userId.toString(), 10);
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          emailVerifyToken: hashedToken,
          emailVerifyTokenExpiry: Date.now() + 3600000
        }
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswrodToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000
        }
      });
    }
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 587,
      auth: {
        user: "cdd11db546ac20",
        pass: "808e7f32a030ba"
      }
    });

    const mailOptions = {
      from: "lahmajidali@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href=${
        process.env.DOMAIN
      }/verify-email?token=${hashedToken}>here</a> to ${
        emailType === "VIRIFY" ? "verify your email" : "reset your password"
      } or copy and paste the link below in the browser
      <br />
      ${process.env.DOMAIN}/verify-email?token=${hashedToken}
      </p>`
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("Error while sending Email", error);
  }
};

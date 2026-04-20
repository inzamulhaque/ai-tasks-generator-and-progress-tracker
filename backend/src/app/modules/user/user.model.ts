import { model, Schema } from "mongoose";
import type { TUser } from "./user.interface";
import bcrypt from "bcrypt";

const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Please provide a valid email"],
    },

    password: {
      type: String,
      required: false,
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function () {
  if (this.password) {
    this.password = await bcrypt.hash(this.password, 12);
  }
});

const User = model<TUser>("user", userSchema);

export default User;

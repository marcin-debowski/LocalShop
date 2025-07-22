import mongoose from "mongoose";
import bcript from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["customer", "admin", "seller"],
      default: "customer",
    },
  },
  { timestamps: true }
);

//MIDDLEWARE: Haszowanie hsała
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcript.genSalt(10);
    this.password = await bcript.hash(this.password, salt);
  }
  next();
});

export const User = mongoose.model("User", userSchema, "users");

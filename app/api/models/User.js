import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  number: {
    type: String,
  },
  role: {
    type: String,
    default: "Barber",
  },
  password: {
    type: String,
    required: true,
  },
  createadAt: {
    type: Date,
    default: Date.now(),
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Definição do esquema do usuário
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,  // Adiciona a restrição de unicidade ao email
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
  createdAt: {
    type: Date,
    default: Date.now, // Correção: Passar Date.now como uma função
  },
});

// Middleware para hash da senha antes de salvar o usuário
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Exporta o modelo do usuário
export default mongoose.models.User || mongoose.model("User", UserSchema);

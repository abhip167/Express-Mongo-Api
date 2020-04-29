import mongoose from "mongoose";

// Create a Schema ( data modelling)
const schema = {
  email: {
    type: String,
    required: [true, "Please Enter an Email"],
    trim: true,
    unique: true,
    lowercase: true,
  },
  username: {
    type: String,
    required: [true, "Please Enter an Username"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Please Enter an Password"],
    trim: true,
    minLength: 6,
  },
  isAdmin: Boolean,
  photoUrl: String,
  bio: String,
  url: String,
};
const userSchema = new mongoose.Schema(schema, { timestamps: true });

export const User = mongoose.model("user", userSchema);

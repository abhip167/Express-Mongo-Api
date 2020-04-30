import mongoose from "mongoose";
import pick from "lodash.pick";
import bcrypt from "bcryptjs";

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

// Hash Password before saving to Database
// Here "this" is the User Object
userSchema.pre("save", async function (next) {
  if (this.isModified) {
    // isModified() bcz jo agar user navo generate thaay che tyare to pass hassh thasej but agar modify thaay che i.e Update to change nai thaay etle isModified lagavanu
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } else {
    next();
  }
});

// Choose What to send to the client
userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  return pick(userObject, [
    "_id",
    "email",
    "username",
    "photoUrl",
    "bio",
    "url",
  ]);
};

export const User = mongoose.model("user", userSchema);

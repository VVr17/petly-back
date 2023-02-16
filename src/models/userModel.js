import mongoose from "mongoose";
import bcrypt from "bcrypt"; // hash password
mongoose.set("strictQuery", true);

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address",
      ],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    city: {
      type: String,
      required: [true, "City/region is required"],
    },
    phone: {
      type: String,
      required: [true, "City/region is required"],
    },
    password: {
      type: String,
      minLength: [6, "Password should be at least 6 characters"],
      required: [true, "Password is required"],
    },
    token: {
      type: String,
      default: null,
    },
    photoURL: {
      type: String,
      default: null,
    },
    pets: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true, versionKey: false }
);

// mongoose middleware --> before save
userSchema.pre("save", async function () {
  //if User doesn't exist -->
  if (this.isNew) {
    this.password = await bcrypt.hash(this.password, 10); // hash password
  }
});

export const User = model("User", userSchema);

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
        /^([a-zA-Z][\w+-]+(?:\.\w+)?)@([\w-]+(?:\.[a-zA-Z]{2,10})+)$/,
        "Please enter a valid email address",
      ],
      minLength: 12,
      maxLength: 63,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    birthday: {
      type: String,
      default: null,
    },
    city: {
      type: String,
      required: [true, "City/region is required"],
      match: [
        /^\s*(?:\w+\s*,\s*){1,}(?:\w+\s*)$/,
        "Should be at least two words separated by string",
      ],
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
      match: [
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
        "Please enter a valid phone",
      ],
      minLength: 13,
      maxLength: 13,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{7,}$/,
        "Please enter a valid password",
      ],
      minLength: 7,
      maxLength: 32,
    },
    token: {
      type: String,
      default: null,
    },
    photoURL: {
      type: String,
      default: null,
    },
    pets: [
      {
        type: Schema.ObjectId,
        ref: "Pet",
        default: [],
      },
    ],
    favoriteNotices: [
      {
        type: Schema.ObjectId,
        ref: "Notice",
        default: [],
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

userSchema.pre("save", async function () {
  if (this.isNew) {
    this.password = await bcrypt.hash(this.password, 10); // hash password
  }
});

export const User = model("User", userSchema);

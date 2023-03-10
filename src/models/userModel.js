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
        /^(?=.{1,63}$)(?=.{2,}@)[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter a valid email address",
      ],
      minLength: 12,
      maxLength: 63,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      match: [
        /^[a-zA-Zа-яА-ЯіІїЇґҐ]+(?: [a-zA-Zа-яА-ЯіІїЇґҐ]+)*$/,
        "Only letters can be accepted",
      ],
      minLength: 3,
      maxLength: 32,
    },
    birthday: {
      type: String,
      default: null,
    },
    city: {
      type: String,
      match: [
        /^[a-zA-Zа-яА-ЯіІїЇґҐ]+(?:[-\s]?[a-zA-Zа-яА-ЯіІїЇґҐ]+),\s[a-zA-Zа-яА-ЯіІїЇ'’\s-]+$/,
        "Should be at least two words separated by string",
      ],
      default: null,
    },
    phone: {
      type: String,
      match: [/^\+380\d{9}$/, "Please enter a valid phone"],
      minLength: 13,
      maxLength: 13,
      default: null,
    },
    password: {
      type: String,
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{7,}$/,
        "Please enter a valid password",
      ],
      minLength: 7,
      maxLength: 32,
      default: null,
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
  if (this.isNew && this.password) {
    this.password = await bcrypt.hash(this.password, 10); // hash password
  }
});

export const User = model("User", userSchema);

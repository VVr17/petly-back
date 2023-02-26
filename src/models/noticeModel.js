import mongoose, { SchemaTypes } from "mongoose";
const Schema = mongoose.Schema;

const noticeModel = new Schema(
  {
    title: {
      type: String,
      minLength: 2,
      maxLength: 48,
      trim: true,
      required: [true, "Title is required"],
    },
    photoURL: {
      type: String,
      required: [true, "PhotoURL is required"],
    },
    name: {
      type: String,
      minLength: 2,
      maxLength: 16,
      trim: true,
      match: [
        /^[a-zA-Zа-яА-ЯіІїЇґҐ]+(?: [a-zA-Zа-яА-ЯіІїЇґҐ]+)*$/,
        "Only letters can be accepted",
      ],
      required: [true, "Name is required"],
    },
    breed: {
      type: String,
      minLength: 2,
      maxLength: 24,
      trim: true,
      match: [
        /^[a-zA-Zа-яА-ЯіІїЇґҐ]+(?: [a-zA-Zа-яА-ЯіІїЇґҐ]+)*$/,
        "Only letters can be accepted",
      ],
      required: [true, "Breed is required"],
    },
    sex: {
      type: String,
      enum: ["male", "female"],
      required: [true, "Sex is required"],
    },
    birthDate: {
      type: String,
      required: [true, "BirthDate is required"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      match: [
        /^[a-zA-Zа-яА-ЯіІїЇґҐ]+(?:[-\s]?[a-zA-Zа-яА-ЯіІїЇґҐ]+),\s[a-zA-Zа-яА-ЯіІїЇ'’\s-]+$/,
        "Should be at least two words separated by string",
      ],
    },
    comments: {
      type: String,
      minLength: 8,
      maxLength: 200,
      required: [true, "Comment is required"],
    },
    price: {
      type: String,
      min: 1,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "User",
    },
    category: {
      type: String,
      enum: ["sell", "lost-found", "in-good-hands"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Notice = mongoose.model("Notice", noticeModel);

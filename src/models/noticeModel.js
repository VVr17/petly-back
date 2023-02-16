import mongoose from "mongoose";
const Schema = mongoose.Schema;

const noticeModel = new Schema(
  {
    title: {
      type: String,
      minLength: 2,
      maxLength: 48,
      required: [true, "Set title for the notice"],
    },
    name: {
      type: String,
      minLength: 2,
      maxLength: 16,
    },
    breed: {
      type: String,
      minLength: 2,
      maxLength: 24,
    },
    birthDate: {
      type: Date,
    },
    location: {
      type: String,
    },
    comments: {
      type: String,
      minLength: 8,
      maxLength: 120,
      required: true,
    },
    price: {
      type: Number,
      min: 1,
      required: true,
    },
  },
  {
    favorite: {
      type: Boolean,
      default: false,
    },
  }
);

export const Notice = mongoose.model("notice", noticeModel);
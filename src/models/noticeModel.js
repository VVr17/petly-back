import mongoose, { SchemaTypes } from "mongoose";
const Schema = mongoose.Schema;

const noticeModel = new Schema(
  {
    title: {
      type: String,
      minLength: 2,
      maxLength: 48,
      required: [true, "Set title for the notice"],
    },
    photoURL: {
      type: String,
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
    sex: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
    birthDate: {
      type: Date,
    },
    location: {
      type: String,
      required: true,
    },
    comments: {
      type: String,
      minLength: 8,
      maxLength: 120,
    },
    price: {
      type: Number,
      min: 1,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "user",
    },
    category: {
      type: String,
      enum: ["sell", "lost-found", "in-good-hands"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Notice = mongoose.model("notice", noticeModel);

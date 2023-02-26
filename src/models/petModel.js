import mongoose from "mongoose";
mongoose.set("strictQuery", true);

const { Schema, model } = mongoose;

const petSchema = new Schema(
  {
    name: {
      type: String,
      minLength: 2,
      maxLength: 16,
      match: [
        /^[a-zA-Zа-яА-ЯіІїЇґҐ]+(?: [a-zA-Zа-яА-ЯіІїЇґҐ]+)*$/,
        "Only letters can be accepted",
      ],
      required: [true, "Name is required"],
    },
    owner: {
      type: mongoose.ObjectId,
      ref: "User",
    },
    birthDate: {
      type: String,
      required: [true, "Birth date is required"],
    },
    breed: {
      type: String,
      minLength: 2,
      maxLength: 24,
      required: [true, "Breed is required"],
    },
    comments: {
      type: String,
      minLength: 8,
      maxLength: 200,
      default: null,
    },
    photoURL: {
      type: String,
      default: null,
    },
  },
  { timestamps: true, versionKey: false }
);

export const Pet = model("Pet", petSchema);

import mongoose, { SchemaTypes } from "mongoose";
mongoose.set("strictQuery", true);

const { Schema, model } = mongoose;

const petSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "user",
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
      maxLength: 120,
      default: null,
    },
  },
  { timestamps: true, versionKey: false }
);

export const Pet = model("Pet", petSchema);

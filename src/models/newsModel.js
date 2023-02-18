import mongoose from "mongoose";
const Schema = mongoose.Schema;

const newsModel = new Schema({
  title: {
    type: String,
  },
  url: {
    type: String,
  },
  description: {
    type: String,
  },
  date: {
    type: String,
  },
});

export const News = mongoose.model("New", newsModel);

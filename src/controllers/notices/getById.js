import { Notice } from "../../models/noticeModel.js";
import NotFound from "http-errors";

export const getByIdController = async (req, res) => {
  const noticeId = req.params.noticeId;

  const data = await Notice.findById(noticeId);
  if (!data) {
    throw NotFound("the notice with this ID does not exist");
  }
  res.status(200).json(data);
};

import { Notice } from "../../models/noticeModel.js";
import NotFound from "http-errors";
import { setSuccessResponse } from "../../helpers/setResponse.js";

export const getByIdController = async (req, res) => {
  const { noticeId } = req.params;

  const data = await Notice.findById(noticeId);
  if (!data) {
    throw NotFound("the notice with this ID does not exist");
  }
  res.json(setSuccessResponse(200, data));
};

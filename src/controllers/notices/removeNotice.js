import { setSuccessResponse } from "../../helpers/setResponse.js";
import { Notice } from "../../models/noticeModel.js";
import createError from "http-errors";

export const removeNoticeController = async (req, res) => {
  const { noticeId } = req.params;
  const { userId } = req.user;

  const data = await Notice.findById(noticeId);

  if (!data) {
    throw new createError(404, `Notice with id ${noticeId} not found`);
  }
  if (!userId.match(data.owner)) {
    throw new createError(400, "This user is not the owner of this notice");
  }

  await Notice.findByIdAndRemove(noticeId);

  res.json(setSuccessResponse(200, `Notice with id=${noticeId} deleted`));
};

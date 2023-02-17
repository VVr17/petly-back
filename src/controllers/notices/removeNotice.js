import { setSuccessResponse } from "../../helpers/setResponse.js";
import { Notice } from "../../models/noticeModel.js";
// TODO: user can remove only their own notice --> should get req.user.userId
export const removeNoticeController = async (req, res) => {
  const noticeId = req.params.noticeId;
  const result = await Notice.findByIdAndRemove(noticeId);

  if (!result) {
    throw new NotFound(`Notice whith id=${contactId} not found `);
  }

  res.json(setSuccessResponse(200, `Notice whith id=${noticeId} deleted`));
};

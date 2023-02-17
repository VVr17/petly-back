import { setSuccessResponse } from "../../helpers/setResponse.js";
import { Notice } from "../../models/noticeModel.js";

export const removeNoticeController = async (req, res) => {
	const noticeId = req.params.noticeId;
	const result = await Notice.findByIdAndRemove(noticeId);
	
	if (!result) {
    throw new NotFound(`Notice whith id=${contactId} not found `);
	}
	
	res.json(setSuccessResponse(200, `Notice whith id=${noticeId} deleted`));
};

import { News } from "../../models/newsModel.js";

export const getNewsController = async (req, res) => {
	const news = await News.find(news);
	 res.json({
     status: "success",
     code: 200,
     message: "Contacts found",
     data: {
       news,
     },
   });
};

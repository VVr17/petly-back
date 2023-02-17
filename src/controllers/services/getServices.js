import { setSuccessResponse } from "../../helpers/setResponse.js";
import { Services } from "../../models/servicesModel.js";

export const getServicesController = async (req, res) => {
    const result = await Services.find();
    res.json(setSuccessResponse(200, result));
}

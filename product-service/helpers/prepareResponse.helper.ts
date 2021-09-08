import { headers } from "../constants/constants";

export const prepareResponse = (statusCode, response) => ({
    statusCode,
    body: JSON.stringify(response),
    headers
})
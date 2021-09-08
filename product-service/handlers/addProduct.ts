import { APIGatewayProxyEvent } from "aws-lambda";
import "source-map-support/register";
import { HTTP_STATUS_CODE } from "../constants/constants";
import { prepareResponse } from "../helpers/prepareResponse.helper";
import * as productService from "../services/product.service";
import { ProductScheme } from "../models/product.model";
import { ValidatedEventAPIGatewayProxyEvent } from "../helpers/validateRequest.helper";

export const addProduct: ValidatedEventAPIGatewayProxyEvent<typeof ProductScheme> = async (event: APIGatewayProxyEvent) => {

    try {
        const data = JSON.parse(event.body);
        /*const { title, price, count } = data;

        if (!title || price < 0 || count < 0) {
            return prepareResponse(HTTP_STATUS_CODE.BAD_REQUEST, { message: 'Product data is not valid!'});
        }*/

        const product = await productService.addProduct(data);

        if (product) {
            return prepareResponse(HTTP_STATUS_CODE.OK, product);
        }
    } catch (e) {
        return prepareResponse(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR, { message: `SERVER_ERROR: [${e.message}]` });
    }
}
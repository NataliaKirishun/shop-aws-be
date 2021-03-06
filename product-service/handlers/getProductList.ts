import "source-map-support/register";
import { HTTP_STATUS_CODE } from "../constants/constants";
import * as productService from "../services/product.service";
import { prepareResponse } from "../helpers/prepareResponse.helper";
import { APIGatewayProxyEvent } from "aws-lambda";

export const getProductList = async (event: APIGatewayProxyEvent) => {
    console.log('[getProductList function]: ', event);

    try {
        const products = await productService.getProductList();

        return prepareResponse(HTTP_STATUS_CODE.OK, products);
    } catch (e) {
        return prepareResponse(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR, {message: e.message});
    }
}
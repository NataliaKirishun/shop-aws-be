import { APIGatewayProxyEvent } from "aws-lambda";
import "source-map-support/register";
import { HTTP_STATUS_CODE } from "../constants/constants";
import * as productService from "../services/product.service";
import { prepareResponse } from "../helpers/prepareResponse.helper";

export const getProductById = async (event: APIGatewayProxyEvent) => {
    console.log('[getProductById function]: ', event);

    try {
        const { productId } = event.pathParameters;

        const product = await productService.getProductById(productId);

        if (!product) {
            return prepareResponse(HTTP_STATUS_CODE.NOT_FOUND, { message: `Product is not found: ${productId }`});
        }

        return prepareResponse(HTTP_STATUS_CODE.OK, product);

    } catch (e) {
        return prepareResponse(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR, {message: e.message});
    }
}
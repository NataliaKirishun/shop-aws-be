import {APIGatewayProxyHandler} from "aws-lambda";
import "source-map-support/register";
import { mockProducts } from "../assets/products";
import { headers } from "../constants/constants";

export const getProductList: APIGatewayProxyHandler = async () => {
    return {
        headers,
        statusCode: 200,
        body: JSON.stringify(mockProducts)
    };
}
import { APIGatewayProxyEvent, APIGatewayProxyHandler } from "aws-lambda";
import "source-map-support/register";
import { mockProducts } from "../assets/products";
import { headers } from "../constants/constants";
import { Product } from "../models/product.model";

export const getProductById: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    const { productId } = event.pathParameters;

    const product = mockProducts.find(({id}: Product) => productId === id);

    if (!product) {
        return {
            headers,
            statusCode: 404,
            body: JSON.stringify({message: 'Product not found'})
        };
    }

    return {
        headers,
        statusCode: 200,
        body: JSON.stringify(product)
    };
}
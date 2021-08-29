import { Product } from "../models/product.model";
import { mockProducts } from "../assets/products";
import { APIGatewayProxyEvent } from 'aws-lambda';
import { getProductById } from "../handlers/getProductById";

describe('getProductById', () => {
    it('should successfully return product according to the id passed', async () => {
        const mockProduct: Product = mockProducts[0];
        const mockEvent: Partial<APIGatewayProxyEvent> = {
            pathParameters: {
                productId: mockProduct.id
            }
        };

        const response = await getProductById(mockEvent as APIGatewayProxyEvent);

        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body)).toEqual(mockProduct);
    });

    it('should return 404 status if product is not found', async () => {
        const mockProductId = 'test_id';
        const mockEvent: Partial<APIGatewayProxyEvent> = {
            pathParameters: {
                productId: mockProductId
            }
        };

        const response = await getProductById(mockEvent as APIGatewayProxyEvent);

        expect(response.statusCode).toBe(404);
        expect(JSON.parse(response.body)).toBe('Product is not found');
    });
})
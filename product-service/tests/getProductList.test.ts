import { getProductList } from "../handlers/getProductList";
import { mockProducts } from "../assets/products";

describe('getProductList', () => {
    it('should successfully return product list', async () => {
        const response = await getProductList();

        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body)).toEqual(mockProducts);
    });
});
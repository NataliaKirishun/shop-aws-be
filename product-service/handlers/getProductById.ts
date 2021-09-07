import { APIGatewayProxyEvent } from "aws-lambda";
import "source-map-support/register";
import { headers } from "../constants/constants";
import { invoke } from "../sql/db.helper";

export const getProductById = async (event: APIGatewayProxyEvent) => {

    try {
        const { productId } = event.pathParameters;

        const productData = await invoke(`select p.id, p.description, p.price, p.title, s.count from products p left join stocks s on p.id = s.product_id where s.product_id = '${productId}' and p.id = '${productId}'`);
        const product = productData.rows[0];

        if (!product) {
            return {
                headers,
                statusCode: 404,
                body: JSON.stringify(`Product is not found: ${productId}`)
            };
        }

        return {
                headers,
                statusCode: 200,
                body: JSON.stringify(product)
            }

    } catch (error) {
        return {
            headers,
            statusCode: 500,
            body: JSON.stringify({ message: `SERVER_ERROR: [${error}]` }, null, 2)
        };
    }
}
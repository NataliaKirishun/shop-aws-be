import "source-map-support/register";
import { headers } from "../constants/constants";
import { invoke } from "../sql/db.helper";

export const getProductList = async () => {
    try {
        const products = await invoke('select p.id, p.description, p.price, p.title, s.count from products p left join stocks s on p.id = s.product_id');

        return {
            headers,
            statusCode: 200,
            body: JSON.stringify(products.rows)
        };
    } catch (error) {
        return {
            headers,
            statusCode: 500,
            body: JSON.stringify({ message: error.message })
        };
    }
}
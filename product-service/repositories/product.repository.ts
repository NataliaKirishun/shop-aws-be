import { invoke } from "../db/db.helper";

export const getProductList = async () => {
    return await invoke('SELECT p.id, p.description, p.price, p.title, s.count FROM products p left JOIN stocks s ON p.id = s.product_id');
}

export const getProductById = async (id) => {
    return await invoke(`SELECT p.id, p.description, p.price, p.title, s.count FROM products p left JOIN stocks s ON p.id = s.product_id where s.product_id = '${id}' and p.id = '${id}'`);
}

export const addProduct = async ({ title, price, description, count }) => {
    console.log(title, price, description, count, 'title, price, description, count');

    const { rows: [{ id }] } = await invoke('INSERT INTO products (title, price, description) VALUES ($1, $2, $3) RETURNING id',
        [title, price, description]
    );
    await invoke('INSERT INTO stocks (product_id, count) VALUES ($1, $2)',
        [id, count]
    );

    const product = await getProductById(id);

    console.log(product, 'product');

    return product.rows[0];
}
import * as productRepository from "../repositories/product.repository";

export const getProductList = async () => {
    const products =  await productRepository.getProductList();
    return products.rows;
}

export const getProductById = async (id: string) => {
    const productData = await productRepository.getProductById(id);
    return productData.rows[0];
}

export const addProduct = async (productData) => {
    return await productRepository.addProduct(productData);
}

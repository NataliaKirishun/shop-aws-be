export interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    count: number;
}

export const ProductScheme = {
    type: 'object',
    properties: {
        title: { type: 'string' },
        description: { type: 'string' },
        price: { type: 'integer', minimum: 0 },
        count: { type: 'integer', minimum: 0 },
    },
    required: ['title']
};
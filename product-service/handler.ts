import "source-map-support/register";

import { getProductList } from "./handlers/getProductList";
import { getProductById } from "./handlers/getProductById";
import { addProduct } from "./handlers/addProduct";
import { catalogBatchProcess } from "./handlers/catalogBatchProcess";

export { getProductList, getProductById, addProduct, catalogBatchProcess };


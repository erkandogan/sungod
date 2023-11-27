import { type IProduct } from "./product.interface";
export const fetchProducts = async () => {
  try {
    const response = await $fetch("/api/products");
    const data = response as IProduct;
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

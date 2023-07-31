import axios from "axios";
import { BaseUrl } from "../../utils/baseUrl";

import { ProductAttributes } from "../../../types/types";

export const getProducts = async () => {
  try {
    const response = await axios.get(`${BaseUrl()}/products`);

    console.log("got response", response);
    return response.data;
  } catch (error) {
    console.log("got error", `${BaseUrl()}/products`, error);
    return error;
  }
};

export const updateProduct = async (product: ProductAttributes) => {
  console.log("try update", product);
  try {
    const response = await axios.put(
      `${BaseUrl()}/products/${product?.id}`,
      product
    );

    console.log("got update response", response);
    return true;
  } catch (error) {
    console.log("got update error", `${BaseUrl()}/products`, error);
    return false;
  }
};

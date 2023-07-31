import axios from "axios";
import { BaseUrl } from "../../utils/baseUrl";

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

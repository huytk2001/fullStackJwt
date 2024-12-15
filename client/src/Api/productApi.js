import axiosClient from "./axiosClient";

const productApi = {
  getAll: async (params) => {
    try {
      const url = `/product/product`;
      const response = await axiosClient.get(url, { params });
      console.log("API Response:", response.data); // Log dữ liệu phản hồi từ server
      return response;
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  },
  getId: async (id) => {
    const url = `/product/product/${id}`;
    return axiosClient.get(url);
  },
};

export default productApi;

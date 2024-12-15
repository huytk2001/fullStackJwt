import ProductModel from "../models/ProductModel.js";

export const productController = {
  createProductController: async (req, res) => {
    try {
      const {
        name,
        image,
        category,
        unit,
        stock,
        price,
        discount,
        description,
        more_details,
      } = req.body;
      if (
        !name ||
        !image ||
        !category ||
        !unit ||
        !stock ||
        !price ||
        !discount ||
        !description ||
        !more_details
      ) {
        return res.status(400).json({
          message: "Enter required field",
          success: false,
        });
      }
      const newProduct = new ProductModel({
        name,
        image,
        category,
        unit,
        stock,
        price,
        discount,
        description,
        more_details,
      });
      const product = await newProduct.save();
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
  getProduct: async (req, res) => {
    try {
      let { page, limit, search } = req.body;
      if (!page) {
        page = 1;
      }
      if (!limit) {
        limit = 10;
      }
      const query = search
        ? {
            $text: {
              $string: search,
            },
          }
        : {};
      const skip = (page - 1) * limit;
      const [data, totalCount] = await Promise.all([
        ProductModel.find(query).sort({ created: -1 }).skip(skip).limit(limit),
        ProductModel.countDocuments(query),
      ]);
      return res.status(200).json({
        message: "Product Data",
        success: true,
        totalCount: totalCount,
        data: data,
      });
    } catch (error) {}
  },
  getProductById: async (req, res) => {
    try {
      const id = req.params.id;
      const product = await ProductModel.findById(id);
      if (!product) {
        return;
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },
  getDeleteProduct: async (req, res) => {
    try {
      const product = await ProductModel.findByIdAndDelete(req.params.id);
      if (!product) {
        return;
      }
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },
};

export default productController;

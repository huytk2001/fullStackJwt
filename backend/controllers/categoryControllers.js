import CategoryModel from "../models/CategoryModel.js";

const categoryControllers = {
  CategoryAdd: async (req, res) => {
    try {
      const { name, image } = req.body;

      // Kiểm tra các trường bắt buộc
      if (!name || !image) {
        return res.status(400).json({
          success: false,
          message: "Name and image are required fields.",
        });
      }

      // Tạo danh mục mới
      const newCategory = new CategoryModel({
        name,
        image,
      });

      // Lưu vào cơ sở dữ liệu
      const category = await newCategory.save();

      // Kiểm tra lưu thành công
      if (!category) {
        return res.status(500).json({
          success: false,
          message: "Failed to save category.",
        });
      }

      // Phản hồi thành công
      return res.status(200).json({
        success: true,
        message: "Category created successfully.",
        data: category,
      });
    } catch (error) {
      // Xử lý lỗi
      return res.status(500).json({
        success: false,
        message: "Internal server error.",
        error: error.message,
      });
    }
  },
  getCategoryController: async (req, res) => {
    try {
      const data = await CategoryModel.find().sort({ createdAt: -1 });
      return res.status(200).json({
        data: data,
        error: false,
        success: true,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
        error: error,
        success: false,
      });
    }
  },
  getCategoryById: async (req, res) => {
    try {
      const data = await CategoryModel.findById(req.params.id);
      return res.status(200).json({
        data: data,
        error: false,
        success: true,
      });
    } catch (error) {
      return res.status(500).json({
        message: message.error || message,
        error: true,
        success: false,
      });
    }
  },
  deleteCategoryById: async (req, res) => {
    try {
      const data = await CategoryModel.findByIdAndDelete(req.params.id);
      return res.status(200).json({
        error: false,
        success: true,
      });
    } catch (error) {
      return res.status(500).json({
        message: message.error || message,
        error: true,
        success: false,
      });
    }
  },
  updatedCategoryById: async (req, res) => {
    try {
      const { _id, name, image } = req.body;
      const update = await CategoryModel.updateOne(
        { _id: _id },
        { name, image }
      );
      return res.status(200).json({
        data: update,
        error: false,
        success: true,
      });
    } catch (error) {
      return res.status(500).json({
        message: message.error || message,
        error: true,
        success: false,
      });
    }
  },
};

export default categoryControllers;

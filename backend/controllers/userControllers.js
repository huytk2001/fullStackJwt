import userModel from "../models/UserModel.js";

const userController = {
    // Lấy tất cả người dùng
    getAllUser: async(req, res) => {
        try {
            const users = await userModel.find();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    },

    // Lấy người dùng theo ID
    getIdUser: async(req, res) => {
        try {
            const userId = req.userId
            console.log(userId)
            const user = await userModel.findById(userId);

            // Kiểm tra nếu người dùng không tồn tại
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    },

    // Xóa người dùng theo ID
    getDeleteUser: async(req, res) => {
        try {
            const user = await userModel.findByIdAndDelete(req.params.id);

            // Kiểm tra nếu người dùng không tồn tại
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            // Trả về thông báo thành công khi xóa
            res.status(200).json({ message: "User deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    },
};
export default userController;
import AddressModel from "../models/addressModel.js"
import UserModel from "../models/UserModel.js"

const addressController = {
    addAddress: async(request, response) => {
        try {
            const userId = request.userId // middleware
            const { address_line, city, country, state, pinCode, mobile } = request.body
            const createAddress = new AddressModel({
                address_line,
                city,
                country,
                state,
                pinCode,
                mobile,
                userId: userId
            })
            const save = await createAddress.save();
            const addUserAddressId = await UserModel.findByIdAndUpdate(userId, {
                $push: {
                    address_details: save._id
                }
            })
            return response.status(200).json({
                message: "Address create Successfully",
                error: false,
                success: true,
                data: save
            })
        } catch (error) {
            return response.status(500).json({
                message: error.message || error,
                error: true,
                success: false
            })
        }
    },
    getAddress: async(request, response) => {
        try {
            const userId = request.userId
            const data = await AddressModel.find({ userId: userId }).sort({ createAt: -1 })
            return response.status(200).json({
                message: "List of addresponses",
                error: false,
                success: true,
                data: data
            })

        } catch (error) {
            return response.status(500).json({
                message: error.message || error,
                success: false,
                error: true
            })
        }
    },
    updatedAddress: async(request, response) => {
        try {
            const userId = request.userId
            const { _id, addrees_line, city, country, state, pinCode, mobile } = request.body
            const updatedAddress = await AddressModel.updateOne({ _id: _id, userId: userId }, {
                address_line,
                city,
                country,
                state,
                pinCode,
                mobile
            })
            return response.status(200).json({
                message: "Addresponses Updated",
                error: false,
                success: true,
                data: updatedAddresponses
            })
        } catch (error) {
            return response.status(500).json({
                message: message.error || error,
                error: true,
                success: false
            })
        }
    },
    deleteAddress: async(request, response) => {
        try {
            const userId = request.userId
            const { _id } = request.body
            const disableAddress = await AddressModel.updateOne({ _id: _id, userId }, {
                status: false
            })
            return response.status(200).json({
                message: "Addresponses remove",
                error: false,
                success: true,
                data: disableAddress
            })
        } catch (error) {
            return response.status(500).json({
                message: message.error || error,
                error: true,
                success: false
            })
        }
    }
}
export default addressController
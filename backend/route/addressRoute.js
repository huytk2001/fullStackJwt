import express from 'express'
import addressController from '../controllers/addressController.js'
import auth from '../controllers/verifyToken.js'

const addressRoute = express.Router()

addressRoute.post("/create", auth, addressController.addAddress)
addressRoute.get("/get", auth, addressController.getAddress)
addressRoute.put("/updated", auth, addressController.updatedAddress)
addressRoute.delete("/delete", auth, addressController.deleteAddress)

export default addressRoute
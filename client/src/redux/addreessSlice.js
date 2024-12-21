import { createSlice } from "@reduxjs/toolkit";


const addressSlice = createSlice({
    name: 'address',
    initialState: {
        addressList: []
    },
    reducers: {
        handleAddress: (state, action) => {
            state.addressList = [...action.payload]
        }
    }
})
export const { handleAddress } = addressSlice.actions
export default addressSlice.reducer
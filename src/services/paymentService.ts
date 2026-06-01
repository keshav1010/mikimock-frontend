import api from "../api/axios";

export const createOrder = async (
    amount: number,
    monthPlan: number
) => {
    console.log("before hitting API");

    const response = await api.post(
        "/payments/order-create",
        {
            amount,
            monthPlan,
            currency: "INR",
            receipt: "receipt_001"
        }
    );
    console.log("after hiting API");

    return response.data;
};


export const verifyPayment = async (
    data: any
) => {

    const response = await api.post(
        "/payments/verify",
        data
    );

    return response.data;
};
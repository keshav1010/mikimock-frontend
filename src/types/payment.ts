export interface CreateOrderRequest {

    amount: number;

    months: number;
}

export interface VerifyPaymentRequest {

    paymentId: string;

    orderId: string;

    transactionId: string;

    paymentReference: string;

    signature: string;
}
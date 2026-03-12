export const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'https://backend.dev.bstable.bitrus.com/api/'
    : 'https://backend.bstable.bitrus.com/api/';

export const TRANSACTION = `${BASE_URL}v1/merchant_transaction/`;
export const SEND_EMAIL = `${BASE_URL}v1/send-email/send-email`;

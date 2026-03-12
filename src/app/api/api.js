import axios from 'axios';
import { TRANSACTION, SEND_EMAIL } from './urls';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export const ApiTransaction = {
  makeTransaction: async (data) => {
    try {
      const response = await axios.post(TRANSACTION, data, {
        headers: {
          'Content-Type': 'application/json',
          'MERCHANT-API-KEY': API_KEY,
        },
      });
      return response.data;
    } catch (error) {
      console.info(error);
      return error;
    }
  },
  sendEmail: async (data) => {
    try {
      const response = await axios.post(SEND_EMAIL, data, {
        headers: {
          'Content-Type': 'application/json',
          'MERCHANT-API-KEY': API_KEY,
        },
      });
      return response.data;
    } catch (error) {
      console.info(error);
      return error;
    }
  },
};

import env from "../../env";
import { api } from "../../RTKApi";

export interface IGetDataMerchant {
  presigned_acceptance: {
    acceptance_token: string;
    permalink: string;
    type: string;
  };
  presigned_personal_data_auth: {
    acceptance_token: string;
    permalink: string;
    type: string;
  };
}

export interface ICReateTransactionRequest {
  number: string;
  exp_month: string;
  exp_year: string;
  cvc: string;
  card_holder: string;
  customer_email: string;
  acceptance_token: string;
  accept_personal_auth: string;
  amount_in_cents: number; // Monto current centavos
  currency: string; // Moneda
  articles: IArtiBuy[];
}

export interface IArtiBuy {
  id: number;
  amount: number;
}

export interface IMerchantPaymentModel {
  id?: number;
  reference: string;
  status: string;
  status_message: string | null;
  payment_method: Record<string, unknown>;
  amount_in_cents: number;
  currency: string;
  customer_email: string | null;
  payment_link_id: string | null;
  bill_id: string | null;
  created_at?: Date;
}

export interface IStatusTransactionResponse {
  currentStatus: string;
  hasChanged: boolean;
  originalTransaction: {
    id: number;
    reference: string;
    status: string;
    status_message: string;
    bill_id: string;
  };
}

export interface IGetStatusTransaction {
  bill_id: string;
}

export interface IGetAllTransactions {
  id: number;
  reference: string;
  status: string;
  status_message: string | null;
  amount_in_cents: string;
  currency: string;
  customer_email: string | null;
  payment_link_id: string | null;
  bill_id: string | null;
  created_at: string | null;
}

export const cartApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMerchantData: builder.query<IGetDataMerchant, void>({
      query: () => ({
        url: `${env.ECOMERCE_API_URL}/merchants/generate`,
        method: "GET",
      }),
    }),
    getStatusTransaction: builder.query<
      IStatusTransactionResponse,
      IGetStatusTransaction
    >({
      query: ({ bill_id }) => ({
        url: `${env.ECOMERCE_API_URL}/merchants/transaction/status/${bill_id}`,
        method: "GET",
      }),
    }),
    getAllTransactions: builder.query<IGetAllTransactions[], void>({
      query: () => ({
        url: `${env.ECOMERCE_API_URL}/merchants/transactions/pending`,
        method: "GET",
      }),
    }),
    createTransaction: builder.mutation<
      IMerchantPaymentModel,
      ICReateTransactionRequest
    >({
      query: (data) => ({
        url: `${env.ECOMERCE_API_URL}/merchants/create-transaction`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLazyGetMerchantDataQuery,
  useCreateTransactionMutation,
  useLazyGetStatusTransactionQuery,
  useLazyGetAllTransactionsQuery,
} = cartApi;

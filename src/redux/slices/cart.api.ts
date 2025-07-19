import env from "../env";
import { api } from "../RTKApi";

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

export const cartApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMerchantData: builder.query<IGetDataMerchant, void>({
      query: () => ({
        url: `${env.ECOMERCE_API_URL}/merchants/generate`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLazyGetMerchantDataQuery } = cartApi;

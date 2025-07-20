import env from "@/redux/env";
import { api } from "@/redux/RTKApi";

export interface IGetDataArticle {
  id: number;
  title: string;
  description: string;
  category: string;
  price: string;
  originalPrice: string;
  image: string;
  images: string[];
  rating: {
    rate: number;
    count: number;
  };
  badge: string;
  discount: string;
  stock: number;
  inStock: boolean;
  featured: boolean;
}

export interface IArticleProduct
  extends Omit<IGetDataArticle, "id" | "inStock" | "featured"> {}

export const articleApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createArticle: builder.mutation<IGetDataArticle, IArticleProduct>({
      query: (article) => ({
        url: `${env.ECOMERCE_API_URL}/articles/create`,
        method: "POST",
        body: article,
      }),
    }),
    getArticles: builder.query<IGetDataArticle[], void>({
      query: () => ({
        url: `${env.ECOMERCE_API_URL}/articles`,
        method: "GET",
      }),
    }),
    getArticleById: builder.query<IGetDataArticle, number>({
      query: (id) => ({
        url: `${env.ECOMERCE_API_URL}/articles/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLazyGetArticlesQuery,
  useLazyGetArticleByIdQuery,
  useCreateArticleMutation,
} = articleApi;

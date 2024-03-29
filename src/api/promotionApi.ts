import { PromotionCreateDto } from 'types/dto/promotion/create.dto';
import { PromotionUpdateDto } from 'types/dto/promotion/update.dto';
import { Promotion } from 'types/entities/Promotion';

import { Path } from '../constants/routes';
import { commonApi } from './commonApi';

export const promotionApi = commonApi.injectEndpoints({
  endpoints: builder => ({
    getPromotionById: builder.query<Promotion, number>({
      query: id => ({
        url: `${Path.STOCKS}/${id}`,
        method: 'GET',
      }),
      providesTags: (r, e, id) => [{ type: 'Promotion', id }],
    }),
    getAllPromotions: builder.query<Promotion[], void>({
      query: () => ({
        url: Path.STOCKS,
        method: 'GET',
      }),
      providesTags: result =>
        result
          ? [...result.map(({ id }) => ({ type: 'Promotion' as const, id })), { type: 'Promotion', id: 'LIST' }]
          : [{ type: 'Promotion', id: 'LIST' }],
    }),
    createPromotion: builder.mutation<void, PromotionCreateDto>({
      query: body => ({
        url: Path.STOCKS,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Promotion', id: 'LIST' }],
    }),
    updatePromotion: builder.mutation<void, PromotionUpdateDto>({
      query: ({ id, ...body }) => ({
        url: `${Path.STOCKS}/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (r, e, { id }) => [{ type: 'Promotion', id }],
    }),
    deletePromotion: builder.mutation<void, number>({
      query: id => ({
        url: `${Path.STOCKS}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Promotion', id: 'LIST' }],
    }),
  }),
});

export const {
  useDeletePromotionMutation,
  useCreatePromotionMutation,
  useUpdatePromotionMutation,
  useGetAllPromotionsQuery,
  useGetPromotionByIdQuery,
} = promotionApi;

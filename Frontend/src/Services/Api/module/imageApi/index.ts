import api from '../../api';
import { Product, PaginationParams } from '../../../../Helper/interface';

export const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // for geting type product and dashboard product
    getTypeProducts: builder.query<Product[], PaginationParams>({
      query: ({ page, limit, search }) => ({
        url: `categories/list/?page=${page}&limit=${limit}&search=${search}`,
        method: 'GET',
      }),
    }),
    getListALLProducts: builder.query<Product[], PaginationParams>({
      query: ({ page, limit }) => ({
        url: `categories/listall/?page=${page}&limit=${limit}`,
        method: 'GET',
      }),
    }),

    getProductsDetail: builder.query({
      query: (params) => ({
        url: `categories/item`,
        method: 'GET',
        params,
      }),
    }),
    //  wishlist section product
    getWishlistProducts: builder.query<Product[], PaginationParams>({
      query: (params) => ({
        url: `categories/Favourites`,
        method: 'GET',
        params,
      }),
    }),
    postProducts: builder.mutation({
      query: (data) => ({
        url: `categories/userfavourites/`,
        body: data,
        method: 'POST',
      }),
    }),
    postCategoryProducts: builder.mutation({
      query: ({ sampleData, page, limit }) => ({
        url: `categories/filters/?page=${page}&limit=${limit}`,
        body: sampleData,
        method: 'POST',
      }),
    }),
    postNewProducts: builder.mutation({
      query: (data) => ({
        url: `categories/putad/`,
        body: data,
        method: 'POST',
      }),
    }),
    // signup
    postSignupData: builder.mutation({
      query: (data) => ({
        url: `account/signup/`,
        body: data,
        method: 'POST',
      }),
    }),
    postForgetPasswordData: builder.mutation({
      query: (data) => ({
        url: `account/forgotpass/`,
        body: data,
        method: 'POST',
      }),
    }),
    // change password
    postChangePasswordData: builder.mutation({
      query: (data) => ({
        url: `account/changepass/`,
        body: data,
        method: 'POST',
      }),
    }),
    //  login
    postSigninData: builder.mutation({
      query: (data) => ({
        url: `account/login/`,
        body: data,
        method: 'POST',
      }),
    }),
    // logout
    postLogoutData: builder.mutation({
      query: (data) => ({
        url: `account/logout/`,
        body: data,
        method: 'POST',
      }),
    }),
    // post edit
    postEditData: builder.mutation({
      query: (data) => ({
        url: `categories/editads/`,
        body: data,
        method: 'POST',
      }),
    }),
    // user ads
    getAdsData: builder.query({
      query: (params) => ({
        url: `categories/userads/`,
        method: 'GET',
        params,
      }),
    }),
    // delete ads
    getDeleteAds: builder.query({
      query: (params) => ({
        url: `categories/removead/`,
        method: 'GET',
        params,
      }),
    }),
    // useINFO
    getUserInfo: builder.query({
      query: () => ({
        url: `account/userinfo/`,
        method: 'GET',
      }),
    }),
    // edit user info
    postEditProfileData: builder.mutation({
      query: (data) => ({
        url: `account/updateuserdetails/`,
        body: data,
        method: 'POST',
      }),
    }),
    // email valid
    postEmailValid: builder.mutation({
      query: (data) => ({
        url: `account/isvalidemail/`,
        body: data,
        method: 'POST',
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetTypeProductsQuery,
  useGetListALLProductsQuery,
  useGetWishlistProductsQuery,
  useGetProductsDetailQuery,
  usePostSignupDataMutation,
  usePostSigninDataMutation,
  usePostProductsMutation,
  usePostCategoryProductsMutation,
  usePostNewProductsMutation,
  usePostChangePasswordDataMutation,
  usePostForgetPasswordDataMutation,
  usePostLogoutDataMutation,
  useGetAdsDataQuery,
  useLazyGetDeleteAdsQuery,
  usePostEditDataMutation,
  useGetUserInfoQuery,
  usePostEditProfileDataMutation,
  usePostEmailValidMutation,
} = productApi;

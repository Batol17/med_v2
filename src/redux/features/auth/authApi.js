import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl:import.meta.env.VITE_AUTH_API,
        prepareHeaders: (headers) => {
            const token = cookies.get("token"); // ✅ نقرأ التوكن هنا كل مرة
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Users'],
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (userData) => ({
                url: 'login',
                method: 'POST',
                body: userData,
            }),
            invalidatesTags: ['Users'],
        }),
        pharmacyInfo: builder.mutation({
            query: (userData) => ({
                url: '/pharmacy',
                method: 'POST',
                body: userData,
            }),
            invalidatesTags: ['Users'],
        }),
        verifyCode: builder.mutation({
            query: (userData) => ({
                url: '/verify-email',
                method: 'POST',
                body: userData,
            }),
            invalidatesTags: ['Users'],
        }),
        getDetailMe: builder.query({
            query: () => `/me`,
            providesTags: ['Users'],
        }),
        update: builder.mutation({
            query: ({ id, ...userData }) => ({
              url: `/users/${id}`,
              method: 'PUT',
              body: userData,
            }),
       
            invalidatesTags: ['Users'],
        }),
        logout: builder.mutation({
            query: (userData) => ({
                url: '/logout',
                method: 'POST',
                body:userData
            }),
            invalidatesTags: ['Users'],
        }),
    }),
});

export const { useLoginMutation,usePharmacyInfoMutation, useVerifyCodeMutation, useGetDetailMeQuery, useLogoutMutation, useUpdateMutation } = authApi;

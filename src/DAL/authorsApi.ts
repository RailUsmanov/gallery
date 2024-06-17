import {createApi} from '@reduxjs/toolkit/query/react';
import {Author} from "../utils/type";
import {AxiosResponse} from "axios";
import axiosInstance from "./api";

const baseQuery = async () => {
    const response: AxiosResponse<Author[]> = await axiosInstance.get('/authors')
    return {data: response.data}
}

export const authorsApi = createApi({
    reducerPath: 'authorsApi',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getAuthors: builder.query<Author[], void>({
            query: () => '/',
        }),
    }),
});

export const {useGetAuthorsQuery} = authorsApi;

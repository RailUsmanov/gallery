import {createApi} from '@reduxjs/toolkit/query/react';
import {Location} from "../utils/type";
import axiosInstance from "./api";
import {AxiosResponse} from "axios";

const baseQuery = async () => {
    const response: AxiosResponse<Location[]> = await axiosInstance.get('/locations');
    return {data: response.data};
};
export const locationsApi = createApi({
    reducerPath: 'locationsApi',
    baseQuery: baseQuery, // Используйте кастомный baseQuery
    endpoints: (builder) => ({
        getLocations: builder.query<Location[], void>({
            query: () => '/',
        }),
    }),
});

export const {useGetLocationsQuery} = locationsApi;
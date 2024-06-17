import {createApi, BaseQueryFn} from '@reduxjs/toolkit/query/react';
import axios, {AxiosInstance, AxiosRequestConfig, AxiosError} from 'axios';
import {Painting} from '../utils/type';

const API_URL = 'https://test-front.framework.team';

const axiosInstance: AxiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const baseQuery: BaseQueryFn<
    AxiosRequestConfig,
    unknown,
    { error: string }
> = async (args) => {
    try {
        const response = await axiosInstance.request(args);
        return {data: response.data};
    } catch (error) {
        const err = error as AxiosError;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return {error: err.response?.data?.message || 'Произошла ошибка при выполнении запроса'};
    }
};

interface QueryParams {
    _page?: number;
    _limit?: number;
    authorId?: number;
    locationId?: number;
    yearFrom?: number;
    yearTo?: number;
    q?: string;
}

function buildQueryParams(params: QueryParams): URLSearchParams {
    const query: Record<string, string | number> = {};

    if (params.authorId !== undefined) {
        query.authorId = params.authorId;
    }

    if (params.locationId !== undefined) {
        query.locationId = params.locationId;
    }

    if (params.yearFrom !== undefined) {
        query.created_gte = params.yearFrom.toString();
    }

    if (params.yearTo !== undefined) {
        query.created_lte = params.yearTo.toString();
    }

    if (params.q !== undefined) {
        query.q = params.q;
    }

    if (params._page !== undefined) {
        query._page = params._page.toString();
    }

    if (params._limit !== undefined) {
        query._limit = params._limit.toString();
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return new URLSearchParams(query);
}

export const paintingsApi = createApi({
    reducerPath: 'paintingsApi',
    baseQuery,
    endpoints: (builder) => ({
        getPaintings: builder.query<{ data: Painting[]; total: number }, QueryParams>({
            query: (params = {}) => {
                let url = '/paintings';
                const queryParams = buildQueryParams(params);
                if (queryParams.toString()) {
                    url += '?' + queryParams.toString();
                }
                return {url, method: 'GET'};
            },
            transformResponse: (response: Painting[]) => ({
                data: response,
                total: response.length,
            }),
        }),
        getTotalCount: builder.query<{ data: Painting[]; total: number }, QueryParams>({
            query: (params = {}) => {
                let url = '/paintings';
                const queryParams = buildQueryParams(params);
                if (queryParams.toString()) {
                    url += '?' + queryParams.toString();
                }
                return {url, method: 'GET'};
            },
            transformResponse: (response: Painting[]) => ({
                data: response,
                total: response.length,
            }),
        }),
    }),
});

export const {useGetPaintingsQuery, useGetTotalCountQuery} = paintingsApi;

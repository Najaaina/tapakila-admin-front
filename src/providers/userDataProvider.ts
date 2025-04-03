import { GetListParams, GetListResult, GetOneParams, GetOneResult, HttpError, QueryFunctionContext, RaRecord, UpdateParams, UpdateResult } from 'react-admin';
import { Account } from '../types/Account.tsx';

const API_URL: string = `${import.meta.env.VITE_API_URL}/api/admin`;

const userDataProvider = {
    getList: async function <RecordType extends RaRecord = never>(params: GetListParams & QueryFunctionContext): Promise<GetListResult<RecordType>> {
        const { pagination } = params;
        const page = pagination?.page ?? 1;
        const perPage = pagination?.perPage ?? 10;
        const query = `?page=${page}&limit=${perPage}`;

        const response: Response = await fetch(`${API_URL}/account${query}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
            },
        });

        const { data, total } = await response.json();
        const mappedData = data.map((user: Account) => ({
            ...user,
            id: user.id_account,
        }));

        return {
            data: mappedData,
            total,
        };
    },
    getOne: async function <RecordType extends RaRecord = never>(params: GetOneParams<RecordType> & QueryFunctionContext): Promise<GetOneResult<RecordType>> {
        console.log(params.meta);
        console.log(params);
        const { id } = params;
        const response: Response = await fetch(`${API_URL}/account/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
            },
        });
        if (!response.ok) {
            return Promise.reject(new HttpError('User not found', response.status));
        }
        console.log(response.headers);
        const data = await response.json();
        const mappedData = data.map((user: Account) => ({
            ...user,
            id: user.id_account,
        }));

        return {
            data: mappedData,
        };
    },
    update: async function <RecordType extends RaRecord = never>(params: UpdateParams): Promise<UpdateResult<RecordType>> {
        const { id, data } = params;

        const response: Response = await fetch(`${API_URL}/account/${id}/${data.role}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
            },
        });

        if (!response.ok) {
            return Promise.reject(new HttpError('Failed to update user role', response.status));
        }

        const updatedUser = await response.json();

        return {
            data: {
                ...updatedUser,
                id: updatedUser.id_account,
            },
        };
    },
};

export default userDataProvider;

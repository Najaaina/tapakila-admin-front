import { GetListParams, GetListResult, GetOneParams, GetOneResult, HttpError, QueryFunctionContext, RaRecord, UpdateParams, UpdateResult } from 'react-admin';

const API_URL: string = import.meta.env.VITE_API_URL;

const userDataProvider = {
    getList: async function <RecordType extends RaRecord = never>(params: GetListParams & QueryFunctionContext): Promise<GetListResult<RecordType>> {
        const data: Response = await fetch(`${API_URL}/account`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
            },
        });
        console.log(data.headers);
        console.log('Pagination :' + params.pagination); /*
        const { page, perPage } = params.pagination;
        const query = `?page=${page}&limit=${perPage}`;*/
        const userList = await data.json();

        return {
            data: userList,
            total: 10,
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

        return {
            data: data,
        };
    },
    update: async function <RecordType extends RaRecord = never>(params: UpdateParams): Promise<UpdateResult<RecordType>> {
        const { id } = params;
        const response: Response = await fetch(`${API_URL}/account/${id}/${params.data.role}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
            },
        });
        if (!response.ok) {
            return Promise.reject(new HttpError('Failed to update', response.status));
        }
        console.log(response.body);
        const updatedUser = await response.json();
        return {
            data: updatedUser,
        };
    },
};

export default userDataProvider;

import {
    CreateParams,
    CreateResult,
    DataProvider,
    DeleteParams,
    DeleteResult,
    GetListParams,
    GetListResult,
    GetOneParams,
    GetOneResult,
    HttpError,
    Identifier,
    QueryFunctionContext,
    RaRecord,
    UpdateParams,
    UpdateResult,
} from 'react-admin';
import userDataProvider from './userDataProvider.ts';
import eventDataProvider from './eventDataProvider.ts';

/*const getDataProvider = (resource: string) => {
    switch (resource) {
        case 'accounts':
            return userDataProvider;
        case 'events':
            return eventDataProvider;
        default:
            throw new Error('No data provider');
    }
};*/

export const dataProvider: DataProvider = {
    getList: async function <RecordType extends RaRecord = never>(
        resource: string,
        params: GetListParams & QueryFunctionContext
    ): Promise<GetListResult<RecordType>> {
        switch (resource) {
            case 'accounts':
                return userDataProvider.getList(params);
            case 'events':
                return eventDataProvider.getList(params);
            default:
                throw new Error('No data provider');
        }
    },
    getOne: async function <RecordType extends RaRecord = never>(
        resource: string,
        params: GetOneParams<RecordType> & QueryFunctionContext
    ): Promise<GetOneResult<RecordType>> {
        switch (resource) {
            case 'accounts':
                return userDataProvider.getOne(params);
            case 'events':
                return eventDataProvider.getOne(params);
            default:
                throw new Error('No data provider');
        }
    },
    update: async function <RecordType extends RaRecord = never>(resource: string, params: UpdateParams): Promise<UpdateResult<RecordType>> {
        switch (resource) {
            case 'accounts':
                return userDataProvider.update(params);
            case 'events':
                return eventDataProvider.update(params);
            default:
                throw new Error('No data provider');
        }
    },
    create: function <RecordType extends Omit<RaRecord, 'id'> = never, ResultRecordType extends RaRecord = RecordType & { id: Identifier }>(
        resource: string,
        params: CreateParams
    ): Promise<CreateResult<ResultRecordType>> {
        if (resource === 'events') {
            const currentDataProvider = eventDataProvider;
            return currentDataProvider.create(params);
        } else {
            return Promise.reject(new HttpError('Not implemented', 501));
        }
    },
    delete: function <RecordType extends RaRecord = never>(resource: string, params: DeleteParams<RecordType>): Promise<DeleteResult<RecordType>> {
        if (resource === 'events') {
            const currentDataProvider = eventDataProvider;
            return currentDataProvider.delete(params);
        } else {
            return Promise.reject(new HttpError('Not implemented', 501));
        }
    },
    deleteMany: () => {
        return Promise.reject(new HttpError('Not implemented', 501));
    },
    getMany: () => {
        return Promise.reject(new HttpError('Not implemented', 501));
    },
    getManyReference: () => {
        return Promise.reject(new HttpError('Not implemented', 501));
    },
    updateMany: () => {
        return Promise.reject(new HttpError('Not implemented', 501));
    },
};

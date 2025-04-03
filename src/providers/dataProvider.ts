const getDataProvider = (resource: string) => {
    switch (resource) {
        case 'accounts':
            return userDataProvider;
        case 'events':
            return eventDataProvider;
        default:
            throw new Error('No data provider');
    }
};

export const dataProvider: DataProvider = {
    getList: async function <RecordType extends RaRecord = never>(
        resource: string,
        params: GetListParams & QueryFunctionContext
    ): Promise<GetListResult<RecordType>> {
        const currentDataProvider = getDataProvider(resource);
        return currentDataProvider.getList(params);
    },
    getOne: async function <RecordType extends RaRecord = never>(
        resource: string,
        params: GetOneParams<RecordType> & QueryFunctionContext
    ): Promise<GetOneResult<RecordType>> {
        const currentDataProvider = getDataProvider(resource);
        return currentDataProvider.getOne(params);
    },
    update: async function <RecordType extends RaRecord = never>(resource: string, params: UpdateParams): Promise<UpdateResult<RecordType>> {
        const currentDataProvider = getDataProvider(resource);
        return currentDataProvider.update(params);
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
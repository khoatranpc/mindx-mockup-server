import React, { createContext, useState } from "react";
import { Obj } from "../global/type";
import { result } from "../global/init";

export const Store = createContext<Obj>({});

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
    const [searchResourcesByApiKey, setSearchResourcesByApiKey] = useState<Obj>(result);
    const [createNewResource, setCreateNewResource] = useState<Obj>(result);
    const [updateResource, setUpdateResource] = useState<Obj>(result);
    const [deleteResource, setDelete] = useState<Obj>(result);
    const [resourceDatas, setResourceDatas] = useState<Obj>(result);

    const [updateResourceData, setUpdateResourceData] = useState<Obj>(result);

    const contextValue = {
        resourcesApiKey: {
            value: searchResourcesByApiKey,
            set: setSearchResourcesByApiKey
        },
        createNewResource: {
            value: createNewResource,
            set: setCreateNewResource
        },
        updateResource: {
            value: updateResource,
            set: setUpdateResource
        },
        deleteResource: {
            value: deleteResource,
            set: setDelete
        },
        resourceDatas: {
            value: resourceDatas,
            set: setResourceDatas
        }
    }
    return <Store.Provider
        value={contextValue}
    >
        {children}
    </Store.Provider>

}
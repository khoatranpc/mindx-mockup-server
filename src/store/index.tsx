import React, { createContext, useState } from "react";
import { Obj } from "../global/type";
import { result } from "../global/init";

export const Store = createContext<Obj>({});

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
    const [searchResourcesByApiKey, setSearchResourcesByApiKey] = useState<Obj>(result);
    const contextValue = {
        resourcesApiKey: {
            value: searchResourcesByApiKey,
            set: setSearchResourcesByApiKey
        }
    }
    return <Store.Provider
        value={contextValue}
    >
        {children}
    </Store.Provider>

}
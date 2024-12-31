import { Dispatch, SetStateAction } from "react";
import axios from "axios";
import { Obj } from "../global/type";
import { result } from "../global/init";

const createQuery = async (api: string, method: 'get' | 'post' | 'put' | 'delete' = 'get', body?: Obj, setState?: Dispatch<SetStateAction<any | undefined>>, callBack?: (data?: Obj, error?: Obj) => void, state?: Obj, requestId?: string) => {
    setState?.({
        ...result,
        isLoading: true
    });
    try {
        const data = await axios[method](api, method !== 'get' ? body : {});
        setState?.({
            ...data.data,
            ...state,
            queried: true,
            isLoading: false,
            requestId
        });
        callBack?.(data.data);
    } catch (error: any) {
        setState?.({
            ...state,
            ...error.response.data,
            queried: true,
            isLoading: false,
            requestId
        });
        callBack?.(undefined, {
            ...error.response.data,
            message: error.response?.data?.message as string
        });
    }
}


export {
    createQuery
}
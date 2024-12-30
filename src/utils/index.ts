import { Dispatch, SetStateAction } from "react";
import axios from "axios";
import { Obj } from "../global/type";
import { result } from "../global/init";

const createQuery = async (api: string, method: 'get' | 'post' | 'put' | 'delete' = 'get', body?: Obj, setState?: Dispatch<SetStateAction<any | undefined>>) => {
    setState?.({
        ...result,
        isLoading: true
    });
    try {
        const data = await axios[method](api, method !== 'get' ? body : {});
        setState?.({
            ...data.data,
            queried: true,
            isLoading: false
        });
    } catch (error: any) {
        setState?.({
            ...error.response.data,
            queried: true,
            isLoading: false
        });
    }
}


export {
    createQuery
}
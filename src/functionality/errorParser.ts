import {AxiosError} from "axios";

export function parseError(error : AxiosError){
    const defaultAns = "try Reload page";
    const resp = error.response;

    if (resp){
        const data : any = resp.data;
        return data.errorMessage ? data.errorMessage : defaultAns;
    } else {
        return "Connection Error";
    }
}
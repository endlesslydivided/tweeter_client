import { notification } from "antd";
import {useCallback, useEffect, useRef} from "react";

export const useNotify = (result: any,successMessage?:string,successCB?:Function,errorMessage?:string,errorCB?:Function) => {

    useEffect(() =>{
        if (result.isSuccess) 
        {
            successMessage && notification.success({message:successMessage,placement:"topRight",duration:2.5});
            successCB && successCB();
        }

        if (result.isError) 
        {   
            const message = errorMessage || result.error.data.message;
            notification.error({message,placement:"topRight",duration:2.5});
            errorCB && errorCB();
        }
    },[result]);   
}
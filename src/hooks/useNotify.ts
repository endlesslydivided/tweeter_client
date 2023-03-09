import { notification } from "antd";
import { useEffect } from "react";

export const useNotify = (result: any,successMessage?:string,successCB?:Function,errorMessage?:string,errorCB?:Function) => {

    useEffect(() =>{
        if (result.isSuccess && !result.isFetching) 
        {
            successMessage && notification.success({message:successMessage,placement:"topRight",duration:2.5});
            successCB && successCB();
        }

        if (result.isError && !result.isFetching) 
        {   
            const message = errorMessage || result.error.data.message;
            notification.error({message,placement:"topRight",duration:2.5});
            errorCB && errorCB();
        }
    },[result.isFetching,result.isLoading]);   
}
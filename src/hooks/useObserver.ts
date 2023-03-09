import {useEffect, useRef} from "react";

interface UseObserverParams
{
    ref:any;
    canLoad:any;
    isLoading:any;
    callback:any;
}

export const useObserver = ({ref, canLoad, isLoading, callback}:UseObserverParams) => {
    const observer:React.MutableRefObject<any> = useRef();

    useEffect(() => {
        if (isLoading)
            return;
        if (observer.current)
            observer.current.disconnect();

        var cb = function (entries:any, observer:any) {
            if (entries[0].isIntersecting && canLoad) {
                callback()
            }
        };
        observer.current = new IntersectionObserver(cb);
        observer.current.observe(ref.current)
    }, [isLoading,canLoad])
}
import { Ref, useEffect, useRef } from "react";

const useScroll:Function = (parentRef:any,childRef:any,callback:Function) =>
{
    const observer:React.MutableRefObject<any> = useRef();

    useEffect(() =>{
        const options = {
            root: parentRef.current,
            rootMargin: '0px',
            threshold: 0
        };
        observer.current = new IntersectionObserver(([target]) =>{
            if(target.isIntersecting)
            {
                callback();
            }
        },options)

        observer.current.observe(childRef.current);

        return function() {
            observer.current.unobserver(childRef.current);
        }
    },[callback])
}

export default useScroll;
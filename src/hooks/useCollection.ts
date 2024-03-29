

import { useEffect, useState } from "react";
import { useLikeTweetMutation, useUnlikeTweetMutation } from "../services/TweetActionsApiSlice";
import { useDeleteTweetMutation } from "../services/TweetApiSlice";
import { useAppDispatch, useAppSelector } from "./redux";
import { useNotify } from "./useNotify";
import { useObserver } from "./useObserver";

interface UseCollectionParams
{
    entities:any;
    appendPage:Function;
    getContentCB:Function;
    getContentParams?:any;
    parentEntity?:any;
    filtersProps?:any;
}

const initialFilters = {
    search: "",
    createdAt: "",
    limit: 5,
    orderBy: "createdAt",
    orderDirection: "desc",
};

export const useCollection= ({entities,appendPage,getContentCB,getContentParams,parentEntity,filtersProps}:UseCollectionParams) =>
{
    const dispatch = useAppDispatch();

    
    const [filters, setFilters] = useState({...initialFilters,...filtersProps});
    const [isMore,setIsMore] = useState(false);

    const getContentResult = getContentCB({...getContentParams,filters},{refetchOnMountOrArgChange:false});

    const setIninitialFilters = () =>
    {
        setIsMore(false);
        setFilters((p:any) => {return {...initialFilters,...filtersProps}});
    }

    const loadMoreHandler =  () =>
	{
        setFilters((p:any) => {return {...p,createdAt: entities[entities?.length-1]?.createdAt }});
	}

    useEffect(()=>
    {
		getContentResult.refetch();
    },[filters])
  
	useNotify(getContentResult,undefined,() => 
	{
		const {rows,count} = getContentResult.data;

		setIsMore((previous:any) => count > filters.limit);

        if(parentEntity)
        {
            dispatch(appendPage({parentId:parentEntity.id,data:rows}));
        }
        else
        {
            dispatch(appendPage(rows));
        }

	},'Some error occured on server');


    return {filters,isMore, setFilters,getContentResult,loadMoreHandler,initialFilters,setIninitialFilters};
}



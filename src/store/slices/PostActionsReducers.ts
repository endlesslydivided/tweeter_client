//Post likes count reducers

export const incrementLikes = (state:any,action:any) =>{
    const id = action.payload;
    return state.map((c:any) => c.id === id ? {...c,counts:{...c.counts,likesCount: (Number.parseInt(c.counts.likesCount) + 1).toString()}}: c);
};
export const decrementLikes = (state:any,action:any) =>{
    const id = action.payload;
    return state.map((c:any) => c.id === id ? {...c,"counts":{...c.counts,likesCount: (Number.parseInt(c.counts.likesCount) - 1).toString()}}: c);
};

//Post saves count reducers
export const incrementSaves = (state:any,action:any) =>{
    const id = action.payload;
    return state.map((c:any) => c.id === id ? {...c,counts:{...c.counts,savesCount: (Number.parseInt(c.counts.savesCount) + 1).toString()}}: c);
};
export const decrementSaves = (state:any,action:any) =>{
    const id = action.payload;
    return state.map((c:any) => c.id === id ? {...c,counts:{...c.counts,savesCount: (Number.parseInt(c.counts.savesCount) - 1).toString()}}: c);
};

//Post retweets count reducers

export const incrementRetweets = (state:any,action:any) =>{
    const id = action.payload;
    state =  state.map((c:any) => c.id === id ? {...c,counts:{...c.counts,retweetsCount: (Number.parseInt(c.counts.retweetsCount) + 1).toString()}}: c);
    state =  state.map((c:any) => c.parentRecord?.id === id ? 
    {
        ...c,parentRecord:
        {
            ...c.parentRecord,
            counts:{...c.parentRecord.counts,retweetsCount: (Number.parseInt(c.parentRecord.counts.retweetsCount) + 1).toString()}
        }
    }: c);
    return state;

};
export const decrementRetweets = (state:any,action:any) =>{
    const id = action.payload;
    state =  state.map((c:any) => c.id === id ? {...c,counts:{...c.counts,retweetsCount: (Number.parseInt(c.counts.retweetsCount) - 1).toString()}}: c);
    state =  state.map((c:any) => c.parentRecord?.id === id ? 
    {
        ...c,parentRecord:
        {
            ...c.parentRecord,
            counts:{...c.parentRecord.counts,retweetsCount: (Number.parseInt(c.parentRecord.counts.retweetsCount) - 1).toString()}
        }
    }: c);
    return state;
};

//Post comments count reducers

export const incrementComments = (state:any,action:any) =>{
    const id = action.payload;
    return state.map((c:any) => c.id === id ? {...c,counts:{...c.counts,commentsCount: (Number.parseInt(c.counts.commentsCount) + 1).toString()}}: c);
};
export const decrementComments = (state:any,action:any) =>{
    const id = action.payload;
    return state.map((c:any) => c.id === id ? {...c,counts:{...c.counts,commentsCount: (Number.parseInt(c.counts.commentsCount) - 1).toString()}}: c);
};

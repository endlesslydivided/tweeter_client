//Comment likes count reducers

export const incrementLikes = (state:any,action:any) =>{
    const {parentId,id} = action.payload;
    state[parentId]= state[parentId].map((c:any) => c.id === id ? {...c,counts:{...c.counts,likesCount: (Number.parseInt(c.counts.likesCount) + 1).toString()}}: c);
    return state;
};
export const decrementLikes = (state:any,action:any) =>{
    const {parentId,id} = action.payload;
    state[parentId]= state[parentId].map((c:any) => c.id === id ? {...c,"counts":{...c.counts,likesCount: (Number.parseInt(c.counts.likesCount) - 1).toString()}}: c);
    return state;
};

//Comment saves count reducers
export const incrementSaves = (state:any,action:any) =>{
    const {parentId,id} = action.payload;
    state[parentId]= state[parentId].map((c:any) => c.id === id ? {...c,counts:{...c.counts,savesCount: (Number.parseInt(c.counts.savesCount) + 1).toString()}}: c);
    return state;
};
export const decrementSaves = (state:any,action:any) =>{
    const {parentId,id} = action.payload;
    state[parentId]= state[parentId].map((c:any) => c.id === id ? {...c,counts:{...c.counts,savesCount: (Number.parseInt(c.counts.savesCount) - 1).toString()}}: c);
    return state;
};

//Comment retweets count reducers

export const incrementRetweets = (state:any,action:any) =>{
    const {parentId,id} = action.payload;
    state[parentId]= state[parentId].map((c:any) => c.id === id ? {...c,counts:{...c.counts,retweetsCount: (Number.parseInt(c.counts.retweetsCount) + 1).toString()}}: c);
    return state;
};
export const decrementRetweets = (state:any,action:any) =>{
    const {parentId,id} = action.payload;
    state[parentId]= state[parentId].map((c:any) => c.id === id ? {...c,counts:{...c.counts,retweetsCount: (Number.parseInt(c.counts.retweetsCount) - 1).toString()}}: c);
    return state;
};

//Comment comments count reducers

export const incrementComments = (state:any,action:any) =>{
    const {parentId,id} = action.payload;
    state[parentId]= state[parentId].map((c:any) => c.id === id ? {...c,counts:{...c.counts,commentsCount: (Number.parseInt(c.counts.commentsCount) + 1).toString()}}: c);
    return state;
};
export const decrementComments = (state:any,action:any) =>{
    const {parentId,id} = action.payload;
    state[parentId]= state[parentId].map((c:any) => c.id === id ? {...c,counts:{...c.counts,commentsCount: (Number.parseInt(c.counts.commentsCount) - 1).toString()}}: c);
    return state;
};

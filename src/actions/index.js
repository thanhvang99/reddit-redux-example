export const REQUEST_POSTS = "REQUEST_POSTS";
export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const INVALIDATE_SUBREDDIT = "INVALIDATE_SUBREDDIT";
export const SELECT_SUBREDDIT = "SELECT_SUBREDDIT";

export const selectSubreddit = (subreddit) => {
    return {
        type: SELECT_SUBREDDIT,
        subreddit
    }
}

export const invalidateSubreddit = (subreddit) => {
    return {
        type: INVALIDATE_SUBREDDIT,
        subreddit
    }
}
export const requestPosts = (subreddit) => {
    return {
        type: REQUEST_POSTS,
        subreddit
    }
}

const receivePosts = (subreddit,json) => {
    return {
        type: RECEIVE_POSTS,
        subreddit,
        json,
        receiveAt: Date.now()
    }
}
const fetchPosts = (subreddit) => {
    return dispatch => {
        dispatch(requestPosts(subreddit));
        return fetch(`https://www.reddit.com/r/${subreddit}.json`)
            .then( res => res.json() )
            .then(json => dispatch(receivePosts(subreddit,json)))
    }
}
const shouldFetchPosts = (state,subreddit) =>{
    const posts = state.postsBySubreddit[subreddit]
    if (!posts){
        return true
    }else if(posts.isFetching){
        return false
    }else{
        return posts.didInvalidate
    }
}

export const fetchPostsIfNeeded = (subreddit) => {
    return (dispatch,getState) => {
        if ( shouldFetchPosts(getState(),subreddit) ){
            return dispatch(fetchPosts(subreddit));
        }
    }
}

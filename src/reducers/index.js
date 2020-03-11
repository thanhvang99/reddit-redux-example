import {combineReducers} from 'redux';
import {
    SELECT_SUBREDDIT,
    REQUEST_POSTS,
    RECEIVE_POSTS,
    INVALIDATE_SUBREDDIT
} from '../actions/index'

const selectedSubreddit = (state="reactjs",action) => {
    switch (action.type){
        case SELECT_SUBREDDIT:
            return action.subreddit;
        default:
            return state;
    }
}

const postsBySubreddit = (state={},action) => {
    switch (action.type){
        case RECEIVE_POSTS:
        case REQUEST_POSTS:
        case INVALIDATE_SUBREDDIT:
            return Object.assign(
                {},state,{[action.subreddit]: posts(state[action.subreddit],action)}
            )
        default:
            return state
    }
}

const posts = (state={
    didInvalidate: false,
    isFetching: false,
    items: [],
},action) => {
    switch(action.type){
        case REQUEST_POSTS:
            return Object.assign({},state,{
                didInvalidate: false,
                isFetching: true
            })
        case INVALIDATE_SUBREDDIT:
            return Object.assign({},state,{
                didInvalidate: true
            })
        case RECEIVE_POSTS:
            return Object.assign({},state,{
                items: action.json.data.children.map( item => item.data.title ),
                lastUpdated: action.receiveAt,
                isFetching: false,
                didInvalidate: false
            })
        default:
            return state
    }
}

export default combineReducers({selectedSubreddit,postsBySubreddit});

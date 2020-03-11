import React, { Component } from "react";
import { connect } from "react-redux";
import {
    fetchPostsIfNeeded,
    selectSubreddit,
    invalidateSubreddit
} from "../actions/index";
import Picker from "../components/Picker";
import Post from "../components/Post";

class App extends Component {
    componentDidMount() {
        const { dispatch, selectedSubreddit } = this.props;
        dispatch(fetchPostsIfNeeded(selectedSubreddit));
    }

    handleChange(nextSubreddit) {
        const { dispatch } = this.props;
        dispatch(selectSubreddit(nextSubreddit));
        dispatch(fetchPostsIfNeeded(nextSubreddit));
    }
    onClick(e) {
        const { dispatch, selectedSubreddit } = this.props;
        e.preventDefault();
        dispatch(invalidateSubreddit(selectedSubreddit));
        dispatch(fetchPostsIfNeeded(selectedSubreddit));
    }

    render() {
        const { isFetching, posts, lastUpdated, selectedSubreddit } = this.props;
        return (
            <div>
                <Picker
                    value={selectedSubreddit}
                    options={["reactjs", "frontend"]}
                    onChange={this.handleChange.bind(this)}
                />
                <p>
                    {lastUpdated && (
                        <span>
                            Last updated at {new Date(lastUpdated).toLocaleString()}.{" "}
                        </span>
                    )}
                </p>

                {!isFetching && (
                    <button onClick={this.onClick.bind(this)}>refresh</button>
                )}
                {isFetching && posts.length == 0 && <h2>loading...</h2>}
                {!isFetching && posts.length == 0 && <h3>Empty...</h3>}
                {posts.length > 0 && (
                    <div style={{ opacity: isFetching ? 0.5 : 1 }}>
                        <ul>
                            {posts.map((post, index) => (
                                <Post key={index} title={post} />
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { selectedSubreddit, postsBySubreddit } = state;
    const { isFetching, lastUpdated, items: posts } = postsBySubreddit[
        selectedSubreddit
    ] || {
        isFetching: true,
        items: []
    };
    return {
        selectedSubreddit,
        isFetching,
        lastUpdated,
        posts
    };
};

const AppContainer = connect(mapStateToProps)(App);

export default AppContainer;

import {Provider} from 'react-redux';
import configureStore from '../stores/configureStore';
import React,{Component} from 'react';
import AppContainer from './AppContainer';

const store = configureStore();

export default class Root extends Component{
    render(){
        return(
            <Provider store={store} >
                <AppContainer />
            </Provider>
        )
    }
}

/**
 * Created by Dennis on 29.04.2016.
 */

import React, {
    Action
} from 'react-native';

//import type{Action} from '../actions/types';

//first Load
const initalState = {
    isLoggedIn: false,
    id: null,
    name: null,
    password: null
};

function user(state: State = inititalState, action: Action): State {
    if (action.type === 'LOGGED_IN') {
        let {id, name, password = action.date};
            return {
                isLoggedIn: true,
                id,
                name,
                password
            };
    }
    if (action.type === 'LOGGED_OUT') {
        return initalState;
    }
    return state;
}

module.exports = user;
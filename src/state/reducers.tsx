import { combineReducers } from "redux";

import fields from './reducers/fieldReducers';

const root = combineReducers({
    fields,
});

export default root;
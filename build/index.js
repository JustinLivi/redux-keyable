"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// TypeScript Version: 3.2
var lodash_1 = require("lodash");
exports.createActionCreator = function (actionCreator) { return actionCreator; };
exports.createKeyableReducer = function (type, reducer) { return ({
    reducer: reducer,
    type: type
}); };
exports.combineKeyableReducers = function (defaultState) { return function () {
    var keyableReducers = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        keyableReducers[_i] = arguments[_i];
    }
    return function (baseState, action) {
        if (baseState === void 0) { baseState = defaultState; }
        var newState = baseState;
        lodash_1.mapValues(keyableReducers, function (reducer) {
            if (reducer.type === action.type) {
                newState = reducer.reducer(newState, action);
            }
        });
        return newState;
    };
}; };
//# sourceMappingURL=index.js.map
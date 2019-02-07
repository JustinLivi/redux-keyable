"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// TypeScript Version: 3.2
var immer_1 = __importDefault(require("immer"));
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
                // tslint:disable-next-line:no-object-literal-type-assertion
                newState = __assign({}, immer_1.default(newState, function (state) {
                    return reducer.reducer(state, action);
                }));
            }
        });
        return newState;
    };
}; };
//# sourceMappingURL=index.js.map
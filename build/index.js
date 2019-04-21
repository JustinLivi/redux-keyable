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
Object.defineProperty(exports, "__esModule", { value: true });
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
    var defaultAccumulator = {};
    var reducerMap = lodash_1.reduce(keyableReducers, function (accumulator, _a) {
        var type = _a.type, reducer = _a.reducer;
        var _b, _c;
        return !lodash_1.isArray(accumulator[type])
            ? __assign({}, accumulator, (_b = {}, _b[type] = [reducer], _b)) : __assign({}, accumulator, (_c = {}, _c[type] = lodash_1.union(accumulator[type], [reducer]), _c));
    }, defaultAccumulator);
    return function (baseState, action) {
        if (baseState === void 0) { baseState = defaultState; }
        var newState = baseState;
        var keyedReducers = reducerMap[action.type];
        if (lodash_1.isArray(keyedReducers)) {
            lodash_1.forEach(keyedReducers, function (reducer) {
                newState = reducer(newState, action);
            });
        }
        return newState;
    };
}; };
//# sourceMappingURL=index.js.map
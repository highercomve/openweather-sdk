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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var mapTypeOfQuery = {
    city: function (q) { return ({ q: q.country ? q.city + "," + q.country : "" + q.city }); },
    id: function (q) { return ({ id: q.id }); },
    geographic: function (q) { return ({ lat: q.lat, lon: q.lon }); },
    zip: function (q) { return ({ zip: q.country ? q.zip + "," + q.country : "" + q.zip }); },
    default: function (q) { return q; }
};
var BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
function getWeather(params) {
    if (params === void 0) { params = {}; }
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (Object.keys(params).length <= 0) {
                throw new Error('Params can not be empty');
            }
            return [2 /*return*/, axios_1.default({
                    method: 'GET',
                    url: BASE_URL,
                    params: params
                }).then(function (response) { return response.data; })];
        });
    });
}
exports.getWeather = getWeather;
function getWeatherBy(type, payload, apiKey) {
    return __awaiter(this, void 0, void 0, function () {
        var params, payloadWithAppId;
        return __generator(this, function (_a) {
            params = mapTypeOfQuery[type] || mapTypeOfQuery['default'];
            payloadWithAppId = __assign({ appid: apiKey || payload.appid, units: 'metric' }, params(payload));
            return [2 /*return*/, getWeather(payloadWithAppId)];
        });
    });
}
exports.getWeatherBy = getWeatherBy;
function getAllWeatherBy(type, payload, apiKey) {
    if (apiKey === void 0) { apiKey = process.env.API_KEY; }
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            return [2 /*return*/, Promise.all(payload.map(function (p) { return __awaiter(_this, void 0, void 0, function () {
                    var data;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, getWeatherBy(type, p, apiKey)];
                            case 1:
                                data = _a.sent();
                                return [2 /*return*/, {
                                        name: p.name,
                                        data: data
                                    }];
                        }
                    });
                }); }))];
        });
    });
}
exports.getAllWeatherBy = getAllWeatherBy;
function parseArgsToType(args) {
    switch (true) {
        case Boolean(args.zip):
            return 'zip';
        case Boolean(args.lat && args.lon):
            return 'geographic';
        case Boolean(args.id):
            return 'id';
        case Boolean(args.city):
            return 'city';
        default:
            throw new Error('You need to pass at least one of these paramaters zip|geographic|id|city');
    }
}
exports.parseArgsToType = parseArgsToType;

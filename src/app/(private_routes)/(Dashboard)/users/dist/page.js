"use client";
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
exports.__esModule = true;
var react_1 = require("react");
var material_1 = require("@mui/material");
var BaseCard_1 = require("@/app/(private_routes)/(Dashboard)/components/shared/BaseCard");
var material_2 = require("@mui/material");
var axios_1 = require("axios");
// const users = [
//     {
//         id: "1",
//         name: "Sunil Joshi",
//         email: "admin@gmail.com",
//         type: "Admin",
//     },
//     {
//         id: "2",
//         name: "Andrew McDownland",
//         email: "pateint@gmail.com",
//         type: "Patient",
//     },
//     {
//         id: "3",
//         name: "Christopher Jamil",
//         email: "pateint@gmail.com",
//         type: "Patient",
//     },
//     {
//         id: "4",
//         name: "Nirav Joshi",
//         email: "doctor@gmail.com",
//         type: "Doctor",
//     },
// ];
var Users = function () {
    var _a = react_1.useState([]), users = _a[0], setUsers = _a[1];
    react_1.useEffect(function () {
        var fetchData = function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1["default"].get('/api/users')];
                    case 1:
                        response = _a.sent();
                        setUsers(response.data.data);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error('Error fetching users:', error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        fetchData();
    }, []);
    return (react_1["default"].createElement(material_1.Grid, { container: true, spacing: 0 },
        react_1["default"].createElement(material_1.Grid, { item: true, xs: 12, lg: 12 },
            react_1["default"].createElement(BaseCard_1["default"], { title: "Users", action: react_1["default"].createElement(material_1.Link, { href: "/users/add" },
                    react_1["default"].createElement(material_2.Button, { variant: "contained", color: "primary", sx: { marginBottom: '5px' } }, "Add User")) },
                react_1["default"].createElement(material_2.TableContainer, { sx: {
                        width: "100%"
                    } },
                    react_1["default"].createElement(material_2.Table, { "aria-label": "simple table", sx: {
                            whiteSpace: "nowrap",
                            mt: 2
                        } },
                        react_1["default"].createElement(material_2.TableHead, null,
                            react_1["default"].createElement(material_2.TableRow, null,
                                react_1["default"].createElement(material_2.TableCell, null,
                                    react_1["default"].createElement(material_2.Typography, { color: "textSecondary", variant: "h6" }, "Name")),
                                react_1["default"].createElement(material_2.TableCell, null,
                                    react_1["default"].createElement(material_2.Typography, { color: "textSecondary", variant: "h6" }, "Email")),
                                react_1["default"].createElement(material_2.TableCell, null,
                                    react_1["default"].createElement(material_2.Typography, { color: "textSecondary", variant: "h6" }, "Type")),
                                react_1["default"].createElement(material_2.TableCell, null,
                                    react_1["default"].createElement(material_2.Typography, { color: "textSecondary", variant: "h6" }, "Age")),
                                react_1["default"].createElement(material_2.TableCell, null,
                                    react_1["default"].createElement(material_2.Typography, { color: "textSecondary", variant: "h6" }, "Gender")))),
                        react_1["default"].createElement(material_2.TableBody, null, users.map(function (user) { return (react_1["default"].createElement(material_2.TableRow, { key: user.id },
                            react_1["default"].createElement(material_2.TableCell, null,
                                react_1["default"].createElement(material_2.Typography, { color: "textSecondary", variant: "h6" }, user.name)),
                            react_1["default"].createElement(material_2.TableCell, null,
                                react_1["default"].createElement(material_2.Typography, { color: "textSecondary", variant: "h6" }, user.email)),
                            react_1["default"].createElement(material_2.TableCell, null,
                                react_1["default"].createElement(material_2.Typography, { variant: "h6" }, user.role)),
                            react_1["default"].createElement(material_2.TableCell, null,
                                react_1["default"].createElement(material_2.Typography, { fontSize: "15px", fontWeight: 500 }, user.age)),
                            react_1["default"].createElement(material_2.TableCell, null,
                                react_1["default"].createElement(material_2.Typography, { fontSize: "15px", fontWeight: 500 }, user.gender)))); }))))))));
};
exports["default"] = Users;

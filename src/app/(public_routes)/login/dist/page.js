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
var image_1 = require("next/image");
var link_1 = require("next/link");
var react_2 = require("react");
var react_3 = require("next-auth/react");
// import { Props } from "next/dist/client/script";
// import { useSession } from "next-auth/react";
// import SignInImage as '../../../public/auth/images/signin-image.jpg';
function Login(props) {
    var _a;
    var _this = this;
    // const session = useSession();
    // console.log(session)
    // if(session.data === null){
    //   console.log("working")
    // }
    var _b = react_2.useState(""), email = _b[0], setEmail = _b[1];
    var _c = react_2.useState(""), password = _c[0], setPassword = _c[1];
    var handleSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var result;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    e.preventDefault();
                    return [4 /*yield*/, react_3.signIn("credentials", {
                            email: email,
                            password: password,
                            redirect: true,
                            callbackUrl: (_a = props.callBackUrl) !== null && _a !== void 0 ? _a : "http://localhost:3000/"
                        })];
                case 1:
                    result = _b.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    return (react_1["default"].createElement("section", { className: "sign-in" },
        react_1["default"].createElement("div", { className: "container" },
            react_1["default"].createElement("div", { className: "signin-content" },
                react_1["default"].createElement("div", { className: "signin-image" },
                    react_1["default"].createElement("figure", null,
                        react_1["default"].createElement(image_1["default"], { src: "/auth/images/signin-image.png", width: 500, height: 500, alt: "Sign Up Project", priority: true })),
                    react_1["default"].createElement(link_1["default"], { href: "/register", style: (_a = {}, _a["color"] = "#ffffff", _a) }, "Doctor Registration")),
                react_1["default"].createElement("div", { className: "signin-form" },
                    react_1["default"].createElement("h2", { className: "form-title" }, "Sign In"),
                    react_1["default"].createElement("form", { onSubmit: handleSubmit, className: "register-form", id: "login-form" },
                        react_1["default"].createElement("div", { className: "form-group" },
                            react_1["default"].createElement("label", { htmlFor: "your_name" },
                                react_1["default"].createElement("i", { className: "zmdi zmdi-account material-icons-name" })),
                            react_1["default"].createElement("input", { type: "text", name: "email", id: "email", placeholder: "Your Email", value: email, onChange: function (e) { return setEmail(e.target.value); } })),
                        react_1["default"].createElement("div", { className: "form-group" },
                            react_1["default"].createElement("label", { htmlFor: "your_pass" },
                                react_1["default"].createElement("i", { className: "zmdi zmdi-lock" })),
                            react_1["default"].createElement("input", { type: "password", name: "your_pass", id: "your_pass", placeholder: "Password", value: password, onChange: function (e) { return setPassword(e.target.value); } })),
                        react_1["default"].createElement("div", { className: "form-group form-button" },
                            react_1["default"].createElement("input", { type: "submit", name: "signin", id: "signin", className: "form-submit", value: "Log in" }))))))));
}
exports["default"] = Login;

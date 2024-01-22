"use client";
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
var material_1 = require("@mui/material");
var BaseCard_1 = require("@/app/(private_routes)/(Dashboard)/components/shared/BaseCard");
var styles_1 = require("@mui/material/styles");
var Select_1 = require("@mui/material/Select");
var react_1 = require("react");
var react_hot_toast_1 = require("react-hot-toast");
// import InputLabel from '@mui/material/InputLabel';
var Item = styles_1.styled(material_1.Paper)(function (_a) {
    var theme = _a.theme;
    return (__assign(__assign({}, theme.typography.body1), { textAlign: "center", color: theme.palette.text.secondary, height: 60, lineHeight: "60px" }));
});
var UserAdd = function () {
    var _a = react_1.useState(), name = _a[0], setName = _a[1];
    var _b = react_1.useState(), email = _b[0], setEmail = _b[1];
    var _c = react_1.useState(), password = _c[0], setPassword = _c[1];
    var _d = react_1.useState('Patient'), role = _d[0], setRole = _d[1];
    var _e = react_1.useState('Male'), gender = _e[0], setGender = _e[1];
    var _f = react_1.useState(), age = _f[0], setAge = _f[1];
    var _g = react_1.useState(null), image = _g[0], setImage = _g[1];
    var handleRoleChange = function (event) {
        setRole(event.target.value);
    };
    var handleGenderChange = function (event) {
        setGender(event.target.value);
    };
    var handleImageChange = function (event) {
        var files = event.target.files;
        if (files && files.length > 0) {
            setImage(files[0]);
        }
    };
    var handleAdd = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var formData, response;
        return __generator(this, function (_a) {
            e.preventDefault();
            console.log("Name:", name);
            console.log("Email:", email);
            console.log("Password:", password);
            console.log("Gender:", gender);
            console.log("Age:", age);
            console.log("Image: ", image);
            formData = new FormData();
            formData.append("name", name);
            formData.append("email", email);
            formData.append("password", password);
            formData.append("gender", gender);
            formData.append("age", age);
            formData.append("image", image);
            try {
                response = fetch('/api/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        password: password,
                        image: image,
                        email: email,
                        age: age,
                        gender: gender,
                        role: role,
                        name: name
                    })
                })
                    .then(function (response) {
                    if (response.ok) {
                        return response.json();
                    }
                    else {
                        throw new Error(response.statusText);
                    }
                })
                    .then(function (responseData) {
                    console.log(responseData);
                    react_hot_toast_1["default"].success('User added successfully');
                })["catch"](function (error) {
                    console.error('Error:', error);
                    // toast.error('Error adding user');
                });
                react_hot_toast_1["default"].promise(response, {
                    loading: 'Adding user...',
                    success: 'User added successfully',
                    error: 'Error adding user'
                });
                // if (response.ok) {
                //   const responseData = await response.json();
                //   console.log(responseData);
                // } else {
                //   console.error('Error:', response.statusText);
                // }
            }
            catch (error) {
                console.error("Error:", error);
            }
            return [2 /*return*/];
        });
    }); };
    return (React.createElement(material_1.Grid, { container: true, spacing: 3 },
        React.createElement(material_1.Grid, { item: true, xs: 12, lg: 12 },
            React.createElement(BaseCard_1["default"], { title: "Add User" },
                React.createElement(React.Fragment, null,
                    React.createElement(material_1.Stack, { spacing: 3 },
                        React.createElement(material_1.TextField, { id: "name-basic", label: "Name", variant: "outlined", value: name, onChange: function (e) { return setName(e.target.value); } }),
                        React.createElement(material_1.TextField, { id: "email-basic", label: "Email", variant: "outlined", value: email, onChange: function (e) { return setEmail(e.target.value); } }),
                        React.createElement(material_1.TextField, { id: "age-basic", label: "Age", variant: "outlined", type: "number", value: age, onChange: function (e) { return setAge(e.target.value); } }),
                        React.createElement(material_1.TextField, { id: "pass-basic", label: "Password", type: "password", variant: "outlined", value: password, onChange: function (e) { return setPassword(e.target.value); } }),
                        React.createElement(material_1.FormControl, { variant: "outlined" },
                            React.createElement(material_1.InputLabel, { id: "role-label" }, "Role"),
                            React.createElement(Select_1["default"], { label: "Role", value: role, onChange: handleRoleChange },
                                React.createElement(material_1.MenuItem, { value: 'Patient' }, "Patient"),
                                React.createElement(material_1.MenuItem, { value: 'Doctor' }, "Doctor"),
                                React.createElement(material_1.MenuItem, { value: 'Admin' }, "Admin"))),
                        React.createElement(material_1.FormControl, null,
                            React.createElement(material_1.FormLabel, { id: "demo-radio-buttons-group-label" }, "Gender"),
                            React.createElement(material_1.RadioGroup, { "aria-labelledby": "demo-radio-buttons-group-label", defaultValue: gender, name: "radio-buttons-group", onChange: handleGenderChange },
                                React.createElement(material_1.FormControlLabel, { value: "Female", control: React.createElement(material_1.Radio, null), label: "Female" }),
                                React.createElement(material_1.FormControlLabel, { value: "Male", control: React.createElement(material_1.Radio, null), label: "Male" }))),
                        React.createElement(material_1.FormControl, null,
                            React.createElement(material_1.InputLabel, { shrink: true, htmlFor: "file-input" }, "Image"),
                            React.createElement(material_1.Input, { id: "file-input", type: "file", onChange: handleImageChange }))),
                    React.createElement("br", null),
                    React.createElement(material_1.Button, { variant: "contained", color: "primary", sx: { marginBottom: "5px" }, onClick: handleAdd }, "Add"))))));
};
exports["default"] = UserAdd;

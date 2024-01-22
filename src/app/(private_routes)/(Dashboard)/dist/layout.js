"use client";
"use strict";
exports.__esModule = true;
var material_1 = require("@mui/material");
var react_1 = require("react");
var Header_1 = require("@/app/(private_routes)/(Dashboard)/layout/header/Header");
var Sidebar_1 = require("@/app/(private_routes)/(Dashboard)/layout/sidebar/Sidebar");
var page_1 = require("./layout/footer/page");
var MainWrapper = material_1.styled("div")(function () { return ({
    display: "flex",
    minHeight: "100vh",
    width: "100%"
}); });
var PageWrapper = material_1.styled("div")(function () { return ({
    display: "flex",
    flexGrow: 1,
    paddingBottom: "60px",
    flexDirection: "column",
    zIndex: 1,
    backgroundColor: "transparent"
}); });
function RootLayout(_a) {
    var children = _a.children;
    var _b = react_1.useState(true), isSidebarOpen = _b[0], setSidebarOpen = _b[1];
    var _c = react_1.useState(false), isMobileSidebarOpen = _c[0], setMobileSidebarOpen = _c[1];
    return (react_1["default"].createElement(MainWrapper, { className: "mainwrapper" },
        react_1["default"].createElement(Sidebar_1["default"], { isSidebarOpen: isSidebarOpen, isMobileSidebarOpen: isMobileSidebarOpen, onSidebarClose: function () { return setMobileSidebarOpen(false); } }),
        react_1["default"].createElement(PageWrapper, { className: "page-wrapper" },
            react_1["default"].createElement(Header_1["default"], { toggleMobileSidebar: function () { return setMobileSidebarOpen(true); } }),
            react_1["default"].createElement(material_1.Container, { sx: {
                    paddingTop: "20px",
                    maxWidth: "1200px"
                } },
                react_1["default"].createElement(material_1.Box, { sx: { minHeight: "calc(100vh - 170px)" } }, children),
                react_1["default"].createElement(page_1["default"], null)))));
}
exports["default"] = RootLayout;

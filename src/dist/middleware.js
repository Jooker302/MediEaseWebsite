"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
exports.config = void 0;
var middleware_1 = require("next-auth/middleware");
__createBinding(exports, middleware_1, "default");
// console.log("middlewale");
exports.config = {
    matcher: ["/Dashboard", "/"]
};
// import { withAuth } from 'next-auth/middleware'
// export default withAuth({
//     callbacks: {
//         authorized: ({ req, token }) => {
//             if (req.nextUrl.pathname === '/') {
//                 return token?.role === 'Admin' ;
//             } 
//             return Boolean(token)
//         }
//     }
// })
// export const config = { matcher: ['/'] }

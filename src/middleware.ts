export { default } from "next-auth/middleware"
// console.log("middlewale");
export const config = {
    matcher: ["/Dashboard", "/", "/users","/users/add"]
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
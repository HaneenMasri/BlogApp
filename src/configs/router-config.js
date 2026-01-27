// // src/configs/router-config.js
// export const ROUTE_PATHS = {
//   HOME: '/',
//   ADD_BLOG: '/add-blog',
//   EDIT_BLOG: '/edit-blog/:id', 
// };

// export const PAGE_TITLES = {
//   HOME: 'Home',
//   ADD_BLOG: 'Add New Blog',
//   EDIT_BLOG: 'Edit Blog',
// };
//src/configs/router-config.js
import { createBrowserRouter } from "react-router-dom";
import routes from "../routes";

const router = createBrowserRouter(routes);

export default router;

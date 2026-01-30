// src/routes.jsx
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import AddEditBlog from "./pages/AddEditBlog";
import { homeLoader, editBlogLoader } from "./loaders/blogLoaders";

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, 
        element: <Home />,
         loader: homeLoader },
      { path: "blog/new", element: <AddEditBlog /> },        
      { path: "blog/:id/edit", element: <AddEditBlog />, loader: editBlogLoader }, 
    ],
  },
];

export default routes;
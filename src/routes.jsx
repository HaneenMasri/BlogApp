import Layout from './pages/Layout/Layout';
import Home from './pages/Home/Home';
import AddEditBlog from "./pages/AddEditBlog/AddEditBlog";

export const routes = [
  {
    path: "/",
    element: <Layout />, 
    children: [
      {
        index: true,
        element: <Home />,
loader: async () => {
  const saved = JSON.parse(localStorage.getItem('blogs') || "[]");
  return [...saved];
}
         },
      {
        path: "add-blog",
        element: <AddEditBlog />,
      },
      {
        path: "edit-blog/:id",
        element: <AddEditBlog />,
      },
    ],
  },
];
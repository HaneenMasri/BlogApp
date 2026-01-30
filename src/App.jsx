import { RouterProvider } from "react-router-dom";
import router from "./configs/router-config";

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
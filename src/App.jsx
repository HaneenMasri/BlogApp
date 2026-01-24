// src/App.jsx
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux"; 
import { store } from "./store/store";
import { routes } from "./routes";

const router = createBrowserRouter(routes);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
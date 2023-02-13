import { createBrowserRouter } from "react-router-dom";
import * as PageEle from "../pages";

export default createBrowserRouter([
  {
    path: "/",
    element: <PageEle.Home />,
    errorElement: <PageEle.Exception />,
  },
  {
    path: "search/:keywords",
    element: <PageEle.Search />,
    errorElement: <PageEle.Exception />,
  },
]);

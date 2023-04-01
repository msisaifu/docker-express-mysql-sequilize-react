import { routerType } from "../types/router.types";
import Home from "./Home";
import Board from "./Board";

const pagesData: routerType[] = [
  {
    path: "",
    element: <Home />,
    title: "home",
  },
  {
    path: "/boards",
    element: <Board />,
    title: "board",
  },
];

export default pagesData;

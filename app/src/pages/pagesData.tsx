import { routerType } from "../types/router.types";
import Home from "./Home";
import Board from "./Board";
import { useContext } from "react";
import AuthContext from "../auth/AuthContext";
import { Navigate } from "react-router-dom";
type Props = {
  children: any;
};
const ProtectedRoute = ({ children }: Props) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const AuthRoute = ({ children }: Props) => {
  const { user } = useContext(AuthContext);

  if (user) {
    return <Navigate to="/boards" replace />;
  }

  return children;
};

const BoardElem = (
  <ProtectedRoute>
    <Board />
  </ProtectedRoute>
);

const HomeElem = (
  <AuthRoute>
    <Home />
  </AuthRoute>
);

const pagesData: routerType[] = [
  {
    path: "/",
    element: HomeElem,
    title: "home",
  },
  {
    path: "/boards",
    element: BoardElem,
    title: "board",
  },
];

export default pagesData;

import { BrowserRouter } from "react-router-dom";
import Router from "./pages/router";
import AuthProvider from "./auth/AuthProvider";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

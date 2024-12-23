import { Navigate, Route, Routes } from "react-router";
import Layout from "./layouts/layout";
import { BrowserRouter } from "react-router-dom";
import Register from "./pages/register";
import SignIn from "./pages/sign-in";

function App() {
  return (
    <BrowserRouter>
      {/* <Router> */}
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <h1>Home</h1>
            </Layout>
          }
        />
        <Route
          path="/search"
          element={
            <Layout>
              <h1>Search</h1>
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />

        <Route
          path="/sign-in"
          element={
            <Layout>
              <SignIn />
            </Layout>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <h1>All other</h1>
      {/* </Router> */}
    </BrowserRouter>
  );
}

export default App;

import { Navigate, Route, Routes } from "react-router";
import Layout from "./layouts/layout";
import { BrowserRouter } from "react-router-dom";
import Register from "./pages/register";
import SignIn from "./pages/sign-in";
import AddHotel from "./pages/add-hotel";
import { useAppContext } from "./context/app-context";
import MyHotels from "./pages/my-hotels";
import EditHotel from "./pages/edit-hotel";

function App() {
  const { isLogged } = useAppContext();
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

        {isLogged && (
          <Route
            path="/my-hotels"
            element={
              <Layout>
                <MyHotels />
              </Layout>
            }
          />
        )}

        {isLogged && (
          <Route
            path="/add-hotel"
            element={
              <Layout>
                <AddHotel />
              </Layout>
            }
          />
        )}

        {isLogged && (
          <Route
            path="/edit-hotel/:id"
            element={
              <Layout>
                <EditHotel />
              </Layout>
            }
          />
        )}

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      {/* </Router> */}
    </BrowserRouter>
  );
}

export default App;

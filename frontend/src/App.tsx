import { Navigate, Route, Routes } from "react-router";
import Layout from "./layouts/layout";
import { BrowserRouter } from "react-router-dom";
import Register from "./pages/register";
import SignIn from "./pages/sign-in";
import AddHotel from "./pages/add-hotel";
import { useAppContext } from "./context/app-context";
import MyHotels from "./pages/my-hotels";
import EditHotel from "./pages/edit-hotel";
import Search from "./pages/search";
import Detail from "./pages/detail";
import Booking from "./pages/booking";
import MyBookings from "./pages/my-bookings";

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
              <h1 className="text-center">Home</h1>
            </Layout>
          }
        />
        <Route
          path="/search"
          element={
            <Layout>
              <h1>Search</h1>
              <Search />
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

        <Route
          path="/detail/:hotelId"
          element={
            <Layout>
              <Detail />
            </Layout>
          }
        />

        {isLogged && (
          <Route
            path="/hotel/:hotelId/booking"
            element={
              <Layout>
                <Booking />
              </Layout>
            }
          />
        )}
        {isLogged && (
          <Route
            path="/my-bookings"
            element={
              <Layout>
                <MyBookings />
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

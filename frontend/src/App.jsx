import "./App.css";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";

import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import axios from "axios";

import MainPage from "./Pages/MainPage/MainPage";
import About from "./Pages/About/About";
import Games from "./Pages/Games/Games";
import Careers from "./Pages/Careers/Careers";
import Publishing from "./Pages/Publishing/Publishing";
import Contact from "./Pages/Contact/Contact";

import AdminLogin from "./Pages/Admin/AdminLogin";
import { useEffect, useState } from "react";

function AuthRedirectRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/auth/verify-token",
          {},
          { withCredentials: true },
        );
        setIsAuthenticated(true);
      } catch (error) {
        console.log("Token verification failed", error);
        setIsAuthenticated(false);
      }
    };
    verifyToken();
  }, []);

  if (isAuthenticated === null) {
    return null;
  }

  return isAuthenticated ? <Navigate to="/admin/posts" replace /> : <Outlet />;
}

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "games",
        element: <Games />,
      },
      {
        path: "careers",
        element: <Careers />,
      },
      {
        path: "publishing",
        element: <Publishing />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AuthRedirectRoute />,
    children: [{ index: true, element: <AdminLogin /> }],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

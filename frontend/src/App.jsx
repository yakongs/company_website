import "./App.css";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";
import AdminNavbar from "./Components/AdminNavbar/AdminNavbar";

import { useEffect, useState } from "react";
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
import SinglePost from "./Pages/SinglePost/SinglePost";
import Publishing from "./Pages/Publishing/Publishing";
import Contact from "./Pages/Contact/Contact";

import AdminLogin from "./Pages/Admin/AdminLogin";
import AdminPosts from "./Pages/Admin/AdminPosts";
import AdminCreatePost from "./Pages/Admin/AdminCreatePost";
import AdminEditPost from "./Pages/Admin/AdminEditPost";
import AdminContacts from "./Pages/Admin/AdminContacts";

function AuthRedirectRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/auth/verify-token`,
          {},
          { withCredentials: true },
        );
        setIsAuthenticated(response.data.isValid);
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

function ProtectedRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/auth/verify-token`,
          {},
          { withCredentials: true },
        );
        setIsAuthenticated(response.data.isValid);
        setUser(response.data.user);
      } catch (error) {
        console.log("Token verification failed", error);
        setIsAuthenticated(false);
        setUser(null);
      }
    };
    verifyToken();
  }, []);

  if (isAuthenticated === null) {
    return null;
  }

  return isAuthenticated ? (
    <Outlet context={{ user }} />
  ) : (
    <Navigate to="/admin" replace />
  );
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

function AdminLayout() {
  return (
    <>
      <AdminNavbar />
      <Outlet />
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
        path: "/post/:id",
        element: <SinglePost />,
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
  {
    path: "/admin",
    element: <ProtectedRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          {
            path: "posts",
            element: <AdminPosts />,
          },
          {
            path: "create-post",
            element: <AdminCreatePost />,
          },
          {
            path: "edit-post/:id",
            element: <AdminEditPost />,
          },
          {
            path: "contacts",
            element: <AdminContacts />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

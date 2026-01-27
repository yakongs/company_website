import "./App.css";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import MainPage from "./Pages/MainPage/MainPage";
import About from "./Pages/About/About";
import Games from "./Pages/Games/Games";
import Careers from "./Pages/Careers/Careers";
import Publishing from "./Pages/Publishing/Publishing";
import Contact from "./Pages/Contact/Contact";

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
        path: "/about",
        element: <About />,
      },
      {
        path: "/games",
        element: <Games />,
      },
      {
        path: "/careers",
        element: <Careers />,
      },
      {
        path: "/publishing",
        element: <Publishing />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

//We have imported createBrowserRouter & RouteProvider from reactRouterDom
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./features/home/pages/Home.jsx";
import Signup from "./features/auth/pages/Signup.jsx";
import Login from "./features/auth/pages/Login.jsx";
import Jobs from "./features/jobs/pages/Jobs.jsx";
import Browse from "./features/jobs/pages/Browse.jsx";
import Profile from "./features/profile/pages/Profile.jsx";
import JobDescription from "./features/jobs/pages/JobDescription.jsx";
import Companies from "./features/admin/company/pages/Companies.jsx";
import CompanyCreate from "./features/admin/company/pages/CompanyCreate.jsx";
import CompanySetup from "./features/admin/company/pages/CompanySetup.jsx";
import AdminJobs from "./features/admin/jobs/pages/AdminJobs.jsx";
import PostJob from "./features/admin/jobs/pages/PostJob.jsx";
import Applicants from "./features/admin/applicants/pages/Applicants.jsx";
import ProtectedRoute from "./app/routes/ProtectedRoute.jsx";

import { ThemeProvider } from "./app/providers/theme-provider.jsx";
// this createBrowserRouter Takes arrays & Learn about a concept of {Outlet} also in reactrouterDom it helps in nested routing
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/jobs",
    element: <Jobs />,
  },
  {
    path: "/description/:id",
    element: <JobDescription />,
  },
  {
    path: "/browse",
    element: <Browse />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },

  //admin ke liye yha se start hoga
  {
    path: "/admin/companies",
    element: (
      <ProtectedRoute>
        <Companies />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/companies/create",
    element: (
      <ProtectedRoute>
        <CompanyCreate />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/companies/:id",
    element: (
      <ProtectedRoute>
        <CompanySetup />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs",
    element: (
      <ProtectedRoute>
        <AdminJobs />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs/create",
    element: (
      <ProtectedRoute>
        <PostJob />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: (
      <ProtectedRoute>
        <Applicants />
      </ProtectedRoute>
    ),
  },
]);
function App() {
  return (
    <>
      {
        // this RouterProvider Component has one condn , ki ye prop leta hai aur bina uske kaam nahi karta
        // aur woh prop hai knha , iss prop ko chahiye router aur uske liye ek aur import kro createBrowserRouter ..
      }
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={appRouter} />
      </ThemeProvider>
    </>
  );
}

export default App;

import {
    createRootRoute,
    createRoute,
    createRouter,
    Navigate
  } from '@tanstack/react-router';
  
  import Cafes from './pages/Cafes';
  import Employees from './pages/Employees';
  import App from './App';
  

// Component to handle redirection from `/` to `/cafes`
const RedirectToCafes = () => {
    return <Navigate to="/cafes" replace />;
  };


  // Root route setup
  const rootRoute = createRootRoute({
    component: App,
    notFoundComponent : RedirectToCafes
  });
  
  
  
  // Route for `/` that redirects to `/cafes`
  const redirectToCafesRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: RedirectToCafes, // Use the RedirectToCafes component for redirection
  });
  
  const cafesRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: 'cafes',
    component: Cafes,
  });
  
  const employeesRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: 'employees',
    component: Employees,
  });
  
  // Set up a Router instance
  const router = createRouter({
    routeTree: rootRoute.addChildren([redirectToCafesRoute, cafesRoute, employeesRoute]),
    defaultPreload: 'intent',
    defaultStaleTime: 5000,
  });
  
  export default router;
  
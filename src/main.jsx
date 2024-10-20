import ReactDOM from 'react-dom/client';
import { RouterProvider } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // TanStack Query
import router from './routes';
import "./index.css"

// Create a TanStack Query client instance
const queryClient = new QueryClient();

// Grab the root element from the DOM
const rootElement = document.getElementById('root');

// Initialize ReactDOM with `createRoot`
const root = ReactDOM.createRoot(rootElement);

// Render the app
root.render(
  <QueryClientProvider client={queryClient}>  {/* Wrap with QueryClientProvider */}
    <RouterProvider router={router} />  {/* Router for TanStack Router */}
  </QueryClientProvider>
);

import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import './styles.css';
import reportWebVitals from './reportWebVitals.ts';

import App from './App.tsx';
import Header from './components/Header.tsx';
import ClassPage from './components/Class.tsx';

const rootRoute = createRootRoute({
  component: () => (
    <div className="min-h-screen bg-white text-black">
      <Header />
      <main className='h-[85vh]'>
        <Outlet />
      </main>
    </div>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: App,
});

const classRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/class/$classCode', // Changed from $classId to $classCode
    component: ClassPage,
});

const routeTree = rootRoute.addChildren([indexRoute, classRoute]);

const router = createRouter({
  routeTree,
  context: {},
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById('app');
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );
}

reportWebVitals();



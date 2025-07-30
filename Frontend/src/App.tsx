import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './Store';
import RootRouter from './Routes/RootRouter';
import './App.css';

const baseName = import.meta.env.VITE_BASE_NAME;

const router = createBrowserRouter(
  createRoutesFromElements(<Route path="*" element={<RootRouter />} />),
  { basename: baseName }
);

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ToastContainer />
        <HelmetProvider>
          <RouterProvider router={router} />
        </HelmetProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;

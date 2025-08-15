import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import router from './router/Routes'
import AuthProvider from './context/auth/AuthProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CartProvider } from './context/cart/CartProvider'
const queryClient = new QueryClient();
import { ReTitleProvider } from 're-title';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReTitleProvider defaultTitle="Holy Care Pharmacy">
        <AuthProvider>
          <CartProvider>
            <RouterProvider router={router}></RouterProvider>
          </CartProvider>
        </AuthProvider>
      </ReTitleProvider>
    </QueryClientProvider>
  </StrictMode>,
)

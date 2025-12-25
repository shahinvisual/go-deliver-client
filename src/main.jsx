import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './Router/Router'
import 'aos/dist/aos.css';
import Aos from 'aos'
import AuthProviders from './context/AuthContext/AuthProviders'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
Aos.init();
const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='urbanist_font_Style max-w-7xl mx-auto'>
      <QueryClientProvider client={queryClient}>
        <AuthProviders>
          <RouterProvider router={router}>
          </RouterProvider>
        </AuthProviders>
      </QueryClientProvider>
    </div>
  </StrictMode>,
)

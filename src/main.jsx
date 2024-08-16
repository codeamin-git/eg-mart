import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  RouterProvider
} from "react-router-dom";
import { router } from './routes/Routes';
import { Toaster } from 'react-hot-toast';
import AuthProvider from './provider/AuthProvider';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='max-w-7xl mx-auto font-poppins border-x border-x-yellow-50'>
    <AuthProvider>
    <RouterProvider router={router} />
    <Toaster />
    </AuthProvider>
    </div>
  </StrictMode>,
)

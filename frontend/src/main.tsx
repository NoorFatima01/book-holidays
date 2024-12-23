import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from 'react-query'
import { AppContextProvider } from './context/app-context.tsx'
import { ToastContainer } from 'react-toastify'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
     retry:0,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <ToastContainer />
        <App />
      </AppContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)

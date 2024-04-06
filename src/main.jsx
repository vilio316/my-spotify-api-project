import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { profileLoader } from './loaders/loaders.js'
import Profile from './components/ProfileLoad.jsx'
import { PersistGate } from 'redux-persist/integration/react'
import { perStore } from './store/store.js'

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
  },
  {
    path: '/home',
    element: <Profile/>,
    loader: () => {
      return profileLoader()
    }
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={routes}>
      <PersistGate persistor={perStore} loading={null}>
    <App />
    </PersistGate>
    </RouterProvider>
  </React.StrictMode>,
)

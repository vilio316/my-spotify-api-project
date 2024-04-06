import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { profileLoader } from './loaders/loaders.js'
import Profile from './components/ProfileLoad.jsx'
import { PersistGate } from 'redux-persist/integration/react'
import { perStore, store } from './store/store.js'
import { Provider } from 'react-redux'

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
    <Provider store={store}>
    <RouterProvider router={routes}>
      <PersistGate persistor={perStore} loading={null}>
    <App />
    </PersistGate>
    </RouterProvider>
    </Provider>
  </React.StrictMode>
)

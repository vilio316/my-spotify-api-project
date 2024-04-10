import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ProfileUI from './components/ProfileLoad.jsx'
import { PersistGate } from 'redux-persist/integration/react'
import { perStore, store } from './store/store.js'
import { Provider } from 'react-redux'
import { Playlist } from './components/PlaylistLoad.jsx'

const routes = createBrowserRouter([
  {
    path: '/home',
    element: <App/>,
  },
  {
    path: '/italawa',
    element: <ProfileUI/>,
  }, {
    path: '/playlists/:playID',
    element: <Playlist/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={perStore} loading={null}>
          <RouterProvider router={routes}/>
    </PersistGate>
    </Provider>
  </React.StrictMode>
)

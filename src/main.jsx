import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ProfileUI from './components/ProfileLoad.jsx'
import { PersistGate } from 'redux-persist/integration/react'
import { perStore, store } from './store/store.js'
import { Provider } from 'react-redux'
import { Playlist } from './components/PlaylistLoad.jsx'
import SongInfo from './components/SongInformation.jsx'

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
  },
  {
    path: '/user-playlists',
    element: <ProfileUI/>,
  }, {
    path: '/playlists/:playID',
    element: <Playlist/>
  }, {
    path: 'song/:songID',
    element : <SongInfo/>
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

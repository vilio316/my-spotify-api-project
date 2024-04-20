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
import { Error } from './components/Error.jsx'
import ArtistData from './components/ArtistInfo.jsx'
import { Album_Info } from './components/Album_Details.jsx'

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    errorElement: <Error/>
  },
  {
    path: '/user-playlists',
    element: <ProfileUI/>,
    errorElement: <Error/>
  }, {
    path: '/playlists/:playID',
    element: <Playlist/>,
    errorElement: <Error/>
  }, {
    path: 'song/:songID',
    element : <SongInfo/>,
    errorElement: <Error/>
  },
  {
    path: 'artists/:artistID',
    element: <ArtistData/>,
    errorElement: <Error/>
  },
  {
    path: 'albums/:ID',
    element: <Album_Info/>,
    errorElement: <Error/>

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

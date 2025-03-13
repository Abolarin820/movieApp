import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './index.css';
import { RouterProvider } from 'react-router-dom';
import {Provider} from 'react-redux'
import router from './routes';
import axios from 'axios'
import { store } from './redux/store';


/*****Axios setup****/

axios.defaults.baseURL="https://api.themoviedb.org/3"
axios.defaults.headers.common['Authorization'] = `Bearer ${import.meta.env.VITE_APP_ACCESS_TOKEN}`

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </StrictMode>,
)

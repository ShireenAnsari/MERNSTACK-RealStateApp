import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store,persistor } from '../src/redux/store.js'
import { Provider } from 'react-redux'
import {Toaster} from 'react-hot-toast'
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <Toaster/>
    <App />
    </PersistGate>
  </Provider>
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import store from './redux/store'
import { Provider } from 'react-redux';
import GlobalStyles from './styles/GlobalStyles'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <GlobalStyles/>
      <App />
    </Provider>
  </React.StrictMode>,
)

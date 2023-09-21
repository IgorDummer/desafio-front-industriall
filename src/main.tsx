import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

/* Pages */
import Home from './routes/Home.tsx';
import Form from './routes/Form.tsx';
import Ata from './routes/Ata.tsx';

/* Rotas da aplicação */
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />, /* Onde ocorre a listagem de Atas */
      },
      {
        path: '/new-meeting-minutes',
        element: <Form />, /* Onde é criada uma nova Ata */
      },
      {
        path: '/ata/:id',
        element: <Ata />, /* Visualização dos dados da Ata */
      }
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

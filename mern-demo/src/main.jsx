import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Form from './Form.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Form />
  </StrictMode>
)

createRoot(document.getElementById('users')).render(
  <StrictMode>
    <UsersList />
  </StrictMode>
)
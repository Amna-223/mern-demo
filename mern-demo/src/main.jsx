import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Form from './Form.jsx'
import Users from './UsersList.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Form />
  </StrictMode>
)

createRoot(document.getElementById('users')).render(
  <StrictMode>
    <Users />
  </StrictMode>
)
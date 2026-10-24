
import React from 'react'
import {Link} from 'react-router-dom'

const NotFound = () => (
  <main className="not-found-page">
    <h2>Page Not Found</h2>
    <p>The page you are looking for does not exist.</p>
    <Link to="/">Go to Home</Link>
  </main>
)

export default NotFound

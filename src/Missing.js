import React from 'react'
import { Link } from 'react-router-dom'
export const Missing = () => {
  return (
    <main className='Missing'>
      <h2>Page Not Found</h2>
      <p>well, that's disappointing.</p>
      <p>
        <Link to="/">Visit Our HomePage</Link>
      </p>
    </main>
  )
}

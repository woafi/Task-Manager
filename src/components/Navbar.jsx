import React from 'react'
import "./Navbar.css"

function Navbar() {
  return (
    <div className='flex justify-between bg-blue-500 text-white items-center'>
      <div className="logo"><span className='logo-text font-bold my-2 text-3xl whitespace-nowrap ml-5 '>Task Manager</span></div>
      <ul className='mx-6 flex my-2'>
        <li className='navWord cursor-pointer hover:font-bold text-center'><a href="https://github.com/woafi/Task-Manager">About Us</a></li>
      </ul>
    </div>
  )
}

export default Navbar
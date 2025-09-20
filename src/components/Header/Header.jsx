import React, { useState } from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FaBars, FaTimes } from 'react-icons/fa'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { name: 'Home', slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ]

  return (
    <header className="py-3 shadow bg-slate-500 text-white">
      <Container>
        <nav className="flex items-center justify-between">
          {/* ✅ Logo */}
          <div>
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>

          {/* ✅ Desktop Menu */}
          <ul className="hidden md:flex items-center space-x-4">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className="px-4 py-2 rounded-full duration-200 hover:bg-blue-600"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>

          {/* ✅ Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </nav>

        {/* ✅ Mobile Menu Dropdown */}
        {isOpen && (
          <div className="md:hidden mt-3 bg-gray-600 rounded-lg shadow-lg">
            <ul className="flex flex-col items-start p-4 space-y-3">
              {navItems.map(
                (item) =>
                  item.active && (
                    <li key={item.name} className="w-full">
                      <button
                        onClick={() => {
                          navigate(item.slug)
                          setIsOpen(false) // close menu on click
                        }}
                        className="w-full text-left px-4 py-2 rounded-lg hover:bg-blue-600 duration-200"
                      >
                        {item.name}
                      </button>
                    </li>
                  )
              )}
              {authStatus && (
                <li className="w-full">
                  <LogoutBtn />
                </li>
              )}
            </ul>
          </div>
        )}
      </Container>
    </header>
  )
}

export default Header

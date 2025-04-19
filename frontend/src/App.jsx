import React from "react"
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import Header from "./components/Header"
import ProtectedRoute from "./components/ProtectedRoute"
import "./styles/global.css"

function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

function Layout({ children }) {
  const location = useLocation()
  const isAuthPage = ['/login', '/register'].includes(location.pathname)

  return (
    <div className="app">
      {!isAuthPage && <Header />}
      <main className={`main-content ${!isAuthPage ? 'with-header' : ''}`}>
        {children}
      </main>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            </Layout>
          }
        />
        <Route
          path="/login"
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />
        <Route
          path="/logout"
          element={
            <Layout>
              <Logout />
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout>
              <RegisterAndLogout />
            </Layout>
          }
        />
        <Route
          path="*"
          element={
            <Layout>
              <NotFound />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
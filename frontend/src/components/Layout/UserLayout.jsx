import Header from '../Common/Header'
import Footer from '../Common/Footer'
import { Outlet } from 'react-router-dom'

const UserLayout = () => {
  return (
    <>
      {/* Header */}
      <Header />
      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center">
      
        <Outlet /> {/* Nested components from app.jsx will render here */}
      </main>
      {/* Footer */}
      <Footer />
    </>
  )
}

export default UserLayout
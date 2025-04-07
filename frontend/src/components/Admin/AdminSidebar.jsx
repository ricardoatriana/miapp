import { Link } from "react-router-dom"

const AdminSidebar = () => {
  return (
    <div className="p-6">
        <div className="mb-6">
            <Link to="/" className="text-2xl font-medium">
            RealEstateCo.
            </Link>
        </div>
        
    </div>
  )
}

export default AdminSidebar
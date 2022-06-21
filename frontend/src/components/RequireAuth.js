import { useLocation, Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const RequireAuth = ({ allowedRoles }) => {
    const location = useLocation()
    const { employee } = useSelector(state => state.auth)

    return (
        // check if employee role exisit in allowedRules
        employee != null
            ? allowedRoles.indexOf(employee.role) > -1
            ? <Outlet />
            : employee
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
            :<Navigate to="/login" state={{ from: location }} replace />

    )
}

export default RequireAuth
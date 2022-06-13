import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <header className='header'>
            <div className="logo">
                <Link to="/">Hppy.</Link>
            </div>
            <ul>
                <Link to="/login">Login</Link>
                <Link to="/employee/add">Add Employee</Link>
            </ul>
        </header>
    )
}

export default Header
import { useState } from "react"

const Login = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const {email, password} = formData

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()
    }

    return <>
        <section>
            <h1>Login</h1>
        </section>

        <section>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email Address:</label>
                    <input type="text" className="form-control" id="email" name="email" value={email} onChange={onChange} placeholder="Enter employee email address" />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" className="form-control" id="password" name="password" value={password} onChange={onChange} placeholder="Enter your password" />
                </div>
                
                <div className="form-group">
                    <button>Submit</button>
                </div>
            </form>
        </section>
    </>
}

export default Login

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
// useSelector to select from global states like company, etc
// useDispatch to dispatch actions like addCompany, etc
import { useSelector, useDispatch } from 'react-redux'
import { addCompany, reset } from "../../features/company/companySlice"
import DepartmentForm from "../department/DepartmentForm"

// MUI


const AddCompany = () => {

    // show/hide department form
    const [deptForm, setDeptForm] = useState(false)
    
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        logo: '',
        deptName: '',
    })

    const { name, description, logo, deptName } = formData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { isLoading, isError, isSuccess, message } = useSelector(state => state.company)

    useEffect(() => {
        if(isError){
            console.log(message)
        }

        // Redirect if logged in
        // if(isSuccess || employee){
        if(isSuccess){
            console.log("Company added!")
            navigate('/app/companies')
        }

        dispatch(reset())
    }, [isError, isSuccess, isLoading, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const showDept = () => {
        setDeptForm(true)
    }
    const hideDept = () => {
        setDeptForm(false)
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const companyData = {
            name,
            description,
            logo,
            deptName,
        }


        dispatch(addCompany(companyData))
    }

    return <>
        <section>
            <h1>Add Company</h1>
        </section>

        <section>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Company Name:</label>
                    <input type="text" className="form-control" id="name" name="name" value={name} onChange={onChange} placeholder="Enter company name" />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input type="text" className="form-control" id="description" name="description" value={description} onChange={onChange} placeholder="Enter description" />
                </div>

                <div className="form-group">
                    <label htmlFor="logo">logo:</label>
                    <input type="text" className="form-control" id="logo" name="logo" value={logo} onChange={onChange} placeholder="Enter company logo" />
                </div>

                {deptForm === false ? <div onClick={showDept}>Add Department</div> : <div onClick={hideDept}>Cancel</div>}
                {deptForm === false ? "" : <DepartmentForm deptName={deptName} onChange={onChange} />}

                <div className="form-group">
                    <button>Submit</button>
                </div>
            </form>
        </section>
    </>
}

export default AddCompany

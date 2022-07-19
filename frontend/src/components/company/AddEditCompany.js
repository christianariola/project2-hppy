import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
// useSelector to select from global states like company, etc
// useDispatch to dispatch actions like addCompany, etc
import { useSelector, useDispatch } from 'react-redux'
import { addCompany, reset } from "../../features/company/companySlice"
import DepartmentsInput from "../department/DepartmentsInput"

const initialState = {
    name: "",
    description: "",
    logo: "",
    departments: [],
}

const AddEditCompany = () => {
    
    const [departments, setDepartments] = useState([])
    
    const [formData, setFormData] = useState(initialState)

    const { name, description, logo } = formData

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

    const handleSelectedDepartments = (items) => {
        setDepartments(items)
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const deptObj = departments.map(function(department) {
            // create a new object to store dept name.
            var newObj = {};
            newObj["deptName"] = department;
    
            // // return our new object.
            return newObj;
        });

        const companyData = {
            name,
            description,
            logo,
            departments: deptObj,
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
                    <input type="text" className="form-control" id="name" name="name" value={name} onChange={onChange} placeholder="Enter company name" required/>
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input type="text" className="form-control" id="description" name="description" value={description} onChange={onChange} placeholder="Enter description" required/>
                </div>

                <div className="form-group">
                    <label htmlFor="logo">logo:</label>
                    <input type="text" className="form-control" id="logo" name="logo" value={logo} onChange={onChange} placeholder="Enter company logo" required/>
                </div>

                <div className="form-group">
                </div>

                <hr />

                <DepartmentsInput
                    selectedDepartments={handleSelectedDepartments}
                    fullWidth
                    variant="outlined"
                    id="departments"
                    name="departments"
                    placeholder="Add Departments"
                    label="Departments"
                />


                <div className="form-group">
                    <button>Submit</button>
                </div>
            </form>
        </section>
    </>
}

export default AddEditCompany

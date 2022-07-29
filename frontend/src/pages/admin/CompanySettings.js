import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
// useSelector to select from global states like company, etc
// useDispatch to dispatch actions like addCompany, etc
import { useSelector, useDispatch } from 'react-redux'
import { getCompany, editCompany, reset } from "../../features/company/companySlice"
import DepartmentsInput from "../../components/department/DepartmentsInput"
import Logo from "../../components/company/Logo"
const initialState = {
    name: "",
    description: "",
    logo: "",
    departments: [],
}

const CompanySettings = () => {

    const { company, isLoading, isError, isSuccess, message } = useSelector(state => state.company)
    const { employee } = useSelector(state => state.auth)

    const [departments, setDepartments] = useState([])
    const [deptData, ] = useState([])
    const [formData, setFormData] = useState(initialState)

    const [, setLogo] = useState("")
    const [image, setImage] = useState("")

    const { name, description } = formData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {

        dispatch(getCompany(employee.company_id))

        setFormData(company)
        company?.departments?.map((item) =>
            deptData.push(item.deptName)
        )
        // company?.departments?.map((item) =>
        // deptData.push(item.deptName)
    // )

    }, [deptData, isSuccess, dispatch])

    useEffect(() => {
        if(isError){
            console.log(message)
        }

        // Redirect if logged in
        // if(isSuccess || employee){
        if(isSuccess){
            console.log("Company updated!")
            console.log(message)
            navigate('/app/company/settings')
        }

        dispatch(reset())
    }, [isError, isSuccess, isLoading, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const previewFiles = (file) => {
        const reader = new FileReader()

        reader.readAsDataURL(file)

        reader.onloadend = () => {
            setImage(reader.result)
        }
    }

    const onFileChange = (e) => {
        const file = e.target.files[0]
        setLogo(file)
        previewFiles(file)
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

        const updatedCompanyData = {
            name,
            description,
            logo: image,
            departments: deptObj,
        }


        const companyId = employee.company_id
        dispatch(editCompany({companyId, updatedCompanyData}))
        navigate('/app/company/settings')
    

    }


    return <>
        <h2>Company Settings</h2>
        {company.name}

        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="name">Company Name:</label>
                <input type="text" className="form-control" id="name" name="name" value={name ? name : ''} onChange={onChange} placeholder="Enter company name" required/>
            </div>

            <div className="form-group">
                <label htmlFor="description">Description:</label>
                <input type="text" className="form-control" id="description" name="description" value={description ? description : ''} onChange={onChange} placeholder="Enter description" required/>
            </div>

            <div className="form-group">
                <label htmlFor="logo">logo:</label>
                <input type="file" className="form-control" id="logo" name="logo" onChange={onFileChange} placeholder="Enter company logo" accept="image/png, image/jpeg, image/jpg, image/jfif"/>
            </div>
            <div className="preview">
                { image ? <img src={image} alt="Preview" style={{width: "200px"}} /> : <Logo logo={company.logo} /> }
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
                deptData={deptData ? deptData : ''}
            />


            <div className="form-group">
                <button>Save</button>
            </div>
        </form>
    </>
}

export default CompanySettings

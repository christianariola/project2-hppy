import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
// useSelector to select from global states like company, etc
// useDispatch to dispatch actions like addCompany, etc
import { useSelector, useDispatch } from 'react-redux'
import { addCompany, editCompany, reset } from "../../features/company/companySlice"
import DepartmentsInput from "../department/DepartmentsInput"
import Logo from "./Logo"

import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import TextField from '@mui/material/TextField'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { Grid } from "@mui/material"

const initialState = {
    name: "",
    description: "",
    logo: "",
    departments: [],
}

const AddEditCompany = () => {

    const [departments, setDepartments] = useState([])
    const [deptData, ] = useState([])
    
    const [formData, setFormData] = useState(initialState)

    const [, setLogo] = useState("")
    const [image, setImage] = useState("")

    const { name, description } = formData

    let { companyId } = useParams(); 

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { isLoading, isError, isSuccess, message, companyList } = useSelector(state => state.company)

    useEffect(() => {
        if(companyId){
            const singleCompany = companyList.find((company) => company._id === companyId)
            setFormData({ ...singleCompany })

            singleCompany.departments.map((item) =>
                deptData.push(item.deptName)
            )
        }
    }, [companyId, companyList, deptData])

    useEffect(() => {
        if(isError){
            console.log(message)
        }

        // Redirect if logged in
        // if(isSuccess || employee){
        if(isSuccess){
            console.log("Company added!")
            console.log("Message", message)
            navigate('/app/companies')
            toast.success(`${name} has been added.`)
        }

        dispatch(reset())
    }, [isError, name, isSuccess, isLoading, message, navigate, dispatch])

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

        if(!companyId) {

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

            dispatch(addCompany(updatedCompanyData))

        } else {

            const sortEntriesByKey = ([a], [b]) => a.localeCompare(b),
            filter = deptData.reduce((r, o) => {
                Object
                    .entries(o)
                    .sort(sortEntriesByKey)
                    .reduce((o, [k, v]) => (o[k] ??= {})[v] ??= {}, r);
                return r;
            }, {});
            const newDept = departments.filter((o) => {
                let f = filter;
                return !Object
                    .entries(o)
                    .sort(sortEntriesByKey)
                    .every(([k, v]) => f = f[k]?.[v]);
            });

            // console.log(deptData)
            // console.log(departments)
            console.log(newDept)

            const filter2 = departments.reduce((r, o) => {
                Object
                    .entries(o)
                    .sort(sortEntriesByKey)
                    .reduce((o, [k, v]) => (o[k] ??= {})[v] ??= {}, r);
                return r;
            }, {});
            const removeOld = deptData.filter((o) => {
                let f = filter2;
                return !Object
                    .entries(o)
                    .sort(sortEntriesByKey)
                    .every(([k, v]) => f = f[k]?.[v]);
            });

            console.log(removeOld)

            const newDeptArr = newDept.map(function(department) {
                // create a new object to store dept name.
                var newObj = {};
                newObj["deptName"] = department;
        
                // // return our new object.
                return newObj;
            });

            const removeOldArr = removeOld.map(function(department) {
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
                newDeptArr: newDeptArr,
                removeOldArr: removeOldArr,
            }

            dispatch(editCompany({companyId, updatedCompanyData}))
            navigate('/app/companies')
            toast.success(`${name} has been updated.`)
        }

    }

    return <>
        <section>
            <h2>{ companyId ? "Edit Company" : "Add Company"}</h2>
        </section>

        <section>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: '2rem'}}>
            <Link underline="hover" component={RouterLink} to={`/app/companies`}>
                Companies
            </Link>
            <Typography>
                { companyId ? "Edit Company" : "Add Company"}
            </Typography>
        </Breadcrumbs>
        </section>

        <section>
            <form onSubmit={onSubmit}>

                <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Company Name"
                name="name"
                autoComplete="name"
                autoFocus
                value={name} 
                onChange={onChange}
                />

                {/* <div className="form-group">
                    <label htmlFor="name">Company Name:</label>
                    <input type="text" className="form-control" id="name" name="name" value={name} onChange={onChange} placeholder="Enter company name" required/>
                </div> */}

                <TextField
                margin="normal"
                required
                fullWidth
                id="description"
                label="Description"
                name="description"
                autoComplete="description"
                autoFocus
                value={description} 
                onChange={onChange}
                />

                {/* <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input type="text" className="form-control" id="description" name="description" value={description} onChange={onChange} placeholder="Enter description" required/>
                </div> */}

                <Button variant="contained" component="label" sx={{backgroundColor: '#003D66', my: 2, mb: 3}}>
                {" "}
                <AddIcon /> Upload company logo
                <input type="file" className="form-control" hidden id="logo" name="logo" onChange={onFileChange} placeholder="Enter company logo" accept="image/png, image/jpeg, image/jpg, image/jfif"/>
                </Button>

                {/* <div className="form-group">
                    <label htmlFor="logo">logo:</label>
                    <input type="file" className="form-control" id="logo" name="logo" onChange={onFileChange} placeholder="Enter company logo" accept="image/png, image/jpeg, image/jpg, image/jfif"/>
                </div> */}
                <div className="preview">
                    { image ? <img src={image} alt="Preview" style={{width: "200px"}} /> : <Logo logo={formData.logo} /> }
                </div>
                <div className="form-group">
                </div>

                <DepartmentsInput
                    selectedDepartments={handleSelectedDepartments}
                    fullWidth
                    variant="outlined"
                    id="departments"
                    name="departments"
                    placeholder="Add Departments"
                    label="Departments"
                    deptData={deptData}
                />

                <Grid container spacing={2} sx={{mt: '1rem', }}>
                    <Grid item xs={12} md={6}>
                        <Button
                        type="submit"
                        variant="contained"
                        sx={{backgroundColor: '#336485', fontSize: '1.2rem', fontWeight: 'bold'}}
                        size="large"
                        fullWidth
                        >
                        { companyId ? "Save" : "Add" }
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Link component={RouterLink} to={`/app/companies`} underline='none'>
                            <Button
                            variant="outlined"
                            sx={{fontSize: '1.2rem', color: '#336485', borderColor: '#336485', fontWeight: 'bold'}}
                            size="large"
                            fullWidth
                            >
                                Cancel
                            </Button>     
                        </Link>
                    </Grid>
                </Grid>
                <div className="form-group">


                </div>
            </form>
        </section>
    </>
}

export default AddEditCompany

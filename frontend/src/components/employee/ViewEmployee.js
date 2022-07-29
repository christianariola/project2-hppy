import { useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import { getCompany, getEmployee } from "../../features/company/companySlice"

const ViewEmployee = () => {

    let { companyId, empId } = useParams(); 
    // console.log(companyId)
    // console.log(empId)
    const dispatch = useDispatch()

    const { employee } = useSelector(state => state.company)

    useEffect(() => {
        if(empId && companyId){
            dispatch(getCompany(companyId))
            dispatch(getEmployee(empId))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [empId, companyId])

    // console.log(employee)
    return <>
        <h2>{employee ? employee.firstName : ''} {employee ? employee.lastName : ''}</h2>
        <p>{employee ? employee.job_title : ''}</p>
        <p>Email: {employee ? employee.email : ''}</p>
        <hr />
        <h3>Company Information</h3>
        <p>Company: {employee ? employee.company_name : ''}</p>
        <p>Department: {employee ? employee.department_name : ''}</p>
        <p>Employee #: {employee ? employee.employeeNumber : ''}</p>
        <p>User Role: {employee ? employee.role : ''}</p>
    </>
}

export default ViewEmployee

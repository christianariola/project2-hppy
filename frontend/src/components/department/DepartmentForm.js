

const DepartmentForm = props => {
    return <>
        <div className="form-group">
            <label htmlFor="deptName">Department Name:</label>
            <input type="text" className="form-control" id="deptName" name="deptName" value={props.deptName} onChange={props.onChange} placeholder="Enter department name" />
            <div onClick={props.addDept}>Add</div>
        </div>
    </>
}

export default DepartmentForm

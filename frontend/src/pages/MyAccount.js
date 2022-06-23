const MyAccount = () => {
    return <>
        <h1>My Account page</h1>
        <p>My Account informtaion is view-only. You cannot edit this informtaion.</p>
        <form>
            <div>
            <label>First Name</label>
            <input type="text"></input>
            <label>Last Name</label>
            <input type="text"></input>
            </div>
            <div>
            <label>Email</label>
            <input type="text"></input>
            <label>Department</label>
            <input type="text"></input>
            </div>
            <div>
            <label>Employee Number</label>
            <input type="text"></input>
            <label>Job Title</label>
            <input type="text"></input>
            </div>
            <button>Logout</button>
        </form>
    </>
}

export default MyAccount
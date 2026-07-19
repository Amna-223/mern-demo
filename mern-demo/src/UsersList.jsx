import {useState} from "react"

const Users = () => {
    const [user, setUser] = useState([])
    const [message, setMessage] = useState('')
    const [delMsg, setDelMsg] = useState('')
    const [updateData, setUpdateData] = useState({
        name: "", email: "", password: "" });
    const [showForm, setShowForm] = useState(false);

    const getUsers = async (event) => {
        const response = await fetch("http://localhost:5000/users" , {
            method: "GET"
        });

        try{
            const data = await response.json();
            console.log(data)
            setUser(data)
        } catch (error) {
            setMessage("Something Went wrong!")
        }
    }

    const updateUser = async (user) => {
        setUpdateData(user);
        setShowForm(true);
    }

    const deleteUser = async (id) => {
        console.log(id)
        const response = await fetch(`http://localhost:5000/users/${id}` , {
            method: "DELETE"
        });

        try{
            const data = await response.json();
            console.log(data)
            const updatedUser = user.filter((u) => u._id !== id)
            setUser(updatedUser)

        } catch (error) {
            setDelMsg("Something Went wrong!")
        }
    }

    const handleUpdateChange = async (event) => {
        setUpdateData({...updateData, [event.target.name]: event.target.value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch(`http://localhost:5000/users/${updateData._id}` , {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updateData)
        });

        const data = await response.text()
        console.log(data)
    }

    return(
        <>
        {showForm && (
            <>
            <h3>Update User</h3>
            <form onSubmit={handleSubmit}>
                <label>Name: </label>
                <input type="text" name="name" value={updateData.name} onChange={handleUpdateChange} required /><br /><br />

                <label>Email: </label>
                <input type="email" name="email" value={updateData.email} onChange={handleUpdateChange} required/><br /><br />

                <label>Password: </label>
                <input type="password" name="password" value={updateData.password}                 onChange={handleUpdateChange} required/><br /><br />

                <button type="submit">Save Changes</button>
            </form>
            </>
        )}
            <div>
                <input type="submit" value="Get All Users" onClick={getUsers}></input>
                <h6>Users Data</h6>
                <ul>
                    {
                        user.map((user, index) => {
                            return (
                                <li key={index}>{user.name}
                                <button onClick={() => updateUser(user)}>Update</button>
                                <button onClick={() => deleteUser(user._id)}>Delete</button>
                                </li>                                
                            )
                        })
                    }
                </ul>
                <p>{message}</p>
            </div>
        </>
    )
}

export default Users
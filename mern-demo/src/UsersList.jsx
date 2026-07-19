import {useState} from "react"

const Users = () => {
    const [user, setUser] = useState([])
    const [message, setMessage] = useState('')
    const [delMsg, setDelMsg] = useState('')

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

    // const updateUser = async (event) => {

    // }

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

    return(
        <>
            <div>
                <input type="submit" value="Get All Users" onClick={getUsers}></input>
                <h6>Users Data</h6>
                <ul>
                    {
                        user.map((user, index) => {
                            return (
                                <li key={index}>{user.name}
                                <button>Update</button>
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
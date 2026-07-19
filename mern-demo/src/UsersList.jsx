import {useState} from "react"

const Users = () => {
    const [user, setUser] = useState([])
    const [message, setMessage] = useState('')

    const getUsers = async (event) => {
        const response = await fetch("http://localhost:5000/users" , {
            method: "GET"
        });

        try{
            const data = await response.json();
            // console.log(data)
            setUser(data)

        } catch (error) {
            setMessage("Something Went wrong!")
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
                                <button type="submit">Update</button>
                                <button type="submit">Delete</button>
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
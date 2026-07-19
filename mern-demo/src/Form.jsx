import './Form.css'
import {useState} from "react"

const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    email: ''
  })

  const handleSubmit = async (event) => {
    event.preventDefault()
    const response = await fetch("http://localhost:5000/submit" , {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json();
    console.log(data);

    setFormData({
      name: "",
      password: "",
      email: "",
    });
  }

  const handleChange = (event) => {
    console.log(event.target.name);
    console.log(event.target.value);
    setFormData({...formData, [event.target.name]: event.target.value});
  }

  return (
    <>
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:   </label>
            <input type="text" id="name" name="name" maxLength={30} onChange={handleChange} value={formData.name} required/><br /><br />

            <label htmlFor="pass">Password:   </label>
            <input type="password" name="password" id="pass" maxLength={8} onChange={handleChange} value={formData.password} required /><br /><br />

            <label htmlFor="email">Email:   </label>
            <input type="email" name="email" id="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" onChange={handleChange} value={formData.email} required /><br /><br />

            <input type="submit" value="Submit" />
        </form>
    </>
  )
}
export default Form
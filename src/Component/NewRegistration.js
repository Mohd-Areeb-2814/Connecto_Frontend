import React,{ useState } from 'react'
import axios from "axios";

const NewRegistration = () => {

    const [formData, setFormData] = useState({
        firstName: "",
        surname: "",
        email: "",
        dateOfBirth: "",
        gender: "",
        password: "",
        confirmpassword: "",
        
    });

    const [formErrors, setFormErrors] = useState({});
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [registrationError, setRegistrationError] = useState("");

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.firstName) errors.firstName = "First Name is required";
        if (!formData.surname) errors.surname = "Last Name is required";
        if (!formData.email) errors.email = "Email is required";
        if (!formData.dateOfBirth) errors.dateOfBirth = "Date of Birth is required";
        if (!formData.gender) errors.gender = "Gender is required";
        if (!formData.password) errors.password = "Password is required";
        if (formData.password !== formData.confirmpassword) {
            errors.confirmpassword = "Passwords do not match";
        }
        return errors;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }
    
        console.log("Submitting data:", formData);
    
        try {
            const response = await axios.post('http://localhost:5000/user-api/v1/users/register', formData);
            setRegistrationSuccess(true);
            setRegistrationError(""); 
            console.log("Registration successful:", response.data);
        } catch (error) {
            console.error("Registration error:", error.response);
            setRegistrationError(error.response?.data?.message || "Registration failed");
            setRegistrationSuccess(false);
        }
    };

  return (
    <>
   
    <h2 style={{textAlign:"center"}}>Create Account</h2>
    <div className="container ">
      <form className="caf">
      <div style={styles.formGroup}>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          style={styles.input}
        />
      
      </div>
      <div style={styles.formGroup}>
        <label htmlFor="surname">Last Name</label>
        <input
          type="text"
          id="surname"
          name="surname"
          value={formData.surname}
          onChange={handleInputChange}
          style={styles.input}
        />
      
      </div>
      <div style={styles.formGroup}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          style={styles.input}
        />
      </div>
      <div style={styles.formGroup}>
        <label htmlFor="dateOfBirth">DOB</label>
        <input
          type="date"
          id="dateOfBirth"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleInputChange}
          style={styles.input}

        />
      <div style={styles.formGroup}>
        <label htmlFor="gender">Gender</label>
        <select
          name="gender"
          id="gender"
          value={formData.gender}
          onChange={handleInputChange}
          style={styles.input}
        >
          <option value="">--select account type--</option>
          <option value="male">male</option>
          <option value="female">female</option>
          <option value="others">others</option>
        </select>
      </div>
      
      
          {/* {formErrors?<p className="text-danger">{formErrors.openingDate}</p>:null} */}
      </div>
      <div style={styles.formGroup}>
        <label htmlFor="email">password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          style={styles.input}
        />
      </div>
      <div style={styles.formGroup}>
        <label htmlFor="email">confirm password</label>
        <input
          type="confirmpassword"
          id="confirmpassword"
          name="confirmpassword"
          value={formData.confirmpassword}
          onChange={handleInputChange}
          style={styles.input}
        />
      </div>
      <button onClick={handleSubmit}  style={styles.button}>
        Create Account
      </button>
      {/* <div style={styles.successMessage}>Details submitted successfully!</div> */}
      </form>
    </div>
   
    </>

  )
}
const styles = {
    container: {
      padding: "20px",
      maxWidth: "500px",
      margin: "0 auto",
      backgroundColor: "#f0f8ff",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    formGroup: {
      marginBottom: "15px",
    },
    input: {
      width: "100%",
      padding: "10px",
      fontSize: "16px",
      borderRadius: "4px",
      border: "1px solid #ccc",
    },
    mobileInputGroup: {
      display: "flex",
    },
    button: {
      width: "100%",
      padding: "10px",
      fontSize: "16px",
      backgroundColor: "#004d00",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
    successMessage: {
      marginTop: "20px",
      padding: "10px",
      backgroundColor: "#d4edda",
      color: "#155724",
      borderRadius: "4px",
      textAlign: "center",
    },
  };

export default NewRegistration

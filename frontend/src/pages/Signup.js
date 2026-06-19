import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "member",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await API.post("/auth/register", form);

    alert("Registered Successfully");

    navigate("/");
  };

  return (
    <div className="container" style={{ border: "2px blue",color:"blue",justifyContent:"center",textAlign:"center",backgroundColor:"lightblue", width:"400px",height:"500px",margin:"auto",marginTop:"100px",borderRadius:"10px" } }>
      <h2 style={{color:"blue"}}>Signup</h2>

      <form onSubmit={handleSubmit}>
        <label style={{color:"blue"}}><b>Name:</b></label><br/> 
        <input
          placeholder="Name"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />
        <br/><br/>  
        <label style={{color:"blue"}}><b>Email:</b></label><br/>    

        <input
          placeholder="Email"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />
        <br/><br/>
        <label style={{color:"blue"}}><b>Password:</b></label><br/> 
        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />
        <br/><br/>
        <label style={{color:"blue"}}><b>Role:</b></label><br/> 
        <select
          onChange={(e) =>
            setForm({ ...form, role: e.target.value })
          }
        >
          <option value="member">Member</option>
          <option value="admin">Admin</option>
        </select>
        <br/><br/>          
        
        <button style={{color:"white",backgroundColor:"blue",width:"80px",height:"30px",borderRadius:"10px"}}   >Signup</button>
      </form>
    </div>
  );
}

export default Signup;
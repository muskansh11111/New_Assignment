import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
if(res.data.role === "admin"){
   navigate("/admin");
}else{
   navigate("/member");
}
    } catch {
      alert("Login Failed");
    }
  };

  return (
    <div className="container" style={{ border: "2px blue",color:"blue",justifyContent:"center",textAlign:"center",backgroundColor:"lightblue", width:"400px",height:"300px",margin:"auto",marginTop:"100px",borderRadius:"10px" } }>
      <h2 style={{ border:"2px",color:"blue",justifyContent:"center",textAlign:"centerss"}}>Login</h2>

      <form onSubmit={handleSubmit}>
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

        <button style={{color:"white",backgroundColor:"blue",width:"80px",height:"30px",borderRadius:"10px"}}>Login</button>
      </form>

     <p>Not registered?</p> <Link to="/signup">Signup</Link>
    </div>
  );
}

export default Login;
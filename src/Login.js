import React,{useState} from 'react';
import axios from 'axios'

function Login(props){
    function loginStateHandler(val,data){
        props.loginStateHandler(val,data)
      }
        const [email,setEmail]=useState("")
        const [pass,setPass]=useState("")
        const [warning,setWarning]=useState("")

        function handleLogin(e){
        e.preventDefault()
        if(loginFormValidator())
        {
        console.log(email,pass)
        axios.post('https://thepc-one.herokuapp.com/api/user/login',
        {
            email:email,
            password:pass
        })
        .then((response) => {
            console.log(response);
            if(response.status===200)
            setWarning("")
            loginStateHandler(true,response.data)
        }, (error) => {
            console.log(error);
            setWarning("Incorrect Username or Password")
        });
        }}
        
        function loginFormValidator(){
            let flag=true
            // if((/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email)==false)
            if(email.length==0)
            {   setWarning("Email ID Invalid")
                flag=false  }
            else if(pass.length==0)
            {   setWarning("Password Invalid")
                flag=false  }
            return flag 
        }

        return(
            
                <div className="sidebar_form">
                <form className="form-signin" onSubmit="return false" >
                    <label for="inputEmail" class="sr-only">Email address</label>
                    <input type="email" id="inputEmail" className="form-control" placeholder="Email address" onChange={e=>setEmail(e.target.value)} required/>
                    <label for="inputPassword" class="sr-only">Password</label>
                    <input type="password" id="inputPassword" className="form-control" placeholder="Password" onChange={e=>setPass(e.target.value)} required/>
                    <p>{warning}</p>
                    <button className="btn btn-lg btn-primary btn-block" type="button" onClick={handleLogin}>Login</button>
                    <div className="orText">OR</div>
                    <div className="home_google">
                    {/* <img src={google} /> */}
                    </div>

                </form>
                </div>
            
        ) 
}

export default Login;
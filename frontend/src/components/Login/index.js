import { Component } from "react";
import { useNavigate ,Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./index.css"

class Login extends Component {
    state = {
        usernameinput: "",
        passwordinput: "",
        errorMsg: ""
    };

    setUserInput = (event) => {
        this.setState({ usernameinput: event.target.value });
    };

    setPasswordInput = (event) => {
        this.setState({ passwordinput: event.target.value });
    };

    loginBtn = async () => {
        const { usernameinput, passwordinput } = this.state;
        const { navigate } = this.props;

        if (!usernameinput || !passwordinput) {
            this.setState({ errorMsg: "Username and password are required" });
            return;
        }

        const credentials = {
            username: usernameinput,
            password: passwordinput
        };

        const url = "https://mapapp-us5l.onrender.com/login";
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials)
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();

            if (response.ok) {
                console.log("Login Successful:", data);
                Cookies.set("jwt_token", data.token, { expires: 1 });
                navigate("/dashboard"); 
            } else {
                this.setState({ errorMsg: data.message || "Invalid credentials" });
            }
        } catch (error) {
            console.error("Login Error:", error);
            this.setState({ errorMsg: "Something went wrong. Try again!" });
        }
    };

    render() {
        const { errorMsg } = this.state;
        const logintoken=Cookies.get("jwt_token")
          if(logintoken){
              return <Navigate to="/dashboard" replace />
          }

        return (
            <div className="loginmainContainer">
                <div>
                <h1>Login <br/> <span className="spanelement">To get Started</span> </h1>
                <input className="usernamebox" id="username" type="text" onChange={this.setUserInput} placeholder="Enter Username" />
                <br />
                <input className="usernamebox"  id="password" type="password" onChange={this.setPasswordInput} placeholder="Enter Password" />
                <br />
                <button className="loginbtnContainer"  onClick={this.loginBtn}>Login</button>
                {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
                <h3>Note:</h3>
                <p>username:madhav <br/> password:password123</p>
                </div>
            </div>
        );
    }
}


function withRouter(Component) {
    return (props) => <Component {...props} navigate={useNavigate()} />;
}

export default withRouter(Login);

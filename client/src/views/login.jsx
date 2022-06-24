import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginUser } from "../application/features/user";
import { addToStorage } from "../services/localstorage";
import LoginForm from "./components/loginForm";

const Login = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const { mutate: LoginCall } = useLoginUser();

  const changeFormHandler = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    LoginCall(formData, {
      onSuccess: (data) => {
        addToStorage("isAuth", true);
        addToStorage("token", data.token);
        addToStorage("user", { userId: data.user._id });
        navigate("/user");
      },
      onError: (error) => {
        console.log(error.response.data);
      },
    });
  };

  return (
    <div className="section login">
      <div className="container">
        <LoginForm
          changeHandler={changeFormHandler}
          submitHandler={submitHandler}
          formValues={formData}
          button={
            <button onClick={() => navigate("/register")}>Sign Up</button>
          }
        />
      </div>
    </div>
  );
};

export default Login;

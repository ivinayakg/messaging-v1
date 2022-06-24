import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterUser } from "../application/features/user";
import RegisterForm from "./components/registerForm";

const Register = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const { mutate: RegisterCall } = useRegisterUser();

  const changeFormHandler = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    RegisterCall(formData, {
      onSuccess: (data) => {
        navigate("/login");
      },
      onError: (error) => {
        console.log(error.response.data);
      },
    });
  };

  return (
    <div className="section register">
      <div className="container">
        <RegisterForm
          changeHandler={changeFormHandler}
          submitHandler={submitHandler}
          formValues={formData}
          button={<button onClick={() => navigate("/login")}>Register</button>}
        />
      </div>
    </div>
  );
};

export default Register;

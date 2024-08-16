/* eslint-disable react/no-unescaped-entities */
import { Link, useNavigate } from "react-router-dom";
import TopBar from "../../components/topBar/TopBar";
import CustomButton from "../../components/customButton/CustomButton";
import { useState } from "react";
import { useUserRegisterMutation } from "../../redux/api/auth/authApi";

import Loading from "../../components/loading/Loading";
import toast from "react-hot-toast";
import { Input } from "antd";
import PasswordChecklist from "react-password-checklist";
import "./SignUp.css";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordValid, setPasswordValid] = useState(false);

  const [userRegister, { isLoading }] = useUserRegisterMutation();

  const navigate = useNavigate();

  const handleInputChange = (type, event) => {
    const inputValue = event.target.value;

    if (inputValue.length > 50) {
      event.target.style.fontSize = "12px";
    } else if (inputValue.length > 27) {
      event.target.style.fontSize = "15px";
    } else {
      event.target.style.fontSize = "20px";
    }

    if (type === "firstName" || type === "lastName") {
      if (inputValue.length > 18) {
        event.target.style.fontSize = "12px";
      } else if (inputValue.length > 11) {
        event.target.style.fontSize = "15px";
      } else {
        event.target.style.fontSize = "20px";
      }
    }

    if (type === "firstName") {
      setFirstName(inputValue);
    } else if (type === "lastName") {
      setLastName(inputValue);
    } else if (type === "email") {
      setEmail(inputValue);
    } else if (type === "password") {
      setPassword(inputValue);
    } else if (type === "confirmPassword") {
      setConfirmPassword(inputValue);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payloadObj = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        password2: confirmPassword,
      };

      const res = await userRegister(payloadObj);

      console.log("response", res);

      if (res?.data) {
        toast.success(res?.data?.message, {
          duration: 5000,
        });
        console.log("res", res.data.message);
        navigate("/verify");
      }

      if (res?.error) {
        toast.error("Please provide valid information");
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="mt-12">
      <TopBar />

      <div className="flex items-center justify-center">
        <CustomButton className="help-animation">Create Account</CustomButton>
      </div>
      <div className="text-center font-sans text-sm mb-4 mt-2">
        Sign up below for a free account or log in here!
      </div>

      <div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center gap-2">
              <div className="gradient-button w-[171px] bg-white">
                <Input
                  type="text"
                  autoComplete="true"
                  className="w-full h-full expanding-input "
                  onChange={(e) => handleInputChange("firstName", e)}
                  placeholder="First Name"
                  required
                />
              </div>
              <div className="gradient-button bg-white w-[171px]">
                <Input
                  type="text"
                  autoComplete="true"
                  className=" w-full h-full  expanding-input "
                  onChange={(e) => handleInputChange("lastName", e)}
                  placeholder="Last Name"
                  required
                />
              </div>
            </div>
            <div className={`gradient-button w-[350px] bg-white`}>
              <Input
                type="email"
                autoComplete="true"
                className="w-full h-full expanding-input "
                onChange={(e) => handleInputChange("email", e)}
                placeholder="Email"
                required
              />
            </div>
            <div className={`gradient-button w-[350px]  bg-white `}>
              <Input.Password
                type="password"
                className="w-full h-full  center-cursor expanding-input p-2"
                onChange={(e) => handleInputChange("password", e)}
                placeholder="Password"
                required
              />
            </div>
            <div className={`gradient-button w-[350px] bg-white `}>
              <Input.Password
                type="password"
                className="w-full h-full expanding-input center-cursor p-2"
                onChange={(e) => handleInputChange("confirmPassword", e)}
                placeholder="Confirm Password"
                required
              />
            </div>
            <PasswordChecklist
              rules={[
                "minLength",
                "specialChar",
                "number",
                "capital",
                "lowercase",
                "match",
              ]}
              minLength={8}
              value={password}
              valueAgain={confirmPassword}
              onChange={(isValid) => setPasswordValid(isValid)}
            />

            {passwordValid && (
              <div className="cursor-pointer mt-2 text-center ">
                <button
                  type="submit"
                  className="border-none  cursor-pointer bg-transparent focus:outline-none text-black hover:bg-gray-600 hover:text-white relative z-10 pt-[12px] pb-[.7rem] hover:px-[14px] "
                >
                  <div className="enter-animation  text-[1rem] font-bold  leading-none ">
                    <span>S</span>
                    <span>U</span>
                    <span>B</span>
                    <span>M</span>
                    <span>I</span>
                    <span>T</span>
                  </div>
                </button>
                <div className="enterBox mt-[-39px]">
                  <div className="enterInner"></div>
                  <div className="enterBox1">
                    <div className="enterInner1"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>

      <div className="help-animation shadow-none text-center text-[16px] font-sans my-5">
        By clicking Submit, you are agreeing to Naiyani's{" "}
        <span>
          <Link className="font-bold text-gray-600 no-underline" to="/terms">
            Terms of Service
          </Link>
        </span>{" "}
        and{" "}
        <span>
          <Link className="font-bold  no-underline text-gray-600" to="/policy">
            Privacy Policy
          </Link>
        </span>
      </div>
    </div>
  );
};

export default SignUp;

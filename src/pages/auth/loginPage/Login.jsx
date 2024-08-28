import { useEffect, useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown, Input, message } from "antd";
import menuIcon from "../../../assets/img/menu.png";
import { useUserLoginMutation } from "../../../redux/api/auth/authApi";
import { storeUserInfo } from "../../../services/auth.service";
import Loading from "../../../components/loading/Loading";

const items = [
  {
    key: "1",
    label: (
      <Link
        className="font-bold pr-10 text-[16px] hover:text-white"
        to="/sign-up"
      >
        Create Account
      </Link>
    ),
  },
  {
    key: "1",
    label: (
      <Link className="font-bold pr-10 text-[16px] hover:text-white" to="/help">
        Help
      </Link>
    ),
  },
];

const Login = () => {
  const [moveLogo, setMoveLogo] = useState(false);
  const [showBorder, setShowBorder] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [fields, setFields] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const [userLogin, { isLoading }] = useUserLoginMutation();

  useEffect(() => {
    setTimeout(() => {
      setShowBorder(true);
      setTimeout(() => {
        setMoveLogo(true);
      }, 4000);
    }, 2000);

    setTimeout(() => {
      setFields(true);
    }, 9000);
  }, []);

  const handleInputChange = (type, event) => {
    const inputValue = event.target.value;

    if (inputValue.length > 28) {
      event.target.style.fontSize = "12px";
    } else if (inputValue.length > 18) {
      event.target.style.fontSize = "15px";
    } else {
      event.target.style.fontSize = "20px";
    }

    if (type === "email") {
      setEmail(inputValue);
    } else if (type === "password") {
      setPassword(inputValue);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payloadObj = {
        email: email,
        password: password,
      };

      const res = await userLogin(payloadObj);

      if (res?.data?.data?.access_token) {
        message.success({
          content: "Login Successful",
          key: "login-loading",
          duration: 3,
        });
        navigate("/database-btn");
      }
      storeUserInfo({ accessToken: res?.data?.data?.access_token });

      if (res?.error) {
        message.error(res?.error?.data?.data?.detail);
      }

      console.log("response", res);
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="outer-container lg:pt-64 pt-72">
      <div className={`services   ${moveLogo ? "move-up" : ""} `}>
        <div className="landing-container ">
          <div className="">
            <p className="text-animation ">
              <span className="gradient1">N</span>
              <span className="gradient">A</span>
              <span className="gradient">I</span>
              <span className="gradient">Y</span>
              <span className="gradient">A</span>
              <span className="gradient">N</span>
              <span className="gradient">I</span>
            </p>
          </div>

          {/* move lines */}
          {showBorder && (
            <div className="moveLines">
              <div className="box lg:mt-[-24px] mt-[-12px]">
                <div className="inner"></div>
                <div className="box1">
                  <div className="inner1"></div>
                </div>
              </div>
            </div>
          )}
        </div>
        {/*  */}
      </div>
      {fields && (
        <div className="gradient-text mt-[-80px]">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col items-center">
              <div className={`gradient-button bg-white`}>
                <Input
                  type="email"
                  autoComplete="true"
                  className="w-full h-full expanding-input"
                  onChange={(e) => handleInputChange("email", e)}
                  placeholder="Username"
                  required
                />
              </div>

              <div
                onClick={() => setIsPasswordVisible(true)}
                className={`gradient-button  bg-white `}
              >
                <Input.Password
                  type="password"
                  className="w-full h-full expanding-input center-cursor p-2"
                  onChange={(e) => handleInputChange("password", e)}
                  placeholder="Password"
                  required
                />
              </div>

              {isPasswordVisible && (
                <div className="cursor-pointer mt-2 text-center ">
                  <button
                    type="submit"
                    className="border-none  cursor-pointer bg-transparent focus:outline-none text-black hover:bg-gray-600 hover:text-white relative z-10 pt-[12px] pb-[.7rem] hover:px-[16px]"
                  >
                    <div className="enter-animation  text-[1rem] font-bold  leading-none ">
                      <span>E</span>
                      <span>N</span>
                      <span>T</span>
                      <span>E</span>
                      <span>R</span>
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
      )}

      {fields && (
        <div className="filter-animation ">
          <Dropdown menu={{ items }} placement="bottomLeft" arrow>
            <button className="menu-icon-container rounded-[50%] border-none bg-white">
              <img src={menuIcon} alt="" />
            </button>
          </Dropdown>
        </div>
      )}
    </div>
  );
};

export default Login;

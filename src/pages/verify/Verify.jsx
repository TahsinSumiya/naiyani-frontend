import emailIcon from "../../assets/img/emailIcon.png";
import { Button, Card } from "antd";
import { useVerifyEmailMutation } from "../../redux/api/auth/authApi";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/loading/Loading";

const Verify = () => {
  const [inputCode, setInputCode] = useState("");

  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payloadObj = {
      otp: inputCode,
    };

    try {
      const res = await verifyEmail(payloadObj);

      console.log("res", res);

      if (res?.data) {
        toast.success("Your email is now verified. Now you can log in.", {
          duration: 5000,
        });
        navigate("/login");
      }
      if (res?.error) {
        toast.error(res?.error?.data?.message);
      }
    } catch (error) {
      //
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className=" ">
      <Card className="text-center font-sans bg-white mx-auto lg:w-[40%] w-full h-[600px] shadow-lg my-5">
        <div>
          <img src={emailIcon} alt="" />
          <p className="tracking-wider text-lg mt-2">
            VERIFY YOUR EMAIL ADDRESS
          </p>
        </div>
        <hr className="w-72 my-12" />
        <div>
          <div className="text-[17px] font-semibold mb-1">
            A verification code has been sent to
          </div>
          <span>email</span>
          <p className="text-gray-600 px-16 text-[15px] text-justify">
            Please check your inbox and enter the verification code below to
            verify your email address. The code will expire in ....
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="gradient-button bg-white mx-auto">
            <input
              type="text"
              autoComplete="true"
              className=" w-full h-full  expanding-input"
              onChange={(e) => setInputCode(e.target.value)}
              maxLength={6}
              placeholder="Enter Code"
              required
            />
          </div>
          <div>
            <Button
              htmlType="submit"
              className="hover:bg-gray-600 hover:text-white font-bold w-60 mr-2 my-4"
            >
              Verify
            </Button>
          </div>
        </form>

        <div className="flex justify-evenly px-10 ">
          <Button type="text" className="font-bold text-gray-600">
            Resend
          </Button>
          <Button
            onClick={() => navigate("/sign-up")}
            type="text"
            className="font-bold text-gray-600"
          >
            Change Email
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Verify;

//  const [verificationCode, setVerificationCode] = useState([
//    "",
//    "",
//    "",
//    "",
//    "",
//    "",
//  ]);

// const handleKeyDown = async (event, index) => {
//   const input = event.target.value;
//   const newVerificationCode = [...verificationCode];
//   newVerificationCode[index] = input;
//   setVerificationCode(newVerificationCode);

//   // Check if the entered character length is 1 and move focus if true
//   if (input.length === 1) {
//     const nextIndex = index + 1;
//     if (nextIndex < verificationCode.length) {
//       const nextInput = document.getElementById(`code-${nextIndex}`);
//       nextInput.focus();
//     }
//   }

//   const res = await verifyEmail(newVerificationCode.join(""));

//   console.log("res", res);
// };

// <div>
//   {verificationCode.map((digit, index) => (
//     <input
//       key={index}
//       id={`code-${index}`}
//       type="text"
//       value={digit}
//       onChange={(event) => handleKeyDown(event, index)}
//       maxLength={1}
//       style={{
//         width: "2em",
//         height: "2em",
//         marginRight: "0.5em",
//         textAlign: "center",
//       }}
//     />
//   ))}
// </div>;

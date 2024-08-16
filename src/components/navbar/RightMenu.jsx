/* eslint-disable react/prop-types */

import { Menu } from "antd";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const RightMenu = ({ mode }) => {
  const navigate = useNavigate();
  return (
    <Menu className={`${mode == "inline" ? "my-8 ml-8" : " "}`}>
      <button
        onClick={() => navigate("/login")}
        style={{
          boxShadow: "1px 4px 2px rgba(26, 25, 25, 0.25)",
        }}
        className="rounded-2xl text-gray-600 hover:bg-gray-600 hover:text-white border-none  font-semibold text-[16px] flex items-center justify-between py-1 cursor-pointer"
      >
        <span className="px-5">SIGN IN</span>{" "}
        <FaArrowAltCircleRight className="h-[18px] w-[18px]   " />
      </button>
    </Menu>
  );
};

export default RightMenu;

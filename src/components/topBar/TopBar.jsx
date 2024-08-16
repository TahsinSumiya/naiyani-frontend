/* eslint-disable no-unused-vars */
import { Dropdown, Menu } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import menuIcon from "../../assets/img/menu.png";
import "./TopBar.css";

const TopBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isHelpPage = location.pathname === "/help";

  const isSignUpPage =
    location.pathname === "/sign-up" ||
    location.pathname === "/terms" ||
    location.pathname === "/policy" ||
    location.pathname === "/help";

  const items = isHelpPage
    ? [
        {
          key: "1",
          label: (
            <Link
              className="font-bold pr-10 text-[16px] hover:text-white"
              to="/"
            >
              Home
            </Link>
          ),
        },
      ]
    : [
        {
          key: "1",
          label: (
            <Link
              className="font-bold pr-10 text-[16px] hover:text-white"
              to="/help"
            >
              Help
            </Link>
          ),
        },
      ];

  return (
    <div>
      <div className="banner-container">
        <div>
          <div className="filter-animation ">
            <Dropdown menu={{ items }} placement="bottomLeft" arrow>
              <button className="menu-icon-container rounded-[50%] border-none bg-white">
                <img src={menuIcon} alt="" />
              </button>
            </Dropdown>
          </div>
        </div>

        {!isSignUpPage && (
          <div className="text-positionT font-semibold">
            <span>Hi, Username</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;

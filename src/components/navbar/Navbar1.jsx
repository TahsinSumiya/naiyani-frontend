import { Drawer } from "antd";

import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";
import { NavLink } from "react-router-dom";

import { useState } from "react";

import menuIcon from "../../assets/img/menu.png";
import logo from "../../assets/img/naiyanLogo.jpg";

import "./Navbar.css";

const Navbar1 = () => {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(!visible);
  };

  const item = {
    img: <img className="w-24" src={logo} alt="logo" />,
  };
  return (
    <div className=" py-8 sticky top-0 z-50 bg-white">
      <div className="">
        <div>
          <button
            className="menu-icon-container right-0 rounded-[50%] border-none bg-white lg:hidden"
            type="text"
            onClick={showDrawer}
          >
            <img src={menuIcon} alt="" />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-24">
            <div className="text-left ">
              <NavLink
                to="/"
                className="text-[24px]  "
                activeClassName="active-link"
              >
                NAIYANI
              </NavLink>
            </div>
            <div className="lg:block hidden">
              <LeftMenu mode={"horizontal"} />
            </div>
          </div>

          <div className="lg:block hidden">
            <RightMenu />
          </div>
        </div>

        <div className="">
          <Drawer
            title={item.img}
            placement="right"
            closable={true}
            onClose={showDrawer}
            open={visible}
            style={{ zIndex: 9999 }}
          >
            <LeftMenu mode={"inline"} />
            <RightMenu mode={"inline"} />
          </Drawer>
        </div>
      </div>
    </div>
  );
};

export default Navbar1;

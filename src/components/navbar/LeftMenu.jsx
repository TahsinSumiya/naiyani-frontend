/* eslint-disable react/prop-types */

import { NavLink } from "react-router-dom";

const LeftMenu = ({ mode }) => {
  const items = [
    { key: "Product", label: "Product", link: "/" },
    { key: "About us", label: "About us", link: "/about-us" },
    { key: "Meet the team", label: "Meet the team", link: "/team" },
    { key: "Pricing", label: "Pricing", link: "/pricing" },

    { key: "Contact us", label: "Contact us", link: "/contact-us" },
  ];

  return (
    <div
      className={`${
        mode === "horizontal" ? "flex-row gap-8" : "flex-col ml-12  "
      } flex leading-10 text-[16px] font-sans `}
    >
      {items.map((item) => (
        <div key={item.key}>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "underline hover:text-black"
                : "no-underline hover:text-black"
            }
            to={item.link}
          >
            {item.label}
          </NavLink>
        </div>
      ))}
    </div>
  );
};

export default LeftMenu;

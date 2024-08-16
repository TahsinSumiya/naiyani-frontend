// import { FaArrowAltCircleRight } from "react-icons/fa";
// import { NavLink, useNavigate } from "react-router-dom";

// const Navbar = () => {
//   const navigate = useNavigate();

//   return (
//     <div>
//       <nav className="flex justify-between py-8">
//         <div className="flex items-center gap-8 text-[16px] font-sans">
//           <NavLink to="/" className="text-[24px]" activeClassName="active-link">
//             NAIYANI
//           </NavLink>{" "}
//           <NavLink
//             to="/"
//             className={({ isActive }) =>
//               isActive ? "underline" : "no-underline"
//             }
//           >
//             Product
//           </NavLink>{" "}
//           <NavLink
//             to="/about-us"
//             className={({ isActive }) =>
//               isActive ? "underline" : "no-underline"
//             }
//           >
//             About us
//           </NavLink>{" "}
//           <NavLink
//             to="/team"
//             className={({ isActive }) =>
//               isActive ? "underline" : "no-underline"
//             }
//           >
//             Meet the Team
//           </NavLink>{" "}
//           <NavLink
//             to="/pricing"
//             className={({ isActive }) =>
//               isActive ? "underline" : "no-underline"
//             }
//           >
//             Pricing
//           </NavLink>{" "}
//           <NavLink
//             to="/contact-us"
//             className={({ isActive }) =>
//               isActive ? "underline" : "no-underline"
//             }
//           >
//             Contact us
//           </NavLink>{" "}
//         </div>
//         <div>
//           <button
//             onClick={() => navigate("/login")}
//             style={{
//               boxShadow: "1px 4px 2px rgba(26, 25, 25, 0.25)",
//             }}
//             className="rounded-2xl text-gray-600 hover:bg-gray-600 hover:text-white border-none  font-semibold text-[16px] flex items-center justify-between py-1 cursor-pointer"
//           >
//             <span className="px-5">SIGN IN</span>{" "}
//             <FaArrowAltCircleRight className="h-[18px] w-[18px]   " />
//           </button>
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default Navbar;

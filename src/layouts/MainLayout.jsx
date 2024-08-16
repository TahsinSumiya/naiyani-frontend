import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div>
      <div className="">
        <Outlet />
      </div>
    </div>
  );
}

import { useNavigate } from "react-router-dom";
import "./DatabaseButton.css";
import TopBar from "../../components/topBar/TopBar";
import CustomButton from "../../components/customButton/CustomButton";

const DatabaseButton = () => {
  const navigate = useNavigate();

  return (
    <div className="banner-container">
      <TopBar />
      <div className="banner-container h-[100vh] ">
        <CustomButton
          className="hover:bg-gray-600 hover:text-white tracking-widest cursor-pointer"
          onClick={() => navigate("/database-list")}
        >
          DATABASE
        </CustomButton>
      </div>
    </div>
  );
};

export default DatabaseButton;

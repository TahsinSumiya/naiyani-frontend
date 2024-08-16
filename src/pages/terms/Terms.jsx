import CustomButton from "../../components/customButton/CustomButton";
import TopBar from "../../components/topBar/TopBar";

const Terms = () => {
  return (
    <div>
      <TopBar />

      <div className="flex items-center justify-center pt-28">
        <CustomButton className="help-animation">
          Terms of Services
        </CustomButton>
      </div>
    </div>
  );
};

export default Terms;

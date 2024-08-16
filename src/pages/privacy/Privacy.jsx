import CustomButton from "../../components/customButton/CustomButton";
import TopBar from "../../components/topBar/TopBar";

const Privacy = () => {
  return (
    <div>
      <TopBar />

      <div className="flex items-center justify-center pt-28">
        <CustomButton className="help-animation">Privacy Policy</CustomButton>
      </div>
    </div>
  );
};

export default Privacy;

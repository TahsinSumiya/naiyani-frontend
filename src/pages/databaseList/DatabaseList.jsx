import { Link } from "react-router-dom";
import "./DatabaseList.css";
import TopBar from "../../components/topBar/TopBar";
import CustomButton from "../../components/customButton/CustomButton";

const DatabaseList = () => {
  const listItems = [
    { id: 1, title: "BOOKS" },
    { id: 2, title: "HEALTH & BEAUTY" },
    { id: 3, title: "ELECTRONICS" },
    { id: 4, title: "HOME & KITCHEN" },
    { id: 5, title: "SOFTWARE & MOBILE APPS" },
    { id: 6, title: "CLOTHING & ACCESSORIES" },
    { id: 7, title: "TOOLS & HOME" },
    { id: 8, title: "SPORTS & OUTDOORS" },
    { id: 9, title: "MOVIES & TV" },
    { id: 10, title: "TOYS & GAMES" },
    { id: 11, title: "GROCERY & GOURMET FOOD" },
    { id: 12, title: "OFFICE PRODUCTS" },
    { id: 13, title: "PET SUPPLIES" },
    { id: 14, title: "AUTOMOTIVE & INDUSTRIAL" },
    { id: 15, title: "VIEW ALL" },
  ];

  const sortedListItems = listItems.sort((a, b) =>
    a.title.localeCompare(b.title)
  );

  return (
    <div className="banner-container">
      <TopBar />
      <div className="banner-container lg:mr-[20px] pt-28 ">
        <CustomButton className="tracking-wider">DATABASE</CustomButton>
      </div>

      {/* list grid */}
      <div className="grid-container">
        {sortedListItems?.map((item, i) => (
          <Link key={i} to={`/database-table`}>
            <button className="grid-button  py-5 lg:w-[90%] w-full h-full hover:bg-gray-600 text-gray-600 hover:text-white border-none bg-white px-4">
              {item.title}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DatabaseList;

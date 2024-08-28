import { useEffect, useState ,useCallback} from "react";
import TopBar from "../../components/topBar/TopBar";
import "./DatabaseTable.css";
import { Link } from "react-router-dom";
import reloadIcon from "../../assets/img/refresh.png";
import { SideBySideMagnifier } from "react-image-magnifiers";
import { LinkOutlined, CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Input } from "antd";
import { IoMdRefreshCircle } from "react-icons/io";
import Paginations from "../../components/pagination/Paginations";
import Loading from "../../components/loading/Loading";
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { useLocation } from "react-router-dom";

const { Search } = Input;
const DatabaseTable = () => {
  const [data, setData] = useState([]);
  const [sortingType, setSortingType] = useState("asc"); // Default sorting type
  const [columnName, setColumnName] = useState("estimated_sales_rank"); // Default column to sort by
  const [limit, setLimit] = useState(4); // Items per page
  const [offset, setOffset] = useState(0); // Offset for pagination
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [totalItems, setTotalItems] = useState(0); // Total items
  const [loading, setLoading] = useState(true);
  const [selectedAsin, setSelectedAsin] = useState(null); 

  const items = [
    { key: "amazon_fba_estimated_fees", label: "Amazon FBA Est. fees" },
    { key: "estimated_monthly_sales", label: "Est. Monthly Sales" },
    { key: "estimated_sales_rank", label: "Est. Sales Rank" },
   
  ];

  // const sortedItems = items.sort((a, b) => a.label.localeCompare(b.label));
  const token = localStorage.getItem("accessToken"); 
  const location = useLocation(); // Get location object
  const query = new URLSearchParams(location.search); // Parse query parameters
  const categoryId = query.get("category_id") || 12; // Default to 12 if not found


  const menu = (
    <Menu>
        {items.map((item) => (
        <Menu.Item
          className="hover:text-white"
          key={item.key}
          onClick={() => {
            setColumnName(item.key);
            setLoading(true); // Enable loading when a sort option is selected
          }}
          
        >
          {item.label}
        </Menu.Item>
      ))}
    </Menu>
  );

  const fetchData = useCallback(() => {
    fetch(
      `http://localhost:8000/api/v1/leads/leads-data/?category_id=${categoryId}&column_name=${columnName}&sorting_type=${sortingType}&limit=${limit}&offset=${offset}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("API response:", data); // Check API response
        setTotalItems(data.count);
        setLoading(false);
        setData(data.results.data);
        console.log("State data:", data.results.data); // Check state data
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false); 
      })
      .finally(() => setLoading(false)); 
  }, [columnName, sortingType, limit, offset, token]);

  useEffect(() => {
    fetchData();
  }, [columnName, sortingType, limit, offset]); // Trigger fetchData whenever offset changes

  // const handleLimitChange = (newLimit, newPage) => {
  //   setLimit(newLimit);
  //   setCurrentPage(newPage);
  //   setOffset((newPage - 1) * newLimit);
  //   setLoading(true);
  //   fetchData();
  // };
  

  // const handlePageChange = (page) => {
  //   const newOffset = (page - 1) * limit;
  //   setCurrentPage(page);
  //   setOffset(newOffset);
  //   setLoading(true);
  //   fetchData();
  //   // handleLimitChange()
  // };
  const handleLimitChange = (newLimit, newPage) => {
    setLimit(newLimit);
    setCurrentPage(newPage);
    setOffset((newPage - 1) * newLimit);
    setLoading(true);
  };
  
  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setLimit(pageSize); // Update the limit when pageSize changes
    setOffset((page - 1) * pageSize); // Calculate the correct offset
    setLoading(true);
  };
  
  const handleRefresh = useCallback(async () => {
    if (!selectedAsin) {
      console.error("No ASIN selected for refresh.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/v1/spapi/get_sp_api_bulk_data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          lead_asin_with_cat_id: [{ asin: selectedAsin, category_id: categoryId }],
          marketplace_id: "A2EUQ1WTGCTBG2",
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Refresh API response:", data);
    } catch (error) {
      console.error("Error fetching bulk data:", error);
    } finally {
      setLoading(false);
      fetchData();
    }
  }, [token, categoryId, selectedAsin, fetchData]);

  const textStyle = (value) => {
    if (value === 0) {
      return "text-black";
    } else if (value < 0) {
      return "text-red-500";
    } else {
      return "text-green-600";
    }
  };


  return (
    <div className="">
      <div>
        <TopBar />
      </div>

      <div className=" px-6 mt-[80px] ">

      <div className="flex items-center justify-end mb-5 gap-2 pr-5 mt-32 lg:mt-0">
    
          <Dropdown overlay={menu} placement="bottomLeft">
            <button className="flex items-center cursor-pointer bg-white hover:bg-slate-100 shadow-lg text-black text-[16px] rounded-lg border-none font-sans p-2">
              <span className="px-2">Sort by</span>
              <CaretDownOutlined style={{ fontSize: "25px", paddingTop: "3px" }} />
            </button>
          </Dropdown>

       
  <button
    className={`bg-white shadow-lg text-black p-2 rounded-lg border-none cursor-pointer ${
      sortingType === "asc" ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "hover:bg-slate-200"
    }`}
    onClick={() => {
      setSortingType("asc");
      setLoading(true); // Enable loading while sorting
    }}
    disabled={sortingType === "asc"} // Disable if already in asc order
  >
    <CaretUpOutlined style={{ fontSize: "25px" }} />
  </button>

  <button
    className={`bg-white shadow-lg text-black p-2 rounded-lg border-none cursor-pointer ${
      sortingType === "desc" ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "hover:bg-slate-200"
    }`}
    onClick={() => {
      setSortingType("desc");
      setLoading(true); // Enable loading while sorting
    }}
    disabled={sortingType === "desc"} // Disable if already in desc order
  >
    <CaretDownOutlined style={{ fontSize: "25px" }} />
  </button>




          <div>
            <button
              className="bg-white shadow-lg text-black p-2 text-lg rounded-lg  hover:bg-slate-200  border-none cursor-pointer"
              
            >
             {totalItems} items
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loading size="large" />
          </div>
        ) : (
        <div className=" grid gap-8">
          {data?.map((item, i) => (
            <div
              style={{
                borderRadius: "2.5rem",
                boxShadow: " 2px 2px 2px 1.47px rgba(89, 89, 89, 0.33)",
              }}
              key={i}
              className="flex xl:flex-row flex-col items-center bg-white font-sans 
              w-[100%]
              xl:h-[140px] hover:bg-[#F9F9F9] gap-8 xl:gap-0 py-4 xl:py-0"
            >
              {/*circle, product and ASIN */}
              <div className="flex lg:flex-row flex-col items-center">
                {/* circle */}
                <div className="circle flex items-center justify-center">
                {/* <SideBySideMagnifier
    className="w-20 custom-magnifier"
    imageSrc={item.product_image_url}
    imageAlt={item.product_name}
    largeImageSrc={item.product_image_url}
    fillGapLeft={10} // Adjust as needed
    fillGapTop={10} // Adjust as needed
    // switchSides
  /> */}
  <Zoom className='w-20'>
    <img
      alt="That Wanaka Tree, New Zealand by Laura Smetsers"
      src={item.product_image_url}
      width="80"
    />
  </Zoom>

                </div>
                {/* product and ASIN */}
                <div className="lg:ml-4 lg:w-52 px-8 lg:px-0">
                  <div className="text-sm font-bold mb-2 my-6 lg:my-0 text-center lg:text-left">
                  {item.product_name}
                  </div>
                  <div className="text-sm text-center lg:text-left">
                  {item.asin}
                  </div>
                </div>
              </div>

              {/* middle items */}
              <div className="flex lg:flex-row md:flex-row flex-col lg:items-center lg:justify-center text-[13px]  lg:gap-10 gap-5  mx-auto px-8">
                {/* 1st col */}
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between">
                    <div className="font-medium">Amazon FBA Est. fees:</div>
                    <div className="ml-2 text-red-500">
                    {item.amazon_fba_estimated_fees}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="font-medium"> Est. Monthly Sales:</div>
                    <div>    {item.estimated_monthly_sales}</div>
                  </div>
                  <div className="flex justify-between">
                    <div className="font-medium">Est. Sales Rank:</div>
                    <div>     {item.estimated_sales_rank}</div>
                  </div>
                  <div className="flex justify-between">
                    <div className="font-medium">Sales Rank (30 days):</div>
                    <div>  {item.sales_rank_30_days}</div>
                  </div>
                  <div className="flex justify-between">
                    <div className="font-medium">Sales Rank (90 days):</div>
                    <div>     {item.sales_rank_90_days}</div>
                  </div>
                </div>

                {/* 2nd col */}
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between">
                    <div className="font-medium mr-2">Est. Gross Profit:</div>
                    <div
                      className={textStyle(Number(item.estimated_gross_profit))}

                    >
                         {item.estimated_gross_profit}
                      {/* $ {Number(item["Estimated Gross Profit $"]).toFixed(2)} */}33
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="font-medium mr-2">
                      Est. Gross Profit Margin:
                    </div>
                    <div
                       className={textStyle(Number(item.estimated_gross_profit_margin))}
                    >
                      {/* {(
                        Number(item["Estimated Gross Profit Margin %"]) * 100
                      ).toFixed(2)}{" "} */}
                        {item.estimated_gross_profit_margin}
                      %
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="font-medium mr-2">Est. Net Profit: </div>
                    <div
                    className={textStyle(Number(item.estimated_net_profit))}
                    >
                      {/* $ {Number(item["Estimated Net Profit $"]).toFixed(2)} */}
                      {item.estimated_net_profit}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="font-medium mr-2">
                      Est. Net Profit Margin:
                    </div>
                    <div
                      // className={textStyle(
                      //   Number(item["Estimated Net Profit Margin %"])
                      // )}
                      className={textStyle(Number(item.estimated_net_profit_margin))}
                    >
                      {/* {(
                        Number(item["Estimated Net Profit Margin %"]) * 100
                      ).toFixed(2)}{" "} */}
                        {item.estimated_net_profit_margin}
                      %
                    </div>
                  </div>
                </div>
                {/* 3rd col */}
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between">
                    <div className="font-medium mr-2">Amazon on Listing: </div>
                    <div>  {item.amazon_on_listing}</div>
                  </div>
                  <div className="flex justify-between">
                    <div className="font-medium mr-2">No. of sellers:</div>
                    <div>  {item.number_of_sellers_on_listing}</div>
                  </div>
                  <div className="flex justify-between">
                    <div className="font-medium mr-2">No. of Reviews: </div>
                    <div>  {item.number_of_reviews}</div>
                  </div>
                </div>
              </div>
              {/* links */}
              <div className="flex gap-5 lg:pr-5">
                <div className="flex flex-col  text-[14px]">
                  <div className=" hover-effect shadow-none mb-2">
                    <Link
                        to={`${item.amazon_url}`}

                      target="_blank"
                      rel="noopener noreferrer"
                      className=" no-underline text-black flex items-center"
                    >
                      <LinkOutlined
                        className="icon-img text-[15px] mr-2 font-bold"
                        rotate={155}
                      />
                      <span className="mr-1">Amazon Price: </span>
                      <span> $ {item.amazon_price}</span>
                    </Link>{" "}
                  </div>

                  <div className=" hover-effect border-none shadow-none">
                    <Link
                      className="no-underline text-black flex items-center "
                      to={`${item.sourcing_url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <LinkOutlined
                        className="icon-img text-[15px] mr-2 font-bold"
                        rotate={155}
                      />
                      <span className="mr-1"> Sourcing Price: </span>{" "}
                      <span>$ {item.sourcing_price}</span>
                    </Link>{" "}
                  </div>
                </div>

                <div className="">
                  <IoMdRefreshCircle   onClick={() => {
                      setSelectedAsin(item.asin); // Set selected ASIN
                      handleRefresh();
                    }} className="w-10 h-10 text-gray-400 hover:animate-spin hover:cursor-pointer"/>
                
                </div>
              </div>
            </div>
          ))}
        </div>
             )}
                 <div className="flex justify-center mt-4">
          <Paginations
          currentPage={currentPage}
          limit={limit}
          totalItems={totalItems}
          handlePageChange={handlePageChange}
          handleLimitChange={handleLimitChange}  //
          />
        </div>
      </div>
    </div>
  );
};

export default DatabaseTable;
import { useEffect, useState } from "react";
import TopBar from "../../components/topBar/TopBar";
import "./DatabaseTable.css";
import { Link } from "react-router-dom";

import reloadIcon from "../../assets/img/refresh.png";

import { SideBySideMagnifier } from "react-image-magnifiers";
import {
  LinkOutlined,
  CaretDownOutlined,
  CaretUpOutlined,
} from "@ant-design/icons";
import { Dropdown, Menu } from "antd";

const DatabaseTable = () => {
  const items = [
    {
      key: 1,
      label: "Amazon FBA Est. fees",
    },
    {
      key: 2,
      label: "Est. Monthly Sales",
    },
    {
      key: 3,
      label: "Est. Sales Rank",
    },
    {
      key: 4,
      label: "Sales Rank (30 days)",
    },
    {
      key: 5,
      label: "Sales Rank (90 days)",
    },
    {
      key: 6,
      label: "Est. Gross Profit",
    },
    {
      key: 7,
      label: "Est. Gross Profit Margin",
    },
    {
      key: 8,
      label: "Est. Net Profit",
    },
    {
      key: 9,
      label: "Est. Net Profit Margin",
    },
    {
      key: 10,
      label: "Amazon on Listing",
    },
    {
      key: 11,
      label: "No. of sellers",
    },
    {
      key: 12,
      label: "No. of Reviews",
    },
  ];

  const sortedItems = items.sort((a, b) => a.label.localeCompare(b.label));

  const menu = (
    <Menu>
      {sortedItems.map((item) => (
        <Menu.Item className="hover:text-white" key={item.key}>
          {item.label}
        </Menu.Item>
      ))}
    </Menu>
  );

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/officeProducts.json")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => console.error("Error fetching JSON data:", error));
  }, []);

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
            <button className="flex items-center cursor-pointer bg-white shadow-lg text-black text-[16px] rounded-lg border-none  font-sans p-2">
              <span className="px-2">Sort by</span>
              <CaretDownOutlined
                style={{
                  fontSize: "25px",
                  paddingTop: "3px",
                }}
              />
            </button>
          </Dropdown>

          <div>
            <button className="bg-white shadow-lg text-black p-2 rounded-lg border-none cursor-pointer">
              <CaretUpOutlined
                style={{
                  fontSize: "25px",
                }}
              />
            </button>
          </div>
          <div>
            <button className="bg-white shadow-lg text-black p-2 rounded-lg border-none cursor-pointer">
              <CaretDownOutlined
                style={{
                  fontSize: "25px",
                }}
              />
            </button>
          </div>
        </div>
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
                  <SideBySideMagnifier
                    className="w-20"
                    imageSrc={item["Product Image Link"]}
                    imageAlt={item["Product Image Link"]}
                    largeImageSrc={item["Product Image Link"]}
                    fillGapLeft={40}
                    // switchSides
                  />
                </div>
                {/* product and ASIN */}
                <div className="lg:ml-4 lg:w-52 px-8 lg:px-0">
                  <div className="text-sm font-bold mb-2 my-6 lg:my-0 text-center lg:text-left">
                    {item["Product Name"]}
                  </div>
                  <div className="text-sm text-center lg:text-left">
                    {item["ASIN"]}
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
                      $ {item["Amazon FBA estimated fees"]}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="font-medium"> Est. Monthly Sales:</div>
                    <div>{item["Estimated Monthly Sales"]}</div>
                  </div>
                  <div className="flex justify-between">
                    <div className="font-medium">Est. Sales Rank:</div>
                    <div>{item["Est. Sales Rank"]}</div>
                  </div>
                  <div className="flex justify-between">
                    <div className="font-medium">Sales Rank (30 days):</div>
                    <div>{item["Sales Rank (30 days)"]}</div>
                  </div>
                  <div className="flex justify-between">
                    <div className="font-medium">Sales Rank (90 days):</div>
                    <div>{item["Sales Rank (90 days)"]}</div>
                  </div>
                </div>

                {/* 2nd col */}
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between">
                    <div className="font-medium mr-2">Est. Gross Profit:</div>
                    <div
                      className={textStyle(
                        Number(item["Estimated Gross Profit $"])
                      )}
                    >
                      $ {Number(item["Estimated Gross Profit $"]).toFixed(2)}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="font-medium mr-2">
                      Est. Gross Profit Margin:
                    </div>
                    <div
                      className={textStyle(
                        Number(item["Estimated Gross Profit Margin %"])
                      )}
                    >
                      {(
                        Number(item["Estimated Gross Profit Margin %"]) * 100
                      ).toFixed(2)}{" "}
                      %
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="font-medium mr-2">Est. Net Profit: </div>
                    <div
                      className={textStyle(
                        Number(item["Estimated Net Profit $"])
                      )}
                    >
                      $ {Number(item["Estimated Net Profit $"]).toFixed(2)}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="font-medium mr-2">
                      Est. Net Profit Margin:
                    </div>
                    <div
                      className={textStyle(
                        Number(item["Estimated Net Profit Margin %"])
                      )}
                    >
                      {(
                        Number(item["Estimated Net Profit Margin %"]) * 100
                      ).toFixed(2)}{" "}
                      %
                    </div>
                  </div>
                </div>
                {/* 3rd col */}
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between">
                    <div className="font-medium mr-2">Amazon on Listing: </div>
                    <div>{item["Amazon on Listing"]}</div>
                  </div>
                  <div className="flex justify-between">
                    <div className="font-medium mr-2">No. of sellers:</div>
                    <div>{item["Number of sellers on the listing"]}</div>
                  </div>
                  <div className="flex justify-between">
                    <div className="font-medium mr-2">No. of Reviews: </div>
                    <div>{item["Number of Reviews"]}</div>
                  </div>
                </div>
              </div>
              {/* links */}
              <div className="flex gap-5 lg:pr-5">
                <div className="flex flex-col  text-[14px]">
                  <div className=" hover-effect shadow-none mb-2">
                    <Link
                      to={`${item["Amazon URL"]}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className=" no-underline text-black flex items-center"
                    >
                      <LinkOutlined
                        className="icon-img text-[15px] mr-2 font-bold"
                        rotate={155}
                      />
                      <span className="mr-1">Amazon Price: </span>
                      <span> $ {item["Amazon Price"]} </span>
                    </Link>{" "}
                  </div>

                  <div className=" hover-effect border-none shadow-none">
                    <Link
                      className="no-underline text-black flex items-center "
                      to={`${item["Sourcing URL"]}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <LinkOutlined
                        className="icon-img text-[15px] mr-2 font-bold"
                        rotate={155}
                      />
                      <span className="mr-1"> Sourcing Price: </span>{" "}
                      <span>$ {item["Sourcing Price"]}</span>
                    </Link>{" "}
                  </div>
                </div>

                <div className="">
                  <img className="w-10" src={reloadIcon} alt="" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DatabaseTable;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
// import Carousel from "react-simply-carousel";
import { imageIcon } from "../images";
import "./style.css";
import { initialState } from "../data";
const baseUrl = `https://qa7.parentune.com/api/subscription/subscribe/v2/plans`;
const { correctIcon, lockIcon } = imageIcon;

function ParentPlan() {
  const [plansData, setPlanData] = useState([]);
  const [activePlan, setActivePlan] = useState(initialState);
  // const [activeSlide, setActiveSlide] = useState(0);
  const [planBannerData, setPlanBannerData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(baseUrl);
        console.log(response.data.data);
        setPlanData(response.data?.data);
        let filterData = response.data.data.map(
          ({ plan_id, plan_name, button_background, tagged_as }, ind) => ({
            plan_name,
            plan_id,
            button_background,
            tagged_as,
          })
        );
        setPlanBannerData(filterData);
        let activePlanData = response.data.data[0];
        setActivePlan(activePlanData);
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);

  const activePlanHandler = (planId) => {
    const filterData = plansData.find((item) => item.plan_id === planId)
    setActivePlan(filterData)
  }

  return (
    <>
      <h2 className="choose-plan flex justify-start font-roboto m-2 text-xl font-bold">
        <span style={{ color: "#6b7280" }} className="text-gray-500 mr-2">
          <IoIosArrowBack />
        </span>
        Choose your plan
      </h2>
      <div>
        <div className="mt-6">
          <img className="m-2" src={activePlan.banner} alt="banner" />
        </div>
        <div className="flex-col m-5">
          <div className="font-roboto text-xl font-bold">
            {activePlan.claims}
          </div>
          <div className="flex justify-around items-center mt-4 mb-4">
            {/* <Carousel
              containerProps={{
                style: {
                  width: "100%",
                  height: "100%",
                  justifyContent: "space-between",
                  userSelect: "none",
                },
              }}
              preventScrollOnSwipe
              swipeTreshold={60}
              activeSlideIndex={activeSlide}
              activeSlideProps={{
                style: {
                  background: "blue",
                },
              }}
              onRequestChange={setActiveSlide}
              dotsNav={{
                show: true,
                itemBtnProps: {
                  style: {
                    height: 16,
                    width: 16,
                    borderRadius: "50%",
                    border: 0,
                  },
                },
                activeItemBtnProps: {
                  style: {
                    height: 16,
                    width: 16,
                    borderRadius: "50%",
                    border: 0,
                    background: "black",
                  },
                },
              }}
            > */}
            {planBannerData.slice(0, 3).map((item, ind) => {
              return (
                <div style={{ width: "100%" }} key={ind.toString()} className="banner flex gap-2">
                  <button
                    onClick={() => activePlanHandler(item.plan_id)}
                    style={{
                      width: "120px",
                      cursor: "pointer",
                      borderRadius: "10px",
                      marginRight:"2px",
                      backgroundImage: `url("${item.button_background}")`,
                    }}
                  >
                    {item.plan_name}
                  </button>
                </div>
              );
            })}
            {/* </Carousel> */}
          </div>
          {activePlan.description.data_monthly.map((elem, index) => {
            return (
              <PlanMonthlyDescription
                key={index.toString()}
                monthlyData={elem}
              />
            );
          })}
          <button button className="plan-start-btn rounded-md mt-5">
            {activePlan.cta}
          </button>
        </div>
      </div>
    </>
  );
}

export default ParentPlan;

function PlanMonthlyDescription({ monthlyData }) {
  return (
    <div className="heading-plan flex justify-start items-center mt-2">
      {monthlyData.isLocked ? (
        <img className="mr-3" src={lockIcon} alt="lockIcon" />
      ) : (
        <img className="mr-3" src={correctIcon} alt="correctIcon" />
      )}
      {monthlyData.text}
    </div>
  );
}

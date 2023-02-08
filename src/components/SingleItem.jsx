import React from "react";
import arrow from "../images/arrow.png";

const SingleItem = ({ item }) => {
  return (
    <div>
      <div className="flex w-full justify-between p-2 font-[100] font-base border border-[#e5e5e5] rounded-[10px] my-3">
        <div className="w-[5%] ">
          <p>{item.id}</p>
        </div>
        <div className="w-[40%] flex gap-3">
          <div className="w-[20%] ">
            <img src={item?.photo} alt={item.username} className="rounded-lg" />
          </div>
          <p className="text-white">{item.title}</p>
        </div>
        <div className="w-[35%] flex gap-4">
          <div className="rounded-full ">
            <img
              src={item?.photo}
              alt={item.username}
              className="rounded-full h-[24px] w-[24px]"
            />
          </div>
          <p className="text-sec font-[100]">{item.username}</p>
        </div>
        <div className="w-[10%] flex justify-end gap-3 items-center">
          <p className="text-white">{item.like}</p>
          <div className="">
            <img
              src={arrow}
              alt="arrow up"
              className="rounded-full w-[10px] h-[12.5px] object-contain "
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleItem;

import React, { useEffect } from "react";
import SingleItem from "./SingleItem";
import MkdSDK from "../utils/MkdSDK";
import { useState } from "react";
import Pagination from "./Pagination";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ItemTypes } from "../utils/drag";

const Board = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.POST,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  let sdk = new MkdSDK();
  useEffect(() => {
    const payload = { payload: {}, page: currentPage, limit: limit };
    const fetchData = async () => {
      const data = await sdk.callRestAPI(payload, "PAGINATE");
      setData(data.list);
      setTotal(data.num_pages);
      setLimit(data.limit);
    };
    fetchData();
  }, [currentPage]);

  return (
    <div className="my-10">
      <div className="mt-10">
        <div className="flex w-full justify-between">
          <div className="w-[5%]">
            <p>#</p>
          </div>
          <div className="w-[40%]">
            <p>Title</p>
          </div>
          <div className="w-[35%]">
            <p>Author</p>
          </div>
          <div className="w-[10%] flex justify-end">
            <p>Most Liked</p>
          </div>
        </div>
        <div>
          {data.map((item) => (
            <SingleItem key={item.id} item={item} ref={drag} />
          ))}
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        data={total}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Board;

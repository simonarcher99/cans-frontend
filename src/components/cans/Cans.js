import React, { useEffect, useState } from "react";

import Card from "../UI/Card";
import classes from "./Cans.module.css";
import Can from "./Can";
import NewCanForm from "./NewCanForm";
import { cansActions } from "../../store/cans-slice";
import { useDispatch, useSelector } from "react-redux";

import { BACKEND_URL } from "../../utilities/constants.js";
import SearchBar from "../UI/SearchBar";

const Cans = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const cansData = useSelector((state) => state.cans.items);
  const dispatch = useDispatch();
  const [filteredData, setFilteredData] = useState(cansData);

  // const [cansData, setCansData] = useState([]);

  const getBackendData = (BACKEND_URL) => {
    fetch(BACKEND_URL + "api/cans", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        data.data.forEach((item) => dispatch(cansActions.addItem(item)));
        return data;
      });
  };

  useEffect(() => {
    getBackendData(BACKEND_URL);
    setFilteredData(cansData);
  }, []);

  const onSearchHandler = (searchTerm) => {
    if (searchTerm) {
      let filteredCans = cansData.filter((can) => {
        can.item.includes(searchTerm);
      });
      setFilteredData(filteredCans);
    }
  };

  return (
    <Card>
      <h1 className={classes.banner}>Can Counter</h1>
      <NewCanForm />
      <SearchBar onSearchHandler={onSearchHandler} />
      {filteredData.map((can) => (
        <Can item={can.item} quantity={can.quantity} key={can.id} id={can.id} />
      ))}
    </Card>
  );
};

export default Cans;

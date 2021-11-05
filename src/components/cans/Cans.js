import React, { useCallback, useEffect, useState } from "react";

import Card from "../UI/Card";
import classes from "./Cans.module.css";
import Can from "./Can";
import NewCanForm from "./NewCanForm";
import { cansActions } from "../../store/cans-slice";
import { useDispatch, useSelector } from "react-redux";

import { BACKEND_URL } from "../../utilities/constants.js";
import SearchBar from "../UI/SearchBar";

const Cans = () => {
  const cansData = useSelector((state) => state.cans.items);
  const authToken = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const getBackendData = useCallback(
    (BACKEND_URL) => {
      fetch(BACKEND_URL + "api/can/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Token ${authToken}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("data:", data);
          data.forEach((item) => dispatch(cansActions.addItem(item)));
          return data;
        });
    },
    [dispatch, authToken]
  );

  useEffect(() => {
    getBackendData(BACKEND_URL);
  }, [getBackendData]);

  const onSearchHandler = (value) => {
    setSearchTerm(value);
  };

  let data;

  if (searchTerm) {
    data = cansData.filter((can) =>
      can.item.toLowerCase().includes(searchTerm.toLowerCase())
    );
  } else {
    data = cansData;
  }

  return (
    <Card>
      <h1 className={classes.banner}>Can Counter</h1>
      <NewCanForm />
      <SearchBar onSearchHandler={onSearchHandler} />
      {data.map((can) => (
        <Can
          item={can.title}
          quantity={can.quantity}
          key={can.id}
          id={can.id}
        />
      ))}
    </Card>
  );
};

export default Cans;

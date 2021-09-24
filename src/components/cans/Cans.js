import React, { useEffect, useState } from "react";

import Card from "../UI/Card";
import classes from "./Cans.module.css";
import Can from "./Can";
import NewCanForm from "./NewCanForm";

import { BACKEND_URL } from "../../utilities/constants.js";

const Cans = () => {
  const [cansData, setCansData] = useState([]);

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
        setCansData((state) => [...data.data]);

        return data;
      });
  };

  useEffect(() => {
    getBackendData(BACKEND_URL);
  }, []);

  return (
    <Card>
      <h1 className={classes.banner}>Cupboard Inventory</h1>
      <NewCanForm setCansData={setCansData} />
      {cansData.map((can) => (
        <Can
          item={can.item}
          quantity={can.quantity}
          key={can.id}
          id={can.id}
          setCansData={setCansData}
        />
      ))}
    </Card>
  );
};

export default Cans;

import React, { useEffect } from "react";

import Card from "../UI/Card";
import classes from "./Cans.module.css";
import Can from "./Can";
import NewCanForm from "./NewCanForm";
import { cansActions } from "../../store/cans-slice";
import { useDispatch, useSelector } from "react-redux";

import { BACKEND_URL } from "../../utilities/constants.js";

const Cans = () => {

  const cansData = useSelector((state) => state.cans.items);
  const dispatch = useDispatch();

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
        // setCansData((state) => [...data.data]);
        data.data.forEach(item => dispatch(cansActions.addItem(item)))
        return data;
      });
  };

  useEffect(() => {
    getBackendData(BACKEND_URL);
  }, []);

  return (
    <Card>
      <h1 className={classes.banner}>Can Counter</h1>
      <NewCanForm />
      {cansData.map((can) => (
        <Can
          item={can.item}
          quantity={can.quantity}
          key={can.id}
          id={can.id}
        />
      ))}
    </Card>
  );
};

export default Cans;

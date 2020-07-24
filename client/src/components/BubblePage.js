import React, { useState, useEffect } from "react";
import {axiosWithAuth} from "../utils/axiosWithAuth";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

export default function BubblePage () {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  const returnColors = () => {
    axiosWithAuth()
      .get("http://localhost:5000/api/colors")
      .then(res => {
        setColorList(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
      returnColors()}, [])

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} returnColors={returnColors} />
      <Bubbles colors={colorList} />
    </>
  );
};

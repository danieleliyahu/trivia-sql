import React from "react";

const PopupWindow = ({ popup, popupRateState }) => {
  return (
    <>
      <div>{popup}</div>
      <div>{popupRateState}</div>
    </>
  );
};

export default PopupWindow;

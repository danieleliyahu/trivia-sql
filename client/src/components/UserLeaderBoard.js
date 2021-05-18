import React from "react";
import { useEffect } from "react";

const UserLeaderBoard = ({ userleaderBoardTable, getUserLeaderBoard }) => {
  useEffect(() => {
    getUserLeaderBoard();
  }, []);
  return (
    <div>
      <div> {userleaderBoardTable}</div>
    </div>
  );
};

export default UserLeaderBoard;

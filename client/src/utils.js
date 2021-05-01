const axios = require("axios");

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// const saveGameResult = async (input, score) => {
//   await axios({
//     method: "post",
//     url: "/leaderBoard",
//     data: {
//       name: input,
//       score: score,
//       created_at: Date.now(),
//       updated_at: Date.now(),
//     },
//   });
// };
const saveUserScore = async (email, userName,score) => {
  console.log(email,"111111111111111111111111")
  console.log(score,"2222222222222222222222")
  console.log(userName,"3333333333333333333333")
  await axios({
    method: "post",
    url: "/userscore",
    data: {
      email: email,
      score: score,
      userName: userName,
      created_at: Date.now(),
      updated_at: Date.now(),
    },
  });
};
// getLeaderBoard
const gameOver = (input, score,userName, email,strike, popupWindow,getLeaderBoard,setStrike ) => {
  console.log(email)
  console.log(userName)
  console.log(score)
  setStrike(0)
  // alert(`GAME OVER ${userName}. YOUR SCORE IS ${score}. YOUR RANK IS 1 `);
  saveUserScore(email,userName,score)
  popupWindow();
  // getLeaderBoard();
};

module.exports = { shuffleArray, gameOver };

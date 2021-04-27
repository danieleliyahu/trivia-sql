const axios = require("axios");

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const saveGameResult = async (input, score) => {
  await axios({
    method: "post",
    url: "/leaderBoard",
    data: {
      name: input,
      score: score,
      created_at: Date.now(),
      updated_at: Date.now(),
    },
  });
};

const gameOver = (input, score, strike, popupWindow, getLeaderBoard) => {
  // alert(`GAME OVER ${input}. YOUR SCORE IS ${score}. YOUR RANK IS 1 `);
  saveGameResult(input, score);
  popupWindow();
  getLeaderBoard();
};

module.exports = { shuffleArray, gameOver };

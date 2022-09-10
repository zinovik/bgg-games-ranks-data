const https = require("https");
const fs = require("fs");

const BGG_GAMES_RANKS_URL =
  "https://raw.githubusercontent.com/zinovik/bgg-games-ranks-data/main/bgg-games-ranks.json";
const BGG_GAMES_RANKS_FILE = "./bgg-games-ranks.json";

const request = (url) =>
  new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        const data = [];
        res.on("data", (chunk) => data.push(chunk));
        res.on("end", () =>
          resolve(JSON.parse(Buffer.concat(data).toString()))
        );
      })
      .on("error", (err) => {
        reject(err.message);
      });
  });

(async () => {
  const bggGamesRanks = await request(BGG_GAMES_RANKS_URL);

  fs.writeFileSync(BGG_GAMES_RANKS_FILE, JSON.stringify(bggGamesRanks));
})();

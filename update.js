const https = require("https");
const fs = require("fs");
const { exec } = require("child_process");
const { promisify } = require("util");

const BGG_GAMES_RANKS_URL =
  "https://bgg-games-ranks.vercel.app/api/get-games?amount=2000";
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

  console.log("Formatting file...");
  await promisify(exec)(`npx prettier ${BGG_GAMES_RANKS_FILE} --write`);

  console.log("Done!");
})();

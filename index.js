import express from "express";
import axios from "axios";
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const X_Auth_Token = process.env.X_Auth_Token;

const config = {
  headers: {
    "X-Auth-Token": `${X_Auth_Token}`,
  },
};

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

function extract_short_names(data) {
  const teamShortNames = data.standings[0].table.map(
    (team) => team.team.shortName
  );
  return teamShortNames;
}

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/league-select", async (req, res) => {
  const selected_league = req.body.league;
  const URL = `http://api.football-data.org/v4/competitions/${selected_league}/standings`;

  try {
    const result = await axios.get(URL, config);
    let debug = extract_short_names(result);
    console.log(debug);
  } catch (error) {
    console.log(`Exited with Error Code ${error}`);
  }
});

app.listen(PORT, () => {
  console.log(`server open on port ${PORT}`);
});

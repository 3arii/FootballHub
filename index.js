import express from "express";
import axios from "axios";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 3000;
const X_Auth_Token = process.env.TOKEN;

let short_names = [];

const config = {
  headers: {
    "X-Auth-Token": `${X_Auth_Token}`,
  },
};

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

function short_name_array(result) {
  short_names = [];
  for (let i = 0; i < result.data.standings[0].table.length; i++) {
    short_names.push(result.data.standings[0].table[i].team.shortName);
  }
  return short_names;

  // console.log(result.data.standings[0].table[0].team.shortName);
}

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/league-select", async (req, res) => {
  const selected_league = req.body.league;
  try {
    const result = await axios.get(
      `http://api.football-data.org/v4/competitions/${selected_league}/standings`,
      config
    );
    short_name_array(result);
    console.log(short_names[1]);
  } catch (error) {
    console.log(`Exited with Error Code ${error}`);
  }
});

app.listen(PORT, () => {
  console.log(`server open on port ${PORT}`);
});

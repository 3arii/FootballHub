import express from "express";
import axios from "axios";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 3000;
const X_Auth_Token = process.env.TOKEN;

let short_names = [];
let points_array = [];

const config = {
  headers: {
    "X-Auth-Token": `${X_Auth_Token}`,
  },
};

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

function emoji_checker(team_name) {
  switch (team_name) {
    case "Liverpool":
      return " 🐉";
    case "Man City":
      return " ⛵️";
    case "Man United":
      return " 👹";
    case "Chelsea":
      return " 🦁";
    case "Arsenal":
      return " 🔴";
    case "Tottenham":
      return " 🐓";
    case "Everton":
      return " 🍬";
    case "West Ham":
      return " 🔨";
    case "Leicester City":
      return " 🦊";
    case "Aston Villa":
      return " 🏰";
    case "Wolverhampton":
      return " 🐺";
    case "Newcastle":
      return " 🖤";
    case "Southampton":
      return " 🌳";
    case "Crystal Palace":
      return " 🦅";
    case "Brighton Hove":
      return " 🌊";
    case "Bournemouth":
      return " ⚽️";
    case "Burnley":
      return " 🔥";
    case "Norwich City":
      return " 🐥";
    case "Watford":
      return " 🐝";
    case "Brentford":
      return " 🐝";
    case "Nottingham":
      return " 🌳";
    case "Fulham":
      return " ⚪";
    case "Leeds United":
      return " 🤍";
    case "Real Madrid":
      return " 👑";
    case "Girona":
      return " 🌹";
    case "Barça":
      return " 🐐";
    case "Atleti":
      return " 🔱";
    case "Athletic":
      return " 🦁";
    case "Real Betis":
      return " 🟢⚪";
    case "Real Sociedad":
      return " 🔵⚪";
    case "Las Palmas":
      return " 🌴";
    case "Valencia":
      return " 🦇";
    case "Osasuna":
      return " 🟥⬛";
    case "Getafe":
      return " 🔵";
    case "Villarreal":
      return " 🟡";
    case "Alavés":
      return " 🔵⚪";
    case "Sevilla FC":
      return " 🔴⚪";
    case "Mallorca":
      return " 🌊";
    case "Rayo Vallecano":
      return " ⚡️";
    case "Celta":
      return " 🔵";
    case "Cádiz CF":
      return " 🟡🔵";
    case "Granada":
      return " 🍇";
    case "Almería":
      return " 🔴⚪";
    case "Leverkusen":
      return " 🦁";
    case "Bayern":
      return " 🔴⚪";
    case "Stuttgart":
      return " 🚗";
    case "Dortmund":
      return " 🟡⚫";
    case "RB Leipzig":
      return " 🐂";
    case "Frankfurt":
      return " 🦅";
    case "Hoffenheim":
      return " 🔵⚪";
    case "Bremen":
      return " 🟢⚪";
    case "Freiburg":
      return " 🌲";
    case "Augsburg":
      return " 🔴⚪";
    case "Heidenheim":
      return " 🛡️";
    case "M'gladbach":
      return " 🟢⚪";
    case "Wolfsburg":
      return " 🐺";
    case "Union Berlin":
      return " 🟥⬜";
    case "Bochum":
      return " 🔵⚪";
    case "1. FC Köln":
      return " 🐐";
    case "Mainz":
      return " 🔴⚪";
    case "Darmstadt":
      return " 🔵⚪";
    case "Inter":
      return " 🐍";
    case "Juventus":
      return " 🦓";
    case "Milan":
      return " 🇮🇹";
    case "Bologna":
      return " 🍝";
    case "Roma":
      return " 🐺";
    case "Atalanta":
      return " 🏹";
    case "Napoli":
      return " 🌋";
    case "Fiorentina":
      return " 🌸";
    case "Lazio":
      return " 🦅";
    case "Torino":
      return " 🐂";
    case "Monza":
      return " 🏎️";
    case "Genoa":
      return " 🚢";
    case "Lecce":
      return " ☀️";
    case "Empoli":
      return " 🚂";
    case "Udinese":
      return " ⚫⚪";
    case "Frosinone":
      return " 🌄";
    case "Verona":
      return " 🎭";
    case "Cagliari":
      return " 🏖️";
    case "Sassuolo":
      return " 🟢";
    case "Salernitana":
      return " ⚓";
    case "PSG":
      return " 🗼";
    case "Brest":
      return " ⚓";
    case "Monaco":
      return " 🏎️";
    case "Lille":
      return " 🐶";
    case "Nice":
      return " ☀️";
    case "RC Lens":
      return " 🔴🟡";
    case "Marseille":
      return " ⛵";
    case "Stade Rennais":
      return " 🔴⚫";
    case "Stade de Reims":
      return " 🍾";
    case "Toulouse":
      return " 🌸";
    case "Olympique Lyon":
      return " 🦁";
    case "Strasbourg":
      return " 🕍";
    case "Lorient":
      return " 🐟";
    case "Nantes":
      return " 🟡🟢";
    case "Le Havre":
      return " 🚢";
    case "Montpellier":
      return " ☀️";
    case "FC Metz":
      return " 🐉";
    case "Clermont Foot":
      return " 🌋";

    default:
      return "";
  }
}

function short_name_array(result) {
  short_names = [];
  for (let i = 0; i < result.data.standings[0].table.length; i++) {
    let team_name = result.data.standings[0].table[i].team.shortName;
    short_names.push(team_name + emoji_checker(team_name));
  }
  return short_names;
}

function points_array_maker(result) {
  points_array = [];
  console.log(`Points: ${result.data.standings[0].table[0].points}`);
  for (let i = 0; i < result.data.standings[0].table.length; i++) {
    let point = result.data.standings[0].table[i].points;
    points_array.push(point);
  }
  return points_array;
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
    points_array_maker(result);
    console.log(points_array);
    res.render("index.ejs", { content: short_names, points: points_array });
  } catch (error) {
    console.log(`Exited with Error Code ${error}`);
  }
});

app.listen(PORT, () => {
  console.log(`server open on port ${PORT}`);
});

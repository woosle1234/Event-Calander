import React from "react";
import axios from "axios";
import digimon from "../Asset/digimon.png";
import magic from "../Asset/mtg.png";
import yugioh from "../Asset/yugioh.webp";
import metazoo from "../Asset/metazoo.png";
import dragonball from "../Asset/dragonball.png";
import flesh from "../Asset/flesh.png";
import onepiece from "../Asset/onepiece.png";
import speedduel from "../Asset/speedduel.png";
import vanguard from "../Asset/vanguard.png";
import weiss from "../Asset/weiss.png";
import pokemon from "../Asset/pokemon.png";
import blank from "../Asset/401gameslogo.png";

class Calander extends React.Component {
  constructor(props) {
    super(props);
    window.calanderComponent = this;
    this.state = {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: [],
      other: [],
      table: [],
      date: "",
      loading: true,
      weekday: 0,
      tableBody: [],
      games: [
        "MTG",
        "Yugioh",
        "Weiss Schwarz",
        "Dragon Ball Super",
        "Flesh and Blood",
        "Pokemon",
        "Digimon",
        "One Piece",
        "Speed Duel",
        "Metazoo",
        "Vanguard",
        "Magic: The Gathering",
        "MetaZoo"
      ],
      images: {
        MTG: magic,
        Yugioh: yugioh,
        "Weiss Schwarz": weiss,
        "Dragon Ball Super": dragonball,
        "Flesh and Blood": flesh,
        Pokemon: pokemon,
        Digimon: digimon,
        "One Piece": onepiece,
        "Speed Duel": speedduel,
        Metazoo: metazoo,
        Vanguard: vanguard,
        "Magic: The Gathering": magic,
        MetaZoo: metazoo,
        blanklogo: blank
      }
    };
  }

  async componentDidMount() {
    //set up event calander
    await axios
      .get(
        "https://store.401games.ca/collections/vaughan-events/products.json?limit=250"
      )
      .then((res) => {
        let data = res.data.products;
        console.log(data)
        let mon, tues, wed, thurs, fri, sat, sun, oth;
        mon = [];
        tues = [];
        wed = [];
        thurs = [];
        fri = [];
        sat = [];
        sun = [];
        oth = [];
        for (let i = 0; i < data.length; i++) {
          if (data[i].variants.length > 1) {
            oth.push(data[i]);
            let time = [];
            for (let x = 0; x < data[i].variants.length; x++) {
              let title = data[i].variants[x].title;
              let timeStr = title.substring(
                title.includes("PM")
                  ? title.indexOf("PM") - 6
                  : title.indexOf("AM") - 6,
                data[i].variants[x].title.includes("PM")
                  ? data[i].variants[x].title.indexOf("PM") + 2
                  : data[i].variants[x].title.indexOf("AM") + 2
              );
              if (timeStr.includes("@")) {
                timeStr = timeStr.substring(timeStr.indexOf("@") + 1);
              }
              if (!timeStr.includes(":")) {
                timeStr = timeStr.replace(" ", "");
                let index = timeStr.includes("PM")
                  ? timeStr.indexOf("PM")
                  : timeStr.indexOf("AM");
                timeStr =
                  timeStr.slice(0, index) + ":00 " + timeStr.slice(index);
              }
              timeStr = timeStr.replaceAll("t", "");
              time.push(timeStr.trim());
            }

            oth[oth.length - 1].time = time;
          } else {
            let day = data[i].tags.find((element) =>
              element.includes("Events By Day_")
            );
            if (
              day !== undefined &&
              data[i].tags.find((element) => element === "Weekly") !== undefined
            ) {
              day = day.replace("Events By Day_", "");
              switch (day) {
                case "Monday":
                  mon.push(data[i]);
                  mon[mon.length - 1].time = this.getTime(data[i]);
                  mon[mon.length - 1].title = mon[mon.length - 1].title.replace(
                    "Vaughan Events - ",
                    ""
                  );
                  mon[mon.length - 1].title = mon[
                    mon.length - 1
                  ].title.substring(
                    mon[mon.length - 1].title.indexOf(
                      this.state.games.find((element) =>
                        mon[mon.length - 1].title.includes(element)
                      )
                    )
                  );
                  break;
                case "Tuesday":
                  tues.push(data[i]);
                  tues[tues.length - 1].time = this.getTime(data[i]);
                  tues[tues.length - 1].title = tues[
                    tues.length - 1
                  ].title.replace("Vaughan Events - ", "");
                  tues[tues.length - 1].title = tues[
                    tues.length - 1
                  ].title.substring(
                    tues[tues.length - 1].title.indexOf(
                      this.state.games.find((element) =>
                        tues[tues.length - 1].title.includes(element)
                      )
                    )
                  );
                  break;
                case "Wednesday":
                  wed.push(data[i]);
                  wed[wed.length - 1].time = this.getTime(data[i]);
                  wed[wed.length - 1].title = wed[wed.length - 1].title.replace(
                    "Vaughan Events - ",
                    ""
                  );
                  wed[wed.length - 1].title = wed[
                    wed.length - 1
                  ].title.substring(
                    wed[wed.length - 1].title.indexOf(
                      this.state.games.find((element) =>
                        wed[wed.length - 1].title.includes(element)
                      )
                    )
                  );
                  break;
                case "Thursday":
                  thurs.push(data[i]);
                  thurs[thurs.length - 1].time = this.getTime(data[i]);
                  thurs[thurs.length - 1].title = thurs[
                    thurs.length - 1
                  ].title.replace("Vaughan Events - ", "");
                  thurs[thurs.length - 1].title = thurs[
                    thurs.length - 1
                  ].title.substring(
                    thurs[thurs.length - 1].title.indexOf(
                      this.state.games.find((element) =>
                        thurs[thurs.length - 1].title.includes(element)
                      )
                    )
                  );
                  break;
                case "Friday":
                  fri.push(data[i]);
                  fri[fri.length - 1].time = this.getTime(data[i]);
                  fri[fri.length - 1].title = fri[fri.length - 1].title.replace(
                    "Vaughan Events - ",
                    ""
                  );
                  fri[fri.length - 1].title = fri[
                    fri.length - 1
                  ].title.substring(
                    fri[fri.length - 1].title.indexOf(
                      this.state.games.find((element) =>
                        fri[fri.length - 1].title.includes(element)
                      )
                    )
                  );
                  break;
                case "Saturday":
                  sat.push(data[i]);
                  sat[sat.length - 1].time = this.getTime(data[i]);
                  sat[sat.length - 1].title = sat[sat.length - 1].title.replace(
                    "Vaughan Events - ",
                    ""
                  );
                  sat[sat.length - 1].title = sat[
                    sat.length - 1
                  ].title.substring(
                    sat[sat.length - 1].title.indexOf(
                      this.state.games.find((element) =>
                        sat[sat.length - 1].title.includes(element)
                      )
                    )
                  );
                  break;
                case "Sunday":
                  sun.push(data[i]);
                  sun[sun.length - 1].time = this.getTime(data[i]);
                  sun[sun.length - 1].title = sun[sun.length - 1].title.replace(
                    "Vaughan Events - ",
                    ""
                  );
                  sun[sun.length - 1].title = sun[
                    sun.length - 1
                  ].title.substring(
                    sun[sun.length - 1].title.indexOf(
                      this.state.games.find((element) =>
                        sun[sun.length - 1].title.includes(element)
                      )
                    )
                  );
                  break;
                default:
                  oth.push(data[i]);
                  let time = [];
                  for (let x = 0; x < data[i].variants.length; x++) {
                    let title = data[i].variants[x].title;
                    let timeStr = title.substring(
                      title.includes("PM")
                        ? title.indexOf("PM") - 6
                        : title.indexOf("AM") - 6,
                      data[i].variants[x].title.includes("PM")
                        ? data[i].variants[x].title.indexOf("PM") + 2
                        : data[i].variants[x].title.indexOf("AM") + 2
                    );
                    if (timeStr.includes("@")) {
                      timeStr = timeStr.substring(timeStr.indexOf("@") + 1);
                    }
                    if (!timeStr.includes(":")) {
                      timeStr = timeStr.replace(" ", "");
                      let index = timeStr.includes("PM")
                        ? timeStr.indexOf("PM")
                        : timeStr.indexOf("AM");
                      timeStr =
                        timeStr.slice(0, index) + ":00 " + timeStr.slice(index);
                    }
                    time.push(timeStr.trim());
                  }
                  oth[oth.length - 1].time = time;
                  break;
              }
            } else {
              //Set the times for other events
              oth.push(data[i]);
              oth[oth.length - 1].title = oth[oth.length - 1].title.replace(
                "Vaughan Events - ",
                ""
              );

              let time = [];
              let editedBody = data[i].body_html
                .replaceAll("<b>", "")
                .replaceAll("</b>", "")
                .replaceAll("<span>", "")
                .replaceAll("</span>", "")
                .replaceAll("<strong>", "")
                .replaceAll("</strong>", "");

              let firstIdx = 0;
              let secondIdx = 0;
              if (editedBody.includes("PM")) {
                firstIdx = editedBody.indexOf("PM") - 6;
                secondIdx = editedBody.indexOf("PM") + 2;
              } else if (editedBody.includes("AM")) {
                firstIdx = editedBody.indexOf("AM") - 6;
                secondIdx = editedBody.indexOf("AM") + 2;
              } else if (editedBody.includes("p.m.")) {
                firstIdx = editedBody.indexOf("p.m.") - 6;
                secondIdx = editedBody.indexOf("p.m.") + 4;
              } else if (editedBody.includes("a.m.")) {
                firstIdx = editedBody.indexOf("a.m.") - 6;
                secondIdx = editedBody.indexOf("a.m.") + 4;
              }
              let slicedText = editedBody.slice(firstIdx, secondIdx);
              slicedText = slicedText
                .replace("p.m.", "PM")
                .replace("a.m.", "AM");
              time.push(slicedText.trim());

              oth[oth.length - 1].time = time;
            }
          }
        }

        this.setOtherEvents(oth, mon, tues, wed, thurs, fri, sat, sun);

        mon.sort(this.sortEvents);
        tues.sort(this.sortEvents);
        wed.sort(this.sortEvents);
        thurs.sort(this.sortEvents);
        fri.sort(this.sortEvents);
        sat.sort(this.sortEvents);
        sun.sort(this.sortEvents);

        this.setState({
          monday: mon,
          tuesday: tues,
          wednesday: wed,
          thursday: thurs,
          friday: fri,
          saturday: sat,
          sunday: sun,
          other: oth
        });
        this.setCalander(oth, mon, tues, wed, thurs, fri, sat, sun);
      })
      .catch((err) => {
        this.setState({ loading: false });
        console.log("Cannot get data from 401 games" + err);
      });
      
  }

  getYugiohEvents() {
    let eventDays = [];
    eventDays[0] = "Yugioh Events";
    eventDays[1] = "Weekly Every";
    eventDays[2] = "";
    let game = "Yugioh";
    for (let i = 0; i < this.state.monday.length; i++) {
      if (
        this.state.monday[i].tags.includes("Weekly") &&
        this.state.monday[i].tags.includes(game)
      ) {
        eventDays[2] = eventDays[2] + "Monday, ";

        break;
      }
    }
    for (let i = 0; i < this.state.tuesday.length; i++) {
      if (
        this.state.tuesday[i].tags.includes("Weekly") &&
        this.state.tuesday[i].tags.includes(game)
      ) {
        eventDays[2] = eventDays[2] + "Tuesday, ";
        break;
      }
    }
    for (let i = 0; i < this.state.wednesday.length; i++) {
      if (
        this.state.wednesday[i].tags.includes("Weekly") &&
        this.state.wednesday[i].tags.includes(game)
      ) {
        eventDays[2] = eventDays[2] + "Wednesday, ";
        break;
      }
    }
    for (let i = 0; i < this.state.thursday.length; i++) {
      if (
        this.state.thursday[i].tags.includes("Weekly") &&
        this.state.thursday[i].tags.includes(game)
      ) {
        eventDays[2] = eventDays[2] + "Thursday, ";
        break;
      }
    }
    for (let i = 0; i < this.state.friday.length; i++) {
      if (
        this.state.friday[i].tags.includes("Weekly") &&
        this.state.friday[i].tags.includes(game)
      ) {
        eventDays[2] = eventDays[2] + "Friday, ";
        break;
      }
    }
    for (let i = 0; i < this.state.saturday.length; i++) {
      if (
        this.state.saturday[i].tags.includes("Weekly") &&
        this.state.saturday[i].tags.includes(game)
      ) {
        eventDays[2] = eventDays[2] + "Saturday, ";
        break;
      }
    }
    for (let i = 0; i < this.state.sunday.length; i++) {
      if (
        this.state.sunday[i].tags.includes("Weekly") &&
        this.state.sunday[i].tags.includes(game)
      ) {
        eventDays[2] = eventDays[2] + "Sunday, ";
        break;
      }
    }
    eventDays[2] = eventDays[2].slice(0, -2);
    return eventDays;
  }

  getMagicEvents() {
    let eventDays = [];
    eventDays[0] = "Magic: The Gathering Events";
    eventDays[1] = "Weekly Every";
    eventDays[2] = "";
    let game = "Magic: The Gathering";
    for (let i = 0; i < this.state.monday.length; i++) {
      if (
        this.state.monday[i].tags.includes("Weekly") &&
        this.state.monday[i].tags.includes(game)
      ) {
        eventDays[2] = eventDays[2] + "Monday, ";

        break;
      }
    }
    for (let i = 0; i < this.state.tuesday.length; i++) {
      if (
        this.state.tuesday[i].tags.includes("Weekly") &&
        this.state.tuesday[i].tags.includes(game)
      ) {
        eventDays[2] = eventDays[2] + "Tuesday, ";
        break;
      }
    }
    for (let i = 0; i < this.state.wednesday.length; i++) {
      if (
        this.state.wednesday[i].tags.includes("Weekly") &&
        this.state.wednesday[i].tags.includes(game)
      ) {
        eventDays[2] = eventDays[2] + "Wednesday, ";
        break;
      }
    }
    for (let i = 0; i < this.state.thursday.length; i++) {
      if (
        this.state.thursday[i].tags.includes("Weekly") &&
        this.state.thursday[i].tags.includes(game)
      ) {
        eventDays[2] = eventDays[2] + "Thursday, ";
        break;
      }
    }
    for (let i = 0; i < this.state.friday.length; i++) {
      if (
        this.state.friday[i].tags.includes("Weekly") &&
        this.state.friday[i].tags.includes(game)
      ) {
        eventDays[2] = eventDays[2] + "Friday, ";
        break;
      }
    }
    for (let i = 0; i < this.state.saturday.length; i++) {
      if (
        this.state.saturday[i].tags.includes("Weekly") &&
        this.state.saturday[i].tags.includes(game)
      ) {
        eventDays[2] = eventDays[2] + "Saturday, ";
        break;
      }
    }
    for (let i = 0; i < this.state.sunday.length; i++) {
      if (
        this.state.sunday[i].tags.includes("Weekly") &&
        this.state.sunday[i].tags.includes(game)
      ) {
        eventDays[2] = eventDays[2] + "Sunday, ";
        break;
      }
    }
    eventDays[2] = eventDays[2].slice(0, -2);
    return eventDays;
  }

  getPokemonEvents() {
    let eventDays = [];
    eventDays[0] = "Pokemon Events";
    eventDays[1] = "Weekly Every";
    eventDays[2] = "";
    let game = "Pokemon";
    for (let i = 0; i < this.state.monday.length; i++) {
      if (
        this.state.monday[i].tags.includes("Weekly") &&
        this.state.monday[i].tags.includes(game)
      ) {
        eventDays[2] = eventDays[2] + "Monday, ";

        break;
      }
    }
    for (let i = 0; i < this.state.tuesday.length; i++) {
      if (
        this.state.tuesday[i].tags.includes("Weekly") &&
        this.state.tuesday[i].tags.includes(game)
      ) {
        eventDays[2] = eventDays[2] + "Tuesday, ";
        break;
      }
    }
    for (let i = 0; i < this.state.wednesday.length; i++) {
      if (
        this.state.wednesday[i].tags.includes("Weekly") &&
        this.state.wednesday[i].tags.includes(game)
      ) {
        eventDays[2] = eventDays[2] + "Wednesday, ";
        break;
      }
    }
    for (let i = 0; i < this.state.thursday.length; i++) {
      if (
        this.state.thursday[i].tags.includes("Weekly") &&
        this.state.thursday[i].tags.includes(game)
      ) {
        eventDays[2] = eventDays[2] + "Thursday, ";
        break;
      }
    }
    for (let i = 0; i < this.state.friday.length; i++) {
      if (
        this.state.friday[i].tags.includes("Weekly") &&
        this.state.friday[i].tags.includes(game)
      ) {
        eventDays[2] = eventDays[2] + "Friday, ";
        break;
      }
    }
    for (let i = 0; i < this.state.saturday.length; i++) {
      if (
        this.state.saturday[i].tags.includes("Weekly") &&
        this.state.saturday[i].tags.includes(game)
      ) {
        eventDays[2] = eventDays[2] + "Saturday, ";
        break;
      }
    }
    for (let i = 0; i < this.state.sunday.length; i++) {
      if (
        this.state.sunday[i].tags.includes("Weekly") &&
        this.state.sunday[i].tags.includes(game)
      ) {
        eventDays[2] = eventDays[2] + "Sunday, ";
        break;
      }
    }
    eventDays[2] = eventDays[2].slice(0, -2);
    return eventDays;
  }

  getWeissEvents() {
    let eventDays = [];
    eventDays[0] = "Weiss Schwarz Events";
    eventDays[1] = "Weekly Every";
    eventDays[2] = "";
    let game = "Weiss Schwarz";
    for (let i = 0; i < this.state.monday.length; i++) {
      if (
        this.state.monday[i].tags.includes("Weekly") &&
        this.state.monday[i].tags.includes(game)
      ) {
        eventDays[2] = eventDays[2] + "Monday, ";

        break;
      }
    }
    for (let i = 0; i < this.state.tuesday.length; i++) {
      if (
        this.state.tuesday[i].tags.includes("Weekly") &&
        this.state.tuesday[i].tags.includes(game)
      ) {
        eventDays[2] = eventDays[2] + "Tuesday, ";
        break;
      }
    }
    for (let i = 0; i < this.state.wednesday.length; i++) {
      if (
        this.state.wednesday[i].tags.includes("Weekly") &&
        this.state.wednesday[i].tags.includes(game)
      ) {
        eventDays[2] = eventDays[2] + "Wednesday, ";
        break;
      }
    }
    for (let i = 0; i < this.state.thursday.length; i++) {
      if (
        this.state.thursday[i].tags.includes("Weekly") &&
        this.state.thursday[i].tags.includes(game)
      ) {
        eventDays[2] = eventDays[2] + "Thursday, ";
        break;
      }
    }
    for (let i = 0; i < this.state.friday.length; i++) {
      if (
        this.state.friday[i].tags.includes("Weekly") &&
        this.state.friday[i].tags.includes(game)
      ) {
        eventDays[2] = eventDays[2] + "Friday, ";
        break;
      }
    }
    for (let i = 0; i < this.state.saturday.length; i++) {
      if (
        this.state.saturday[i].tags.includes("Weekly") &&
        this.state.saturday[i].tags.includes(game)
      ) {
        eventDays[2] = eventDays[2] + "Saturday, ";
        break;
      }
    }
    for (let i = 0; i < this.state.sunday.length; i++) {
      if (
        this.state.sunday[i].tags.includes("Weekly") &&
        this.state.sunday[i].tags.includes(game)
      ) {
        eventDays[2] = eventDays[2] + "Sunday, ";
        break;
      }
    }
    eventDays[2] = eventDays[2].slice(0, -2);
    return eventDays;
  }

  getOnePieceEvents() {
    let eventDays = [];
    eventDays[0] = "One Piece Events";
    eventDays[1] = "Weekly Every";
    eventDays[2] = "";
    let game = "One Piece Card Game";
    for (let i = 0; i < this.state.monday.length; i++) {
      if (
        this.state.monday[i].tags.includes("Weekly") &&
        this.state.monday[i].tags.includes(game)
      ) {
        eventDays[2] = eventDays[2] + "Monday, ";

        break;
      }
    }
    for (let i = 0; i < this.state.tuesday.length; i++) {
      if (
        this.state.tuesday[i].tags.includes("Weekly") &&
        this.state.tuesday[i].tags.includes(game)
      ) {
        eventDays[2] = eventDays[2] + "Tuesday, ";
        break;
      }
    }
    for (let i = 0; i < this.state.wednesday.length; i++) {
      if (
        this.state.wednesday[i].tags.includes("Weekly") &&
        this.state.wednesday[i].tags.includes(game)
      ) {
        eventDays[2] = eventDays[2] + "Wednesday, ";
        break;
      }
    }
    for (let i = 0; i < this.state.thursday.length; i++) {
      if (
        this.state.thursday[i].tags.includes("Weekly") &&
        this.state.thursday[i].tags.includes(game)
      ) {
        eventDays[2] = eventDays[2] + "Thursday, ";
        break;
      }
    }
    for (let i = 0; i < this.state.friday.length; i++) {
      if (
        this.state.friday[i].tags.includes("Weekly") &&
        this.state.friday[i].tags.includes(game)
      ) {
        eventDays[2] = eventDays[2] + "Friday, ";
        break;
      }
    }
    for (let i = 0; i < this.state.saturday.length; i++) {
      if (
        this.state.saturday[i].tags.includes("Weekly") &&
        this.state.saturday[i].tags.includes(game)
      ) {
        eventDays[2] = eventDays[2] + "Saturday, ";
        break;
      }
    }
    for (let i = 0; i < this.state.sunday.length; i++) {
      if (
        this.state.sunday[i].tags.includes("Weekly") &&
        this.state.sunday[i].tags.includes(game)
      ) {
        eventDays[2] = eventDays[2] + "Sunday, ";
        break;
      }
    }
    eventDays[2] = eventDays[2].slice(0, -2);
    return eventDays;
  }

  getDigimonEvents() {
    let eventDays = [];
    eventDays[0] = "Digimon Card Game Events";
    eventDays[1] = "Weekly Every";
    eventDays[2] = "";
    let game = "Digimon Card Game";
    for (let i = 0; i < this.state.monday.length; i++) {
      if (
        this.state.monday[i].tags.includes("Weekly") &&
        this.state.monday[i].tags.includes(game)
      ) {
        eventDays[2] = eventDays[2] + "Monday, ";

        break;
      }
    }
    for (let i = 0; i < this.state.tuesday.length; i++) {
      if (
        this.state.tuesday[i].tags.includes("Weekly") &&
        this.state.tuesday[i].tags.includes(game)
      ) {
        eventDays[2] = eventDays[2] + "Tuesday, ";
        break;
      }
    }
    for (let i = 0; i < this.state.wednesday.length; i++) {
      if (
        this.state.wednesday[i].tags.includes("Weekly") &&
        this.state.wednesday[i].tags.includes(game)
      ) {
        eventDays[2] = eventDays[2] + "Wednesday, ";
        break;
      }
    }
    for (let i = 0; i < this.state.thursday.length; i++) {
      if (
        this.state.thursday[i].tags.includes("Weekly") &&
        this.state.thursday[i].tags.includes(game)
      ) {
        eventDays[2] = eventDays[2] + "Thursday, ";
        break;
      }
    }
    for (let i = 0; i < this.state.friday.length; i++) {
      if (
        this.state.friday[i].tags.includes("Weekly") &&
        this.state.friday[i].tags.includes(game)
      ) {
        eventDays[2] = eventDays[2] + "Friday, ";
        break;
      }
    }
    for (let i = 0; i < this.state.saturday.length; i++) {
      if (
        this.state.saturday[i].tags.includes("Weekly") &&
        this.state.saturday[i].tags.includes(game)
      ) {
        eventDays[2] = eventDays[2] + "Saturday, ";
        break;
      }
    }
    for (let i = 0; i < this.state.sunday.length; i++) {
      if (
        this.state.sunday[i].tags.includes("Weekly") &&
        this.state.sunday[i].tags.includes(game)
      ) {
        eventDays[2] = eventDays[2] + "Sunday, ";
        break;
      }
    }
    eventDays[2] = eventDays[2].slice(0, -2);
    return eventDays;
  }

  setOtherEvents(oth, mon, tues, wed, thurs, fri, sat, sun) {
    let today = new Date(Date.now());
    let diff1 = 0 - today.getDay();
    let diff2 = 7 - today.getDay();

    for (let i = 0; i < oth.length; i++) {
      let dates = [];
      if (oth[i].date === undefined) oth[i].date = [];
      for (let x = 0; x < oth[i].variants.length; x++) {
        if (oth[i].variants.length > 1) {
          let splitTitle = oth[i].variants[x].title.split(" ");
          if (splitTitle.length > 3) {
            splitTitle[2] = splitTitle[2]
              .replace("th", "")
              .replace("rd", "")
              .replace("nd", "")
              .replace("st", "");
            splitTitle[3] = splitTitle[3].replace("@", "");
            let newParseTitle = splitTitle.slice(0, 3);
            newParseTitle.push(today.getFullYear());
            let date = new Date(Date.parse(newParseTitle));
            dates.push(date);
          } else {
            splitTitle[1] = splitTitle[1]
              .replace("th", "")
              .replace("rd", "")
              .replace("nd", "")
              .replace("st", "");
            if (splitTitle[2]) splitTitle[2] = splitTitle[2].replace("@", "");
            else {
              oth[i].time = this.getTime(oth[i]);
              console.log(oth[i].time);
            }
            let newParseTitle = splitTitle.slice(0, 2);
            newParseTitle.push(today.getFullYear());
            let date = new Date(Date.parse(newParseTitle));
            dates.push(date);
          }
        } else {
          let splitTitle = oth[i].title.split(" - ");

          splitTitle = splitTitle.find((element) => element.includes("2022"));
          if (splitTitle === undefined) {
          } else {
            splitTitle = splitTitle.replace(",", "").split(" ");
            splitTitle[2] = splitTitle[2]
              .replace("th", "")
              .replace("rd", "")
              .replace("nd", "")
              .replace("st", "");
          }
          let newDate = new Date(Date.parse(splitTitle));
          dates.push(newDate);
        }
      }

      oth[i].date = dates;

      for (let x = 0; x < oth[i].variants.length; x++) {
        const diffTime = oth[i].date[x] - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        let event = oth[i];

        let eventDay =
          oth[i].date[x] !== undefined ? oth[i].date[x] : oth[i].date;
        if (diffDays >= diff1 && diffDays <= diff2) {
          event.time =
            typeof oth[i].time !== typeof [] ? oth[i].time : oth[i].time[x];
          event.date = eventDay;
          if (eventDay instanceof Date && !isNaN(eventDay.valueOf()))
            switch (eventDay.getDay()) {
              case 0:
                sun.push(event);
                break;
              case 1:
                mon.push(event);
                break;
              case 2:
                tues.push(event);
                break;
              case 3:
                wed.push(event);
                break;
              case 4:
                thurs.push(event);
                break;
              case 5:
                fri.push(event);
                break;
              case 6:
                sat.push(event);
                break;
              default:
                break;
            }
        }
      }
    }
  }

  setDate(table) {
    //date
    let today = new Date(Date.now());
    this.setState({ date: today, weekday: today.getDay() });
    this.setTableBody(table, today.getDay());
    this.playScroll();
  }

  playScroll() {
    let el = document.getElementById("calander");

    if (el) {
      this.smooth_scroll_to(el, 1400, 50000);
    }
  }

  resetScroll() {
    let el = document.getElementById("calander");
    if (el) el.scrollTop = 0;
  }

  //sort function for time slot
  sortEvents(a, b) {
    if (a.time < b.time) {
      return -1;
    }
    if (a.time > b.time) {
      return 1;
    }
    return 0;
  }

  //get time for event from the body html
  getTime(event) {
    let time = "";
    let editedBodyText = event.body_html
      .replaceAll("<b>", "")
      .replaceAll("</b>", "")
      .replaceAll("<span>", "")
      .replaceAll("</span>", "")
      .replaceAll("<strong>", "")
      .replaceAll("</strong>", "");
    editedBodyText = editedBodyText.toUpperCase();
    if (editedBodyText.includes("PM") || editedBodyText.includes("AM")) {
      let first = editedBodyText.includes("PM")
        ? editedBodyText.indexOf("PM") - 6
        : editedBodyText.indexOf("AM") - 6;
      let last = editedBodyText.includes("PM")
        ? editedBodyText.indexOf("PM") + 2
        : editedBodyText.indexOf("AM") + 2;
      time = editedBodyText.substring(first, last);
      time = time.substring(time.indexOf(time.match(/[0-9]+/))).trim();

      if (!time.includes(":")) {
        let index = time.includes("PM")
          ? time.indexOf("PM")
          : time.indexOf("AM");
        time = time.slice(0, index).trim() + ": " + time.slice(index).trim();
      }
      if (!time.includes(" ")) {
        let index = time.includes("PM")
          ? time.indexOf("PM")
          : time.indexOf("AM");
        time = time.slice(0, index).trim() + " " + time.slice(index).trim();
      }
    } else if (
      editedBodyText.includes("p.m") ||
      editedBodyText.includes("a.m")
    ) {
      let first = editedBodyText.includes("p.m")
        ? editedBodyText.indexOf("p.m") - 6
        : editedBodyText.indexOf("a.m") - 6;
      let last = editedBodyText.includes("p.m")
        ? editedBodyText.indexOf("p.m") + 3
        : editedBodyText.indexOf("a.m") + 3;

      time = editedBodyText.substring(first, last);

      time = time.substring(time.indexOf(time.match(/[0-9]+/))).trim();

      if (!time.includes(":")) {
        let index = time.includes("p.m")
          ? time.indexOf("p.m")
          : time.indexOf("a.m");
        time = time.slice(0, index).trim() + ": " + time.slice(index).trim();
      }
      if (!time.includes(" ")) {
        let index = time.includes("p.m")
          ? time.indexOf("p.m")
          : time.indexOf("a.m");
        time = time.slice(0, index).trim() + " " + time.slice(index).trim();
      }
      if (time.includes("p.m")) {
        time = time.replace("p.m", "PM");
      } else {
        time = time.replace("a.m", "AM");
      }
    } else {
      time = "N/A";
    }
    return time;
  }

  setCalander(oth, mon, tues, wed, thurs, fri, sat, sun) {
    let table = [];
    for (let i = 0; i < 30; i++) {
      let line = [];
      let set = 0;
      if (sun[i] !== undefined) {
        set = 1;
        line["sunday"] = sun[i];
      } else {
        line["sunday"] = undefined;
      }
      if (mon[i] !== undefined) {
        set = 1;
        line["monday"] = mon[i];
      } else {
        line["monday"] = undefined;
      }
      if (tues[i] !== undefined) {
        set = 1;
        line["tuesday"] = tues[i];
      } else {
        line["tuesday"] = undefined;
      }
      if (wed[i] !== undefined) {
        set = 1;
        line["wednesday"] = wed[i];
      } else {
        line["wednesday"] = undefined;
      }
      if (thurs[i] !== undefined) {
        set = 1;
        line["thursday"] = thurs[i];
      } else {
        line["thursday"] = undefined;
      }
      if (fri[i] !== undefined) {
        set = 1;
        line["friday"] = fri[i];
      } else {
        line["friday"] = undefined;
      }
      if (sat[i] !== undefined) {
        set = 1;
        line["saturday"] = sat[i];
      } else {
        line["saturday"] = undefined;
      }
      if (set === 0) break;
      else table.push(line);
    }
    this.setState({ table: table });
    this.setDate(table)
  }

  setImage(item) {
    let src = "";

    if (item !== undefined) {
      let cardGame = this.state.games.find(
        (element) => item.tags.find((el) => el.includes(element)) !== undefined
      );
      if (cardGame !== undefined) src = this.state.images[cardGame];
      else src = this.state.images["blanklogo"];
      return <img src={src} alt=".." className="img-fluid" />;
    } else {
      return "";
    }
  }

  /**
    Smoothly scroll element to the given target (element.scrollTop)
    for the given duration

    Returns a promise that's fulfilled when done, or rejected if
    interrupted
 */
  smooth_scroll_to(element, target, duration) {
    target = Math.round(target);
    duration = Math.round(duration);
    if (duration < 0) {
      return Promise.reject("bad duration");
    }
    if (duration === 0) {
      element.scrollTop = target;
      return Promise.resolve();
    }

    var start_time = Date.now();
    var end_time = start_time + duration;

    var start_top = element.scrollTop;
    var distance = target - start_top;

    // based on http://en.wikipedia.org/wiki/Smoothstep
    var smooth_step = function (start, end, point) {
      if (point <= start) {
        return 0;
      }
      if (point >= end) {
        return 1;
      }
      var x = (point - start) / (end - start); // interpolation
      return x * x * (3 - 2 * x);
    };

    return new Promise(function (resolve, reject) {
      // This is to keep track of where the element's scrollTop is
      // supposed to be, based on what we're doing
      var previous_top = element.scrollTop;

      // This is like a think function from a game loop
      var scroll_frame = function () {
        if (element.scrollTop !== previous_top) {
          return;
        }

        // set the scrollTop for this frame
        var now = Date.now();
        var point = smooth_step(start_time, end_time, now);
        var frameTop = Math.round(start_top + distance * point);
        element.scrollTop = frameTop;

        // check if we're done!
        if (now >= end_time) {
          resolve();
          return;
        }

        // If we were supposed to scroll but didn't, then we
        // probably hit the limit, so consider it done; not
        // interrupted.
        if (
          element.scrollTop === previous_top &&
          element.scrollTop !== frameTop
        ) {
          resolve();
          return;
        }
        previous_top = element.scrollTop;

        // schedule next frame for execution
        setTimeout(scroll_frame, 0);
      };

      // boostrap the animation process
      setTimeout(scroll_frame, 0);
    });
  }

  setTableBody(table, weekday) {
    let tb=[]
    for(let idx=0;idx<table.length;idx++){
      tb.push(<tr
      key={idx}
      style={{ maxWidth: "100vw" }}
      className="table-dark"
    >
      <td
        style={{ maxWidth: "15vw" }}
        className={
          "sunday " + (weekday === 0 ? "bg-primary" : "")
        }
      >
        <strong>{table[idx].sunday ? table[idx].sunday.title : ""}</strong>{" "}
        <br />
        <h4 className="text-warning">
          <strong>{table[idx].sunday ? table[idx].sunday.time : ""}</strong>
        </h4>
        <br />
        {this.setImage(table[idx].sunday)}
      </td>
      <td
        style={{ maxWidth: "15vw" }}
        className={
          "monday " + (weekday === 1 ? "bg-primary" : "")
        }
      >
        <strong>{table[idx].monday ? table[idx].monday.title : ""}</strong>{" "}
        <br />
        <h4 className="text-warning">
          <strong>{table[idx].monday ? table[idx].monday.time : ""}</strong>
        </h4>
        <br />
        {this.setImage(table[idx].monday)}
      </td>
      <td
        style={{ maxWidth: "15vw" }}
        className={
          "tuesday " +
          (weekday === 2 ? "bg-primary" : "")
        }
      >
        <strong>{table[idx].tuesday ? table[idx].tuesday.title : ""}</strong>{" "}
        <br />
        <h4 className="text-warning">
          <strong>{table[idx].tuesday ? table[idx].tuesday.time : ""}</strong>
        </h4>
        <br />
        {this.setImage(table[idx].tuesday)}
      </td>
      <td
        style={{ maxWidth: "15vw" }}
        className={
          "wednesday " +
          (weekday === 3 ? "bg-primary" : "")
        }
      >
        <strong>
          {table[idx].wednesday ? table[idx].wednesday.title : ""}
        </strong>{" "}
        <br />
        <h4 className="text-warning">
          <strong>
            {table[idx].wednesday ? table[idx].wednesday.time : ""}
          </strong>
        </h4>
        <br />
        {this.setImage(table[idx].wednesday)}
      </td>
      <td
        style={{ maxWidth: "15vw" }}
        className={
          "thursday " +
          (weekday === 4 ? "bg-primary" : "")
        }
      >
        <strong>{table[idx].thursday ? table[idx].thursday.title : ""}</strong>
        <br />
        <h4 className="text-warning">
          <strong>{table[idx].thursday ? table[idx].thursday.time : ""}</strong>
        </h4>
        <br />
        {this.setImage(table[idx].thursday)}
      </td>
      <td
        style={{ maxWidth: "15vw" }}
        className={
          "friday " + (weekday === 5 ? "bg-primary" : "")
        }
      >
        <strong>{table[idx].friday ? table[idx].friday.title : ""}</strong>
        <br />
        <h4 className="text-warning">
          <strong>{table[idx].friday ? table[idx].friday.time : ""}</strong>
        </h4>
        <br />
        {this.setImage(table[idx].friday)}
      </td>
      <td
        style={{ maxWidth: "15vw" }}
        className={
          "saturday " +
          (weekday === 6 ? "bg-primary" : "")
        }
      >
        <strong>{table[idx].saturday ? table[idx].saturday.title : ""}</strong>
        <br />
        <h4 className="text-warning">
          <strong>{table[idx].saturday ? table[idx].saturday.time : ""}</strong>
        </h4>
        <br />
        {this.setImage(table[idx].saturday)}
      </td>
    </tr>)
    }
    console.log({ "tb": tb })
    
    this.setState({ tableBody: tb });
    this.setState({ loading: tb === [] });
  }



  render() {
    return !this.state.loading ? (
      <div
        className="container w-100 h-100 p-0"
        id="calander"
        style={{
          minWidth: "100vw",
          minHeight: "90vh",
          padding: 0,
          overflowY: "auto"
        }}
      >
        <table
          className="table align-middle table-bordered w-100"
          id="calanderTable"
          style={{ minWidth: "100vw", minHeight: "1500px" }}
        >
          <tbody>
            {this.state.tableBody}
          </tbody>
        </table>
      </div>
    ) : (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }
}

export default Calander;

import React from "react";
import GuestsTable from "./GuestsTable";
import { CSVLink } from "react-csv";
import asc_icon from "../../data/asc_icon.png";
import desc_icon from "../../data/desc_icon.png";

import data from "../../data/guestsData.json";
import { Link } from "react-router-dom";
import style from "./GuestsList.module.css";

class GuestsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: data,
      direction: "asc",
      icon: { asc_icon },
      numberOfAnswer: data.length,
      posAnswer: data.map((yes) => yes.answer).filter(Boolean).length,
      sum: data.reduce((prev, data) => {
        return data.answer ? prev + data.numberOfGuests : prev;
      }, 0),
    };

    this.sortBy = this.sortBy.bind(this);
  }

  sortBy(key) {
    this.setState({
      data: data.sort((a, b) =>
        this.state.direction[key] === "asc" ? a[key] - b[key] : b[key] - a[key]
      ),
      direction: {
        [key]: this.state.direction[key] === "asc" ? "desc" : "asc",
      },
      icon: this.state.direction[key] === "asc" ? { desc_icon } : { asc_icon },
    });
  }

  render() {
    return (
      <div>
        <div>
          Combien seront present ? (pour l'instant que le nombre de true)
          <div>{this.state.posAnswer}</div>
          Combien seront present ?<div>{this.state.sum}</div>
        </div>
        <div>
          nombres de Reponse total <div>{this.state.numberOfAnswer}</div>
        </div>
        <button>
          <CSVLink data={this.state.data}>Export Guests List</CSVLink>
        </button>
        <Link>https://www.npmjs.com/package/react-csv</Link>
        <div className={style.table}>
          <GuestsTable
            data={this.state.data}
            sortBy={this.sortBy}
            icon={this.icon}
          />
        </div>
      </div>
    );
  }
}

export default GuestsList;

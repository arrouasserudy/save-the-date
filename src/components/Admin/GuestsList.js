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
      asc: true,
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
        this.state.asc[key] ? a[key] - b[key] : b[key] - a[key]
      ),
      asc: {
        [key]: this.state.asc[key] ? false : true,
      },
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
          nombres de Reponse total <div>{this.state.data.length}</div>
        </div>
        <button>
          <CSVLink data={this.state.data}>Export Guests List</CSVLink>
        </button>
        <Link>https://www.npmjs.com/package/react-csv</Link>
        <div className={style.table}>
          <GuestsTable
            data={this.state.data}
            sortBy={this.sortBy}
            asc={this.asc}
          />
        </div>
      </div>
    );
  }
}

export default GuestsList;

import React, { Component } from 'react';
import './Homepage.scss';
import EventCard from '../EventCard/EventCard';
import V75 from '../../svgs/v75.svg';
import V64 from '../../svgs/v64.svg';
import V4 from '../../svgs/v4.svg';

class Homepage extends Component {

/* Component states */
constructor() {
    super();
    this.state = {
        events: [],
        title: '',
        isVisible: true,
    };
}

/* On input change */
handleChange = (e) => {
    this.setState({
        title: e.target.value
    })
}

/* When form submits */
handleSubmit = (e) => {
    e.preventDefault();

    if(this.state.title === "V75" || this.state.title === "V65" || this.state.title === "V64" || this.state.title === "V4") {

    /* Fetch data from api depending on event type */
    fetch(`https://www.atg.se/services/racinginfo/v1/api/products/${this.state.title}`)
    .then(results => {
        return results.json();
    }).then(data => {
        var background = "";

        if(data.betType === "V75") {
            background = V75;
        } else if (data.betType === "V65") {
            background = V64;
        } else if (data.betType === "V64") {
            background = V64;
        } else if (data.betType === "V4") {
            background = V4;
        }

        var size = 1;

        /* Checking if there exists upcoming events */
        if(data.upcoming.length !== 0) {

            /* Mapping through the response data from fetch and slice it to get only the closest
               upcoming or closest result */
            let events = data.upcoming.slice(0, size).map((ev) => {
                return (
                    <EventCard
                        key={ev.id}
                        bannerImage={{backgroundImage: `url(${background})`}}
                        eventTitle={data.betType}
                        gameId={ev.id}
                        startTime={ev.startTime}
                    />
                )
            })
            this.setState({
                events: events,
                isVisible: false
            })

        /* If there doesn't exist upcoming events */
        } else if (data.upcoming.length === 0) {
            let events = data.results.slice(0, size).map((ev) => {
                return (
                    <div key={ev.id}>
                        <p>{ev.id}</p>
                        <p>{ev.startTime}</p>
                    </div>
                )
            })
            this.setState({
                events: events,
                isVisible: false
              })
        }
    })
    } else {
        this.setState({
            isVisible: true
        })
    }
}

  render() {

    return (
      <div id="homepage">
        <div className="top-bar">
            <div className="logo-image" />
        </div>
        <div className="banner">
          <div className="page-title-container">
            <h1>Trav <span className="yellow">och</span> Galopp</h1>
          </div>
          <div className="page-description -container">
            <p>Här kan du se information om kommande lopp</p>
          </div>
          <div className="search-container">
            <form onSubmit={this.handleSubmit}>
                <input onChange={this.handleChange} type="text" placeholder="Skriv in speltyp" />
                <button className="btn" type="submit">Sök</button>
            </form>
            <p>I inmatningsfältet ovan måste du skriva antingen V75, V65, V64 eller V4. <br></br>
                <span className="yellow">(Notera att det är stora bokstäver)</span></p>
          </div>
        </div>
        <div className={this.state.isVisible ? 'hidden' : 'not-hidden'}>
            {this.state.events}
        </div>
      </div>
    )
  }
}

export default Homepage;

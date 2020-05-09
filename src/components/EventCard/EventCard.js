import React, { Component } from 'react';
import './EventCard.scss';
import RaceCard from '../RaceCard/RaceCard';

class EventCard extends Component {

/* Component states */
constructor(props) {
    super(props)
    this.state = {
        races: [],
    };
}

/* When component loads */
componentDidMount() {

    /* Fetch data from api depending on user input */
    fetch(`https://www.atg.se/services/racinginfo/v1/api/games/${this.props.gameId}`)
    .then(results => {
        return results.json();
    }).then(data => {
        var bannerType = "";

        if(this.props.eventTitle === "V75") {
            bannerType = "v75";
        } else if (this.props.eventTitle === "V65") {
            bannerType = "v64";
        } else if (this.props.eventTitle === "V64") {
            bannerType = "v64";
        } else if (this.props.eventTitle === "V4") {
            bannerType = "v4";
        }

        /* Mapping through the response data from fetch */
        let races = data.races.map((ra) => {
            return (
                <RaceCard
                bannerType={bannerType}
                key={ra.id}
                raceNumber={ra.number}
                raceName={ra.name}
                startTime={ra.startTime}
                startList={ra.starts}
                />
            )
        })
        this.setState({
            races: races,
        })
    })
}

render() {

    return (
        <div className="event-card">
            <div className="event-banner" style={this.props.bannerImage}>
                <h1>{this.props.eventTitle}</h1>
            </div>
            {this.state.races}
        </div>
    )
  }
}

 export default EventCard 
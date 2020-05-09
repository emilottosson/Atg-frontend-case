import React, { Component } from 'react';
import './RaceCard.scss';
import StartsCard from '../StartsCard/StartsCard';

class RaceCard extends Component {

/* Component states */
constructor(props) {
    super(props)
    this.state = {
        starts: [],
    };
}

/* When component loads */
componentDidMount() {

    let starts = this.props.startList.map((st) => {
        console.log(st)
        return (
            <StartsCard
                key={st.number}
                horseNumber={st.number}
                horseName={st.horse.name}
                driverFirstName={st.driver.firstName}
                driverLastName={st.driver.lastName}
                trainerFirstName={st.horse.trainer.firstName}
                trainerLastName={st.horse.trainer.lastName}
                pedigreeFather={st.horse.pedigree.father.name}
            />
        )
    })
    this.setState({
        starts: starts,
    })
}

render() {

    return (
        <div className="race-card">
            <div className={`race-information ${this.props.bannerType}`}>
                <div className="race-block">
                    <p className="information-heading-big">LOPP {this.props.raceNumber}</p>
                </div>
                <div className="information-block">
                    <p className="information-heading">{this.props.raceName}</p>
                    <p className="information-heading"><span className="green">{this.props.startTime}</span></p>
                </div>
            </div>
            <table>
                <tbody>
                    <tr>
                        <th className="first-row">Häst</th>
                        <th>Kusk</th> 
                    </tr>
                    {this.state.starts}
                </tbody>
            </table>
        </div>
    )
  }
}

 export default RaceCard 
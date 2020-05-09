import React, { Component } from 'react';
import './StartsCard.scss';
import { MemoryRouter } from 'react-router'
import Arrow from '../../svgs/arrow.svg'

class StartsCard extends Component {

/* Component states */
constructor(props) {
    super(props)
    this.state = {
        open: false,
    };
}

/* Toggle state */
toggleCollapsible = () => {
    this.setState({
        open: !this.state.open,
    });
};

render() {

    return (
        <MemoryRouter>
        <tr>
            <td className="clickable" onClick={this.toggleCollapsible}>
                <span><button type="button">{this.props.horseNumber}</button></span>
                {this.props.horseName}
                <span className={"arrowUp" + (this.state.open ? ' none' : '')}>
                    <img src={Arrow} alt="arrow" style={{width: '10px', height: '10px', transform: 'rotate(180deg)'}} /></span>
                <span className={"arrowDown" + (this.state.open ? ' shown' : '')}>
                    <img src={Arrow} alt="arrow" style={{width: '10px', height: '10px'}} /></span>
            </td>
            <td>{this.props.driverFirstName} {this.props.driverLastName}</td>
        </tr>
        <tr className={"collapse" + (this.state.open ? ' in' : '')}>
            <td colSpan="2"><span className="collapsible-information">
                <span>
                    <span className="light-text">Hästens far:</span> {this.props.pedigreeFather}</span> 
                    <span><span className="light-text">Tränare:</span> {this.props.trainerFirstName} {this.props.trainerLastName}</span>
                </span>
            </td>
        </tr>
        </MemoryRouter>
    )
  }
}

 export default StartsCard 
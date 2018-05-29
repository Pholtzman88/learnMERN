import React, { Component } from "react";

import "../App.css";

class ColorScheme extends Component {
    constructor(props){
        super(props);
        this.state = {
            colors: this.props.colors
        }
    }

    select = () => {
        this.props.onSelected(this.state.colors)
    };

    render(){
        const style = {
            backgroundColor: this.state.colors[0],
            border: `20px solid ${this.state.colors[1]}`,
            fontSize: '20px',
            padding: '20px',
            color: this.state.colors[2],
            width: '150px',
            margin: '10px',
            float: 'right'
        };

        return (
            <h5 className={'color-scheme'} style={style} onClick={this.select}>TEXT</h5>
        )
    }
}

export default ColorScheme
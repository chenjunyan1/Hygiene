import React, { Component } from 'react'
import'../CSS/card.css'
export default class Card extends Component {
    render() {
        const { title, p, arr } = this.props;
        return (
            <div className="card">
                <div>{title}</div>
                <div>{p}</div>
                <div>
                    {arr ? arr.map((item, index) => {
                        return (
                            <div key={index}>
                                {index+1} : {item}
                            </div>
                        )
                    }) : null}
                </div>
            </div>
        )
    }
}

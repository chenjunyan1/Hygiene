import React, { Component } from 'react'
import '../CSS/List.css'
export default class List extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        console.log("List")
        return (
            <div className="list-name">
                <div>{this.props.groupLeader}</div>
                <div>{this.props.Member}</div>
            </div>
        )
    }
}

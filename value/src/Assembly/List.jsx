import React, { Component } from 'react'
import '../CSS/List.css'
export default class List extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }
    render() {
        // frame 接收布尔值
        // region 接收文字
        const { frame, region, dianji } = this.props;
        return (
            <div className="list-name">
                <div  onClick={dianji}>
                    <div style={{ backgroundColor: (frame) ?  "#f57170":"#10ddc2" }}></div>
                </div>
                <div>
                    {region}
                </div>
            </div>
        )
    }
}

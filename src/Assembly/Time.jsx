import React, { Component } from 'react'

export default class Time extends Component {
    constructor(props) {
        super(props)

        this.state = {
            time: "Time"
        }
    }

    render() {

        // 加工时间
        function checkTime(i) {
            if (i < 10) {
                i = "0" + i;
            }
            return i;
        }
        // 获取时间
        function time() {
            var today = new Date();
            var y = today.getFullYear();
            var a = today.getMonth() + 1;
            var b = today.getDate();
            var h = today.getHours();
            var m = today.getMinutes();
            var s = today.getSeconds();
            m = checkTime(m);
            s = checkTime(s);
            return "Today's date : " + y + "/" + a + "/" + b + " | " + h + ":" + m + ":" + s;
        }

        setTimeout(() => {
            if (this.state.time != time()) {
                this.setState({
                    time: time()
                })
                // console.log(this.state.time)
            }
        }, 1000);

        return (
            <div>
                {this.state.time}
            </div>
        )
    }
}

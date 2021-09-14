import React, { Component } from 'react'
import List from './Assembly/List'
import date from './date.json'
import './App.css'
class App extends Component {
  
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  render() {
    let listArr = date.nameList;
    let arrkeys = [];
    Object.keys(listArr).map((value)=>{
        arrkeys.push(value);
    })
    // 轮换function
    function Rotation(){
      let str = listArr.arr[0];
      
      
    }
    return (
      <div>
        <h1>
          实务学堂2021秋季学期卫生值日
        </h1>
        <div className="list">
          <ol>
            {
              Object.keys(date.nameList).map((value) => {
                console.log(value)
                return (
                  <li key={value}>
                    <div className="member">
                      {
                        date.nameList[value].map((item, index) => {
                          console.log(item)
                          if (index == 0) {
                            return (
                              <List key={index} groupLeader={"组长  " + item + ":"} />
                            )
                          } else {
                            return (
                              <List key={index} Member={item} />
                            )
                          }
                        })
                      }
                    </div>
                  </li>
                )
              })
            }
          </ol>
        </div>
        <div>
          <div>二、三、四，楼打扫卫生需要扫至下层楼梯</div>
          <div>一楼需要打扫院子</div>
          <div>组长负责任务分配，以及讲卫生标准</div>
        </div>
      </div>
    )
  }
}

export default App;

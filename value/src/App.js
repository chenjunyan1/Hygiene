import React, { Component } from 'react'
import List from './Assembly/List'
import date from './date.json'
import './App.css'


//值日日期 
let deta = ["9-14", "9-21", "9-28", "10-5", "10-12", "10-19", "10-26", "11-2", "11-9", "11-16", "11-23", "11-30", "12-7", "12-14", "12-21", "12-28", "1-4", "1-11", "1-18", "1-25", "2-1", "2-8", "2-15", "2-22"]

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      value: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }
  // 监听value
  handleChange(event) {
    this.setState({ value: event.target.value });
    console.log(this.state.value)
  };

  // 点击后
  handleSubmit(event) {
    event.preventDefault();
    if (deta.indexOf(this.state.value)) {
      console.log("在本页面开始寻找ID:" + this.state.value)
      let anchorElement = document.getElementById(this.state.value);
      if (anchorElement) {
        console.log("正在查找");
        anchorElement.scrollIntoView({ behavior: "smooth", });
      } else {
        console.log("没找到")
      }

      this.setState({
        value: ""
      })
    } else {
      alert("格式错误或不存在")
    }


  }
  render() {
    // 复制nameList 到listArr
    let listArr = { ...date.nameList };
    console.log(listArr)

    // listArr的key的value
    let arrkeys = [];

    //key的len 
    let keyLen = 0;
    // 计算key的len and 存key的value
    Object.keys(listArr).map((value) => {
      arrkeys.push(value);
      keyLen += 1;
    })
    console.log(keyLen);

    //负责存所有的轮换记录
    let roundArr = [];
    // roundArr.push(listArr);


    // 轮换function  先轮换，然后改变原数组，改完之后然后再push到轮换记录
    function Rotation() {
      for (let tate_f = 0; tate_f < deta.length; tate_f++) {
        // console.log(deta[tate_f])
        let a = listArr[arrkeys[0]];
        // console.log(a);
        let obj = [];
        for (let obj_list = 0; obj_list < keyLen; obj_list++) {
          if (obj_list != keyLen - 1) {
            listArr[arrkeys[obj_list]] = listArr[arrkeys[obj_list + 1]];
            obj.push(listArr[arrkeys[obj_list]]);
          } else {
            listArr[arrkeys[obj_list]] = a;
            obj.push(listArr[arrkeys[obj_list]]);
          }
        }
        roundArr.push(obj);
      }
      return roundArr;
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
                // console.log(value)
                return (
                  <li key={value}>
                    <div className="member">
                      {
                        date.nameList[value].map((item, index) => {
                          // console.log(item)
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
        <br /><br /><br /><br /><br /><br />
        <div>
          <form className="jilu" onSubmit={this.handleSubmit}>
            <div>
              <input className="shuru" value={this.state.value} onChange={this.handleChange} placeholder="格式：九月十四日 9-14" />
              <input className="tijiao" type="submit" value="查找" />
            </div>
          </form>
        </div>
        <div>
          {
            Object.keys(Rotation()).map((value, index) => {
              return (
                <div key={index} id={deta[index]}>
                  <div>
                    {"第" + (index + 1) + "周 ： Date : " + deta[index]}
                  </div>
                  {
                    Rotation()[value].map((value_zu, index_zu) => {
                      return (
                        <div key={value_zu}>
                          {(index_zu + 1) + "楼 : " + value_zu}
                        </div>
                      )
                    })
                  }
                </div>
              )
            })

          }
        </div>

      </div>
    )
  }
}

export default App;




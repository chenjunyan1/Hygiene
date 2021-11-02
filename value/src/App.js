import React, { Component } from 'react'
import List from './Assembly/List'
import date from './date.json'
import './App.css'
import Time from './Assembly/Time'


//值日日期 
let deta = ["9-21", "9-28", "10-5", "10-12", "10-19", "10-26", "11-2", "11-9", "11-16", "11-23", "11-30", "12-7", "12-14", "12-21", "12-28", "1-4", "1-11", "1-18", "1-25", "2-1", "2-8", "2-15", "2-22"]

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: '',
      num: 1,
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
    if (deta.indexOf(this.state.value) != -1) {
      console.log("在本页面开始寻找ID:" + this.state.value);
      console.log("正在查找");
      let anchorElement = document.getElementById(this.state.value);
      if (anchorElement) {
        console.log("正在前往");
        anchorElement.scrollIntoView({ behavior: "smooth", });
      } else {
        console.log("没找到")
      }
    } else {
      alert("输入日期格式错误或不是周二日期 " + "\n" + "九月十四日 输入格式： 9-14")
    }
  }
  handclick() {
    let anchorElement = document.getElementById('zhiri');
    if (anchorElement) {
      anchorElement.scrollIntoView({ behavior: "smooth", });
    }
  }
  lookup(str) {
    this.setState({
      num: str,
    });
    console.log(this.state.num);
   }
  render() {
    // const date_str = "date.str_"+num;
    // 复制nameList 到listArr
    let listArr = { ...date.nameList };
    // console.log(listArr)

    // listArr的key的value
    let arrkeys = [];
    //key的len 
    let keyLen = 0;
    // 计算key的len and 存key的value
    Object.keys(listArr).map((value) => {
      arrkeys.push(value);
      keyLen += 1;
    })
    // console.log(keyLen);

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
        <div className="xiangshang" onClick={this.handclick.bind(this)}>
          <img src="shang_home.svg" />
        </div>
        <h1 id="zhiri">
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
                              <List key={index} groupLeader={"组长  " + item + " :"} />
                            )
                          } else if (index == 1) {
                            return (
                              <List key={index} groupLeader={"副组长  " + item} />
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
          <div>
            组长不在时副组长应担任组长位置
          </div>
        </div>
        <div>
          <ul>
            分配及打扫
            <li>组长负责任务分配，以及讲卫生标准</li>
            <li>二、三、四，楼打扫卫生需打扫至下层楼梯</li>
            <li>一楼需打扫院子</li>
            <li>组长负责检查本楼层卫生（检查完成后可以让卫生监督员再次检查）</li>
          </ul>
          <br />
          <ul>
            惩罚（2021.9.28生效）
            <li>卫生不合格应扣小组（蚪币30蚪 \ 人民币）</li>
            <li>（初次30蚪 \ 人民币）不合格依次翻倍</li>
          </ul>
          <br />
          <h2>卫生打扫标准如下列表</h2>
          <ul>
            <li>公共物品各归其位</li>
            <li>可见台面无灰尘</li>
            <li>地面垃圾桶无脚印</li>
            <li>倾倒垃圾桶内垃圾</li>
          </ul>
          <div>
            点击查看标准
          </div>
          <div>
            <div onClick={this.lookup.bind(this, 1)}>一楼</div>
            <div onClick={this.lookup.bind(this, 2)}>二楼</div>
            <div onClick={this.lookup.bind(this, 3)}>三楼</div>
            <div onClick={this.lookup.bind(this, 4)}>四楼</div>
          </div>

          <div>
            {/* {
              ["date.str_"+this.state.num].map((item, index) => {
                console.log(item)
                return (
                  <div key={item + index}>
                    {item}
                  </div>
                )
              })
            } */}
             {/* {
               
              date.str_1.map((item, index) => {
                console.log(item)
                return (
                  <div key={item + index}>
                    {item}
                  </div>
                )
              })
            } */}
          </div>

          <div className="from_qingjie">
            <table border="1">
              <tr>
                <th>一楼</th>
                {
                  date.str_1.map((item, index) => {
                    return (
                      <th key={item + index}>
                        {item}
                      </th>
                    )
                  })
                }
              </tr>
              <tr>
                <th>二楼</th>
                {
                  date.str_2.map((item, index) => {
                    return (
                      <th key={item + index}>
                        {item}
                      </th>
                    )
                  })
                }
              </tr>
              <tr>
                <th>三楼</th>
                {
                  date.str_3.map((item, index) => {
                    return (
                      <th key={item + index}>
                        {item}
                      </th>
                    )
                  })
                }
              </tr>
              <tr>
                <th>四楼</th>
                {
                  date.str_4.map((item, index) => {
                    return (
                      <th key={item + index}>
                        {item}
                      </th>
                    )
                  })
                }
              </tr>
            </table>
          </div>
          <br />
          <ul className="help">
            Help
            <li>
              <Time />
            </li>
            <li>
              <div>
                如有建议可通过邮箱发送至：
                <a href="mailto:2562178620@qq.com">2562178620@qq.com</a>
              </div>
            </li>
            <li>
              <div>
                日历：
                <a href="https://calendar-lac.vercel.app">Dade</a>
              </div>
            </li>
            <li>
              <div>
                Github开源本页项目一切文件：
                <a href="https://github.com/chenjunyan1/name">https://github.com/chenjunyan1/name</a>
              </div>
            </li>
            <li>
              <div>
                连接WiFi：实务学堂-17G , 即可访问：
                <a href="http://192.168.8.106/Yan_Wonderland/index.html">http://192.168.8.106/Yan_Wonderland/index.html</a>
              </div>
            </li>
            <li>
              <div>
                对外开放链接为：
                <a href="https://name-chenjunyan1.vercel.app/">https://name-chenjunyan1.vercel.app</a>
              </div>
            </li>
          </ul>
        </div>

        <br />
        <div>
          搜索框教程：输入本周二的日期，如九月十四日 应输入：9-14 可查看本周值日&大扫除楼层值日表
        </div>
        <br /><br /><br />
        <div>
          <div>
          </div>
          <form className="jilu" onSubmit={this.handleSubmit}>
            <div className="Input_chazhao">
              <input className="shuru" value={this.state.value} onChange={this.handleChange} placeholder="九月十四日 输入格式： 9-14" />
              <input className="tijiao" type="submit" value="Lookup" />
            </div>
          </form>
        </div>
        <div>
          <br /><br />
          JavaScript轮换算法 - Wonderland
        </div>
        <div>
          {
            Object.keys(Rotation()).map((value, index) => {
              return (
                <div key={index} className="lun" id={deta[index]}>
                  <div>
                    {"第" + (index + 1) + "周 ： Date : " + deta[index]}
                  </div>
                  {
                    Rotation()[value].map((value_zu, index_zu) => {
                      return (
                        <div key={value_zu} className="list_name">
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




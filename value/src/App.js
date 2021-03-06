import React, { Component } from 'react'
import List from './Assembly/List'
import date from './date.json'
import './App.css'
import Time from './Assembly/Time'
import Card from './Assembly/Card'

const AV = require('leancloud-storage');
const { Query, User } = AV;
AV.init({
  appId: "v6yTYDj8Lvd4tPoqdz4j85qi-gzGzoHsz",
  appKey: "kmVzFkIPu7YkAB6CqHoRQqpX",
  serverURL: "https://v6ytydj8.lc-cn-n1-shared.com"
});

//值日日期 
let deta = ["1-4", "1-11", "1-18", "1-25", "2-1", "2-8", "2-15", "2-22", "5-3", "5-10", "5-17", "5-24", "5-31", "6-7", "6-14", "6-21", "6-28", "7-5", "9-21", "9-28", "10-5", "10-12", "10-19", "10-26", "11-2", "11-9", "11-16", "11-23", "11-30", "12-7", "12-14", "12-21", "12-28"]

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

let roundArr = Rotation();

// 轮换function  先轮换，然后改变原数组，改完之后然后再push到轮换记录
function Rotation() {
  //负责存所有的轮换记录
  let roundArr = [];
  // roundArr.push(listArr);

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


class App extends Component {
  // 构造函数
  constructor(props) {
    super(props)

    this.state = {
      value: '',
      value_word: '',
      value_date: '',
      num: "null",
      one: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      two: [false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      three: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      four: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      iscolor: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // 监听卫生检查记录input的value
  handleChange(event) {
    this.setState({ value: event.target.value });
    // console.log(this.state.value)
  };

  // 点击后，滑动到该日期的卫生值日表
  handleSubmit(event) {
    event.preventDefault();
    if (deta.indexOf(this.state.value) != -1) {
      // console.log("在本页面开始寻找ID:" + this.state.value);
      // console.log("正在查找");
      // for (let a = 0; a < date.length; a++) {
      //   document.getElementById(date[a]).style.backgroundColor = "white";
      // }
      let anchorElement = document.getElementById(this.state.value);
      if (anchorElement) {
        // console.log("正在前往");
        anchorElement.scrollIntoView({ behavior: "smooth", });
        anchorElement.style.backgroundColor = "blueviolet";
        setTimeout(() => {
          anchorElement.style.backgroundColor = "#dff4f3";
        }, 5000);
      } else {
        // console.log("没找到");
      }
    } else {
      alert("输入日期格式错误或不是周二日期 " + "\n" + "九月十四日 输入格式： 9-14");
    }
  }

  // 返回最顶
  handclick() {
    let anchorElement = document.getElementById('zhiri');
    if (anchorElement) {
      anchorElement.scrollIntoView({ behavior: "smooth", });
    }
  }

  // 查看检查楼层
  lookup(str) {
    this.setState({
      num: str,
    });
    // console.log(this.state.num);
  }

  // 更新区域状态
  // num 楼层
  //  index 区域
  // boo true/false 合格/不合格
  qualified(nub, index, boo, item) {
    let newArr = [...this.state[nub]];
    if (boo == true) {
      newArr[index] = false;
      this.setState({
        [nub]: newArr
      });
      // console.log(item + "不合格");
    } else {
      newArr[index] = true;
      this.setState({
        [nub]: newArr
      });
      // console.log(item + "合格");
    }
  }

  // 密码输入框
  handleChange_word(event) {
    this.setState({ value_word: event.target.value });
    // console.log(this.state.value_word);
  }

  // 日期提交输入框
  handleChange_date(event) {
    this.setState({ value_date: event.target.value });
    // console.log(this.state.value_date)
  }

  // 密码验证
  // 提交数据
  handclick_word(event) {
    event.preventDefault();
    // 获取todo
    // const query = new AV.Query('Todo');
    // 声明 class
    const Todo = AV.Object.extend('Todo');

    // 构建对象
    const todo = new Todo();

    // 判断日期是否正确（日期格式正确才会判断密码是否正确）
    if (deta.indexOf(this.state.value_date) != -1) {

      // 判断密码是否正确
      let input_word = this.state.value_word;
      if (input_word == "111") {

        // 为属性赋值
        var json = {
          "one": this.state.one,
          "two": this.state.two,
          "three": this.state.three,
          "fout": this.state.four
        };
        // console.log(json);
        //转为JSON字符串
        var jsonStr = JSON.stringify(json);
        // console.log(jsonStr);
        // console.log(roundArr[deta.indexOf(this.state.value_date)]);
        // 上传卫生状况
        todo.set('title', jsonStr);
        // 上传当日值日人员
        todo.set('TeamMembers', JSON.stringify(roundArr[deta.indexOf(this.state.value_date)]));
        // 将对象保存到云端
        todo.save().then((Todo) => {
          // 成功保存之后，执行其他逻辑
          console.log("保存成功");
        }, (error) => {
          // 异常处理
          console.log("TMD");
        });
        alert("提交成功");
        // 请求数据
        // query.find().then((items) => {
        //   console.log(items);
        // });
      } else {
        alert("密码错误")
      }
    } else {
      alert("输入日期格式错误或不是周二日期 " + "\n" + "九月十四日 输入格式： 9-14")
    }
  }

  render() {
    // console.log(Rotation());
    return (
      <div className="App">
        <div className="time">
          <Time />
        </div>
        <div className="xiangshang" onClick={this.handclick.bind(this)}>
          <img src="shang_home.svg" />
        </div>
        <div className="zhiri_one">
          <img src="logo.png" />
          <h3 id="zhiri">
            实务学堂卫生值日系统 - Chen Jun Yan
          </h3>
          <div className="into">
            <div onClick={this.handclick.bind(this)}>
              Get into
            </div>
          </div>
        </div>

        <div className="list">
          {
            Object.keys(date.nameList).map((value, index) => {
              return (
                <div key={index} className="member">
                  {
                    date.nameList[value].map((item, index) => {
                      return (
                        <div key={index}>
                          {index == 0 ? "组长:" + item : item}
                        </div>
                      )
                    })
                  }
                </div>
              )
            })
          }
        </div>
        <div>
          <div className="card_j">
            <Card
              title={date.card.name}
              p={date.card.p}
              arr={date.card.arr}
            />
            <Card
              title={date.card_2.name}
              p={date.card_2.p}
              arr={date.card_2.arr}
            />
            <Card
              title={date.card_3.name}
              p={date.card_3.p}
              arr={date.card_3.arr}
            />
          </div>
          <h3>
            点击对应楼层查看该区域标准
          </h3>

          <div className="history">
            <div>历史检查数据：<a href="https://inspection-record.vercel.app/">https://inspection-record.vercel.app</a></div>
          </div>

          <div className="floor">
            <div onClick={this.lookup.bind(this, 1)}>1F</div>
            <div onClick={this.lookup.bind(this, 2)}>2F</div>
            <div onClick={this.lookup.bind(this, 3)}>3F</div>
            <div onClick={this.lookup.bind(this, 4)}>4F</div>
            <div onClick={this.lookup.bind(this, "all")}>ALL</div>
          </div>
          {(this.state.num != "null") ? (
            <div className="redAndGreen">
              <div>
                <div>框内颜色</div>
                <div></div>
                <div>为合格</div>
              </div>
              <div>
                <div>框内颜色</div>
                <div></div>
                <div>为不合格</div>
              </div>
            </div>
          ) : null
          }

          <div className="from_qingjie">
            {(this.state.num == 1 || this.state.num == "all") ? (
              <div className="layer">
                <h3>1F</h3>
                {
                  date.str_1.map((item, index) => {
                    console.log("显示")
                    return (
                      <div key={item + index}>
                        <List
                          frame={this.state.one[index]}
                          region={item}
                          dianji={this.qualified.bind(this, "one", index, this.state.one[index], item)}
                        />
                      </div>
                    )
                  })
                }
              </div>) : null
            }
            {(this.state.num == 2 || this.state.num == "all") ? (
              <div className="layer">
                <h3>2F</h3>
                {
                  date.str_2.map((item, index) => {
                    return (
                      <div key={item + index}>
                        <List
                          frame={this.state.two[index]}
                          region={item}
                          dianji={this.qualified.bind(this, "two", index, this.state.two[index], item)}
                        />
                      </div>
                    )
                  })
                }
              </div>) : null
            }
            {(this.state.num == 3 || this.state.num == "all") ? (
              <div className="layer">
                <h3>3F</h3>
                {
                  date.str_3.map((item, index) => {
                    return (
                      <div key={item + index}>
                        <List
                          frame={this.state.three[index]}
                          region={item}
                          dianji={this.qualified.bind(this, "three", index, this.state.three[index], item)}
                        />
                      </div>
                    )
                  })
                }
              </div>) : null
            }
            {(this.state.num == 4 || this.state.num == "all") ? (
              <div className="layer">
                <h3>4F</h3>
                {
                  date.str_4.map((item, index) => {
                    return (
                      <div key={item + index}>
                        <List
                          frame={this.state.four[index]}
                          region={item}
                          dianji={this.qualified.bind(this, "four", index, this.state.four[index], item)}
                        />
                      </div>
                    )
                  })
                }
              </div>) : null
            }
          </div>

          {/* 提交列表 */}

          {this.state.num == "all" ? (
            <div className="all_tijiao">
              <div>
                <div>输入框1为管理员密码</div>
                <div>输入框2为本周二的日期，如如九月十四日 应输入：9-14</div>
              </div>
              <div>
                <input
                  type="password"
                  placeholder="密码"
                  value={this.state.value_word}
                  onChange={this.handleChange_word.bind(this)}
                />
                <input
                  placeholder="日期"
                  value={this.state.value_date}
                  onChange={this.handleChange_date.bind(this)}
                />
                <button
                  onClick={this.handclick_word.bind(this)}
                >
                  提交
                </button>
              </div>
            </div>
          ) : null
          }

          {/* 帮助 */}
          <br />
          <div className="help_d">Help</div>
          <ul className="help">
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
                <a href="https://github.com/chenjunyan1/InspectionRecord/blob/main/my-app/README.md?plain=1">https://github.com/chenjunyan1/InspectionRecord/blob/main/my-app/README.md?plain=1</a>
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
              <input className="shuru"
                value={this.state.value}
                onChange={this.handleChange}
                placeholder="九月十四日 输入格式： 9-14" />
              <input className="tijiao"
                type="submit"
                value="Go"
              />
            </div>
          </form>
        </div>
        <div>
          <br /><br />
          <h4>JavaScript ObjArr轮换算法 - Wonderland</h4>
        </div>
        <div className="lunhuan">
          {
            Object.keys(roundArr).map((value, index) => {
              return (
                <div
                  key={index}
                  className={'lun'}
                  id={deta[index]}>
                  <div>
                    {"第" + (index + 1) + "周 ： Date : " + deta[index]}
                  </div>
                  {
                    roundArr[value].map((value_zu, index_zu) => {
                      return (
                        <div key={value_zu + index_zu} className="list_name">
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




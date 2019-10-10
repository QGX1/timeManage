const user = [
  {
    user_name: "qgx",
    user_password: "111111",
    user_email: "793025324@qq.com",
    user_phone:'13433436445'
  },
  {
    user_name: "xzw",
    user_password: "111111",
    user_email: "793025323@qq.com",
    user_phone:'15918883016'
  },
  {
    user_name: "bb",
    user_password: "111111",
    user_email: "793025322@qq.com",
    user_phone:'13433436441'
  }
];
const calendar=[
];
const detailed_account=[
  {
    user_id:1,
    account_title:"购物",
    account_color:"green"
  },
  {
    user_id:1,
    account_title:"购物",
    account_color:"red"
  }
];
const detailed_list=[
  {
    account_id:1,
    list_title:"买鞋",
  },
  {
    account_id:1,
    list_title:"买衣服",
  }
];
const habit=[
  {
    user_id:1,
    habit_title:"看书",
    habit_time:"00:01:00"
  }
];
const sum=[
  {
    user_id:1,
    sum_content:"今天的天空很蓝",
    sum_time:"2019/12/1 12:30:20"
  }
]

module.exports = {
  user,
  calendar,
  detailed_account,
  detailed_list,
  habit,
  sum
};

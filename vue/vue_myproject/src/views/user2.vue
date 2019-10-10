<!--autor:刘炽辉-->      <!--后台管理员界面-->  
<template>
  <div>
    <div v-show=!isAddShow>
      <div v-show=!isShow>
        <!-- 用户信息展示 -->
        <h2>管理员列表</h2>
        <br>
        <el-button type="primary" round @click='doAdd()'>添加管理员</el-button>
        <br><br>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="序号" width="150">
            <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.$index+1 }}</span>
</template>
    </el-table-column>
    <el-table-column
      label="用户名"
      width="200">
<template slot-scope="scope">
  <div slot="reference" class="name-wrapper">
    {{ scope.row.user.user_name }}
  </div>
</template>
    </el-table-column>
    <el-table-column
      label="性别"
      width="150">
<template slot-scope="scope">
  <div slot="reference" class="name-wrapper">
    {{ scope.row.user.sex }}
  </div>
</template>
    </el-table-column>
    <el-table-column
      label="邮箱"
      width="250">
<template slot-scope="scope">
  <div slot="reference" class="name-wrapper">
    {{ scope.row.user.email }}
  </div>
</template>
    </el-table-column>
    <el-table-column label="操作">
<template slot-scope="scope">
  <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">
    编辑</el-button>
  <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
</template>
    </el-table-column>
  </el-table>
  </div>
</div>

  <div v-show=isShow >
<!-- 编辑管理员信息 -->
    <h2>编辑管理员信息</h2>
    <br>
    <el-form ref="form" :model="form"  :rules="rules" label-width="100px" class="demo-ruleForm" > 
  <el-form-item label="用户名" >
    <el-input v-model="form.name" style='width:90%'></el-input>
  </el-form-item>

  <el-form-item label="性别">
    <el-radio-group v-model="form.sex">
      <el-radio label="男"></el-radio>
      <el-radio label="女"></el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="邮箱" prop="email">
    <el-input v-model="form.email" style='width:90%' ></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit()">修改</el-button>
    <el-button @click='doCancel()'>取消</el-button>
  </el-form-item>
</el-form>
</div>

<div v-show=isAddShow >
<!-- 添加管理员 -->
    <h2>添加管理员</h2>
    <br>
    <el-form ref="form" :model="form"  :rules="rules"  label-width="180px" class="demo-ruleForm" > 
  <el-form-item label="用户名" prop='name'>
    <el-input v-model="form.name" style='width:90%'></el-input>
  </el-form-item>
  <el-form-item label="密码"  prop='password'>
    <el-input type='password' v-model="form.password" style='width:90%'></el-input>
  </el-form-item>
    <el-form-item label="确认密码"  prop='repassword'>
    <el-input type='password' v-model="form.repassword" style='width:90%'></el-input>
  </el-form-item>
  <el-form-item label="性别">
    <el-radio-group v-model="form.sex">
      <el-radio label="男"></el-radio>
      <el-radio label="女"></el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="邮箱" prop='email'>
    <el-input v-model="form.email" style='width:90%'></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="doAddSubmit()">添加</el-button>
    <el-button @click='doAddCancel()'>取消</el-button>
  </el-form-item>
</el-form>
</div>
</div>
</template>

<script>
export default {
  inject: ["reload"],
  data() {
     //自定义表单验证规则（黄昌壹）
    var validatePass = (rule, value, callback) => {
      //验证密码
      // alert(value);
      if (!value) {
        callback(new Error("请输入密码"));
      } else if (value.toString().length < 6 || value.toString().length > 18) {
        callback(new Error("密码长度为6 - 18个字符"));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      //验证确认密码
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var checkEmail = (rule, value, callback) => {
      //验证邮箱
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
      if (!value) {
        return callback(new Error("邮箱不能为空"));
      }
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确的邮箱格式"));
        }
      }, 100);
    };
    var validatePass3 = (rule, value, callback) => {
      //验证用户名
      // alert(value);
      if (!value) {
        callback(new Error("请输入用户名"));
      } else if (value.toString().length < 3 || value.toString().length > 6) {
        callback(new Error("用户名长度为3 - 6个字符"));
      } else {
        callback();
      }
    };
    return {
      rules: {
        password: [
          {
            required: true,
            validator: validatePass,
            trigger: ["change", "blur"]
          }
        ],
        repassword: [
          {
            required: true,
            validator: validatePass2,
            trigger: ["change", "blur"]
          }
        ],
        email: [
          { required: true, validator: checkEmail, trigger: ["change", "blur"] }
        ],
        name: [
          {
            required: true,
            validator: validatePass3,
            trigger: ["change", "blur"]
          }
        ]
      },
      isShow: false,
      isAddShow: false,
      form: {
        id: "",
        name: "",
        sex: "",
        email: "",
        password: "",
        repassword: ""
      },
      tableData: [
        // {
        //   date: "2016-05-02",
        //   name: "王小虎",
        //   sex: "男",
        //   email: "普陀区"
        // },
        // {
        //   date: "2016-05-04",
        //   name: "王小虎",
        //   sex: "女",
        //   email: "普陀区"
        // },
        // {
        //   date: "2016-05-01",
        //   name: "王小虎",
        //   sex: "女",
        //   email: "普陀区"
        // },
        // {
        //   date: "2016-05-03",
        //   name: "王小虎",
        //   sex: "男",
        //   email: "普陀区"
        // }
      ]
    };
  },
  methods: {
    handleEdit(index, row) {//显示编辑表单组件（黄昌壹）
      this.form.id = row.user_id;
      this.form.name = row.user.user_name;
      this.form.sex = row.user.sex;
      this.form.email = row.user.email;
      this.isShow = true;
      //   this.form.name = row.name;
      // alert('编辑' + index, row);
    },
    handleDelete(index, row) {
      //删除管理员（黄昌壹）
      console.log("删除" + row.user.user_id + row.user.sex + row.user.email);
      this.$store
        .dispatch("doDeleteAdmin", {
          formInfo: {
            id: row.user.user_id,
            name:row.user.user_name,
          }
        })
        .then(res => {
          this.reload();
        })
        .catch(e => {});
    },
    onSubmit() {
      //提交修改管理员信息的表单（黄昌壹）
      this.$store
        .dispatch("doEditAdminInfo", {
          formInfo: this.form
        })
        .then(res => {
          this.isShow = false;
          this.reload(); //重载页面实现数据更新
        })
        .catch(e => {});
    },
    doCancel() {//取消修改操作（黄昌壹）
      this.isShow = false;
      this.form.name = "";
      this.form.sex = "";
      this.form.email = "";
    },
    doAdd() {//显示添加管理员的表单组件
      this.isAddShow = true;
    },
    doAddCancel() {//取消添加管理员操作（黄昌壹）
      this.$refs["form"].clearValidate(); // 清除整个表单的校验
      this.isAddShow = false;
      this.form.name = "";
      this.form.sex = "";
      this.form.email = "";
      this.form.password = "";
      this.form.repassword = "";
    },
    doAddSubmit() {
      //增加管理员（黄昌壹）
      this.$store
        .dispatch("doAddAdmin", {
          formInfo: this.form
        })
        .then(res => {
          this.isShow = false;
          this.$refs["form"].clearValidate(); // 清除整个表单的校验
          this.reload(); //重载页面实现数据更新
        })
        .catch(e => {});

      // console.log(this.form);
      // this.isAddShow = false;
    }
  },
  created() {//获取管理员信息（黄昌壹）
    this.$store
      .dispatch("getAdminInfo")
      .then(res => {
        // console.log(res.data.adminInfo[0]);
        this.tableData = res.data.adminInfo;
        console.log(this.tableData);
      })
      .catch(e => {});
  }
};
</script>
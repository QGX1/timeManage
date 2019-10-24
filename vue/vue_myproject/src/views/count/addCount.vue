<template>
  <div class="accountList"> 
    <HeaderTop title="添加清单列表">
      <span slot="left" class="add_habit" @click="addAccount">
          <i class="iconfont icon-houtui"></i>
      </span>
       <span slot="right" class="addSave" @click="addAccount">
          <i class="iconfont icon-shouye"></i>
      </span>
    </HeaderTop>
    <div class="detailContent">
      <div class="listTitle" >
        <el-input
          type="text"
          placeholder="请输入标题"
          v-model="listTitle"
          maxlength="20"
          show-word-limit
          clearable
          :class="{on:showInput}"
           @focus="changeInput('showInput')"
           @blur="hideInput('showInput')"
        >
        </el-input>
      </div>

      <div class="listContent">
        <el-input
          type="textarea"
          placeholder="请输入内容"
          v-model="listContent"
          maxlength="800"
          :autosize="{ minRows: 2}"
          show-word-limit
          :class="{on:showTextarea}"
          @focus="changeInput('showTextarea')"
          @blur="hideInput('showTextarea')"
        >
        </el-input>
      </div>

      <div class="tontentImg">
        <el-upload
          action="/api/uploadImg"
          list-type="picture-card"
          :limit='9'
          accept='.jpg,.jpeg,.png,.bmp'
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :data='resData'
          >
          <!-- :http-request='uploadImg' -->
          <!-- :on-change="maxUploadNum"
          :file-list="imgFilesList" -->
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </div>
    </div>
    
  </div>  
</template>

<script>
import HeaderTop from '../../components/HeaderTop'
import Account from '../../components/account/addAccount'
import { Form } from 'element-ui';
import {uploadSumImg} from '../../api/index'
export default {
  name:'accountList',
  inject:['reload'],//注入reload方法
   components: {
    HeaderTop,
    Account
  },
  data() {
    return {
      listTitle:'',
      listContent:'',
      showInput:false,
      showTextarea:false,
      dialogImageUrl: '',
      dialogVisible: false,
      // 上传图片附带的额外参数
      resData:{
        account_id:this.$route.query.account_id,
      }
    }
  },
  
  methods: {
    // 自定义上传图片的函数，自定义上传函数会覆盖默认上传
    uploadImg(file){
      console.log(1111)
      console.log(file.filename)
      let formdata=new FormData();
      formdata.append(file.filename,file.file,file.file.name);
      console.log(formdata.get(file.filename))
      uploadSumImg(formdata)
      // .then(res=>{
      //   console.log(res);
      // })
    },
    handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        console.log(file)
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
    // 返回
    addAccount(){
      this.$router.go(-1);
      // sessionStorage.removeItem('account_id')
      this.reload()
    },
    // 改变输入款的状态
    changeInput(value){
      // console.log(this[value])//将传过来的字符串变成变量
      this[value]=true;
    },
    hideInput(value){
     this[value]=false;
    }
  },
  mounted() {
    // console.log(12345)
    // console.log(this.$route.query.account_id)
    let account_id={name:'account_id',value:this.$route.query.account_id}
    sessionStorage.setItem('account_id',JSON.stringify(account_id))//存入浏览器缓存中
    // console.log(JSON.parse(sessionStorage.getItem('account_id')))//获取浏览器缓存
  },
}
</script>

<style lang="stylus" scoped>
  span.add_habit 
    float: left;
    .iconfont.icon-houtui 
      font-size: 30px;
      color: white;
  .listTitle {
    margin-top: 42px;
    margin-bottom 20px;
  }
  .tontentImg {
    margin-top: 10px;
    background-color: white;
  }
  span.addSave {
    float: right;
    margin-top: -40px;
    /* right: 10px; */
    margin-right: 10px;
  }
  i.iconfont.icon-shouye {
    font-size: 30px;
    color: white;
  }
</style>

<style scoped>
  .tontentImg>>>.el-upload-list--picture-card .el-upload-list__item {
    overflow: hidden;
    background-color: #fff;
    border: 1px solid #c0ccda;
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 100px;
    height: 100px;
    margin: 0 8px 8px 0;
    display: inline-block;
  }
  .tontentImg>>>.el-upload--picture-card {
      background-color: #fbfdff;
      border: 1px dashed #c0ccda;
      border-radius: 6px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      width: 100px;
      height: 100px;
      line-height: 100px;
      vertical-align: top;
  } 
  .listTitle >>>.el-input__inner {
    -webkit-appearance: none;
    background-color: #fafafa;
    background-image: none;
    border: 0px solid #DCDFE6 !important;
    -webkit-box-sizing: border-box;
    display: inline-block;
    font-size: inherit;
    height: 50px;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);    
  }
  .on >>>.el-input__inner {
    background-color: white;
    border-bottom: 3px solid #85b777 !important   
  }
  .listContent>>>.el-textarea__inner {
    font-size: 16px;
    height: 400px;
    display: block;
    resize: vertical;
    padding: 5px 15px;
    line-height: 1.5;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;
    font-size: inherit;
    color: #606266;
    background-color: #fafafa;
    background-image: none;
    border: 0px solid #DCDFE6;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
  }
   .on >>>.el-textarea__inner {
    background-color: white;
  }
  .tontentImg>>>.el-dialog__headerbtn {
    position: absolute;
    top: 5px;
    right: 20px;
    padding: 0;
    background: 0 0;
    border: none;
    outline: 0;
    cursor: pointer;
    font-size: 16px;
  }
  .tontentImg>>>.el-dialog {
    position: relative;
    margin: 0 auto 50px;
    border-radius: 2px;
    -webkit-box-shadow: 0 1px 3px rgba(0,0,0,.3);
    box-shadow: 0 1px 3px rgba(0,0,0,.3);
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 80%;
  }
</style>


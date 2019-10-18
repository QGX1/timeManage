<template>
    <div id="addCount">
        <el-dialog title="添加清单集" :visible.sync="dialogFormVisible" width='98%' @close="closeAdd('addHabitForm')">
            <el-form :model="addCountForm" :rules="rules"  ref="addCountForm" >
                <el-form-item  :label-width="formLabelWidth" prop="account_title" required>
                    <input type="text" 
                        placeholder='习惯养成标题' 
                        class="title_habit"
                        v-model="addCountForm.account_title">
                </el-form-item>
                <el-form-item 
                    :label-width="formLabelWidth" 
                    prop="account_color" 
                    >
                    <el-time-picker
                        v-model="addCountForm.account_color"
                        :picker-options="{
                        selectableRange: '00:00:00 - 23:59:59'
                        }"
                        placeholder="设置时间"
                        value-format='HH:mm:ss'
                        >
                    </el-time-picker>
                </el-form-item>
                
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeAdd('addCountForm')">取 消</el-button>
                <el-button type="primary" @click="submitForm('addCountForm')">提 交</el-button>
            </div>
        </el-dialog>
    </div>
</el-dialog>
    </div>
</template>

<script>
import {addHabit} from '../../api/index.js'
import user from '../../store/modules/user.js';
import {MessageBox,Loading} from 'element-ui'
export default {
    inject:['reload'],//注入reload方法
    name:'addCount',
    data() {
        return {
            user_id:this.$store.state.users.userInfo.user_id,
            dialogFormVisible: true,
            showDay:true,
            arrImg:[
            ],
            addCountForm: {
                account_title: '',
                account_color:''
            },
            rules: {
                habit_title: [
                    { required: true, message: '输入习惯养成标题' ,trigger: 'blur'}
                ],
            },
            formLabelWidth: '120px'
        }
    },
    mounted() {
        this.toLoading()
    },
       
    methods: {
        // 消息提示弹框
        open(msg) {
            MessageBox({
                title: '提示',
                message: msg
            });
        },
        // 加载状态
        toLoading(){
             const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
                });
                setTimeout(() => {
                loading.close();
                }, 2000);
        },
        // 取消习惯养成框
        closeAdd(formName){
            const valid=true;
            this.dialogFormVisible=true;
            this.$refs[formName].resetFields();//将表格数据置空
            this.$emit("listenAddHabitEvent",valid)
        },
        // 提交添加习惯养成数据
        submitForm(formName) {
            let that=this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // 生成表单数据
                    console.log("时间")
                    console.log(this.addHabitForm.habit_time)
                    let habit_time1=this.addHabitForm.habit_time.substring(0,2)
                    let habit_time2=this.addHabitForm.habit_time.substring(3,5)
                    let habit_time= parseInt(habit_time1)*60+ parseInt(habit_time2)
                    console.log(this.addHabitForm.habit_title);
                    // 随机生成图片
                    const chars=['0','1','2','3','4','5','6','7','8','9']
                    let habit_img="";//存放图片
                    let index=Math.ceil(Math.random()*9);
                    habit_img=this.arrImg[index]
                    
                    let addHabitDate={
                        user_id:this.user_id,
                        habit_title:this.addHabitForm.habit_title,
                        habit_time:habit_time,
                        habit_img:habit_img
                    }
                    // console.log(addHabitDate)
                    // 1、请求数据库，存入数据
                    addHabit(addHabitDate).then(res=>{           
                        this.$options.methods.open(res.data.msg)
                    })
                    // 2、存储成功后，清空数据
                    this.$refs[formName].resetFields();//清空数据
                    this.$emit("listenAddHabitEvent",valid);  
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
            
        },
        
    },
}
</script>

<style lang="stylus" scoped>
// @import './main.css';
    .title_habit {
        margin-left: -100px;
        margin-top: 10px;
        width: 100%;
        color: #61AD4C;
        font-size: 16px;
        font-weight: bold;
        border: none;
        border-bottom: 2px solid;
        text-align: center;
    }  
    .el-input 
        margin-left -100px !important;
    .ca_daylong
        float: left;
        margin-left: -70px;
    .ca_colorContent
        display flex
        float left
        margin-left: -70px;
        text-align center
        vertical-align middle
        margin-right 160px
        .ca_text
            position absolute
            font-size 12px
            margin-top -5px
            width 100px
            margin-left -5px
   
    .el-dialog__header 
        border-bottom: 1px solid #ccc !important;
    .el-button--primary
        background-color: rgb(97, 173, 76) !important ;
        border-color: rgb(97, 173, 76) !important;
    

</style>



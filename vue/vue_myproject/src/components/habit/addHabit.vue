<template>
    <div id="addhabit">
        <el-dialog title="添加习惯养成" :visible.sync="dialogFormVisible" width='98%' @close="closeAdd('addHabitForm')">
            <el-form :model="addHabitForm" :rules="rules"  ref="addHabitForm" >
                <el-form-item  :label-width="formLabelWidth" prop="habit_title" required>
                    <input type="text" 
                        placeholder='习惯养成标题' 
                        class="title_habit"
                        v-model="addHabitForm.habit_title">
                </el-form-item>
                <el-form-item required 
                    :label-width="formLabelWidth" 
                    prop="habit_time" 
                    >
                    <el-time-picker
                        v-model="addHabitForm.habit_time"
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
                <el-button @click="closeAdd('addHabitForm')">取 消</el-button>
                <el-button type="primary" @click="submitForm('addHabitForm')">提 交</el-button>
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
    props:['selectTime'],
    inject:['reload'],//注入reload方法
    name:'addhabit',
    data() {
        return {
            user_id:this.$store.state.users.userInfo.user_id,
            dialogFormVisible: true,
            showDay:true,
            arrImg:[
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1570628096328&di=f31064dcdebb9f3ea8bedefa9e201e7e&imgtype=jpg&src=http%3A%2F%2Fimg4.imgtn.bdimg.com%2Fit%2Fu%3D3803113224%2C475803562%26fm%3D214%26gp%3D0.jpg',
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571222634&di=3dd9f4642640bad9d330e86464d03288&imgtype=jpg&er=1&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201407%2F10%2F092251yjc3igpaozadcgj6.jpg',
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571222899&di=2b17551ef6b0b9d020e9e60998494686&imgtype=jpg&er=1&src=http%3A%2F%2Ft-1.tuzhan.com%2Fa56da66ed445%2Fc-2%2Fl%2F2014%2F01%2F27%2F02%2F456dc5bfa57d4bd89944a9bce17351db.jpg',
                'http://img4.imgtn.bdimg.com/it/u=1764553209,2062397641&fm=26&gp=0.jpg',
                'http://attach.bbs.miui.com/forum/201302/26/1743364n8bbu4hz2h9g977.jpg',
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1570810563157&di=6fd787a47b0e7582c15ef8384cb2569a&imgtype=jpg&src=http%3A%2F%2Fimg4.imgtn.bdimg.com%2Fit%2Fu%3D3803113224%2C475803562%26fm%3D214%26gp%3D0.jpg',
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1570810585606&di=8ff2b9bf30f5158e198ee06d15a22777&imgtype=jpg&src=http%3A%2F%2Fimg3.imgtn.bdimg.com%2Fit%2Fu%3D2084939373%2C3948562188%26fm%3D214%26gp%3D0.jpg',
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1570810600294&di=84d0b7b22b0e75cfcb74b59a98b2c5a0&imgtype=jpg&src=http%3A%2F%2Fimg2.imgtn.bdimg.com%2Fit%2Fu%3D2367545607%2C3510133646%26fm%3D214%26gp%3D0.jpg',
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1570810550310&di=15df2a2f49dea93f83a901665273db9c&imgtype=0&src=http%3A%2F%2Fimg.bbs.cnhubei.com%2Fforum%2F201609%2F15%2F025518xhhgxkcpah0khko1.jpg',
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1570810652436&di=e7044b1f2fe3cf3f102eff85815aa050&imgtype=jpg&src=http%3A%2F%2Fimg3.imgtn.bdimg.com%2Fit%2Fu%3D3734483243%2C1159114804%26fm%3D214%26gp%3D0.jpg'
            ],
            addHabitForm: {
                habit_title: '',
                habit_time:'',
                // habit_img:'',//随机生成背景图片
                // user_id:this.$store.state.users.userInfo.user_id
            },
            rules: {
                habit_title: [
                    { required: true, message: '输入习惯养成标题' ,trigger: 'blur'}
                ],
                habit_time: [
                    { required: true, message: '设定习惯养成时间' }
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
                        this.$refs[formName].resetFields();//清空数据
                        this.$emit("listenAddHabitEvent",valid);  
                    })
                    // 2、存储成功后，清空数据                  
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
@import './main.css';
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



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
                        placeholder="设置时间">
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
export default {
    props:['selectTime'],
    data() {
        return {
            dialogFormVisible: true,
            showDay:true,
            addHabitForm: {
                habit_title: '',
                habit_time:'',
                habit_img:''//随机生成背景图片
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
        changeShowDay(){
            console.log(111);
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
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log(formName)
                    // 1、请求数据库，存入数据
                    // 2、存储成功后，清空数据
                    this.$refs[formName].resetFields();//清空数据
                    this.$emit("listenAddHabitEvent",valid);    
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
            
        }
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



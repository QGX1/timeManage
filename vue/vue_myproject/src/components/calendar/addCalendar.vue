<template>
    <div>
        <el-dialog title="添加日程" :visible.sync="dialogFormVisible" width='98%' @close="closeAdd">
            <el-form :model="ruleForm" :rules="rules"  ref="ruleForm" >
                <el-form-item label="日程" :label-width="formLabelWidth" prop="ca_title" required>
                    <el-input 
                        v-model="ruleForm.ca_title" 
                        autocomplete="off" clearable
                        placeholder="日程标题"
                        ></el-input>
                </el-form-item>
                <el-form-item label="开始时间" required 
                    :label-width="formLabelWidth" 
                    prop="ca_begin_time" 
                    >
                    <el-date-picker
                        v-model="ruleForm.ca_begin_time"
                        type="datetime"
                        align="left"
                        value-format='yyyy-MM-dd HH:mm:ss'   
                         placeholder="选择日期开始时间"
                    >
                        {{selectTime}}
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间" 
                    :label-width="formLabelWidth" 
                    prop="ca_end_time"
                   >
                    <el-date-picker
                        v-model="ruleForm.ca_end_time"
                        type="datetime"
                        placeholder="选择日期结束时间"
                        align="left"
                        value-format='yyyy-MM-dd HH:mm:ss'
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item :label-width="formLabelWidth" class="ca_colorContent" prop="ca_color">
                    <el-color-picker v-model="ruleForm.ca_color" size='mini' ></el-color-picker>
                    <span class="ca_text">选择显示颜色</span>                  
                </el-form-item>
                <el-form-item :label-width="formLabelWidth" prop="ca_daylong" > 
                    <el-checkbox 
                        v-model="ruleForm.ca_daylong" 
                        size='mini'label="显示全天" 
                        border
                        class="ca_daylong"
                        ></el-checkbox>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeAdd()">取 消</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')">提 交</el-button>
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
            ruleForm: {
                ca_title: '',
                ca_begin_time:'',
                ca_end_time:'',
                ca_daylong:false,
                ca_color:'#60B840'
            },
            rules: {
                ca_title: [
                    { required: true, message: '请输入日程' ,trigger: 'blur'}
                ],
                ca_begin_time: [
                    { required: true, message: '选择开始时间' }
                ],
                ca_end_time: [
                    { required: true, message: '选择结束时间' }
                ],

            },
            formLabelWidth: '120px'
        }
    },
    // 监听数据变化
     watch: {
          'selectTime': function(newVal,oldVal){
            //    console.log('new: %s, old: %s', newVal, oldVal)
               this.ruleForm.ca_begin_time=newVal//给开始时间初始值
               console.log(this.ruleForm.ca_begin_time)
          },
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
        // 时间比较
        compareTime(star,end){
            var date= new Date();
            //2把字符串格式转换为日期类
            var startTime = new Date(Date.parse(star));
            var endTime = new Date(Date.parse(end));
            //进行比较
            return (startTime<endTime);
        },
        // 关闭添加日程数据
        closeAdd(){
            console.log(111)
            this.dialogFormVisible = false
            const valid=true
            this.$emit("listenAddCalendarEvent",valid)
        },
        // 提交添加日程数据
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                console.log(this.ruleForm)
                // 比较日程开始时间和结束时间
                const compareResult=this.compareTime(this.ruleForm.ca_begin_time,this.ruleForm.ca_end_time)
                console.log(compareResult)
                if(compareResult){
                    // 1、请求数据库，存入数据
                    // 2、存储成功后，清空数据
                    this.$refs[formName].resetFields();//清空数据
                    this.$emit("listenAddCalendarEvent",valid);    
                }else{
                    this.$message({
                        showClose: true,
                        message: '结束时间小于开始时间，重新选择',
                        type: 'error'
                    });
                }
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
    .el-dialog__body {
        padding: 30px 20px;
        color: #606266;
        font-size: 14px;
        word-break: break-all;
        border: 1px solid !important;
    }

</style>



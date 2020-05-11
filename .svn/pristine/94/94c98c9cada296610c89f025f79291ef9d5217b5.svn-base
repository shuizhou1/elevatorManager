<!--  -->
<template>
  <div>
    <div class="inputBox" @click.stop="inputClick">
      <i class="el-icon-date"></i>
      <input type="text" class="range-input" :placeholder="startPlaceholder">
      <span  class="separator" >{{rangeSeparator}}</span>
      <input type="text" class="range-input" :placeholder="endPlaceholder">
    </div>
    <div class="selectBox" v-if="showDatePicker">
      <div class="left">
        <div class="head">
          <i class="el-icon-d-arrow-left date_icon fl" @click.stop="toFrontYear"></i>
          {{year}}
        </div>
        <div class="dateWraper">
          <div v-for="(item,index) in data" :key="index" class="dateItem"><span :class="{'active':(year==toYear&&index==toMonth)}">{{item}}</span></div>
        </div>
      </div>
      <div class="right">
        <div class="head">
          {{nextyear}}
          <i class="el-icon-d-arrow-right date_icon fr" @click.stop="toNextYear"></i>
        </div>
        <div class="dateWraper">
          <span v-for="item in data" :key="item" class="dateItem"><span>{{item}}</span></span>
        </div>
      </div>
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
     rangeSeparator:{
       type:String,
       default:'至'
     },
     startPlaceholder:{
       type:String,
       default:'开始月份'
     },
    endPlaceholder:{
      type:String,
      default:'结束月份'
    },
    start:{
      type:String,
      default:''
    },
    end:{
      type:String
    }
  },
  data () {
    return {
      data:['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
      showDatePicker:false,
      toYear:new Date().getFullYear(),//当年
      toMonth: new Date().getMonth()//当月
    };
  },
  computed:{
    month:{
      get(){
        return new Date().getMonth()
      }
    },
    year:{
      get(){
        return new Date().getFullYear()
      },
      set(){

      }
    },
    nextyear:{
      get(){
        return new Date().getFullYear()+1
      },
      set(val){
        console.log('setnextyear',val)
      }
    }
  },
  components: {},
  created(){
    document.body.onclick=()=>{
      if(this.showDatePicker){
        this.showDatePicker = false;
      }
    }
  },
  methods: {
    inputClick(){
      console.log('click',this.showDatePicker)
      if(!this.showDatePicker){
        console.log(100);
        this.showDatePicker = true;
      }
    },
    toFrontYear(){
      console.log('前一年')
      this.year--;
      this.nextyear--;
    },
    toNextYear(){
      this.year++
      this.nextyear++
    }
  }
}

</script>
<style  scoped lang="scss">
.inputBox{
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  display: flex;
  align-items: center;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  outline: none;
  padding: 0 15px;
  cursor: pointer;
  transition: border-color .2s cubic-bezier(.645,.045,.355,1);
  position: relative;
  .range-input{
    border: none;
    text-align: center;
  }
}


.separator{
  color: #303133;
}
.selectBox{
  position: absolute;
  z-index: 999;
  bottom: -208px;
  background: #fff;
  border: 1px solid #ebebeb;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  border-radius: 3px;
  display: flex;
  &>.left{
    padding: 16px;
    border-right:1px solid #e4e4e4;
    // width: 320px;
  }
  &>.right{
    padding: 16px;
    // width: 320px;
  }
  & .head{
    font-size: 16px;
    text-align: center;
    height: 28px;
    line-height:28px;
    .date_icon{
      font-size: 12px;
      color: #303133;
      border: 0;
      background: transparent;
      cursor: pointer;
      outline: none;
      margin-top: 8px;
      &.fl {
        float: left;
      }
      &.fr{
        float: right;
      }
    }
    .date_icon:hover{
      color: #409eff;
    }
  }
  & .dateWraper{
    display: flex;
    flex-wrap: wrap;
    width: 240px;
    & .dateItem{
    font-size:14px;
    color: #666;
    flex: 0 0 60px;
    height:36px;
    margin: 8px 0;
    text-align: center;
    line-height: 36px;
    .dateItem:hover {
      cursor: pointer;
    }
    span:hover {
      color:#409eff;
    }
    span.active {
      color:#409eff;
    } 
    }
  }
 
}
.selectBox::before{
  content:'';
  position: absolute;
  left:5px;
  top:5px;
  width: 5px;
  height: 5px;
  background:#fff;
  transform: rotate(45deg);
}
</style>
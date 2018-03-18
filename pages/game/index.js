// pages/game/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    width:120,
    height:120,
    target:-1,
    locate:[],
    target_show: false,
    can_start: true,
    can_turn: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //生成坐标
    var arr=[];
    var num=0;
    for(var i=0;i<5;i++){
      for(var j=0;j<5;j++){
        var obj={
          x: j*(this.data.width+18)+9,
          y: i*(this.data.height+18)+9,
          id: num++
        }
        arr.push(obj);
      }
    }
    this.setData({
      locate: arr
    })
    
  },

  //开始挑战
  fntap: function(evt){
    if(!this.data.can_start) return;
    this.setData({
      can_start: false
    });
    var that=this;
    var repeat=8;
    this.setTarget();
    
    var timer=setInterval(function(){
      if(repeat==0){
        that.setData({
          can_start: true,
          can_turn: true
        });
        clearInterval(timer);
        return;
      };
      that.move();
      repeat--;
    },1000)
    
  },
  //翻牌
  turnAround: function(evt){
    if(!this.data.can_turn) return;
    var id=evt.currentTarget.dataset.id;
    if(this.data.target==id){
      console.log('猜对了');
    }else{
      console.log('猜错了');
    }
    this.setData({
      can_turn: false
    })
  },
  //确定目标
  setTarget: function(){
    var num=Math.round(Math.random()*25);
    this.setData({
      target: num,
      target_show: true
    });
    var that=this;
    setTimeout(function(){
      that.setData({
        target_show: false
      })
    },500)
  },
  //打乱
  move: function(){
    var data=this.data.locate;
    var tmp_arr=[];
    for(var i=0;i<25;i++){
      tmp_arr[i]=i;
    }
    var index=tmp_arr.indexOf(this.data.target);
    tmp_arr.splice(index,1);
    var pool = getArrayItems(tmp_arr,7);
    pool.push(this.data.target);
    
    for(var i=0;i<4;i++){
      //console.log(pool)
      var item = data[pool[0]];
      data[pool[0]] = data[pool[pool.length-1]];
      data[pool[pool.length - 1]] = item;
      pool.shift();
      pool.pop();
    }

    for(var k in data){
      data[k].id=k;
    }
    
    this.setData({
      locate: data
    })
    //从数组中取数
    function getArrayItems(arr, num) {
      var temp_array = new Array();
      for (var index in arr) {
        temp_array.push(arr[index]);
      }
      var return_array = new Array();
      for (var i = 0; i < num; i++) {
        if (temp_array.length > 0) {
          var arrIndex = Math.floor(Math.random() * temp_array.length);
          return_array[i] = temp_array[arrIndex];
          temp_array.splice(arrIndex, 1);
        } else {
          break;
        }
      }
      return return_array;
    }
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
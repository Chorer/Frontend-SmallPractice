// 获取dom元素
var container = document.getElementsByClassName("container")[0];
var wrap = document.getElementsByClassName("wrap")[0];
var left = document.getElementsByClassName("jt_left")[0];
var right = document.getElementsByClassName("jt_right")[0];
var buttons = document.getElementsByTagName("span");

//封装左右轮播一次的函数
var newLeft = -600;
function next(){
	if(newLeft == -3000){
		newLeft = 0;
		wrap.style.left = newLeft + "px";
	}
	newLeft -= 600;
	move(wrap,newLeft);
	index++;
	if(index === 5){
		index = 0;
	}
	hightlight();
}
function prev(){
	if(newLeft == 0){
		newLeft = -3000;
		wrap.style.left = newLeft + "px";
	}
	newLeft += 600;
	move(wrap,newLeft);
	index--;
	if(index === -1){
		index = 4;
	}
	hightlight();
}

// 封装自动播放函数
var timer = null;
function autoPlay(){
	timer = setInterval(function(){
		next();
	},2000);
}

//封装按钮高亮函数
var index = 0;  
function hightlight(){
	for(var i=0;i<buttons.length;i++){
		buttons[i].className = "";
	}
	buttons[index].className = "on";
}

// 事件绑定
container.addEventListener("mouseleave",function(){
	autoPlay();
},false);
container.addEventListener("mouseenter",function(){
	clearInterval(timer);
},false);
left.addEventListener("click",function(){
	prev();
},false);
right.addEventListener("click",function(){
	next();
},false);

//按钮事件绑定
for(var i=0;i<buttons.length;i++){
	(function(i){
		buttons[i].addEventListener("click",function(){
			//图片跳转
			newLeft = -600 * (i+1);
			move(wrap,newLeft);
			//按钮高亮
			index = i;
			hightlight();
		},false);
	})(i);
}

//封装运动函数
function move(obj,value){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var flag = true;
		//获得当前值
		var current = obj.style.left;
		var icurrent = parseInt(current);
		//获得单位运动距离
		var speed = (value - icurrent)/8;
		speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
		// 设置距离让目标运动
		obj.style.left = icurrent + speed + "px";
		// 检测是否到达目标值
		if(icurrent != value){
			flag = false;
		}
		if(flag){
			clearInterval(obj.timer);
		}
	},30);
}
autoPlay();
hightlight();
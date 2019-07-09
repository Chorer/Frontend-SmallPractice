//鼠标移入改变图标透明度和字体颜色
var large_div=document.getElementsByClassName("large");
for(var i=0;i<large_div.length;i++)
{
	large_div[i].onmouseover=function()
	{
		this.firstChild.setAttribute("style","opacity:1");
	};
	large_div[i].onmouseout=function()
	{
		this.firstChild.setAttribute("style","opacity:0.6");
	};
}
var small_div=document.getElementsByClassName("small");
for(var i=0;i<small_div.length;i++)
{
	small_div[i].onmouseover=function()
	{
		this.firstChild.setAttribute("style","opacity:1");
		this.lastChild.setAttribute("style","color:rgb(0,112,112)");
	};
	small_div[i].onmouseout=function()
	{
		this.firstChild.setAttribute("style","opacity:0.6");
		this.lastChild.setAttribute("style","color: ");
	};
}
//鼠标移入改变选项卡字体颜色
var nav=document.getElementById("nav2");
var ali=nav.getElementsByTagName("li");
for(var i=0;i<ali.length;i++)
{
	ali[i].addEventListener('mouseover',cha);
	ali[i].addEventListener('mouseout',cha2);
}	
function cha()
{
	this.style.backgroundColor="rgb(24,111,118)";
}
function cha2()
{
	this.style.backgroundColor="";
}

//鼠标移入显示选项卡的下拉列表
var mli=document.getElementsByClassName("mainlist");
for(i=0;i<mli.length;i++)
{
	mli[i].addEventListener('mouseover',appear);
	mli[i].addEventListener('mouseout',disappear);
}
function appear()
{

	this.children[1].setAttribute("style","display:block");
}
function disappear()
{

	this.children[1].setAttribute("style","display:none");
}
/*
var oUl = document.getElementById("nav");  //获取最外面的ul
var link = oUl.getElementsByTagName("a");    //获取ul下的所有a标签
for(var i=0;i<oA.length;i++){
	link[i].onmouseover = linkMouseover;     // 给每个a添加事件
}
function linkMouseover(){
	//......
	//......
	this.nextElementSibling.setAttribute("style","display:block");  //this.nextElementSibling代表a的兄弟元素ul（要显示的内容）
}
*/
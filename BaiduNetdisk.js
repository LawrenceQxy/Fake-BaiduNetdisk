/*
 双击进入子集：新建数组，将每次生成的文件夹push进数组中，并给文件夹相应的id和pId，id代表的是文件夹的标识，pId代表的是父级的标识
 * */
var menuList = document.getElementsByClassName('menu-list')[0];  //内容左侧选项ul
var menu = menuList.getElementsByTagName('li');  //内容左侧选项li
var link = document.getElementsByClassName('link');  //头部左侧选项li
var headerInfo = document.getElementsByClassName('header-info')[0];  //头部右侧ul
var info = headerInfo.getElementsByTagName('li');  //头部右侧li
var linkArrow1 = link[1].getElementsByTagName('img')[0];  //头部左侧li内的箭头
var linkArrow2 = headerInfo.getElementsByTagName('img');  //头部右侧li内的箭头组
var bar = document.getElementsByClassName('bar')[0];  //新建、删除、重命名框
var chosen = bar.getElementsByTagName('a');  //列表、文件夹切换
var fileBlock = document.getElementsByClassName('file-block')[0];  //文件夹块
var btns = bar.getElementsByTagName('input');  //新建、删除、重命名选项
var files = fileBlock.getElementsByClassName('file');  //文件夹块li
var show = fileBlock.getElementsByClassName('show');  //显示框
var alter = fileBlock.getElementsByClassName('alter');  //命名框
var txtIn = fileBlock.getElementsByTagName('input');  //重命名处的输入框
var sure = fileBlock.getElementsByClassName('sure');  //重命名处的确定
var cancel = fileBlock.getElementsByClassName('cancel');  //重命名处的取消
var moudleList = document.getElementsByClassName('module-list')[0];		//全部文件、已加载框
var mlS = moudleList.getElementsByTagName('span')[0];		//已加载
var mlI = moudleList.getElementsByTagName('i');		//全部文件
var listCols = document.getElementsByClassName('list-cols')[0];  //文件夹名、大小、日期框
var checkAll = listCols.getElementsByTagName('input')[0];		//全选按钮
var ul = document.getElementsByClassName('rightmenu')[0];		//右键菜单
var arr = ['Images/document.jpg','Images/pic.jpg','Images/doc.jpg','Images/video.jpg','Images/bt.jpg','Images/music.jpg','Images/other.jpg','Images/share.jpg','Images/cleaner.jpg'];
mlS.innerHTML = '已全部加载，共'+files.length+'个';
for(var i = 0; i<menu.length; i++) {
	menu[i].style.backgroundImage = 'url('+arr[i]+')';
}
//	图片初始化
for (var i = 0; i<link.length; i++) {
	link[i].onclick = function () {
		for (var i = 0; i<link.length; i++) {
			link[i].style.backgroundColor = '';
		}
		this.style.backgroundColor = '#0f0f0f';
	}
}
//头部li的点击事件
link[1].onmouseover = function () {
	linkArrow1.style.WebkitTransform = 'rotate(180deg)';
}
link[1].onmouseout = function () {
	linkArrow1.style.WebkitTransform = 'rotate(0deg)';
}
info[2].onmouseover = function () {
	linkArrow2[0].style.WebkitTransform = 'rotate(180deg)';
}
info[2].onmouseout = function () {
	linkArrow2[0].style.WebkitTransform = 'rotate(0deg)';
}
info[6].onmouseover = function () {
	linkArrow2[1].style.WebkitTransform = 'rotate(180deg)';
}
info[6].onmouseout = function () {
	linkArrow2[1].style.WebkitTransform = 'rotate(0deg)';
}
//箭头由向下变为向上
chosen[0].onclick = function () {
	chosen[0].style.backgroundImage = 'url(Images/folder-yes.jpg)';
	chosen[1].style.backgroundImage = 'url(Images/list-no.jpg)';
}
chosen[1].onclick = function () {
	chosen[0].style.backgroundImage = 'url(Images/folder-no.jpg)';
	chosen[1].style.backgroundImage = 'url(Images/list-yes.jpg)';
}
//列表和文件夹表现形式的切换按钮
var aData = [];		//每次新建的文件夹都被存放进数组里
var del = [];		//存放被删除文件夹
var page = [0];		//存放被双击的文件夹的id，0代表最外层全部文件
btns[0].onOff = true;		//true代表新建按钮没有被点击过，判断当前新建文件夹和重命名文件夹能不能点击
btns[2].onOff = true;		//true代表重命名按钮没有被点击过，判断当前新建文件夹和重命名文件夹能不能点击
btns[2].isClicked = true;		//true代表重命名按钮没有被点击过，判断是新建状态下还是重命名状态下，当是新建状态下时，点击cancel可以该文件被删除
location.hash = 'page=0';
btns[0].onclick = function () {
	if(del.length) {
		del.sort(function (a,b) {
			return a.id - b.id
		})
		for (var i = 0; i < del.length; i++ ) {
			var n = del[i].id-1;
			createElement (n)
		}
	}else{
		var n = aData.length;
		createElement (n)
	}
}
//点击新建文件夹时生成文件
function createElement (n) {
	if (btns[2].onOff == false) {
		return;
	}
	btns[2].onOff = false;		//新建文件夹时默认文件夹重命名
	btns[0].onOff = false;
	var li = document.createElement('li');
	li.className = 'file fl';
	drag(li);
	var dl = document.createElement('dl');
	var dt = document.createElement('dt');
	var dtA = document.createElement('a');
	var ddS = document.createElement('dd');
	ddS.className = 'show';
	ddS.style.display = 'none';
	var pInfo = document.createElement('p');
	pInfo.className = 'info';
	ddS.appendChild(pInfo);
	var ddA = document.createElement('dd');
	ddA.className = 'alter';
	ddA.style.display = 'block';
	var inTxt = document.createElement('input');
	inTxt.type = 'text';
	inTxt.value = '新建文件夹'+(n+1);
	var ss = document.createElement('span');
	ss.innerHTML = '√';
	ss.className = 'sure';
	var sc = document.createElement('span');
	sc.innerHTML = '×';
	sc.className = 'cancel';
	dt.appendChild(dtA);
	ddA.appendChild(inTxt);
	ddA.appendChild(ss);
	ddA.appendChild(sc);
	dl.appendChild(dt);
	dl.appendChild(ddS);
	dl.appendChild(ddA);
	li.appendChild(dl);
	fileBlock.insertBefore(li,files[0]);
	inTxt.select();
	//新建文件夹
	li.onOff = true;//true代表没有被点击的状态
	li.isCrashed = false;		//false代表没有被碰撞
	li.mark = n+1;
	dt.onmouseover = function () {
		if (btns[2].onOff && li.onOff) {
			this.style.backgroundImage = 'url(Images/file-onmouseover.jpg)';
		}
	}
	dt.onmouseout = function () {
		if ( btns[2].onOff && li.onOff) {
			this.style.backgroundImage = '';
		}
	}
	dtA.onclick = function () {
		if (btns[2].onOff) {
			if (li.onOff) {
				li.onOff = false;  //当dt被点击时，判断当前点击状态，状态改变
				this.parentNode.style.backgroundImage = 'url(Images/file-selected.jpg)';
			}else{
				this.parentNode.style.backgroundImage = 'url(Images/file-onmouseover.jpg)';
				li.onOff = true;		//当dt被点击时，判断当前点击状态，状态改变
			}
		}
		judge();
	}
	judge();
	//新生成的文件夹的移入移出点击
	dtA.onmousedown = ss.onmousedown = sc.onmousedown = inTxt.onmousedown = function (ev) {
		ev.cancelBubble = true;
	}
	dtA.onmouseup = ss.onmouseup = sc.onmouseup = inTxt.onmouseup = function (ev) {
		ev.cancelBubble = true;
	}
	ss.onclick = function () {
		for (var i = 0; i < files.length; i++) {
			if (files[i] != this.parentNode.parentNode.parentNode && inTxt.value == files[i].children[0].children[1].children[0].innerHTML) {
				alert('已有相同名称的文件存在');
				return;
			}
		}
		pInfo.innerHTML = inTxt.value;
		ddS.style.display = ''
		ddA.style.display = '';
		if (btns[2].isClicked) {
			var hash = location.hash.split('=')[1];
			aData.unshift({id:(n+1),name:pInfo.innerHTML,pId:hash});
		}else{
			for (var i = 0; i < files.length; i++) {
				if (!files[i].onOff) {
					var mark = files[i].mark;
					for (var j = 0; j < aData.length; j++) {
						if (aData[j].id == mark) {
							aData[j].name = pInfo.innerHTML;
						}
					}
				}
			}
		}
		btns[0].onOff = true;		//点击确认时可以重新点击新建/重命名
		btns[2].onOff = true;		//点击确认时可以重新点击新建/重命名
		btns[2].isClicked = true;	
		dt.style.backgroundImage = '';
		li.onOff = true;		//点击确认时让当前li重新变为未点击状态
//		judge();
		if(del.length) {
			del.shift();
		}
	}
	//点击√
	sc.onclick = function () {
		if (btns[2].isClicked) {
			fileBlock.removeChild(this.parentNode.parentNode.parentNode);
			mlS.innerHTML = '已全部加载，共'+files.length+'个';
		}else{
			ddS.style.display = ''
			ddA.style.display = '';
		}
		btns[0].onOff = true;		//点击确认时可以重新点击新建/重命名
		btns[2].onOff = true;		//点击取消时可以重新点击新建/重命名
		btns[2].isClicked = true;	
		dt.style.backgroundImage = '';
		li.onOff = true;		//点击取消时让当前li重新变为未点击状态
//		judge();
	}
	//点击×
	//新建文件夹
	mlS.innerHTML = '已全部加载，共'+files.length+'个';
	for (var i = 0; i < files.length; i++) {
		if (!files[i].onOff) {
			files[i].onOff = true;
			files[i].children[0].children[0].style.backgroundImage = '';
		}
	}
	//点击新建时让被选中的文件夹变为没被选中的状态
	for (var i = files.length-1; i > -1; i--) {
		files[i].children[0].children[1].children[0].ondblclick = function () {
			location.hash = 'page='+this.parentNode.parentNode.parentNode.mark;
			page.push(this.parentNode.parentNode.parentNode.mark);
			fileBlock.innerHTML = '';
			var i = document.createElement('i');
			i.className = 'fl';
			i.innerHTML = this.innerHTML+'>';
			moudleList.insertBefore(i,mlS);
			mlS.innerHTML = '已全部加载，共'+files.length+'个';
		}
	}
	//文件夹的双击事件，更改页面hash
	for (var i = 0; i < mlI.length; i++) {
		mlI[i].index = i;
		mlI[i].onclick = function () {
			location.hash = 'page='+Number(page[this.index]);
			for (var i = this.index+1; i < mlI.length; i++) {
				moudleList.removeChild(mlI[i]);
				page.pop();
				i--;
			}
		}
	}
	//点击文字让页面回到相应的页面
	rightClickFiles();
}
btns[1].onclick = function () {
	for (var i = 0; i < files.length; i++) {
		if (!files[i].onOff ) {
			var mark = files[i].mark;
			fileBlock.removeChild(files[i]);
			i--;
			for (var j = 0; j < aData.length; j++) {
				if (aData[j].id == mark) {
					del.push(aData[j]);
					aData.splice(j,1);
					j--;
				}
			}
			deleteFn(mark);
		}
	}
	mlS.innerHTML = '已全部加载，共'+files.length+'个';
	judge();
//	console.log(aData);
}
var arrMark = [];
function deleteFn (mark) {
	for (var i = 0; i < aData.length; i++) {
		if (mark == aData[i].pId) {
			arrMark.push(aData[i]);
			del.push(aData[i]);
			aData.splice(i,1);
			i--;
		}
	}
	if (arrMark.length == 0) {
		return;
	}else{
		var delId = arrMark[0].id;
		arrMark.shift();
		return deleteFn (delId);
	}
}
//删除文件夹
btns[2].onclick = function () {
	for (var i = 0; i < files.length; i++) {
		if (!files[i].onOff && this.onOff) {
			this.onOff = false;		//不能重复点击重命名
			this.isClicked = false;		//当前已经不为新建文件夹的重命名状态
			show[i].style.display = 'none';
			alter[i].style.display = 'block';
			alter[i].getElementsByTagName('input')[0].select();
		}
	}
}
//重命名文件夹
checkAll.onclick = function () {
	if (!btns[2].isClicked) {
		checkAll.checked = false;
		return;
	}
	if (!checkAll.checked) {
		for (var i = 0; i < files.length; i++) {
			files[i].onOff = true;
			files[i].children[0].children[0].style.backgroundImage = '';
		}
	}else{
		for (var i = 0; i < files.length; i++) {
			files[i].onOff = false;
			files[i].children[0].children[0].style.backgroundImage = 'url(Images/file-selected.jpg)';
		}
	}
}
//点击全选
function judge () {
	var m = 0;
	for (var i = 0; i < files.length; i++) {
		if (!files[i].onOff) {
			m++;
		}
	}
	if (m) {
		if (m == files.length) {
			checkAll.checked = true;
		}else{
			checkAll.checked = false;
		}
	}else{
		checkAll.checked = false;
	}
	if (m > 1) {
		btns[2].disabled = true;
	}else{
		if (btns[0].onOff) {
			btns[2].disabled = false;
		}
	}
	//当选中多个文件夹时，无法进行重命名
}
//判断全选
window.onhashchange = function () {
	hash = location.hash.split('=')[1];
	add(hash);
}
//hash改变时，恢复之前的状态,重新渲染页面
function add (hash) {
	fileBlock.innerHTML = '';
	for (var i = aData.length-1; i > -1; i--) {
		if (aData[i].pId == hash) {
			var li = document.createElement('li');
			li.className = 'file fl';
			drag(li);
			var dl = document.createElement('dl');
			var dt = document.createElement('dt');
			var dtA = document.createElement('a');
			var ddS = document.createElement('dd');
			ddS.className = 'show';
			var pInfo = document.createElement('p');
			pInfo.className = 'info';
			pInfo.innerHTML = aData[i].name;
			ddS.appendChild(pInfo);
			var ddA = document.createElement('dd');
			ddA.className = 'alter';
			var inTxt = document.createElement('input');
			inTxt.type = 'text';
			inTxt.value = aData[i].name;
			var ss = document.createElement('span');
			ss.innerHTML = '√';
			ss.className = 'sure';
			var sc = document.createElement('span');
			sc.innerHTML = '×';
			sc.className = 'cancel';
			dt.appendChild(dtA);
			ddA.appendChild(inTxt);
			ddA.appendChild(ss);
			ddA.appendChild(sc);
			dl.appendChild(dt);
			dl.appendChild(ddS);
			dl.appendChild(ddA);
			li.appendChild(dl);
			fileBlock.insertBefore(li,files[0]);
			inTxt.select();
			li.onOff = true;//true代表没有被点击的状态
			li.isCrashed = false;		//false代表没有被碰撞
			li.mark= aData[i].id;
			dt.onmouseenter = function () {
				if (btns[2].onOff && this.parentNode.parentNode.onOff) {
					this.style.backgroundImage = 'url(Images/file-onmouseover.jpg)';
				}
			}
			dt.onmouseleave = function () {
				if (btns[2].onOff && this.parentNode.parentNode.onOff) {
					this.style.backgroundImage = '';
				}
			}
			dtA.onclick = function () {
				if (btns[2].onOff) {
					if (this.parentNode.parentNode.parentNode.onOff) {
						this.parentNode.parentNode.parentNode.onOff = false;
						this.parentNode.style.backgroundImage = 'url(Images/file-selected.jpg)';
					}else{
						this.parentNode.style.backgroundImage = 'url(Images/file-onmouseover.jpg)';
						this.parentNode.parentNode.parentNode.onOff = true;		//当dt被点击时，判断当前点击状态，状态改变
					}
				}
				judge();
			}
			//新生成的文件夹的移入移出点击
			dtA.onmousedown = ss.onmousedown = sc.onmousedown = inTxt.onmousedown = function (ev) {
				ev.cancelBubble = true;
			}
			dtA.onmouseup = ss.onmouseup = sc.onmouseup = inTxt.onmouseup = function (ev) {
				ev.cancelBubble = true;
			}
			ss.onclick = function () {
				for (var i = 0; i < files.length; i++) {
					if (files[i] != this.parentNode.parentNode.parentNode && inTxt.value == files[i].children[0].children[1].children[0].innerHTML) {
						alert('已有相同名称的文件存在');
						return;
					}
				}
				pInfo.innerHTML = inTxt.value;
				ddS.style.display = ''
				ddA.style.display = '';
				if (!btns[2].isClicked) {
					for (var i = 0; i < files.length; i++) {
						if (!files[i].onOff) {
							var mark = files[i].mark;
							for (var j = 0; j < aData.length; j++) {
								if (aData[j].id == mark) {
									aData[j].name = pInfo.innerHTML;
								}
							}
						}
					}
				}
				btns[0].onOff = true;		//点击确认时可以重新点击新建/重命名
				btns[2].onOff = true;		//点击确认时可以重新点击新建/重命名
				btns[2].isClicked = true;	
				dt.style.backgroundImage = '';
				this.parentNode.parentNode.parentNode.onOff = true;		//点击确认时让当前li重新变为未点击状态
				judge();
				if(del.length) {
					del.shift();
				}
			}
			//点击√
			sc.onclick = function () {
				if (!btns[2].isClicked) {
					ddS.style.display = ''
					ddA.style.display = '';
				}
				btns[0].onOff = true;		//点击确认时可以重新点击新建/重命名
				btns[2].onOff = true;		//点击取消时可以重新点击新建/重命名
				btns[2].isClicked = true;	
				dt.style.backgroundImage = '';
				this.parentNode.parentNode.parentNode.onOff = true;		//点击取消时让当前li重新变为未点击状态
				judge();
			}
			//点击×
			mlS.innerHTML = '已全部加载，共'+files.length+'个';
			for (var j = 0; j < files.length; j++) {
				if (!files[j].onOff) {
					files[j].onOff = true;
					files[j].children[0].children[0].style.backgroundImage = '';
				}
			}
			//点击新建时让被选中的文件夹变为没被选中的状态
			for (var j = 0; j < files.length; j++) {
				files[j].children[0].children[1].children[0].ondblclick = function () {
					location.hash = 'page='+this.parentNode.parentNode.parentNode.mark;
					page.push(this.parentNode.parentNode.parentNode.mark);
					fileBlock.innerHTML = '';
					var i = document.createElement('i');
					i.className = 'fl';
					i.innerHTML = this.innerHTML+'>';
					moudleList.insertBefore(i,mlS);
					mlS.innerHTML = '已全部加载，共'+files.length+'个';
				}
			}
			//鼠标双击事件，更改页面hash
			for (var j = 0; j < mlI.length; j++) {
				mlI[j].index = j;
				mlI[j].onclick = function () {
					location.hash = 'page='+Number(page[this.index]);
					for (var i = this.index+1; i < mlI.length; i++) {
						moudleList.removeChild(mlI[i]);
						page.pop();
						i--;
					}
				}
			}
			//点击文字重新渲染moudle-list部分
		}
	}
	rightClickFiles();
}
//createElement函数与add函数的区别为CreateElement为新建文件夹时生成的文件夹show部分隐藏alter显示，而add部分渲染页面，show部分显示alter部分隐藏
cube();
function cube () {
	fileBlock.onmousedown = function (ev) {
		if (ev.which == 1) {
			var nowLeft = ev.clientX;
			var nowTop = ev.clientY;
			var div = document.getElementById('cube');
			div.style.display = 'block';
			for (var i = 0; i < files.length; i++) {
				files[i].onOff = true;
				files[i].children[0].children[0].style.backgroundImage = '';
			}
			btns[2].onOff = true;
		}
		document.onmousemove = function (ev) {
			if (ev.which != 1) {
				return;
			}
			ev.preventDefault();
			div.style.backgroundColor = 'lightblue';
			div.style.border = '1px solid darkblue';
			div.style.position = 'absolute';
			div.style.opacity = '0.5';
			div.style.width = Math.abs(ev.clientX - nowLeft) +'px';
			div.style.height = Math.abs(ev.clientY - nowTop) +'px';
			if (ev.clientX < nowLeft) {
				div.style.left = ev.clientX +'px';
			}else{
				div.style.left = nowLeft +'px';
			}
			if (ev.clientY < nowTop) {
				div.style.top = ev.clientY +'px';
			}else{
				div.style.top = nowTop +'px';
			}
			for (var i = 0; i < files.length; i++) {
				if(crash (div,files[i].children[0].children[0])) {
					files[i].onOff = false;
					files[i].children[0].children[0].style.backgroundImage = 'url(Images/file-selected.jpg)';
				}else{
					files[i].onOff = true;
					files[i].children[0].children[0].style.backgroundImage = '';
				}
			}
			judge();
		}
		document.onmouseup = function (ev) {
			if (ev.which == 1) {
				div.style.cssText = '';
				div.style.display = 'none';
				document.onmousemove = null;
				document.onmouseup = null;
			}
		}
	}
}
//矩形选框
function crash (obj,OBJ) {
	var pos = obj.getBoundingClientRect();
	var POS = OBJ.getBoundingClientRect();
	if (pos.left > POS.right || pos.right < POS.left || pos.top > POS.bottom || pos.bottom < POS.top) {
		//没有碰撞
		return false;
	}else{
		//发生碰撞
		return true;
	}
}
//碰撞函数
var html = document.getElementsByTagName('html')[0];
var section = document.getElementsByTagName('section')[0];
var header = document.getElementsByTagName('header')[0];
html.style.height = window.innerHeight + 'px'
document.body.style.height = html.clientHeight + 'px'
section.style.height = document.body.clientHeight - header.offsetHeight + 'px';
fileBlock.style.height = section.clientHeight - bar.offsetHeight - moudleList.offsetHeight - listCols.offsetHeight +'px';
window.onresize = function () {
	html.style.height = window.innerHeight + 'px'
	document.body.style.height = html.clientHeight + 'px'
	section.style.height = document.body.clientHeight - header.offsetHeight + 'px';
	fileBlock.style.height = section.clientHeight - bar.offsetHeight - moudleList.offsetHeight - listCols.offsetHeight +'px';
}
//设置html，body，section的高度
rightClickFileblock();
function rightClickFileblock () {
	fileBlock.oncontextmenu = function (ev) {
		ev.cancelBubble = true;
		ev.preventDefault();
		ul.innerHTML = '';
		ul.style.display = 'block'
		ul.style.left = ev.clientX +'px';
		ul.style.top = ev.clientY +'px';
		var liAll = document.createElement('li');
		liAll.innerHTML = '全选';
		liAll.onmousedown = liAll.onmouseup = function (ev) {
			ev.cancelBubble = true;
		}
		liAll.onclick = function () {
			if(files.length == 0) {
				ul.style.display = 'none';
				ul.innerHTML = '';
				return;
			}
			if (checkAll.checked) {
				checkAll.checked = false;
			}else{
				checkAll.checked = true;
			}
			checkAll.onclick();
			ul.style.display = '';
			ul.innerHTML = '';
		}
		var liNew = document.createElement('li');
		liNew.innerHTML = '新建文件夹';
		liNew.onmousedown = liNew.onmouseup = function (ev) {
			ev.cancelBubble = true;
		}
		liNew.onclick = function () {
			btns[0].onclick();
			ul.style.display = '';
			ul.innerHTML = '';
		}
		ul.appendChild(liAll);
		ul.appendChild(liNew);
	}
}
//ul处的右键菜单
function rightClickFiles () {
	for (var i = 0; i < files.length; i++) {
		files[i].oncontextmenu = function (ev) {
			ev.cancelBubble = true;
			ev.preventDefault();
			this.onOff = false;
			this.children[0].children[0].style.backgroundImage = 'url(Images/file-selected.jpg)';
			ul.innerHTML = '';
			ul.style.display = 'block'
			ul.style.left = ev.clientX +'px';
			ul.style.top = ev.clientY +'px';
			var liOpen = document.createElement('li');
			liOpen.innerHTML = '打开文件夹';
			liOpen.onmousedown = function (ev) {
				ev.cancelBubble = true;
			}
			liOpen.onclick = function () {
				for (var i = 0; i < files.length; i++) {
					if (!files[i].onOff) {
						files[i].children[0].children[1].children[0].ondblclick();
					}
				}
			}
			var liRe = document.createElement('li');
			liRe.innerHTML = '重命名文件夹';
			liRe.onmousedown = function (ev) {
				ev.cancelBubble = true;
			}
			liRe.onclick = function () {
				btns[2].onclick();
			}
			var liDel = document.createElement('li');
			liDel.innerHTML = '删除文件夹';
			liDel.onmousedown = function (ev) {
				ev.cancelBubble = true;
			}
			liDel.onclick = function () {
				btns[1].onclick();
			}
			ul.appendChild(liOpen);
			ul.appendChild(liRe);
			ul.appendChild(liDel);
			judge();
		}
	}
}
//li处的右键菜单
document.oncontextmenu = document.onclick = function () {
	ul.style.display = '';
	ul.innerHTML = '';
	judge();
}
//在全局单击让右键菜单消失
var shadow = document.getElementById('shadow');
function cloneShadow () {
	shadow.innerHTML = '';
	for (var i = 0; i < files.length; i++) {
		if (!files[i].onOff) {
			var shade = files[i].cloneNode(true);
			shade.mark = files[i].mark;
			shade.style.left = files[i].getBoundingClientRect().left +'px';
			shade.style.top = files[i].getBoundingClientRect().top +'px';
			shadow.appendChild(shade);
		}
	}
}
//生成被选中的文件夹的阴影
function drag (obj) {
	var pos = {};
	var pos2 = [];
	var _shadeLi = null;
	obj.onmousedown = function (ev) {
		ev.cancelBubble = true;
		ev.preventDefault();
		var m = 0;
		for (var i = 0; i < files.length; i++) {
			if (files[i].onOff) {
				m++;
			}
		}
		if (m == files.length) {
			return;
		}
		var _this = this;
		var shadeLi = shadow.getElementsByTagName('li');
		cloneShadow();
		pos2 = [];
		pos.x = ev.clientX;
		pos.y = ev.clientY;
		for (var i = 0; i < files.length; i++) {
			if (!files[i].onOff) {
				pos2.push({
					x:files[i].getBoundingClientRect().left,
					y:files[i].getBoundingClientRect().top,
					e:files[i]
				})
			}
		}
		document.onmousemove = function (ev) {
			var left = ev.clientX - pos.x;
			var top = ev.clientY - pos.y;
			for(var i = 0; i < shadeLi.length; i++) {
				shadeLi[i].children[0].children[0].style.backgroundImage = '';
				shadeLi[i].style.left = pos2[i].x + left +'px';
				shadeLi[i].style.top = pos2[i].y + top +'px';
			}
			for (var i = 0; i < shadeLi.length; i++) {
				if (shadeLi[i].mark == _this.mark) {
					_shadeLi = shadeLi[i];
				}
			}
			for (var i = 0; i < files.length; i++) {
				if (files[i].onOff) {
					if(crash(_shadeLi,files[i])) {
						//发生碰撞
						files[i].isCrashed = true;
						files[i].children[0].children[0].style.backgroundImage = 'url(Images/file-onmouseover.jpg)';
					}else{
						//没有发生碰撞
						files[i].isCrashed = false;
						files[i].children[0].children[0].style.backgroundImage = '';
					}
				}
			}
		}
		document.onmouseup = function () {
			var n = 0;
			var sortArr = [];
			var crashed = [];		//记录被碰撞的元素的定位起始位置与被碰撞元素
			for (var i = 0; i < files.length; i++) {
				if (files[i].isCrashed) {
					n++;
					crashed.push({left:files[i].getBoundingClientRect().left,top:files[i].getBoundingClientRect().top,obj:files[i]});
					files[i].children[0].children[0].style.backgroundImage = '';
					files[i].isCrashed = false;
				}
			}
			if (n) {
				for (var i = 0; i < crashed.length; i++) {
					sortArr.push({sum:Math.pow(crashed[i].left -_shadeLi.getBoundingClientRect().left,2)+Math.pow(crashed[i].top-_shadeLi.getBoundingClientRect().top,2),icon:i});
				}
				sortArr.sort(function (a,b) {
					return a.sum - b.sum;
				})
				for (var i = 0; i < files.length; i++) {
					if (!files[i].onOff) {
						for (var j = 0; j < aData.length; j++) {
							if (aData[j].id ==files[i] .mark) {
								aData[j].pId = crashed[sortArr[0].icon].obj.mark;
							}
						}
					}
				}
				for (var i = 0; i < files.length; i++) {
					if (!files[i].onOff) {
						fileBlock.removeChild(files[i]);
						i--;
					}
				}
			}
			shadow.innerHTML = '';
			pos2 = [];
			document.onmousemove = document.onmouseup = null;
		}
	}
}
//拖动阴影使进入其他文件夹
// 把本mjj.js文件和jquery-3.6.0.min.js放到X:\EMBY server\system\dashboard-ui\目录下
// X:\EMBY server\system\dashboard-ui\mjj.js
// X:\EMBY server\system\dashboard-ui\jquery-3.6.0.min.js
// （或者/opt/emby-server/system/dashboard-ui/）

// 调用本js文件
// 找到X:\EMBY server\system\dashboard-ui\index.html
// 将index.html文件<body>里面添加两行
// <script type="text/javascript" src="./jquery-3.6.0.min.js"></script>
// <script type="text/javascript" src="./mjj.js"></script>


// 要改的地方还挺多的，默认保留了调试弹窗。成功以后自行杠掉//window.alert()
// 替换你的emby地址头部（和域名是有区别的，根据自己的结构，看情况情况加路径）
// windows目录的斜杠\要换成\\,正则
var embyUrl = "/GreyOnedrive";
// 替换你的goindex地址头部（和域名是有区别的，根据自己的目录结构，看情况加路径）
var goindexUrl = "https://one.flor.pp.ua/Public";

//预览【goindex是?a】【oneindex是?s】【onemanager是?preview】自己选。默认没有，非蓝光目录，打开网盘会直接下载文件。
var yulan = "?preview"
//var yulan = "?s"
//var yulan = "?a"
//var yulan = "?preview"

//////////////////////////////////////////////////////////////////////////
//////以下的代码基本不用动了，等调试成功，注释掉//window.alert()就好了////////////
//////////////////////////////////////////////////////////////////////////

//按顺序重复调用三个按钮
var timer = setInterval(function() {
    wangpanButton();
    potplayerButton();
    nplayerButton();
	copyLinkButton(); 
}, 1);

//Nplayer按钮。按钮
function nplayerButton() {
    var showornot = $("div.mediaSource .sectionTitle div")[0];
    //判断是否进入了视频详细页面（剧集总览，和季预览页面不显示外链按钮），判断”媒体信息“里有没有”路径“一栏
    if(showornot){
        //打印一个外链按钮
        var nplayer = $("div[is='emby-scroller']:not(.hide) .nplayer")[0];
        if(!nplayer){
            var mainDetailButtons = $("div[is='emby-scroller']:not(.hide) .mainDetailButtons")[0];
            if(mainDetailButtons){
                var html = mainDetailButtons.innerHTML;
                mainDetailButtons.innerHTML = `${html}<button is="emby-button" id="nplayer" type="button" class="btnPlay btnMainPlay raised detailButton emby-button detailButton-primary detailButton-stacked nplayer" onclick="nplayeropen()"> <div class="detailButton-content"> <i class="md-icon button-icon button-icon-left autortl"></i> <span class="playButtonText">nPlayer播放</span></button>`;
                //按钮里面触发nplayeropen函数onclick="nplayeropen()"
            }
        }
    }
}

//Nplayer按钮。功能
function nplayeropen(){
    //获取emby路径mediaUrl
    var mediaUrl = $("div.mediaSource .sectionTitle div")[0];
    //转换格式url
    var url = mediaUrl.innerHTML;
    //window.alert("获取路径" + url);
    //echo 去掉路径的词头
    var oldurl0 = url.replace(embyUrl,"");
    //window.alert("路径去头" + oldurl0);
    //第一次变化\换成/（emby搭在win主机的情况）oldurl0
    var oldurl1 = oldurl0.replaceAll("\\", "/");
    //window.alert("反斜杠变斜杠" + oldurl1);
    //echo "替换冒号"."<br>".$oldurl2."<br>"."<br>";
    var oldurl2 = oldurl1.replaceAll(":","：");
    //window.alert("小冒号变大冒号" + oldurl2);
    //echo "替换问号"."<br>".$oldurl3."<br>"."<br>";
    var oldurl3 = oldurl2.replaceAll("?", "？");
    //window.alert("小问号变大问号" + oldurl3);

    //echo "替换&号"."<br>".$oldurl4."<br>"."<br>";
    var oldurl100 = oldurl3.replaceAll("&amp;", "%26");
    //window.alert("&变&" + oldurl100);
    
    //echo "装上新前缀，还原网盘直连"."<br>".$newurl."<br>"."<br>";
    var newurl = goindexUrl + oldurl100;
    //window.alert("前面加头" + newurl);

    //判断是不是蓝光目录
    var leixing = $("div.mediaSource .sectionTitle div")[1];
	var leixing1 = leixing.innerHTML
    //window.alert("类型里的内容" + leixing1)
    var leixing2=leixing1.indexOf("bluray");
    //window.alert("在类型里搜索bluray，如果返回-1说明没找到" + leixing2)
	if (leixing2 == "-1" ){
        var ULTurl="nplayer-"+newurl;
        //window.alert("可以直接播放" + ULTurl);
        window.open(ULTurl)
	}
	else{
        ULTurl = newurl;
        //window.alert("是蓝光目录，打开网盘" + ULTurl);
        //window.alert("本视频格式为蓝光原盘目录，无法直接播放。请打开文件目录后，手动进入/BDMV/STREAM/子文件夹内，选择视频文件播放");
		window.open(ULTurl)
    }
}


//potplayer按钮。按钮
function potplayerButton() {
    var showornot = $("div.mediaSource .sectionTitle div")[0];
    //判断是否进入了视频详细页面（剧集总览，和季预览页面不显示外链按钮），判断”媒体信息“里有没有”路径“一栏
    if(showornot){
        //打印一个外链按钮
        var potplayer = $("div[is='emby-scroller']:not(.hide) .potplayer")[0];
        if(!potplayer){
            var mainDetailButtons = $("div[is='emby-scroller']:not(.hide) .mainDetailButtons")[0];
            if(mainDetailButtons){
                var html = mainDetailButtons.innerHTML;
                mainDetailButtons.innerHTML = `${html}<button is="emby-button" id="potplayer" type="button" class="btnPlay btnMainPlay raised detailButton emby-button detailButton-primary detailButton-stacked potplayer" onclick="potplayeropen()"> <div class="detailButton-content"> <i class="md-icon button-icon button-icon-left autortl"></i> <span class="playButtonText">PotPlayer播放</span></div> </button>`;
                //按钮里面触发potplayeropen函数onclick="potplayeropen()"
            }
        }
    }
}

//potplayer按钮。功能
function potplayeropen(){
    //获取emby路径mediaUrl
    var mediaUrl =  $("div.mediaSource .sectionTitle div")[0];
    //转换格式url
    var url = mediaUrl.innerHTML;
    //window.alert("获取路径" + url);
    //echo 去掉路径的词头
    var oldurl0 = url.replace(embyUrl,"");
    //window.alert("路径去头" + oldurl0);
    //第一次变化\换成/（emby搭在win主机的情况）oldurl0
    var oldurl1 = oldurl0.replaceAll("\\", "/");
    //window.alert("反斜杠变斜杠" + oldurl1);
    //echo "替换冒号"."<br>".$oldurl2."<br>"."<br>";
    var oldurl2 = oldurl1.replaceAll(":","：");
    //window.alert("小冒号变大冒号" + oldurl2);
    //echo "替换问号"."<br>".$oldurl3."<br>"."<br>";
    var oldurl3 = oldurl2.replaceAll("?", "？");
    //window.alert("小问号变大问号" + oldurl3);

    //echo "替换&号"."<br>".$oldurl4."<br>"."<br>";
    var oldurl100 = oldurl3.replaceAll("&amp;", "%26");
    //window.alert("&变&" + oldurl100);
    
    //echo "装上新前缀，还原网盘直连"."<br>".$newurl."<br>"."<br>";
    var newurl = goindexUrl + oldurl100;
    //window.alert("前面加头" + newurl);

    //判断是不是蓝光目录
    var leixing = $("div.mediaSource .sectionTitle div")[1];
	var leixing1 = leixing.innerHTML
    //window.alert("类型里的内容" + leixing1)
    var leixing2=leixing1.indexOf("bluray");
    //window.alert("在类型里搜索bluray，如果返回-1说明没找到" + leixing2)
	if (leixing2 == "-1" ){
        var ULTurl="potplayer://"+newurl;
        //window.alert("可以直接播放" + ULTurl);
        window.open(ULTurl)
	}
	else{
        ULTurl = newurl;
        //window.alert("是蓝光目录，打开网盘" + ULTurl);
        //window.alert("本视频格式为蓝光原盘目录，无法直接播放。请打开文件目录后，手动进入/BDMV/STREAM/子文件夹内，选择视频文件播放");
		window.open(ULTurl)
    }
}



//wangpan按钮。按钮
function wangpanButton() {
    var showornot = $("div.mediaSource .sectionTitle div")[1];
    //判断是否进入了视频详细页面（剧集总览，和季预览页面不显示外链按钮），判断”媒体信息“里有没有”路径“一栏
    if(showornot){
        //打印一个外链按钮
        var wangpan = $("div[is='emby-scroller']:not(.hide) .wangpan")[0];
        if(!wangpan){
            var mainDetailButtons = $("div[is='emby-scroller']:not(.hide) .mainDetailButtons")[0];
            if(mainDetailButtons){
                var html = mainDetailButtons.innerHTML;
                mainDetailButtons.innerHTML = `${html}<button is="emby-button" id="wangpan" type="button" class="btnPlay btnMainPlay raised detailButton emby-button detailButton-primary detailButton-stacked emby-button wangpan" onclick="wangpanopen()"> <div class="detailButton-content"><span class="playButtonText">打开网盘</span> </div> </button>`;
                //按钮里面触发wangpanopen函数onclick="wangpanopen()"
            }
        }
    }
}

//wangpan按钮。功能
function wangpanopen(){
    //获取emby路径mediaUrl
    var mediaUrl =  $("div.mediaSource .sectionTitle div")[0];
    //转换格式url
    var url = mediaUrl.innerHTML;
    //window.alert("获取路径" + url);
    //echo 去掉路径的词头
    var oldurl0 = url.replace(embyUrl,"");
    //window.alert("路径去头" + oldurl0);
    //第一次变化\换成/（emby搭在win主机的情况）oldurl0
    var oldurl1 = oldurl0.replaceAll("\\", "/");
    //window.alert("反斜杠变斜杠" + oldurl1);
    //echo "替换冒号"."<br>".$oldurl2."<br>"."<br>";
    var oldurl2 = oldurl1.replaceAll(":","：");
    //window.alert("小冒号变大冒号" + oldurl2);
    //echo "替换问号"."<br>".$oldurl3."<br>"."<br>";
    var oldurl3 = oldurl2.replaceAll("?", "？");
    //window.alert("小问号变大问号" + oldurl3);

    //echo "替换&号"."<br>".$oldurl4."<br>"."<br>";
    var oldurl100 = oldurl3.replaceAll("&amp;", "%26");
    //window.alert("&变&" + oldurl100);
    
    //echo "装上新前缀，还原网盘直连"."<br>".$newurl."<br>"."<br>";
    var newurl = goindexUrl + oldurl100;
    //window.alert("前面加头" + newurl);

    //拼接potplayer头部，调用外部播放器

    var leixing = $("div.mediaSource .sectionTitle div")[1];
	var leixing1 = leixing.innerHTML
    //window.alert("类型里的内容" + leixing1)
    var leixing2=leixing1.indexOf("bluray");
    //window.alert("在类型里搜索bluray，如果返回-1说明没找到" + leixing2)
	if (leixing2 == "-1" ){
        var ULTurl=newurl + yulan;
        //window.alert("不是蓝光目录，后面加一个?预览，进入预览页面" + ULTurl);
        window.open(ULTurl)
	}
	else{
        ULTurl = newurl;
        //window.alert("是蓝光目录，打开网盘" + ULTurl);
		window.open(ULTurl)
    }
}

//copyLink按钮。按钮
function copyLinkButton() {
    var showornot = $("div.mediaSource .sectionTitle div")[1];
    if (showornot) {
        var copyLink = $("div[is='emby-scroller']:not(.hide) .copyLink")[0];
        if (!copyLink) {
            var mainDetailButtons = $("div[is='emby-scroller']:not(.hide) .mainDetailButtons")[0];
            if (mainDetailButtons) {
                var html = mainDetailButtons.innerHTML;
                mainDetailButtons.innerHTML = `${html}<button is="emby-button" id="copyLink" type="button" class="btnPlay btnMainPlay raised detailButton emby-button detailButton-primary detailButton-stacked copyLink" onclick="copyLinkToClipboard()"> <div class="detailButton-content"><span class="playButtonText">复制直链</span> </div> </button>`;
            }
        }
    }
}

//copyLink功能。功能
function copyLinkToClipboard() {
    // 获取emby路径mediaUrl
    var mediaUrl = $("div.mediaSource .sectionTitle div")[0];
    // 转换格式url
    var url = mediaUrl.innerHTML;
    // 去掉路径的词头
    var oldurl0 = url.replace(embyUrl, "");
    // 第一次变化\换成/（emby搭在win主机的情况）
    var oldurl1 = oldurl0.replaceAll("\\", "/");
    // 替换冒号
    var oldurl2 = oldurl1.replaceAll(":", "：");
    // 替换问号
    var oldurl3 = oldurl2.replaceAll("?", "？");
    // 替换&号
    var oldurl100 = oldurl3.replaceAll("&amp;", "%26");
    // 装上新前缀，还原网盘直连
    var newurl = goindexUrl + oldurl100;

    // 复制链接到剪贴板
    navigator.clipboard.writeText(newurl).then(function() {
        console.log('Link copied to clipboard!');
        //window.alert('Link copied to clipboard!');
    }).catch(function(err) {
        console.error('Could not copy text: ', err);
        //window.alert('Could not copy text: ' + err);
    });
}
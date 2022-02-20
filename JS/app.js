//打开或关闭登录页面
const loginBtn = document.querySelector("#log-A")
const loginBox = document.querySelector("#login-in")
const PreLogins = document.querySelectorAll(".login-in-top-right")
loginBtn.addEventListener('click',function(){
    loginBox.style.display = 'block';
})
PreLogins.forEach(PreLogin =>{
    PreLogin.addEventListener('click',function(){
    loginBox.style.display = 'none';
    })
})
//制作开始轮播图
let goPreBtn = document.querySelector("#goPre");
let goNextBtn = document.querySelector("#goNext");
let banners = document.querySelectorAll(".banner");
let points = document.querySelectorAll(".point");
let index = 0;

let preActive = function () {
    banners.forEach(banner =>{
        banner.className = "banner"
    })
    points.forEach(point =>{
        point.className = "point"
    })
}

let goActive = function () {
    preActive();
    banners[index].className = "banner active"
    points[index].className = "point active"
}

let goNext = function() {
    if(index==9){
        index = 0;
        goActive();
    } else {
        index++;
        goActive();
    }
}

let goPre = function() {
    if(index==0){
        index = 9;
        goActive();
    } else {
        index--;
        goActive();
    }
}

goPreBtn.addEventListener('click',() =>{
    goPre();
})
goNextBtn.addEventListener('click',() =>{
    goNext();
})

for(let i=0;i<points.length;i++){
    points[i].addEventListener('click',()=>{
        index = i;
        goActive();
    })
}

//定时器
setInterval(() => {
    goNext();
}, 5000);

//sleep函数
// async function sleep(t){
//     return await  new Promise((resolve) =>{
//          setTimeout(() =>resolve(),t)
//     })
// }

//获取轮播图图片
let bannerImg = document.querySelectorAll(".banner-img")
let bannerBigBox = document.querySelector("#banner-bigBox")
async function getData(){
    const response = await fetch('http://music.eleuu.com/banner',{ 
        credentials: 'include',
        cookie : localStorage.getItem('cookie')
    })
    const data = await response.json();
    const datas = data.banners;
    for(let i=0;i<datas.length;i++){
        bannerImg[i].setAttribute('src',datas[i].imageUrl)
    }
}
getData();

//登录
let tips = document.querySelector("#tips");
let phoneNum = document.querySelector("#phone");
let passwordNum = document.querySelector("#password");
let loginInPhone = document.querySelector("#login-inPhone")



let cookie = localStorage.getItem('cookie');
let UserId = localStorage.getItem("userId");
let userName = localStorage.getItem("userName");

async function login(phone,password){
    const response = await fetch('http://redrock.udday.cn:2022/login/cellphone?phone='+phone+'&password='+password,{
        credentials: 'include' 
  })
    const data = await response.json();
    console.log(data);
    if(data.code == 502){
        alert(data.msg)
    } else {
        tips.innerHTML = `欢迎回来，${data.profile.nickname}`
        tips.style.display = 'block'
        setTimeout(() => {
            tips.style.display = 'none'
        }, 1000);
        cookie = data.cookie;
        localStorage.setItem('userId',data.account.id);
        localStorage.setItem('userName',data.profile.nickname)
        let loginTime = 7;
        let cookieName = 'userInfo'
        let dataS = {
            'username' : phone,
            'password' : password 
        }
        let d = new Date();
        d.setDate(d.getDate() + loginTime);
        document.cookie = cookieName + '=' + JSON.stringify(dataS) + `;path=/;expires=` + d.toGMTString();
        localStorage.setItem('cookie',data.cookie);
        getLoginState();
        let log = document.querySelector("#log");
        let logIn = document.querySelector("#login-in")
        let avatarImg = document.createElement("img")
        let topBoxOne = document.querySelector("#topBox-one");
        topBoxOne.appendChild(avatarImg);
        let userImg = data.profile.avatarUrl;
        localStorage.setItem('userImg',userImg);
        console.log(userImg);
        avatarImg.setAttribute('src',data.profile.avatarUrl);
        avatarImg.style.width = "30px"
        avatarImg.style.height = "30px"
        avatarImg.style.borderRadius = "50%"
        avatarImg.style.position = "absolute";
        avatarImg.style.top = "20px"
        avatarImg.style.right = "20px"
        avatarImg.title = data.profile.nickname;
        avatarImg.id = 'userImg'
        log.parentNode.removeChild(log);
        logIn.parentNode.removeChild(logIn)
        window.location = '../HTML/app.html'
    }
}
// console.log(phoneNum.value);
loginInPhone.addEventListener('click',()=>{
    if(phoneNum.value == "" || passwordNum.value == ""){
        alert("请输入完整的手机号和密码")
    } else {
        phone = phoneNum.value;
        password = passwordNum.value;
        login(phone,password);
    }
})

function getCookie(){
    let cookie = document.cookie;
    let cookieName = 'userInfo';
    let arr = cookie.split(";");
    let userInfo = null;
    for(let i=0;i<arr.length;i++){
        let tempArr = arr[i].split("=");
        if(tempArr[0] === cookieName){
            userInfo = JSON.parse(tempArr[1])
        }
    }
    if(userInfo){
        tips.innerHTML = `欢迎回来，${userName}`
        tips.style.display = 'block'
        setTimeout(() => {
            tips.style.display = 'none'
        }, 1000);
        let infoImg = localStorage.getItem('userImg');
        let log = document.querySelector("#log");
        let avatarImg = document.createElement("img")
        let topBoxOne = document.querySelector("#topBox-one");
        topBoxOne.appendChild(avatarImg);
        avatarImg.setAttribute('src',infoImg);
        avatarImg.style.width = "30px"
        avatarImg.style.height = "30px"
        avatarImg.style.borderRadius = "50%"
        avatarImg.style.position = "absolute";
        avatarImg.style.top = "20px"
        avatarImg.style.right = "20px"
        avatarImg.title = userName;
        avatarImg.id = 'userImg'
        log.parentNode.removeChild(log);
    } else {
        tips.innerHTML = `会话已过期,请重新登录`
        tips.style.display = 'block'
        setTimeout(() => {
            tips.style.display = 'none'
        }, 1000);
        localStorage.clear()
    }
}
getCookie()
//热门推荐
async function poRe() {
    const response = await fetch('http://music.eleuu.com/personalized?limit=8',{ 
        credentials: 'include',
        cookie : localStorage.getItem('cookie')
    });
    const data = await response.json();
    const datas = data.result;
    let prImgs = document.querySelectorAll(".pr-content-img");
    let prContents = document.querySelectorAll(".pr-content-box")
    console.log(datas);
    let pN = document.querySelectorAll(".nb");
    let imgA = document.querySelectorAll(".prImgA")
    let pA = document.querySelectorAll(".pr-contentBoxA")
    console.log(pA[2]);
    for(let i=0;i<datas.length;i++){
        pA[i].id = datas[i].id;
        prImgs[i].setAttribute('src',datas[i].picUrl);
        imgA[i].id = datas[i].id;
        prContents[i].innerHTML = datas[i].name;
        pN[i].innerHTML = datas[i].playCount + '万'
    }
}
poRe();

//新碟上架
async function newDisk() {
    const response = await fetch('http://music.eleuu.com/album/newest',{ 
        credentials: 'include',
        cookie : localStorage.getItem('cookie')
    });
    const data = await response.json();
    let datas = data.albums;
    let ndImgs = document.querySelectorAll(".nd-banner-img");
    let ndSongNames = document.querySelectorAll(".nd-songName a");
    let ndSingers = document.querySelectorAll(".nd-singer a");
    for(let i=0;i<10;i++) {
        ndImgs[i].setAttribute('src',datas[i].picUrl);
        ndSongNames[i].innerHTML = datas[i].name;
        ndSingers[i].innerHTML = datas[i].artist.name;
        
        ndImgs[i+10].setAttribute('src',datas[i].picUrl);
        ndSongNames[i+10].innerHTML = datas[i].name;
        ndSingers[i+10].innerHTML = datas[i].artist.name;
    } 
}
newDisk();

//制作新碟上架轮播图
let ndGoPreBtn = document.querySelector("#nd-goPre");
let ndGoNextBtn = document.querySelector("#nd-goNext");
let ndUls = document.querySelectorAll(".nd-content-bannerBox");
ndGoNextBtn.addEventListener('click',()=>{
    if(ndUls[3].style.left == '0px') {
        ndUls[0].style.left = '0px';
        ndUls[1].style.left = '645px'
        ndUls[2].style.left = '1290px'
        ndUls[3].style.left = '1935px'
    }else {
        for(let i=0;i<ndUls.length;i++){
            ndUls[i].style.left =ndUls[i].offsetLeft - 645 + 'px';
        }
      }
})
ndGoPreBtn.addEventListener('click',()=>{
    if(ndUls[0].style.left == '0px') {
        ndUls[3].style.left = '0px';
        ndUls[2].style.left = '-645px'
        ndUls[1].style.left = '-1290px'
        ndUls[0].style.left = '-1935px'
    }else {
        for(let i=0;i<ndUls.length;i++){
            ndUls[i].style.left =ndUls[i].offsetLeft + 645 + 'px';
        }
      }
})

//搜索跳转
let SearchInt = document.querySelector("#search-input");
let SearchA = document.querySelector("#search-A");
// SearchA.addEventListener('click',()=>{
//     if(SearchInt.value == ''){
//         alert("未输入内容")
//     } else {
//         SearchA.setAttribute('href','../HTML/app-search.html?search='+SearchInt.value)
//     }
// })

//搜索建议
async function searchRe (keywords){
    const res = await fetch('http://music.eleuu.com/search/suggest?keywords='+keywords,{ 
        credentials: 'include',
        cookie : localStorage.getItem('cookie')
    });
    const data = await res.json();
    albums = data.result.albums;
    artists = data.result.artists;
    songs = data.result.songs;
    let fcbSongs = document.querySelectorAll(".f-cb")[0];
    let fcbAds = document.querySelectorAll(".f-cb")[1];
    let fcbAlbums = document.querySelectorAll(".f-cb")[2];
    if(fcbSongs.hasChildNodes() == true){
        fcbSongs.innerHTML = ''
        fcbAds.innerHTML = ''
        fcbAlbums.innerHTML = ''
    }
    for(let i=0;i<songs.length;i++){
        let li = document.createElement("li");
        let a = document.createElement("a");
        li.style.listStyle = 'none'
        a.style.cursor = 'pointer'
        li.style.marginLeft = '5px';
        li.style.marginTop = '5px';
        li.style.marginBottom = '5px';
        fcbSongs.appendChild(li);
        li.appendChild(a);
        a.innerHTML = songs[i].name+'-'+songs[i].artists[0].name;
        a.id = songs[i].id
        a.className ='reSongA'
    }
    let songA = document.querySelectorAll(".reSongA");
    let searchRecommend = document.querySelector("#search-recommend");
    for(let i=0;i<songA.length;i++){
        songA[i].addEventListener('click',()=>{
            clearTimeout(i)
            openSD(songA[i].id)
            getSongComment(songA[i].id,20,0);
        })
    }
    for(let i=0;i<artists.length;i++){
        let li = document.createElement("li");
        let a = document.createElement("a");
        li.style.listStyle = 'none'
        a.style.cursor = 'pointer'
        li.style.marginLeft = '5px';
        li.style.marginTop = '5px';
        li.style.marginBottom = '5px';
        fcbAds.appendChild(li);
        li.appendChild(a);
        a.innerHTML = artists[i].name;
    }
    for(let i=0;i<albums.length;i++){
        let li = document.createElement("li");
        let a = document.createElement("a");
        li.style.listStyle = 'none'
        a.style.cursor = 'pointer'
        li.style.marginLeft = '5px';
        li.style.marginTop = '5px';
        li.style.marginBottom = '5px';
        fcbAlbums.appendChild(li);
        li.appendChild(a);
        a.innerHTML = albums[i].name+'-'+albums[i].artist.name;
    }
}
function Null(){
    if(SearchInt.value == ''){
        searchRecommend.style.display = 'none';
    }
}
let searchRecommend = document.querySelector("#search-recommend");
SearchInt.oninput = function(){
    searchRecommend.style.display = 'block';
    searchRe(SearchInt.value);
    Null();
}
SearchInt.onblur = function(){
    setTimeout(function(){
        if(SearchInt.value == ''){
            SearchInt.setAttribute('placeholder','音乐/视频/电台/用户')
        }
        searchRecommend.style.display = 'none';
    },120)
}
SearchInt.onfocus = function(){
    SearchInt.setAttribute('placeholder','')
    if(SearchInt.value != ''){
        searchRecommend.style.display = 'block';
    }
}

$("a").attr("href",'javascript:void(0)')
let audio = document.querySelector("#audio-app")

//搜索结果
async function searchSong (){
    const res = await fetch('http://music.eleuu.com/search?limit=20&keywords='+SearchInt.value,{ 
        credentials: 'include',
        cookie : localStorage.getItem('cookie')
    });
    const data = await res.json();
    const datas = data.result.songs;
    console.log(datas);
    let songTexts = document.querySelectorAll(".text");
    let singers = document.querySelectorAll(".song-singer");
    let songResources = document.querySelectorAll(".song-resource");
    let songTimes = document.querySelectorAll(".song-time");
    let songs = document.querySelectorAll(".song-img a");
    let searchSongs = document.querySelectorAll(".search-song");
    let songNulls = document.querySelectorAll(".song-null");
    let adds = document.querySelectorAll(".add");
    let iframe = document.querySelector("#iframe").contentWindow;
    for(let i=0;i<searchSongs.length;i++){
        searchSongs[i].addEventListener('mouseover',()=>{
            songNulls[i].style.visibility = 'visible';
        })
        searchSongs[i].addEventListener('mouseout',()=>{
            songNulls[i].style.visibility = 'hidden';
        })
        adds[i].addEventListener('click',()=>{
            if(iframe.document.getElementById(datas[i].id)){
                alert("已添加过该歌曲")
            }else {
                let tip = iframe.document.querySelector("#tip");
                tip.innerHTML = '已添加至播放列表';
                tip.style.display = 'block';
                setTimeout(() => {
                    tip.style.display = 'none';
                }, 1000);
                addSong(datas[i].name,datas[i].artists[0].name,datas[i].id,datas[i].duration)
            }
        })
    }
    for(let i=0;i<songTexts.length;i++){
        songTexts[i].innerHTML = datas[i].name
        singers[i].innerHTML = datas[i].artists[0].name;
        songResources[i].innerHTML = '《'+datas[i].album.name+'》';
        songTexts[i].addEventListener('click',()=>{
            openSD(datas[i].id);
            getSongComment(datas[i].id,20,0);
        })
        const s = (datas[i].duration)/1000;
        let m = s/60;
        let se = s%60;
        songTimes[i].innerHTML = parseInt(m)+ ':' + parseInt(se);
        songs[i].addEventListener('click',()=>{
            let iframe = document.querySelector("#iframe").contentWindow;
            let img = iframe.document.querySelector("#app-bottom-img img");
            let tip = iframe.document.querySelector("#tip");
            tip.style.display = 'block';
            tip.innerHTML = '已播放该歌曲'
            setTimeout(() => {
                tip.style.display = 'none';
            }, 1000);
            getSongImg(img,datas[i].id);
            getSongUrl(datas[i].id);
            navChange(datas[i].name,datas[i].artists[0].name,datas[i].id,datas[i].duration);
            (() =>{
                barDoneMi = 0;  //将分针数字改为0
                var time1 = setInterval(setTime,1000);
            })();
        })
    }
}

//获取歌曲详细
async function songDetailed(id){
    const res = await fetch('http://music.eleuu.com/song/detail?ids='+id,{ 
        credentials: 'include',
        cookie : localStorage.getItem('cookie')
    });
    const data = await res.json();
    console.log(data.songs);
    let songImg = document.querySelector("#songDet-main-img img");
    songImg.setAttribute('src',data.songs[0].al.picUrl)
    let songDetTitleName = document.querySelector("#songDet-title-name");
    songDetTitleName.innerHTML = data.songs[0].name;
    let songDet = document.querySelectorAll(".songDet-singer a");
    for(let i=0;i<data.songs[0].ar.length;i++){
        songDet[0].innerHTML += data.songs[0].ar[i].name;
    }
    songDet[1].innerHTML = data.songs[0].al.name;
    let lyricbox = document.querySelector("#songDet-lyric");
    getLyric(lyricbox,data.songs[0].id)
    let songDetLyric = document.querySelector("#songDet-lyric")
    let openOCA = document.querySelector("#openOC a");
    let i = document.querySelector("#openOC a i");
    openOCA.addEventListener('click',()=>{
        if(openOCA.innerText == '展开'){
            songDetLyric.style.height = 'auto';
            openOCA.innerHTML = '收起'+'<i class="active"></i>';
        } else {
            songDetLyric.style.height = '304px';
            openOCA.innerHTML = '展开'+ '<i class="iconOOC"></i>';
        }
    })
}

//获取歌曲的图片
async function getSongImg(img,id){
    const res = await fetch('http://music.eleuu.com/song/detail?ids='+id,{ 
        credentials: 'include',
        cookie : localStorage.getItem('cookie')
    });
    const data = await res.json();
    img.setAttribute('src',data.songs[0].al.picUrl);
}

//打开歌曲的详细页面
function openSD(id){
    $("#firstPage").innerHTML = ''
    // window.history.pushState({}, '',  "/songDet");
    $("#firstPage").load('/HTML/app-songDet.html');
    songDetailed(id);
}


//暂停、播放
function pauseOB(){
        if(audio.paused){
            audio.play();  
            play.className = 'playA active'
            setInterval(setTime,1000);
        }else{
            audio.pause();
            play.className = 'playA'
            for(let i=0;i<10000;i++){
                clearInterval(i);
            }
        }
}

//获取歌曲url并且点击歌曲听歌
async function getSongUrl (id){
    const res = await fetch('http://music.eleuu.com/song/url?id='+id,{ 
        credentials: 'include',
        cookie : localStorage.getItem('cookie')
    });
    const data = await res.json();
    console.log(data.data[0].url);
    audio.setAttribute('src',data.data[0].url)
}

//获取歌曲歌词
async function getLyric(div,id){
    const res = await fetch('http://music.eleuu.com/lyric?id='+id,{ 
        credentials: 'include',
        cookie : localStorage.getItem('cookie')
    });
    const data = await res.json();
    const lyric = data.lrc.lyric;
    const a = lyric.split('[');
    if(div.hasChildNodes() == true){
        div.innerHTML = '';
    } 
    for(let i=1;i<a.length;i++){
        const b = a[i].split(']');
        // console.log(b[0]);
        div.innerHTML += '<p>'+ b[1] +'</p>'
    }
}

//封装添加歌曲函数
function addSong(songname,singername,songId,alltime){
    let iframe = document.querySelector("#iframe").contentWindow;
    let SongName = iframe.document.querySelector("#songName");
    let singerName = iframe.document.querySelector("#singerName");
    let songlistUl = iframe.document.querySelector("#songlistUl");
    let songNum = iframe.document.querySelector("#playlist-mi a");
    songNum.innerHTML++;
        let li = document.createElement("li");
        let div01 = document.createElement("div");
        let div01One = document.createElement("div");
        let div02 = document.createElement("div");
        let div03 = document.createElement("div");
        let div04 = document.createElement("div");
        let div05 = document.createElement("div");
        let div06 = document.createElement("div");
        li.appendChild(div01);
        li.appendChild(div02);
        li.appendChild(div03);
        li.appendChild(div04);
        li.appendChild(div05);
        li.appendChild(div06);
        songlistUl.appendChild(li);
        li.style.display = 'flex';
        li.style.flexDirection = 'row';
        div01.style.width = '10px';
        div01.style.height = '28px';
        div01.style.paddingLeft = '10px'
        div01.appendChild(div01One);
        div01One.style.width = '10px';
        div01One.style.height = '13px';
        div01One.style.marginTop = '8px';
        div01One.style.backgroundImage = 'url(../IMG/playlist (1).png)';
        div01One.style.backgroundPosition = '-182px 0';
        div02.innerHTML = songname;
        div02.id = songId;
        div02.setAttribute('data-songName',songname);
        div02.setAttribute('data-singerName',singername)
        div02.setAttribute('data-allTime',alltime);
        div02.style.width = '256px'
        div02.style.height = '28px'
        div02.style.paddingLeft = '10px'
        div02.style.color = '#fff'
        div02.style.fontSize = '12px'
        div02.style.lineHeight ='28px'
        div02.style.cursor = 'pointer'
        div02.className = 'm';
        div04.style.width = '70px';
        div04.style.height = '28px';
        div04.style.paddingLeft = '10px';
        div04.innerHTML = singername;
        div04.style.color = "#fff";
        div04.style.lineHeight ='28px'
        div04.style.fontSize = '12px'
        div05.style.width = '35px'
        div05.style.height = '28px';
        div05.style.paddingLeft = '10px';
        div05.style.color = "#fff";
        div05.style.fontSize = '12px'
        div05.style.lineHeight ='28px'
        const s = (alltime)/1000;
        let m = s/60;
        let se = s%60;
        div05.innerHTML = parseInt(m)+ ':' + parseInt(se);
}

//定时器函数
var barDoneMi = 0;
let percentage = 0;
function setTime(){
    let currentTime = audio.currentTime;
    let allTime = audio.duration;
    let iframe = document.querySelector("#iframe").contentWindow;
    let barAll = iframe.document.querySelector("#bar-left");
    let barDone = iframe.document.querySelector("#bar-done");
    let barTime = iframe.document.querySelector("#bar-time");
    //进度条拖拽
    let icon = iframe.document.querySelector("#jindutiao-btn");
    let play = iframe.document.querySelector("#play");
    let appbottommiddle = iframe.document.querySelector("#app-bottom-middle");
    let isMove = false;
    let barDoneSe = parseInt(currentTime%60);
    if(barDoneSe <10){
        barDoneSe = '0' +barDoneSe ;
    }
    if( parseInt(currentTime) != 0 && parseInt(currentTime)%60 == 0){
        barDoneSe = parseInt(currentTime % 60);
        barDoneMi++;
    }
    barTime.innerHTML = '0'+barDoneMi+':'+barDoneSe+ '/'+ '0' + parseInt(allTime/60)+':'+parseInt(allTime%60)
    barDone.style.width = currentTime * barAll.offsetWidth / allTime + 'px'
    icon.onmousedown = function(e){
        isMove = true;
        iframe.document.onmousemove = function(e){
            if(isMove){
                if(barDone.offsetWidth <466 || e.pageX < 920){
                    e = e || window.event;
                    let x = e.pageX; 
                    let a = x - (play.offsetLeft + appbottommiddle.offsetLeft);
                    barDone.style.width = a + 'px';
                    percentage = a/barAll.offsetWidth;
                    currentTime = allTime * percentage;
                    barDoneMi = parseInt(currentTime/60)
                    barTime.innerHTML = '0'+barDoneMi+':'+parseInt(currentTime%60)+ '/'+ '0' + parseInt(allTime/60)+':'+parseInt(allTime%60);
                }
            }
        }
        iframe.document.onmouseup = function(){
            if(isMove){
                currentTime = allTime * percentage;
                barDoneMi = parseInt(currentTime/60)
                console.log(barDoneMi);
                barTime.innerHTML = '0'+barDoneMi+':'+parseInt(currentTime%60)+ '/'+ '0' + parseInt(allTime/60)+':'+parseInt(allTime%60);
                audio.currentTime = currentTime;
            }
            isMove = false;
        }
    }
    if(audio.currentTime == audio.duration){
        
    }
}


//封装点击听歌 导航栏的变化函数
function navChange(songname,singername,songId,alltime){
    let iframe = document.querySelector("#iframe").contentWindow;
    let play = iframe.document.querySelector("#PlayA");
    play.className = 'playA active'
    let SongName = iframe.document.querySelector("#songName");
    let singerName = iframe.document.querySelector("#singerName");
    let songlistUl = iframe.document.querySelector("#songlistUl");
    let songNum = iframe.document.querySelector("#playlist-mi a");
    let songTitle = iframe.document.querySelector("#song-title");
    let gecibox = iframe.document.querySelector("#playlist-geciBox");
    songTitle.innerHTML = songname;
    SongName.innerHTML = songname;
    singerName.innerHTML = singername;
    getLyric(gecibox,songId);
    if(iframe.document.getElementById(songId)){
    } else {
        addSong(songname,singername,songId,alltime);
        }
}


// window.history.pushState({}, '',  "/begin")
$(document).ready(function(){
    if($("#search-A").innerHTML != ''){
        $("#search-A").click(function(){
            $("#firstPage").innerHTML = ''
            // window.history.pushState({}, '',  "/begin/search");
            $("#firstPage").load('/HTML/app-search.html');
            searchSong ();
            let topBoxTwo = document.querySelector("#topBox-two");
            topBoxTwo.style.height = '5px'
            topBoxTwo.innerHTML = ''
            let topBox = document.querySelector("#topBox");
            topBox.style.height = '75px'
            });
    }
  });


//获取歌曲评论
async function getSongComment(id,limit,offset){
    const res = await fetch('http://music.eleuu.com/comment/music?id='+id+'&limit='+limit+'&offset='+offset,{ 
        credentials: 'include',
        cookie : localStorage.getItem('cookie')
    });
    const data = await res.json();
    console.log(data.hotComments);
    let commentNum = document.querySelector("#commentNum span");
    commentNum.innerHTML = data.total;
    let hotC = data.hotComments;
    let newC = data.comments;
    let WCbox = document.querySelector("#WCbox");
    console.log(WCbox);
    let NCbox = document.querySelector("#NCbox");
    console.log(NCbox);
    for(let i=0;i<hotC.length;i++){
        getCFun(WCbox,hotC[i].user.nickname,hotC[i].content,hotC[i].timeStr,hotC[i].user.avatarUrl);
    }
    for(let i=0;i<newC.length;i++){
        getCFun(NCbox,newC[i].user.nickname,newC[i].content,newC[i].timeStr,newC[i].user.avatarUrl);
    }
}
//获取歌单评论
async function getSongListComment(id,limit,offset){
    const res = await fetch('http://music.eleuu.com/comment/playlist?id='+id+'&limit='+limit+'&offset='+offset,{ 
        credentials: 'include',
        cookie : localStorage.getItem('cookie')
    });
    const data = await res.json();
    console.log(data.hotComments);
    let commentNum = document.querySelector("#commentNum span");
    commentNum.innerHTML = data.total;
    let hotC = data.hotComments;
    let newC = data.comments;
    let WCbox = document.querySelector("#WCbox");
    let NCbox = document.querySelector("#NCbox");
    WCbox.innerHTML = '<h3 id="WC">精彩评论</h3>'
    NCbox.innerHTML = '<h3 id="NC">最新评论</h3>'
    for(let i=0;i<hotC.length;i++){
        getCFun(WCbox,hotC[i].user.nickname,hotC[i].content,hotC[i].timeStr,hotC[i].user.avatarUrl);
    }
    for(let i=0;i<newC.length;i++){
        getCFun(NCbox,newC[i].user.nickname,newC[i].content,newC[i].timeStr,newC[i].user.avatarUrl);
    }
}


//封装精彩评论函数
function getCFun(box,user,comment,time,imgSrc){
        let div01 = document.createElement("div");
        div01.className = 'itm';
        div01.style.padding = '15px 0';
        div01.style.borderTop = '1px dotted #ccc';
        let div02 = document.createElement("div")
        div02.className = 'head';
        div02.style.float = 'left';
        div02.style.width = '50px';
        div02.style.height = '50px';
        div02.style.marginRight = '-100px';
        let img = document.createElement("img");
        img.style.width = '50px';
        img.style.height = '50px';
        let div03 = document.createElement("div");
        div03.className = 'cntwrap';
        div03.style.width = '580px';
        div03.style.marginLeft = '120px';
        let div04 = document.createElement("div");
        div04.innerHTML = '<a>' +user+ '</a>:'+comment;
        let div05 = document.createElement("div");
        let div06 = document.createElement("div");
        div06.style.marginTop = '15px'
        div06.style.height = '10px'
        div06.style.bottom = '0'
        div06.innerHTML = time;
        div06.style.float = 'left';
        div06.style.color = '#999';
        let likeA = document.createElement("a");
        let i = document.createElement("i");
        i.style.display = 'block'
        i.style.width = '15px';
        i.style.height = '14px';
        i.style.backgroundImage = 'url(../IMG/icon2.png)';
        i.style.backgroundPosition = '-150px 0';
        let span = document.createElement("span");
        span.style.margin = '0 8px';
        span.style.color = '#ccc';
        span.innerHTML = '|';
        let replyA = document.createElement("a");
        replyA.innerHTML = '回复';
        box.appendChild(div01);
        div01.appendChild(div02);
        div02.appendChild(img);
        div01.appendChild(div03);
        div03.appendChild(div04);
        div03.appendChild(div05);
        div05.appendChild(div06);
        div05.appendChild(likeA);
        div05.appendChild(span);
        div05.appendChild(replyA);
        likeA.appendChild(i);
        replyA.style.float = 'right'
        span.style.float = 'right'
        likeA.style.float = 'right';
        div01.style.fontSize = '12px';
        img.setAttribute('src',imgSrc)
}

//封装查看歌单函数
async function madeSL(uid){
    const res = await fetch('http://music.eleuu.com/user/playlist?uid='+uid,{ 
        credentials: 'include',
        cookie : localStorage.getItem('cookie')
    });
    const data = await res.json();
    console.log(data.playlist);
    for(let i=0;i<data.playlist.length;i++){
        let li = document.createElement("li");
        li.style.padding = '6px 0 6px 20px';
        li.style.display = 'flex';
        li.style.flexDirection = 'row';
        li.style.justifyContent = 'space-between';
        li.id = data.playlist[i].id;
        li.style.fontSize = '12px'
        li.style.cursor = 'pointer';
        let imgDiv = document.createElement("div");
        imgDiv.style.width = '50px'
        imgDiv.style.height = '50px'
        imgDiv.innerHTML = '<img src='+data.playlist[i].coverImgUrl+' style="width: 40px; height: 40px;"></img>';
        let divRight = document.createElement("div");
        divRight.style.width = '190px';
        divRight.style.height = '40px';
        let divRightFirst = document.createElement("div");
        divRightFirst.innerHTML = data.playlist[i].name;
        divRightFirst.style.color = '#000';
        let divRightSecond = document.createElement("div");
        divRightSecond.innerHTML = data.playlist[i].trackCount + '首';
        divRightSecond.style.color = '#999'
        divRightSecond.style.marginTop = '10px'
        let hiddenMSL = document.querySelector("#hidden-MSL")
        hiddenMSL.appendChild(li)
        li.appendChild(imgDiv)
        li.appendChild(divRight)
        divRight.appendChild(divRightFirst)
        divRight.appendChild(divRightSecond)
        let bigMMBoxRightThird = document.querySelector("#bigMMBox-right-third");
        getPLD(bigMMBoxRightThird,6798710948)
        li.addEventListener('click',()=>{
        getPLD(bigMMBoxRightThird,li.id)
        })
    }
}

//点击我的音乐
let MMusic = document.querySelector("#nav-2");
MMusic.addEventListener('click',()=>{
    if(localStorage.length == 0){
        alert("请先登录");
        loginBox.style.display = 'block';
    } else {
        $("#firstPage").innerHTML =''
        // window.history.pushState({}, '',  "/myMusic");
        $("#firstPage").load('/HTML/我的音乐.html');
        let topBoxTwo = document.querySelector("#topBox-two");
        topBoxTwo.style.height = '5px'
        topBoxTwo.innerHTML = ''
        let topBox = document.querySelector("#topBox");
        topBox.style.height = '75px'
        madeSL(UserId)
    }
})

let navA = document.querySelectorAll("#nav a")[0];
navA.setAttribute("href",'/HTML/app.html')

//下面登录
let loginBtn2 = document.querySelector("#rl-btn");
loginBtn2.addEventListener('click',() =>{
    loginBox.style.display = 'block';
})



// //获取歌单详细
async function getPLD(div,id){
    const res = await fetch(`http://redrock.udday.cn:2022/playlist/detail?cookie=${cookie}&id=`+id,{ 
        credentials: 'include',
        cookie : localStorage.getItem('cookie')
    });
    const data = await res.json();
    console.log(data);
    let bigMMBoximgBox = document.querySelector("#bigMMBoximgBox img");
    bigMMBoximgBox.setAttribute('src',data.playlist.coverImgUrl)
    let nickImg = document.querySelector("#nick-img img");
    nickImg.setAttribute('src',data.playlist.creator.avatarUrl)
    let admin = document.querySelector("#bigMMBoxrightBox-two-nickname a");
    admin.innerHTML = data.playlist.creator.nickname;
    let pLN = document.querySelector("#bigMMBoxrightBox-one em");
    pLN.innerHTML = data.playlist.name;
    let PN = document.querySelector(".PN em");
    PN.innerHTML = data.playlist.playCount;
    let SLs = document.querySelector("#SL-s em");
    SLs.innerHTML = data.playlist.trackCount;
    let tracks = data.playlist.tracks;
    div.innerHTML = ''
    for(let i=0;i<tracks.length;i++){
        let li = document.createElement("li");
        li.style.width = '739px'
        li.style.height = '30px'
        if(i%2==0) {
            li.style.backgroundColor = '#f7f7f7'
        } else {
            li.style.backgroundColor = '#fff'
        }
        li.style.display = 'flex';
        li.style.flexDirection = 'row';
        li.id = tracks[i].id
        let beginBox = document.createElement("div");
        beginBox.style.padding = '6px 10px'
        beginBox.style.width = '54px';
        beginBox.style.height = '18px';
        let begin = document.createElement("div");
        begin.style.lineHeight = '18px';
        begin.style.textAlign = 'left';
        let num = document.createElement("span");
        num.innerHTML = i+1;
        let icon = document.createElement("span");
        icon.style.width = '17px';
        icon.style.height = '17px';
        icon.style.cursor = 'pointer';
        icon.style.float = 'right';
        icon.style.backgroundImage = 'url(../IMG/table.png)';
        icon.style.backgroundPosition = '0 -103px';
        beginBox.appendChild(begin)
        begin.appendChild(num);
        begin.appendChild(icon);

        let SNBox = document.createElement("div");
        SNBox.style.padding = '6px 10px'
        SNBox.style.width = '281.750px';
        SNBox.style.height = '18px';
        SNBox.style.overflow = 'none';
        let SNA = document.createElement("a");
        SNA.style.cursor = 'pointer';
        SNA.innerHTML = tracks[i].name;
        SNBox.appendChild(SNA)


        let STBox = document.createElement("div");
        STBox.style.padding = '6px 10px'
        STBox.style.width = '91px';
        STBox.style.height = '18px';
        let time = document.createElement("span");
        let hidden = document.createElement("div");
        hidden.style.display = 'none'
        let add = document.createElement("a");
        add.style.display = 'block';
        add.style.width = '13px'
        add.style.height = '13px'
        add.style.backgroundImage = 'url(../IMG/icon.png)';
        add.style.backgroundPosition = '0 -700px'
        add.style.cursor = 'pointer';
        add.title = '添加至播放列表';
        add.style.float = 'left'
        hidden.appendChild(add);
        let collect = document.createElement("a");
        collect.style.display = 'block';
        collect.style.width = '18px'
        collect.style.height = '16px'
        collect.style.backgroundImage = 'url(../IMG/table.png)';
        collect.style.backgroundPosition = '0 -174px'
        collect.style.cursor = 'pointer';
        collect.style.margin = '0px 0 0 2px'
        collect.title = '收藏';
        collect.style.float = 'left';
        hidden.appendChild(collect);
        let share = document.createElement("a");
        share.style.display = 'block';
        share.style.width = '18px'
        share.style.height = '16px'
        share.style.backgroundImage = 'url(../IMG/table.png)';
        share.style.backgroundPosition = '0 -195px'
        share.style.cursor = 'pointer';
        share.style.margin = '0px 0 0 2px'
        share.title = '分享';
        share.style.float = 'left';
        hidden.appendChild(share);
        let download = document.createElement("a");
        download.style.display = 'block';
        download.style.width = '18px'
        download.style.height = '16px'
        download.style.backgroundImage = 'url(../IMG/table.png)';
        download.style.backgroundPosition = '-81px -174px'
        download.style.cursor = 'pointer';
        download.style.margin = '0px 0 0 2px'
        download.title = '下载';
        download.style.float = 'left';
        hidden.appendChild(download);
        let deleteA = document.createElement("a");
        deleteA.style.display = 'block';
        deleteA.style.width = '18px'
        deleteA.style.height = '16px'
        deleteA.style.backgroundImage = 'url(../IMG/table.png)';
        deleteA.style.backgroundPosition = '0 -217px'
        deleteA.style.cursor = 'pointer';
        deleteA.style.margin = '0px 0 0 2px'
        deleteA.title = '删除';
        deleteA.style.marginLeft = '75px';
        hidden.appendChild(deleteA);
        STBox.appendChild(time);
        STBox.appendChild(hidden)

        let SNaBox = document.createElement("div");
        SNaBox.style.padding = '6px 10px'
        SNaBox.style.width = '83.45px';
        SNaBox.style.height = '18px';
        let SNa = document.createElement("div");
        SNa.innerHTML = tracks[i].ar[0].name
        SNaBox.appendChild(SNa)

        let AN = document.createElement("div");
        AN.style.padding = '6px 10px'
        AN.style.width = '127.8px';
        AN.style.height = '18px';
        let al = document.createElement("span");
        al.innerHTML = tracks[i].al.name;
        AN.appendChild(al);
        div.appendChild(li);
        li.appendChild(beginBox);
        li.appendChild(SNBox);
        li.appendChild(STBox);
        li.appendChild(SNaBox);
        li.appendChild(AN);

        li.addEventListener('mouseover',()=>{
            hidden.style.display = 'block'
        })
        li.addEventListener('mouseout',()=>{
            hidden.style.display = 'none'
        })
    } 
}
//新碟上架点击跳转页面
let prImgA = document.querySelectorAll(".prImgA");
let prContentBoxA = document.querySelectorAll(".pr-contentBoxA");
prImgA.forEach(prImg =>{
    prImg.addEventListener('click',()=>{
        $("#firstPage").innerHTML =''
        // window.history.pushState({}, '',  "/playListDet");
        $("#firstPage").load('/HTML/app-PlayListDet.html');
        let bigMMBoxRightThird = document.querySelector("#bigMMBox-right-third");
        getPLDTwo(prImg.id)
        getSongListComment(prImg.id,20,0)
    })
})
prContentBoxA.forEach(prImg =>{
    prImg.addEventListener('click',()=>{
        $("#firstPage").innerHTML =''
        // window.history.pushState({}, '',  "/playListDet");
        $("#firstPage").load('/HTML/app-PlayListDet.html');
        let bigMMBoxRightThird = document.querySelector("#bigMMBox-right-third");
        getPLDTwo(prImg.id)
        getSongListComment(prImg.id,20,0)
    })
})


//获取详细歌单(2)
async function getPLDTwo(id){
    const res = await fetch(`http://redrock.udday.cn:2022/playlist/detail?cookie=${cookie}&id=`+id,{ 
        credentials: 'include',
        cookie : localStorage.getItem('cookie')
    });
    const data = await res.json();
    console.log(data);
    let liker = document.querySelectorAll("#involved-songList-content li img");
    for(let i=0;i<liker.length;i++){
        liker[i].setAttribute('src',data.playlist.subscribers[i].avatarUrl)
        liker[i].title = data.playlist.subscribers[i].nickname
    }
    let bigMMBoximgBox = document.querySelector("#bigMMBoximgBox img");
    bigMMBoximgBox.setAttribute('src',data.playlist.coverImgUrl)
    let nickImg = document.querySelector("#nick-img img");
    nickImg.setAttribute('src',data.playlist.creator.avatarUrl)
    let admin = document.querySelector("#bigMMBoxrightBox-two-nickname a");
    admin.innerHTML = data.playlist.creator.nickname;
    let pLN = document.querySelector("#bigMMBoxrightBox-one em");
    pLN.innerHTML = data.playlist.name;
    let PN = document.querySelector(".PN em");
    PN.innerHTML = data.playlist.playCount;
    let SLs = document.querySelector("#SL-s em");
    SLs.innerHTML = data.playlist.trackCount;
    let tracks = data.playlist.tracks;
    let bigMMBoxRightThird = document.querySelector("#bigMMBox-right-third");
    bigMMBoxRightThird.innerHTML = ''
    let loginBtn = document.createElement("button")
    for(let i=0;i<tracks.length;i++){
        let li = document.createElement("li");
        li.style.width = '640px'
        li.style.height = '30px'
        if(i%2==0) {
            li.style.backgroundColor = '#f7f7f7'
        } else {
            li.style.backgroundColor = '#fff'
        }
        li.style.display = 'flex';
        li.style.flexDirection = 'row';
        li.id = tracks[i].id
        let beginBox = document.createElement("div");
        beginBox.style.padding = '6px 10px'
        beginBox.style.width = '54px';
        beginBox.style.height = '18px';
        let begin = document.createElement("div");
        begin.style.lineHeight = '18px';
        begin.style.textAlign = 'left';
        let num = document.createElement("span");
        num.innerHTML = i+1;
        let icon = document.createElement("span");
        icon.style.width = '17px';
        icon.style.height = '17px';
        icon.style.cursor = 'pointer';
        icon.style.float = 'right';
        icon.style.backgroundImage = 'url(../IMG/table.png)';
        icon.style.backgroundPosition = '0 -103px';
        beginBox.appendChild(begin)
        begin.appendChild(num);
        begin.appendChild(icon);

        let SNBox = document.createElement("div");
        SNBox.style.padding = '6px 10px'
        SNBox.style.width = '250px';
        SNBox.style.height = '18px';
        SNBox.style.overflow = 'none';
        let SNA = document.createElement("a");
        SNA.style.cursor = 'pointer';
        SNA.innerHTML = tracks[i].name;
        SNBox.appendChild(SNA)


        let STBox = document.createElement("div");
        STBox.style.padding = '6px 10px'
        STBox.style.width = '91px';
        STBox.style.height = '18px';
        let time = document.createElement("span");
        let hidden = document.createElement("div");
        hidden.style.display = 'none'
        let add = document.createElement("a");
        add.style.display = 'block';
        add.style.width = '13px'
        add.style.height = '13px'
        add.style.backgroundImage = 'url(../IMG/icon.png)';
        add.style.backgroundPosition = '0 -700px'
        add.style.cursor = 'pointer';
        add.title = '添加至播放列表';
        add.style.float = 'left'
        hidden.appendChild(add);
        let collect = document.createElement("a");
        collect.style.display = 'block';
        collect.style.width = '18px'
        collect.style.height = '16px'
        collect.style.backgroundImage = 'url(../IMG/table.png)';
        collect.style.backgroundPosition = '0 -174px'
        collect.style.cursor = 'pointer';
        collect.style.margin = '0px 0 0 2px'
        collect.title = '收藏';
        collect.style.float = 'left';
        hidden.appendChild(collect);
        let share = document.createElement("a");
        share.style.display = 'block';
        share.style.width = '18px'
        share.style.height = '16px'
        share.style.backgroundImage = 'url(../IMG/table.png)';
        share.style.backgroundPosition = '0 -195px'
        share.style.cursor = 'pointer';
        share.style.margin = '0px 0 0 2px'
        share.title = '分享';
        share.style.float = 'left';
        hidden.appendChild(share);
        let download = document.createElement("a");
        download.style.display = 'block';
        download.style.width = '18px'
        download.style.height = '16px'
        download.style.backgroundImage = 'url(../IMG/table.png)';
        download.style.backgroundPosition = '-81px -174px'
        download.style.cursor = 'pointer';
        download.style.margin = '0px 0 0 2px'
        download.title = '下载';
        download.style.float = 'left';
        hidden.appendChild(download);
        let deleteA = document.createElement("a");
        deleteA.style.display = 'block';
        deleteA.style.width = '18px'
        deleteA.style.height = '16px'
        deleteA.style.backgroundImage = 'url(../IMG/table.png)';
        deleteA.style.backgroundPosition = '0 -217px'
        deleteA.style.cursor = 'pointer';
        deleteA.style.margin = '0px 0 0 2px'
        deleteA.title = '删除';
        deleteA.style.marginLeft = '75px';
        hidden.appendChild(deleteA);
        STBox.appendChild(time);
        STBox.appendChild(hidden)

        let SNaBox = document.createElement("div");
        SNaBox.style.padding = '6px 10px'
        SNaBox.style.width = '83.45px';
        SNaBox.style.height = '18px';
        let SNa = document.createElement("div");
        SNa.innerHTML = tracks[i].ar[0].name
        SNaBox.appendChild(SNa)

        let AN = document.createElement("div");
        AN.style.padding = '6px 10px'
        AN.style.width = '127.8px';
        AN.style.height = '18px';
        AN.style.overflow = 'none'
        let al = document.createElement("span");
        al.style.display = 'block'
        al.style.height = '18px'
        al.innerHTML = tracks[i].al.name;
        al.style.overflow = 'none';
        al.title = tracks[i].al.name;
        AN.appendChild(al);
        bigMMBoxRightThird.appendChild(li);
        li.appendChild(beginBox);
        li.appendChild(SNBox);
        li.appendChild(STBox);
        li.appendChild(SNaBox);
        li.appendChild(AN);
        
        li.addEventListener('mouseover',()=>{
            hidden.style.display = 'block'
        })
        li.addEventListener('mouseout',()=>{
            hidden.style.display = 'none'
        })
    } 
    let loginA = document.createElement("a");
    if(cookie != null){
        loginA.innerHTML = '更多内容见客户端'
    } else {
        loginA.innerHTML = '登录后查看更多';
    }
    loginA.style.fontSize = '12px';
    loginA.style.color = '#ff2318'
    bigMMBoxRightThird.appendChild(loginA);
    loginA.addEventListener('click',()=>{
        loginBox.style.display = 'block';
        getPLDTwo(id);
    })
}

//登录框移动
let IsMove = false;
var e = e || window.event;
let loginInBox = document.querySelector("#login-in");
let phoneLoginTop = document.querySelector("#phoneLogin");
let offDivX = 0;
let offDivY = 0;
phoneLoginTop.addEventListener('mousedown',(e)=>{
    offDivX = e.pageX - loginInBox.offsetLeft;
    offDivY = e.pageY - loginInBox.offsetTop;
    IsMove = true;
})  
phoneLoginTop.addEventListener('mousemove',(e)=>{
    if(IsMove == true){
        loginInBox.style.left = e.pageX - offDivX + 'px';
        loginInBox.style.top = e.pageY - offDivY + 'px';
    }
})
phoneLoginTop.addEventListener('mouseup',()=>{
    IsMove = false;
})



//获取登陆状态
async function getLoginState (){
    const res = await fetch(`http://music.eleuu.com/user/subcount?cookie=${cookie}`,{ 
        credentials: 'include',
    });
    const json = await res.json();
    console.log(json);
}

//点击歌单跳转
let playlistBtn = document.querySelector("#topbox-nav-three");
playlistBtn.addEventListener('click',()=>{
    $("#firstPage").innerHTML =''
    // window.history.pushState({}, '',  "/playlist");
    $("#firstPage").load('/HTML/all-playlist.html');
    getAPL('全部','0');
})          
 


//获取并储存全部歌单
async function getAPL(cat,offset){
    const res = await fetch(`http://music.eleuu.com/top/playlist?cat=${cat}&offset=${offset}`)
    const json = await res.json();
    console.log(json);
    let aPLcontent = document.querySelector("#aPL-content");
    for(let i=0;i<json.playlists.length;i++){
        let li = document.createElement("li");
        li.style.listStyle = 'none';
        let divMain = document.createElement("div");
        let bigImgA = document.createElement("a");
        let bigImg = document.createElement("img");
        let divSmall = document.createElement("div");
        let contentA = document.createElement("a");
        let p = document.createElement("p");
        aPLcontent.appendChild(li)
        li.appendChild(divMain)
        li.appendChild(contentA)
        divMain.appendChild(bigImgA)
        bigImgA.appendChild(bigImg)
        divMain.appendChild(divSmall);
        bigImgA.appendChild(bigImg)
        contentA.appendChild(p);
        bigImgA.className = 'bigImgA';
        contentA.className = 'contentA';
        bigImgA.id = json.playlists[i].id;
        contentA.id = json.playlists[i].id;
        li.setAttribute('style',`width:140px;height:188px;margin-right:35px;position:relative;margin-bottom:15px;list-style:none;`)
        divMain.setAttribute('style',`width:140px;height:140px;`);
        bigImgA.setAttribute('style',`cursor:pointer;`)
        bigImg.setAttribute('style',`width:140px;height:140px;`);
        bigImg.setAttribute('src',json.playlists[i].coverImgUrl)
        divSmall.setAttribute('style',`width:140px;height:27px;position:absolute;bottom:49px;background:url(../IMG/coverall.png);
        background-position: 0 -537px;`)
        p.innerHTML = json.playlists[i].name;
        contentA.setAttribute('style',`display:block;cursor:pointer;font-size:14px;margin-top:7px;`);
        let spanIcon = document.createElement("span");
        let spanNum = document.createElement("span");
        let aIcon = document.createElement("a");
        spanIcon.setAttribute('style',`display: block;
        float: left;
        width: 14px;
        height: 11px;
        margin: 9px 5px 9px 10px;
        background: url(../IMG/iconall.png);
        background-position: 0 -24px;`)
        spanNum.setAttribute('style',`display: block;
        float: left;
        margin-top: 7px;
        color: #ccc;`)
        spanNum.innerHTML = json.playlists[i].playCount
        aIcon.setAttribute('style',`position: absolute;
        right: 10px;
        bottom: 5px;
        width: 16px;
        height: 17px;
        background: url(../IMG/iconall.png);
        background-position: 0 0;`)
        divSmall.appendChild(spanIcon)
        divSmall.appendChild(spanNum)
        divSmall.appendChild(aIcon)
    }
    let bigImgAs = document.querySelectorAll(".bigImgA");
    let contentAs = document.querySelectorAll(".contentA");
    bigImgAs.forEach(bigImgA =>{
        bigImgA.addEventListener('click',()=>{
            $("#firstPage").innerHTML =''
            // window.history.pushState({}, '',  "/playListDet");
            $("#firstPage").load('/HTML/app-PlayListDet.html');
            let bigMMBoxRightThird = document.querySelector("#bigMMBox-right-third");
            getPLDTwo(bigImgA.id)
            getSongListComment(bigImgA.id,20,0)
        })
    })
    contentAs.forEach(contentA =>{
        contentA.addEventListener('click',()=>{
                $("#firstPage").innerHTML =''
                // window.history.pushState({}, '',  "/playListDet");
                $("#firstPage").load('/HTML/app-PlayListDet.html');
                let bigMMBoxRightThird = document.querySelector("#bigMMBox-right-third");
                getPLDTwo(contentA.id)
                getSongListComment(contentA.id,20,0)
        })
    })
}

//点击进入排行榜
let RankFBtn = document.querySelector("#topbox-nav-two");
RankFBtn.addEventListener("click",()=>{
    $("#firstPage").innerHTML =''
    // window.history.pushState({}, '',  "/rankList");
    $("#firstPage").load('/HTML/排行榜.html');
    rankListDet()
})

async function rankListDet(){
    const res = await fetch('http://music.eleuu.com/toplist/detail');
    const json = await res.json();
    console.log(json);
    let YTBIImgs = document.querySelectorAll(".YTBIImg");
    let GMBIImgs= document.querySelectorAll(".GMBIImg");
    let topWords = document.querySelectorAll(".top");
    let bottomWords = document.querySelectorAll(".bottom");
    let YTBlis = document.querySelectorAll("#YTB li");
    let GMBlis = document.querySelectorAll("#GMB li");
    let gxpin = document.querySelector("#gxpin");
    GetRankListDet(19723756);
    getSongListComment(19723756,20,0);
    for(let i=0;i<YTBIImgs.length;i++){
        YTBIImgs[i].setAttribute('src',json.list[i].coverImgUrl);
        topWords[i].innerHTML = json.list[i].name;
        bottomWords[i].innerHTML = json.list[i].updateFrequency;
        YTBlis[i].id = json.list[i].id;
        YTBlis[i].addEventListener('click',()=>{
            GetRankListDet(YTBlis[i].id);
            gxpin.innerHTML = json.list[i].updateFrequency
            getSongListComment(YTBlis[i].id,20,0);
        })
    }
    for(let i=0;i<GMBIImgs.length;i++){
        GMBIImgs[i].setAttribute('src',json.list[i+4].coverImgUrl);
        topWords[i+4].innerHTML = json.list[i+4].name;
        bottomWords[i+4].innerHTML = json.list[i+4].updateFrequency;
        GMBlis[i].id = json.list[i+4].id;
        GMBlis[i].addEventListener('click',()=>{
            GetRankListDet(GMBlis[i].id);
            gxpin.innerHTML = json.list[i+4].updateFrequency;
            getSongListComment(GMBlis[i].id,20,0);
        })
    }
}

//排行榜歌单详细
async function GetRankListDet(id){
    const res = await fetch(`http://redrock.udday.cn:2022/playlist/detail?cookie=${cookie}&id=`+id,{ 
        credentials: 'include',
        cookie : localStorage.getItem('cookie')
    });
    const data = await res.json();
    console.log(data);
    let bigMMBoximgBox = document.querySelector("#bigMMBoximgBox img");
    bigMMBoximgBox.setAttribute('src',data.playlist.coverImgUrl)
    let topWords = document.querySelector("#bigMMBoxrightBox-one");
    topWords.innerHTML = data.playlist.name;
    let PN = document.querySelector(".PN em");
    PN.innerHTML = data.playlist.playCount;
    let SLs = document.querySelector("#SL-s em");
    SLs.innerHTML = data.playlist.trackCount;
    let tracks = data.playlist.tracks;
    let bigMM = document.querySelector("#bigMMBox-right-third");
    bigMM.innerHTML = ''
    for(let i=0;i<tracks.length;i++){
        let li = document.createElement("li");
        li.style.width = '640px'
        li.style.height = '30px'
        if(i%2==0) {
            li.style.backgroundColor = '#f7f7f7'
        } else {
            li.style.backgroundColor = '#fff'
        }
        li.style.display = 'flex';
        li.style.flexDirection = 'row';
        li.id = tracks[i].id
        let beginBox = document.createElement("div");
        beginBox.style.padding = '6px 10px'
        beginBox.style.width = '54px';
        beginBox.style.height = '18px';
        let begin = document.createElement("div");
        begin.style.lineHeight = '18px';
        begin.style.textAlign = 'left';
        let num = document.createElement("span");
        num.innerHTML = i+1;
        let icon = document.createElement("span");
        icon.style.width = '17px';
        icon.style.height = '17px';
        icon.style.cursor = 'pointer';
        icon.style.float = 'right';
        icon.style.backgroundImage = 'url(../IMG/table.png)';
        icon.style.backgroundPosition = '0 -103px';
        beginBox.appendChild(begin)
        begin.appendChild(num);
        begin.appendChild(icon);

        let SNBox = document.createElement("div");
        SNBox.style.padding = '6px 10px'
        SNBox.style.width = '301.750px';
        SNBox.style.height = '18px';
        SNBox.style.overflow = 'none';
        let SNA = document.createElement("a");
        SNA.style.cursor = 'pointer';
        SNA.innerHTML = tracks[i].name;
        SNBox.appendChild(SNA)


        let STBox = document.createElement("div");
        STBox.style.padding = '6px 10px'
        STBox.style.width = '91px';
        STBox.style.height = '18px';
        let time = document.createElement("span");
        let hidden = document.createElement("div");
        hidden.style.display = 'none'
        let add = document.createElement("a");
        add.style.display = 'block';
        add.style.width = '13px'
        add.style.height = '13px'
        add.style.backgroundImage = 'url(../IMG/icon.png)';
        add.style.backgroundPosition = '0 -700px'
        add.style.cursor = 'pointer';
        add.title = '添加至播放列表';
        add.style.float = 'left'
        hidden.appendChild(add);
        let collect = document.createElement("a");
        collect.style.display = 'block';
        collect.style.width = '18px'
        collect.style.height = '16px'
        collect.style.backgroundImage = 'url(../IMG/table.png)';
        collect.style.backgroundPosition = '0 -174px'
        collect.style.cursor = 'pointer';
        collect.style.margin = '0px 0 0 2px'
        collect.title = '收藏';
        collect.style.float = 'left';
        hidden.appendChild(collect);
        let share = document.createElement("a");
        share.style.display = 'block';
        share.style.width = '18px'
        share.style.height = '16px'
        share.style.backgroundImage = 'url(../IMG/table.png)';
        share.style.backgroundPosition = '0 -195px'
        share.style.cursor = 'pointer';
        share.style.margin = '0px 0 0 2px'
        share.title = '分享';
        share.style.float = 'left';
        hidden.appendChild(share);
        let download = document.createElement("a");
        download.style.display = 'block';
        download.style.width = '18px'
        download.style.height = '16px'
        download.style.backgroundImage = 'url(../IMG/table.png)';
        download.style.backgroundPosition = '-81px -174px'
        download.style.cursor = 'pointer';
        download.style.margin = '0px 0 0 2px'
        download.title = '下载';
        download.style.float = 'left';
        hidden.appendChild(download);
        let deleteA = document.createElement("a");
        deleteA.style.display = 'block';
        deleteA.style.width = '18px'
        deleteA.style.height = '16px'
        deleteA.style.backgroundImage = 'url(../IMG/table.png)';
        deleteA.style.backgroundPosition = '0 -217px'
        deleteA.style.cursor = 'pointer';
        deleteA.style.margin = '0px 0 0 2px'
        deleteA.title = '删除';
        deleteA.style.marginLeft = '75px';
        hidden.appendChild(deleteA);
        STBox.appendChild(time);
        STBox.appendChild(hidden)
        let SNaBox = document.createElement("div");
        SNaBox.style.padding = '6px 10px'
        SNaBox.style.width = '83.45px';
        SNaBox.style.height = '18px';
        let SNa = document.createElement("div");
        SNa.innerHTML = tracks[i].ar[0].name
        SNaBox.appendChild(SNa)       
        let al = document.createElement("span");
        al.innerHTML = tracks[i].al.name;       
        bigMM.appendChild(li);
        li.appendChild(beginBox);
        li.appendChild(SNBox);
        li.appendChild(STBox);
        li.appendChild(SNaBox);
        li.addEventListener('mouseover',()=>{
            hidden.style.display = 'block'
        })
        li.addEventListener('mouseout',()=>{
            hidden.style.display = 'none'
        })
    } 
}

//打开歌手页
let singerPageBtn = document.querySelector("#topbox-nav-five");
singerPageBtn.addEventListener("click",() =>{
    $("#firstPage").innerHTML =''
    // window.history.pushState({}, '',  "/singerPage");
    $("#firstPage").load('/HTML/歌手页.html');
    GetSingers(-1,7,-1);
})

//获取歌手函数
async function GetSingers(type,area,initial){
    const res = await fetch(`http://redrock.udday.cn:2022/artist/list?type=${type}&area=${area}&initial=${initial}&limit=100`);
    const json = await res.json();
    let SBRIImgs = document.querySelectorAll(".SBRIImg");
    let singerNs = document.querySelectorAll(".SingerN");
    let sml = document.querySelectorAll(".sml");
    for(let i=0;i<SBRIImgs.length;i++){
        SBRIImgs[i].setAttribute('src',json.artists[i].picUrl);
        singerNs[i].innerHTML = json.artists[i].name;
    }
    for(let i=0;i<sml.length;i++){
        sml[i].innerHTML = json.artists[i+10].name;
    }
}

//列表点击播放，歌曲切换
function SongList(){
    let iframe = document.querySelector("#iframe").contentWindow;
    let ul = iframe.document.querySelector("#songlistUl");
    if(ul.hasChildNodes() == true){
        let songsA = iframe.document.querySelectorAll(".m");
        for(let i=0;i<songsA.length;i++){
         songsA[i].addEventListener('click',() =>{
            ( () =>{
                let img = iframe.document.querySelector("#app-bottom-img img");
                let dataSongName = songsA[i].getAttribute('data-songname')
                let dataSingerName = songsA[i].getAttribute('data-singername')
                let dataAllTime = songsA[i].getAttribute('data-alltime')
                getSongImg(img,songsA[i].id);
                getSongUrl(songsA[i].id);
                navChange(dataSongName,dataSingerName,songsA[i].id,dataAllTime)
                barDoneMi = 0;  //将分针数字改为0
                var time2 = setInterval(setTime,1000);
            })();
         })
    }  
}
}
let time =setInterval(() => {
        SongList();
    }, 1000);

//退出登录
if(document.querySelector("#userImg")){
    let userImg = document.querySelector("#userImg");
    let logOutBox = document.querySelector("#logOutBox")
    userImg.onmouseover = function(){
        logOutBox.style.display = 'block'
    }
    userImg.onmouseout = function(){
        logOutBox.style.display = 'none'
    }
    logOutBox.onmouseover = function(){
        logOutBox.style.display = 'block'
    }
    logOutBox.onmouseout = function(){
        logOutBox.style.display = 'none'
    }
    logOutBox.onclick = function(){
        logOut();
    }
}

function logOut(){
    let data = new Date();
    data.setTime(data.getTime() - 60*60*1000);
    document.cookie = 'userInfo=;path=/;expires=' + data.toGMTString();
    localStorage.clear();
    window.location = '../HTML/app.html'
}

if(localStorage.length > 0){
    getVipInfo()
    getLvInfo()
    let rl = document.querySelector("#rl");
    let bacS = document.querySelector("#bac-second-bigBox-right");
    bacS.removeChild(rl)
    let loginAf = document.querySelector("#login-af");
    loginAf.style.height = '185px';
    let loginAfIn = document.createElement("div");
    loginAf.appendChild(loginAfIn);
    loginAfIn.setAttribute("style",`height: 165px;padding-top: 20px;background:url(../IMG/index.png);background-position:0 -270px;`)
    let topBox = document.createElement("div");
    let bottomUl = document.createElement("ul");
    loginAfIn.appendChild(topBox)
    loginAfIn.appendChild(bottomUl)
    let ImgA = document.createElement("a");
    let infoBox = document.createElement("div");
    topBox.style.height = '87.8px'
    topBox.appendChild(ImgA);
    topBox.appendChild(infoBox); 
    ImgA.setAttribute('style',`float: left;
    width: 80px;
    height: 80px;
    margin-left: 20px;
    _margin-left: 10px;
    padding: 2px;
    background: #fff;
    border: 1px solid #dadada;`)
    let img = localStorage.getItem('userImg');
    ImgA.innerHTML = `<img src=${img} style="width:80px;height:80px"></img>`
    infoBox.setAttribute('style',`float: left;
    width: 115px;
    margin-left: 18px;
    padding-top: 3px;`)
    let hF = document.createElement("h4");
    let p = document.createElement("p");
    let signInBtn = document.createElement("div");
    let userName = localStorage.getItem("userName");
    infoBox.appendChild(hF)
    infoBox.appendChild(p)
    infoBox.appendChild(signInBtn)
    let nowVipInfoImg = localStorage.getItem("nowVipInfoImg")
    hF.setAttribute('style',`width:115px;height:19.2px;`)
    hF.innerHTML = `<a style='font-size:14px;float:left;display:block;max-width:60px !important;max-height:19.2px !important;overflow: hidden;' title= ${userName}>${userName}</a>
                    <span style='background: url(${nowVipInfoImg});     width: 43px;
                    height: 16px;
                    background-size: 100% 15px;
                    background-repeat: no-repeat;
                    background-position: center;
                    float: left;
                    margin-left: 5px;'></span>`
    let lv = localStorage.getItem("Lv")
    p.setAttribute('style',`width: 100%;
    margin-top: 5px;`)
    p.innerHTML = `<a style="display: inline-block;
    height: 17px;
    overflow: hidden;
    padding-left: 25px;
    line-height: 18px;
    color: #999;
    font-weight: bold;
    font-style: italic;
    background:url(../IMG/icon2.png) -130px -64px";
    >${lv}<i style="float:right;display:block;width: 8px;
    height: 17px;
    background:url(../IMG/icon2.png) -192px -64px;"></i></a>`
    signInBtn.setAttribute('style',`margin-top: 10px;width:115px;height:31px`)
    signInBtn.innerHTML = `<a style="display:block;height:31px;line-height:31px;text-align:center;
    color: #fff;
    background:url(../IMG/button2.png) right -428px;
    width:100px;
    cursor: pointer;"><i style="display:block;width:60px;color:#fff;
    background:url(../IMG/button2.png) 0 -387PX;
    padding: 0 15px 0 20px;
    pointer-events: none;
    height: 31px;
    line-height: 31px;
    text-align: center;
    cursor: pointer;
    font-size:12px;
    font-style:normal">签到</i></a>`
    bottomUl.setAttribute('style',`margin:22px 0 0 20px;width:230px;height:40px`);
    bottomUl.id = 'dny';
    let dongTaiLi = document.createElement("li")
    let guanZhuLi = document.createElement("li")
    let fenSiLi = document.createElement("li")
    bottomUl.appendChild(dongTaiLi)
    bottomUl.appendChild(guanZhuLi)
    bottomUl.appendChild(fenSiLi)
    let lis = document.querySelectorAll("#dny li");
    lis.forEach(li =>{
        li.setAttribute("style",`float: left;
        display:block;
        height: 40px;
        border-right: 1px solid #e4e4e4;
        cursor:pointer`)
    })
    fenSiLi.style.borderRight = 'none'
    dongTaiLi.style.paddingRight = '18px'
    guanZhuLi.style.padding = '0 18px'
    fenSiLi.style.paddingLeft = '18px'
    let eventNum = localStorage.getItem("eventNum");
    let AttentionNum = localStorage.getItem("AttentionNum");
    let followerNum = localStorage.getItem('followerNum');
    dongTaiLi.innerHTML = `<a><strong>${eventNum}</strong><span>动态</span></a>`
    guanZhuLi.innerHTML = `<a><strong>${AttentionNum}</strong><span>关注</span></a>`
    fenSiLi.innerHTML = `<a><strong>${followerNum}</strong><span>粉丝</span></a>`
    let strongs = document.querySelectorAll("#dny strong");
    let As = document.querySelectorAll("#dny a");
    let spans = document.querySelectorAll("#dny span");
    strongs.forEach(strong =>{
        strong.setAttribute('style',`display: block;
        font-size: 20px;
        font-weight: normal;
        cursor: pointer;
        color: #666;`)
    })
    spans.forEach(span =>{
        span.setAttribute('style',`font-size:12px;
        color: #666;`)
    })
    As.forEach(a =>{
        a.style.textDecoration = 'none'
        a.addEventListener('mouseover',()=>{
            a.childNodes.forEach(child =>{
                child.style.color = '#0C73C2'
            }) 
        })
        a.addEventListener('mouseout',()=>{
            a.childNodes.forEach(child =>{
                child.style.color = '#666'
            }) 
        })
    })
}

//获取vip信息
async function getVipInfo(){
    let cookie = localStorage.getItem("cookie");
    const res = await fetch(`http://redrock.udday.cn:2022/vip/info?cookie=${cookie}`);
    const json = await res.json();
    localStorage.setItem('nowVipInfoImg',json.data.redVipLevelIcon);
}

//获取用户等级信息
async function getLvInfo(){
    let cookie = localStorage.getItem("cookie");
    const res = await fetch(`http://redrock.udday.cn:2022/user/level?cookie=${cookie}`);
    const json = await res.json();
    console.log(json);
    localStorage.setItem("Lv",json.data.level)
}

//获取用户关注人数
async function getAttentionNum(){
    let id = localStorage.getItem("userId");
    const res = await fetch(`http://redrock.udday.cn:2022/user/follows?uid=${id}`);
    const json = await res.json();
    localStorage.setItem('AttentionNum',json.follow.length)
}
getAttentionNum();

//获取粉丝数量
async function getFollowerNum(){
    let id = localStorage.getItem("userId");
    const res = await fetch(`http://redrock.udday.cn:2022/user/followeds?uid=${id}`);
    const json = await res.json();
    localStorage.setItem('followerNum',json.followeds.length)
}
getFollowerNum();

//获取用户动态数量
async function getDSNum(){
    let id = localStorage.getItem("userId");
    const res = await fetch(`http://redrock.udday.cn:2022/user/event?uid=${id}`);
    const json = await res.json();
    localStorage.setItem('eventNum',json.events.length)
}
getDSNum();

//nav颜色变化
let ems = document.querySelectorAll("#topbox-nav em");
ems[0].className = 'pointedT'
ems[0].addEventListener('click',()=>{
    for(let i=0;i<ems.length;i++){
        ems[i].className = ''
    }
    ems[0].className = 'pointedT'
    window.location = '../HTML/app.html'
})
ems[1].addEventListener('click',()=>{
    for(let i=0;i<ems.length;i++){
        ems[i].className = ''
    }
    ems[1].className = 'pointedT'
})
ems[2].addEventListener('click',()=>{
    for(let i=0;i<ems.length;i++){
        ems[i].className = ''
    }
    ems[2].className = 'pointedT'
})
ems[4].addEventListener('click',()=>{
    for(let i=0;i<ems.length;i++){
        ems[i].className = ''
    }
    ems[4].className = 'pointedT'
})
ems[3].addEventListener('click',()=>{
    alert("敬请期待")
})
ems[5].addEventListener('click',()=>{
    alert("敬请期待")
})

//上面小三角
let curs = document.querySelectorAll(".cur");
curs[1].style.display = 'none'
let nav2 = document.querySelector("#nav-2");
let nav1 = document.querySelector("#nav-1");
nav2.addEventListener('click',() =>{
    curs[1].style.display = 'block'; 
    curs[0].style.display = 'none'; 
    nav2.style.backgroundColor = '#000000'
    nav1.style.backgroundColor = '#242424'
})
nav1.addEventListener('click',() =>{
    curs[1].style.display = 'none'; 
    curs[0].style.display = 'block'; 
    nav1.style.backgroundColor = '#000000'
    nav2.style.backgroundColor = '#242424'
})
    


// let iframe = document.querySelector("#iframe").contentWindow;
// let img = iframe.document.querySelector("#app-bottom-img img");
// let tip = iframe.document.querySelector("#tip");
// tip.style.display = 'block';
// tip.innerHTML = '已播放该歌曲'
// setTimeout(() => {
//     tip.style.display = 'none';
// }, 1000);
// getSongImg(img,datas[i].id);
// getSongUrl(datas[i].id);
// navChange(datas[i].name,datas[i].artists[0].name,datas[i].id,datas[i].duration);
// (() =>{
//     barDoneMi = 0;  //将分针数字改为0
//     var time1 = setInterval(setTime,1000);
// })();



















    







//底部
  //播放列表开关
  let close = document.querySelectorAll(".close")[0];
  let playlistDetailed = document.querySelector("#playlist-detailed");
  close.addEventListener('click',()=>{
      playlistDetailed.style.display = 'none';
  })
  let playlistA = document.querySelectorAll(".playlist-a")[0];
  playlistA.addEventListener('click',()=>{
      playlistDetailed.style.display = 'block';
  })
   //音量开关 
  let volumn = document.querySelectorAll(".right-function")[0];
  let volumnDetailed = document.querySelector("#volumn-detailed");
  volumn.addEventListener('click',() =>{
      if(volumnDetailed.style.display == 'block'){
        volumnDetailed.style.display = 'none';
      } else {
        volumnDetailed.style.display = 'block';
      }
  })
  //调节音量
  let volumeBox = document.querySelector("#app-bottom-bac");
  let volumeIcon = document.querySelector("#volumn-icon");
  let volumeDone = document.querySelector("#volumn-done-bar");
  let volumeAll = document.querySelector("#volumn-total-progress-bar");
  let isDrag = false;
  volumeIcon.onmousedown = function(e){
      isDrag = true;
        document.onmousemove = function(e){
            if(isDrag){
                if(volumeDone.offsetHeight <=93 || e.pageY>620){
                    e = e || window.event;
                    y = e.pageY
                    let a = volumeBox.offsetTop - y;
                    volumeDone.style.height = a + 'px';
                }
            }
        }
        document.onmouseup = function(){
            if(isDrag){
                let baiFenBi = volumeDone.offsetHeight/volumeAll.offsetHeight;
                console.log(baiFenBi);
                let audio = window.parent.document.getElementById("audio-app");
                audio.volumn = baiFenBi;
                console.log(audio);
            }
            isDrag = false; 
        }
  }





//暂停/开始
let playA = document.querySelectorAll(".playA")[0];
let audioAn = window.parent.document.querySelector("#audio-app");
playA.addEventListener('click',()=>{
    if(playA.className == 'playA active'){
        audioAn.pause();
        playA.className = 'playA'
    } else {
        audioAn.play();
        playA.className = 'playA active'
    }
})






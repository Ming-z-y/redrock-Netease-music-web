var blkA = document.querySelectorAll(".blk a");
var alphabets = document.querySelectorAll("#alphabet a");
var nameTitle = document.querySelector("#SBRI-title span");
blkA[0].className ='pointed'
alphabets[0].className = 'fa apointed'
for(let i=0;i<blkA.length;i++){
    blkA[i].addEventListener('click',()=>{
        nameTitle.innerHTML = blkA[i].innerHTML
        for(let t=0;t<blkA.length;t++){
            blkA[t].className = ''
        }
        for(let i=1;i<alphabets.length;i++){
            alphabets[i].className = 'qita';
        }
        alphabets[0].className = 'fa apointed'
        blkA[i].className ='pointed'
        let pointed = document.querySelectorAll(".pointed")[0];
        let dataType = pointed.getAttribute('data-type');
        let dataArea = pointed.getAttribute('data-area');
        GetSingers(dataType,dataArea,-1)
})
}
for(let i=1;i<alphabets.length;i++){
    alphabets[i].addEventListener('click',() =>{
        for(let i=1;i<alphabets.length;i++){
            alphabets[i].className = 'qita';
        }
        alphabets[0].className = 'fa'
        alphabets[i].className = 'qita apointed';
        let pointed = document.querySelectorAll(".pointed")[0];
        let dataType = pointed.getAttribute('data-type');
        let dataArea = pointed.getAttribute('data-area');
        let dataInitial = alphabets[i].getAttribute('data-num');
        GetSingers(dataType,dataArea,dataInitial);
    })
    alphabets[0].addEventListener('click',() =>{
        for(let i=1;i<alphabets.length;i++){
            alphabets[i].className = 'qita';
            alphabets[0].className = 'fa'
        }
        alphabets[0].className = 'fa apointed';
        let pointed = document.querySelectorAll(".pointed")[0];
        let dataType = pointed.getAttribute('data-type');
        let dataArea = pointed.getAttribute('data-area');
        let dataInitial = alphabets[0].getAttribute('data-num');
        GetSingers(dataType,dataArea,dataInitial);
    })
}

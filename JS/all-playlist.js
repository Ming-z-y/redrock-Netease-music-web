var navLable = document.querySelectorAll(".nav-lable");
for(let i=0;i<navLable.length;i++){
        navLable[i].addEventListener("click",()=>{
        $("#firstPage").innerHTML =''
        $("#firstPage").load('/HTML/all-playlist.html');
        var theTitle = document.querySelectorAll(".the-title");
        theTitle.forEach(thetitle =>{
            thetitle.innerHTML = navLable[i].innerHTML
        })
        getAPL(navLable[i].innerHTML,'0')
    })
}   

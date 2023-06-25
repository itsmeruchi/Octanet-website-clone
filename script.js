// function getDuration(src, cb) {
//     var audio = new Audio();
//     $(audio).on("loadedmetadata", function(){
//         cb(audio.duration);
//     });
//     audio.src = src;
// }
// getDuration("./audio/2.mp3", function(length) {
//     console.log('I got length ' + length);
//     document.getElementById("duration").textContent = length;
// });

console.log("Welcome to Spotify");
let songIndex = 0;
let audioElement= new Audio('/let-me-love-you.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));


let songs=[
    {songName: "let me love you", filepath:'/1.mp3', coverPath:"/Let Me Love You_64(PagalWorld.com.se).jpg"},
    {songName: "venom", filepath:"/2.mp3", coverPath:"/img2.jpg"},
    {songName: "Naruto", filepath:"/3.mp3", coverPath:"/img3.jpg"},
    {songName: "Halsey", filepath:"/4.mp3", coverPath:"/img4.jpg"},
    {songName: "Charlie Puth", filepath:"/5.mp3", coverPath:"/img6.jpg"},
    {songName: "Chainsmokers", filepath:"/6.mp3", coverPath:"/img7.jpg"},
    {songName: "Alan Walker", filepath:"/7.mp3", coverPath:"/img5.jpg"}
]

songItems.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;

})

//handle play/pause click
// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})

//listen to events
audioElement.addEventListener('timeupdate', ()=>{
    //console.log('timeupdate');
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
    

})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})
const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})
document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})
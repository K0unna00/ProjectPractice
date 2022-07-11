connection.on("closeCamera", function (user) {
    let elem = document.getElementById(`${user.userName}`).parentElement.parentElement;
    let videoBox = document.querySelector(".myCameras");
    videoBox.removeChild(elem);
})
connection.on("showCamera", function (user) {
    let videoBox = document.querySelector(".myCameras");
    let col = document.createElement("div");
    let p = document.createElement("p");
    let videoDiv = document.createElement("div");
    let video = document.createElement("video");
    video.setAttribute("id", `${user.userName}`);
    video.setAttribute("data-userId", `${user.userName}`);
    video.classList.add("video-player");
    p.innerText =user.userName;
    videoDiv.appendChild(video);
    col.appendChild(p)
    col.appendChild(videoDiv);
    col.classList.add("col-5");
    videoBox.appendChild(col);
})
let onCam = document.getElementById("onCam");

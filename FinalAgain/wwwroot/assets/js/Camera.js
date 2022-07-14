let localStream;
let JSuser;
let init = async () => {
    localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    document.querySelectorAll(".video-player").forEach(x => {
        let user = document.getElementById(`${x.id}`)
        user.setAttribute('playsinline', '');
        user.setAttribute('autoplay', '');
        user.srcObject = localStream;
    })
}
connection.on("showCamera", function (user) {
    var btn = document.querySelector('#onCam');
    btn.setAttribute('userName', `${user.userName}`);
    JSuser=user
})
$("#onCam").click(function () {
    let videoBox = document.querySelector(".videoBox");
    var currentUser = $(this).attr("userName");
    let check = true;
    for (let i = 0; i < videoBox.childElementCount; i++) {
        if (videoBox.children[i].classList.contains(`${currentUser  }`)) {
            videoBox.removeChild(videoBox.children[i]);
            check = false;
            break;
        }
    }
    if (check) {
        connection.invoke("ShowCameraData", JSuser);
    }
})
connection.on("ReceiveCameraData", function (JSuser) {
    init();
    let videoBox = document.querySelector(".videoBox");
    let col = document.createElement("div");
    let p = document.createElement("p");
    let videoDiv = document.createElement("div");
    let video = document.createElement("video");
    video.setAttribute("id", `${JSuser.userName}`);
    video.setAttribute("data-userId", `${JSuser.userName}`);
    video.classList.add("video-player");
    p.innerText = JSuser.userName;
    videoDiv.appendChild(video);
    col.appendChild(p)
    col.appendChild(videoDiv);
    col.classList.add("col-5");
    col.classList.add(`${JSuser.userName}`);
    videoBox.appendChild(col);
})

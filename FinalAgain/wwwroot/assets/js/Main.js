let localStream;
let remoteStream;
let peerConnection;

const servers = {
    iceServer: [
        {
            urls: ['stun:stun1.l.google.com.19302', 'stun:stun2.google.com.19302']
        }
    ]
}

let init = async () => {
    localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    document.querySelectorAll(".video-player").forEach(x => {
        let user = document.getElementById(`${x.id}`)
        user.setAttribute('playsinline', '');
        user.setAttribute('autoplay', '');
        user.srcObject = localStream;
    })
    /*createOffer()*/
}

let createOffer = async () => {
    peerConnection = new RTCPeerConnection(servers)

    remoteStream = new MediaStream()
    var user2 = document.getElementById('user-2')
    user2.setAttribute('playsinline', '');
    user2.setAttribute('autoplay', '');
    user2.srcObject = remoteStream;

    localStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream)
    })

    peerConnection.ontrack = (event) => {
        event.streams[0].getTracks().forEach((track) => {
            remoteStream.addTrack()
            // remoteStream.addTrack(track)

        })
    }


    peerConnection.onicecandidate = async (event) => {
        if (event.candidate) {
            console.log('new Ide candidate:', event.candidate)
        }
    }

    let offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    console.log('offer:', offer)
}
init()

const video = document.getElementById('video')
if(video){
    document.body.style = "margin: 0;padding: 0;width: 100vw;height: 100vh;display: flex;justify-content: center;align-items: center;";
}
Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(startVideo)

function startVideo() {
    navigator.getUserMedia(
        { video: {} },
        stream => video ? video.srcObject = stream : null,
        err => console.error(err)
    )
}

if(video){
    video.addEventListener('play', () => {
        const canvas = faceapi.createCanvasFromMedia(video);

        document.body.append(canvas);

        const displaySize = { width: video.width, height: video.height };

        faceapi.matchDimensions(canvas, displaySize);

        setInterval(async() => {
          const detections = await faceapi.detectAllFaces(video,new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceExpressions();
          
            const resizedDetections = faceapi.resizeResults(detections, displaySize);
            
            canvas.getContext('2d').clearRect(0,0,canvas.width, canvas.height);
            
            faceapi.draw.drawDetections(canvas, resizedDetections);
            faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
            faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
            
            if(detections[0].expressions.happy > 0.98){
                localStorage.setItem('start', true);
                alert('Welcome!');
                window.location.reload(true);
            }
        }, 1000)
    });
}

  
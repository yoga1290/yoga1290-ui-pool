export default class WebcamRecorder {

    private selectorCanvas: string = null;
    private canvas: HTMLCanvasElement = null;

    constructor(selectorCanvas: string) {
        this.selectorCanvas = selectorCanvas;
        console.log('constructor selectorCanvas', this.selectorCanvas);


        if (navigator.mediaDevices) {
            console.log('getUserMedia supported.');
            var constraints = { audio: true, video:true };
            
            navigator
                .mediaDevices.getUserMedia(constraints)
                .then((stream: MediaStream) => {
                    this.onStreamReady(stream);
                }, (err) => {
                    console.log('rejected', err);
                })
                .catch(function(err) {
                    console.error('The following error occurred: ' + err, err);
                });
        } else {
    
            //TODO: use https://www.npmjs.com/package/cordova-plugin-camera-stream
        }
    }

    private onStreamReady(stream: MediaStream) {

        // console.log('canvas', document.querySelectorAll(this.selectorCanvas)[0]);

        this.canvas = document.querySelectorAll(this.selectorCanvas)[0] as HTMLCanvasElement;
        console.log('canvas', this.selectorCanvas);

        var mediaRecorder = new MediaRecorder(stream);
        // https://developer.mozilla.org/en-US/docs/Web/API/BlobEvent
        // https://github.com/mozdevs/MediaRecorder-examples/blob/gh-pages/render-video-into-canvas.js
        // let renderCallback = this.renderToCanvas;
        mediaRecorder.ondataavailable = (blobEvent: BlobEvent) => {
            // renderCallback(videoURL);

            // use requestAnimationFrame to render the video as often as possible
            console.log('canvas', this.canvas);

            let context = this.canvas.getContext('2d');
            
            console.log('context', context);

            // https://github.com/mozdevs/MediaRecorder-examples/blob/gh-pages/render-video-into-canvas.js
            var video = document.createElement('video') as HTMLVideoElement;
            console.log('blob type:', blobEvent.type);
            let videoBolb = new Blob([blobEvent.data], { 'type' : 'video/*; codecs=opus' });
            // let videoBolb = new Blob([blobEvent.data], { type: 'video/webm; codecs=vp9' });
            video.src = URL.createObjectURL(videoBolb);
            video.addEventListener('loadedmetadata', () => {
                console.log('loadedmetadata', video.videoWidth, video.videoHeight);

                try{
                    let draw = () => {
                        console.log('draw');

                        // schedule next call to this function
                        requestAnimationFrame(draw);
                
                        // draw video data into the canvas
                        try{
                        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight); //TODO: , width, height);
                        }catch(e){}
                        //todo: context
                    };
                
                    // Start the animation loop
                    requestAnimationFrame(draw);
                }catch(e) {console.error(e);}
            });
            // we need to play the video to trigger the loadedmetadata event
            video.play();
            
        };
    
        mediaRecorder.onstop = function() {
        }
        // https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder/start#Syntax
        // "The number of milliseconds to record into each Blob"
        mediaRecorder.start(5000);

        console.log('mediaRecorder.state', mediaRecorder.state);
        console.log("recorder started");
        setTimeout(function() {
          mediaRecorder.stop();
        }, 10000);
    //      mediaRecorder.stop();
    }

//     private renderToCanvas(videoURL: any) {
//         // use requestAnimationFrame to render the video as often as possible
//         let context = this.canvas.getContext('2d');
//         let draw = function () {
//             // schedule next call to this function
//             requestAnimationFrame(draw);
    
//             // draw video data into the canvas
//             context.drawImage(videoURL, 0, 0); //TODO: , width, height);
//             //todo: context
//         };
    
//         // Start the animation loop
//         requestAnimationFrame(draw);
//     }
    

}

// let SEL_VIDEO = '.preview-canvas';
// let chunks: any[] = [];

// function ondataavailable(blobEvent: BlobEvent) {
//     var blob = blobEvent.data;
//     console.log('blob', blob.type ,blob.size);
//     chunks.push(blob);


//     // if (video == null) {
//     //     video = document.querySelector(SEL_VIDEO) as HTMLVideoElement;
//     //     video.controls = false;
//     //     video.autoplay = true;
//     // }
//     // video.srcObject = blob;
//     // if(chunks.length > 0 && chunks.length %1000 == 0) {
//         previewVideo(blobEvent);
//     // }
// }

// function renderToCanvas(videoURL: any) {
//     // use requestAnimationFrame to render the video as often as possible
//     var context = canvas.getContext('2d');
//     var draw = function () {
//         // schedule next call to this function
//         requestAnimationFrame(draw);

//         // draw video data into the canvas
//         context.drawImage(videoURL, 0, 0); //TODO: width/height?
//         //TODO: trigger layers render
//     };

//     // Start the animation loop
//     requestAnimationFrame(draw);
// }

// let video: HTMLVideoElement = null;

// function previewVideo(_blob: BlobEvent) {
//     var blob = new Blob(chunks, { 'type' : 'video/*; codecs=opus' });
//     // video.srcObject = blob;

//     chunks = [];
//     // var audioURL = URL.createObjectURL(blob);
//     var audioURL = URL.createObjectURL(blob);
// //     // var audio = document.querySelector(SEL_VIDEO);
    
//     if (video == null) {
//         video = document.querySelector(SEL_VIDEO) as HTMLVideoElement;
//         video.controls = false;
//         video.autoplay = true;
//     }
//     console.log('video', video);

//     video.src = audioURL;
//     // video.autoplay = true;

//     video.play();
// //     // video.setAttribute('controls', '');
// //     // document.body.appendChild(audio);
// }
// function streamReady(stream: MediaStream) {
//     video = document.querySelector(SEL_VIDEO) as HTMLVideoElement;
//     // video.src = URL.createObjectURL( stream as any);
//     // video.autoplay = true;

//     console.log('stream', stream);
//     var mediaRecorder = new MediaRecorder(stream);
//     // https://developer.mozilla.org/en-US/docs/Web/API/BlobEvent
//     mediaRecorder.ondataavailable = ondataavailable;

//     mediaRecorder.onstop = function() {
//         // var blob = new Blob(chunks, { 'type' : 'video/*; codecs=opus' });
//         chunks = [];
//         // var audioURL = URL.createObjectURL(blob);
//         // // var audio = document.querySelector(SEL_VIDEO);
//         // var video = document.querySelector(SEL_VIDEO) as HTMLVideoElement;
//         // video.controls = true;
//         // video.src = audioURL;
//         // video.play();

//         // video.setAttribute('controls', '');
//         // document.body.appendChild(audio);
//     }
//     // https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder/start#Syntax
//     // "The number of milliseconds to record into each Blob"
//     mediaRecorder.start(5000);
//     console.log('mediaRecorder.state', mediaRecorder.state);
//     console.log("recorder started");
//     // setTimeout(function() {
//     //   mediaRecorder.stop();
//     // }, 50000);
// //      mediaRecorder.stop();
// }

// function start() {
//     if (navigator.mediaDevices) {
//         console.log('getUserMedia supported.');
//         var constraints = { audio: true, video:true };
        
//         navigator
//             .mediaDevices.getUserMedia(constraints)
//             .then(streamReady)
//             .catch(function(err) {
//                 console.error('The following error occurred: ' + err, err);
//             });
//     } else {

//         //TODO: use https://www.npmjs.com/package/cordova-plugin-camera-stream
//     }
// }
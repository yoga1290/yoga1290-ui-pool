import React from 'react';
import './style.scss';
import ClipCard from './clip-card';
// import WebcamRecorder from './webcam-recorder';
// import { CanvasRecorder } from './canvas-recorder';

 /*
let SEL_VIDEO = '.preview-canvas';
let chunks: any[] = [];
function ondataavailable(blobEvent: BlobEvent) {
    var blob = blobEvent.data;
    console.log('blob', blob.type ,blob.size);
    chunks.push(blob);


    // if (video == null) {
    //     video = document.querySelector(SEL_VIDEO) as HTMLVideoElement;
    //     video.controls = false;
    //     video.autoplay = true;
    // }
    // video.srcObject = blob;
    // if(chunks.length > 0 && chunks.length %1000 == 0) {
        previewVideo(blobEvent);
    // }
}
let video: HTMLVideoElement = null;
function previewVideo(_blob: BlobEvent) {
    var blob = new Blob(chunks, { 'type' : 'video/*; codecs=opus' });
    // video.srcObject = blob;

    chunks = [];
    var audioURL = URL.createObjectURL(blob);
//     // var audio = document.querySelector(SEL_VIDEO);
    
    if (video == null) {
        video = document.querySelector(SEL_VIDEO) as HTMLVideoElement;
        video.controls = false;
        video.autoplay = true;
    }
    console.log('video', video);

    video.src = audioURL;
    // video.autoplay = true;

    video.play();
//     // video.setAttribute('controls', '');
//     // document.body.appendChild(audio);
}
function streamReady(stream: MediaStream) {
    video = document.querySelector(SEL_VIDEO) as HTMLVideoElement;
    // video.src = URL.createObjectURL( stream as any);
    // video.autoplay = true;

                console.log('stream', stream);
    var mediaRecorder = new MediaRecorder(stream);
    // https://developer.mozilla.org/en-US/docs/Web/API/BlobEvent
    mediaRecorder.ondataavailable = ondataavailable;

    mediaRecorder.onstop = function(/*e: Event* /) {
        // var blob = new Blob(chunks, { 'type' : 'video/*; codecs=opus' });
        chunks = [];
        // var audioURL = URL.createObjectURL(blob);
        // // var audio = document.querySelector(SEL_VIDEO);
        // var video = document.querySelector(SEL_VIDEO) as HTMLVideoElement;
        // video.controls = true;
        // video.src = audioURL;
        // video.play();

        // video.setAttribute('controls', '');
        // document.body.appendChild(audio);
    }
    // https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder/start#Syntax
    // "The number of milliseconds to record into each Blob"
    mediaRecorder.start(5000);
    console.log('mediaRecorder.state', mediaRecorder.state);
    console.log("recorder started");
    // setTimeout(function() {
    //   mediaRecorder.stop();
    // }, 50000);
//      mediaRecorder.stop();
}

function start() {
    if (navigator.mediaDevices) {
        console.log('getUserMedia supported.');
        var constraints = { audio: true, video:true };
        
        navigator
            .mediaDevices.getUserMedia(constraints)
            .then(streamReady)
            .catch(function(err) {
                console.error('The following error occurred: ' + err, err);
            });
    } else {

        //TODO: use https://www.npmjs.com/package/cordova-plugin-camera-stream
    }
}
start();
// */


// https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images#using_frames_from_a_video
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL
// https://stackoverflow.com/questions/10673122/how-to-save-canvas-as-an-image-with-canvas-todataurl
// https://stackoverflow.com/questions/10721884/render-html-to-an-image
// https://stackoverflow.com/questions/12652769/rendering-html-elements-to-canvas
// https://stackoverflow.com/questions/18434094/how-to-style-svg-with-external-css
// https://www.w3.org/TR/SVG/styling.html#LinkElement

// window.onload = () => {
//     new WebcamRecorder('.preview-canvas');
// };

export default () => (
    <div className="story-report continer_body row animate__animated animate__fadeInUp my-3">

                <div className='card bg-dark col-xs-12 col-sm-7 col-lg-7 col-12 mx-4'>
                    <div className='card-body px-0'>
                    <h5 className="card-title text-center">Preview</h5>

                    {/* <img id="preview-img"></img> */}
                    <canvas className='preview-canvas  px-0 py-0 mx-0 my-0'></canvas>
                    {/* <video className='preview-canvas  px-0 py-0 mx-0 my-0'></video> */}

                    </div>
                </div>

                <div className='timeline card bg-dark col-xs-12 col-sm-4 col-lg-4 col-12'>
                    <div className='card-body'>
                    <h5 className="timeline-title card-title text-center">Timeline</h5>


                        <ClipCard />
                        <ClipCard />
                        <ClipCard />

                        <button className='btn btn-primary text-center col-12'>
                            <span className="material-icons align-middle">movie</span>
                            New Clip
                        </button>


                    </div>
                </div>

    </div>);
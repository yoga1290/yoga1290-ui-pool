export class CanvasRecorder {
    /*
    private hCanvas: HTMLCanvasElement;
    private prvImage: HTMLImageElement;

    constructor(hCanvas: HTMLCanvasElement,
                prvImage: HTMLImageElement) {
        this.hCanvas = hCanvas;
        this.prvImage = prvImage;
    }

    private mapHTMLtoSVG(styleFiles: string[], html: string) {
        return `<svg xmlns="http://www.w3.org/2000/svg">
                    <style>
                        ${ styleFiles.map(file => (`@import url(${ file });`)) }
                    </style>
                    <foreignObject width="100%" height="100%">
                        <div xmlns="http://www.w3.org/1999/xhtml">${ html }</div>
                    </foreignObject>
                </svg>`;
    }

    private renderCanvas() {
        // const canvas = document.getElementById("canvas");
        this.cleanImageObject();
        this.prvImage.src = this.hCanvas.toDataURL();
    }

    private renderHTML(styleFiles: string[], html: string) {
        const svg = this.mapHTMLtoSVG(styleFiles, html);
        const svgBlob = new Blob( [svg], { type: 'image/svg+xml;charset=utf-8' } );
        const svgObjectUrl = URL.createObjectURL( svgBlob );
        this.cleanImageObject();
        
        this.prvImage.src = svgObjectUrl;
    }

    private cleanImageObject() {
        const oldSrc = this.prvImage.src;
        if( oldSrc && oldSrc.startsWith( 'blob:' ) ) { // See https://stackoverflow.com/a/75848053/159145
            URL.revokeObjectURL( oldSrc );
        }
    }
    //*/
}
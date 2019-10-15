import { MediaStreamConstraints, ERRO } from '../common/zego.entity';
import { Logger } from '../common/zego.logger';
export declare class ZegoPreview {
    private log;
    logger: Logger;
    localStream: MediaStream | null;
    videoInfo: {};
    mediaStreamConfig: MediaStreamConstraints;
    previewSuc: boolean;
    constructor(log: Logger);
    getMediaStreamConstraints(mediaStreamConfig: MediaStreamConstraints): {
        audio: any;
        video: any;
    };
    startPreview(mediaStreamConfig: MediaStreamConstraints, successCallback: Function, errorCallback: (err: ERRO) => void): void;
    captureStream(localVideo: any): MediaStream | null;
    stopPreview(): void;
    enableMicrophone: (enable: boolean) => boolean;
    enableCamera: (enable: boolean) => boolean;
}

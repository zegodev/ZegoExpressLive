import { PlayOption, Constraints, webQualityStats, ERRO, UsabilityDetection, PublishOption, WebListener, webConfig } from '../common/zego.entity';
import { ZegoStreamCenterWeb } from './zego.streamCenter.web';
import { AudioMixUtil } from '../util/AudioMixUtil';
import { BaseCenter } from '../common/clientBase/index';
import { MediaUtil } from '../util/mediaUtil';
import { ZegoMediaElement, ZegoMediaRecorder } from '../../types/index';
export declare class ZegoClient extends BaseCenter {
    streamCenter: ZegoStreamCenterWeb;
    audioMixing: AudioMixUtil;
    constructor(appId: number, server: string, userId: string);
    static screenShotReady: boolean;
    static mediaRecorder: ZegoMediaRecorder;
    static recordedBlobs: Blob[];
    config(option: webConfig): boolean;
    protected getSocket(server: string): WebSocket;
    on<k extends keyof WebListener>(listener: k, callBack: WebListener[k]): boolean;
    off<k extends keyof WebListener>(listener: k, callBack?: WebListener[k]): boolean;
    enableStream(localStream: MediaStream, option: {
        video?: boolean;
        audio?: boolean;
    }): boolean;
    setAudioOutput(localVideo: HTMLMediaElement, audioOutput: string): boolean;
    setCustomSignalUrl(signalUrl: string): false | undefined;
    private setQualityMonitorCycle;
    getStats(interval: number, callBack: (stats: webQualityStats) => void): void;
    getRemoteStream(streamId: string, playOption?: PlayOption): Promise<MediaStream>;
    stopRemoteStream(streamId: string): boolean;
    createLocalStream(option?: Constraints): Promise<MediaStream>;
    destroyLocalStream(localStream: MediaStream): boolean;
    publishLocalStream(streamId: string, localStream: MediaStream, publishOption?: PublishOption): boolean;
    stopPublishLocalStream(streamId: string): Promise<void>;
    private preloadEffect;
    private playEffect;
    private pauseEffect;
    private resumeEffect;
    private unloadEffect;
    private startMixingAudio;
    private stopMixingAudio;
    private setMixingAudioVolume;
    private getPublisher;
    private startScreenShotChrome;
    private startScreenSharing;
    private startScreenShotFirFox;
    private stopScreenShot;
    switchDevice(localStream: MediaStream, device: {
        cameraId: string;
        microphoneId: string;
    }): Promise<void>;
    protected WebrtcOnPublishStateUpdateHandle(type: 0 | 1 | 2, streamId: string, error: ERRO): void;
    protected setCDNInfo(streamInfo: {
        urlHttpsFlv: string;
        urlHttpsHls: string;
        urlFlv: string;
        urlHls: string;
        urlRtmp: string;
    }, streamItem: {
        urls_flv: string | string[];
        urls_m3u8: string | string[];
        urls_rtmp: string | string[];
        urls_https_flv: string | string[];
        urls_https_m3u8: string | string[];
    }): void;
    protected loginBodyData(): {
        [index: string]: string | number | any[];
    };
    private screenStreamFrom;
    filterStreamList(streamId?: string): any;
    private voiceChange;
    private voiceBack;
    static detectRTC(): Promise<UsabilityDetection>;
    enumDevices(): Promise<{
        microphones: Array<{
            label: string;
            deviceId: string;
        }>;
        speakers: Array<{
            label: string;
            deviceId: string;
        }>;
        cameras: Array<{
            label: string;
            deviceId: string;
        }>;
    }>;
    private static enumDevices;
    static getAudioInfo(localStream: MediaStream, errCallBack: (param: any) => void, option?: {
        type: string;
        bufferSize?: number;
        channels?: number;
        sampleBit?: 8 | 16;
        sampleRate: number;
    }): false | MediaUtil;
    private static handleDataAvailable;
    static startRecord(el: ZegoMediaElement): void;
    static stopRecord(): void;
    static resumeRecord(): void;
    static pauseRecord(): void;
    static saveRecord(name: string): void;
    static takeSnapShot(el: HTMLVideoElement, img: HTMLImageElement): void;
    static saveSnapShot(el: HTMLVideoElement, name: string): void;
    private bindWindowListener;
    private onPublishStateUpdateHandle;
}

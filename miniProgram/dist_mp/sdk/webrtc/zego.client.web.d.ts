import { PlayOption, Constraints, QualityStats, ERRO, UsabilityDedection } from '../common/zego.entity';
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
    getSocket(server: string): WebSocket;
    enableCamera(localStream: MediaStream, enable: boolean): boolean;
    enableMicrophone(localStream: MediaStream, enable: boolean): boolean;
    setAudioOutput(localVideo: HTMLMediaElement, audioOutput: string): boolean;
    setCustomSignalUrl(signalUrl: string): false | undefined;
    private setQualityMonitorCycle;
    getStats(interval: number, callBack: (stats: QualityStats) => void): void;
    getRemoteStream(streamId: string, playOption?: PlayOption): Promise<MediaStream>;
    stopRemoteStream(streamId: string): boolean;
    createLocalStream(option?: Constraints): Promise<MediaStream>;
    destroyLocalStream(localStream: MediaStream): boolean;
    publishLocalStream(streamId: string, localStream: MediaStream, playOption?: PlayOption | {}): boolean;
    stopPublishLocalStream(streamId: string): boolean;
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
    private startScreenSharingChrome;
    private startScreenShotFirFox;
    private stopScreenShot;
    switchDevice(type: 'audio' | 'video', localStream: MediaStream, deviceId: string): Promise<void>;
    WebrtcOnPublishStateUpdateHandle(type: 0 | 1 | 2, streamId: string, error: ERRO): void;
    setCDNInfo(streamInfo: {
        urlsHttpsFlv: string;
        urlsHttpsHls: string;
        urlsFlv: string;
        urlsHls: string;
        urlsRtmp: string;
    }, streamItem: {
        urls_flv: string;
        urls_m3u8: string;
        urls_rtmp: string;
        urls_https_flv: string;
        urls_https_m3u8: string;
    }): void;
    loginBodyData(): {
        [index: string]: string | number | any[];
    };
    private screenStreamFrom;
    filterStreamList(streamId?: string): any;
    private voiceChange;
    private voiceBack;
    static detectRTC(): Promise<UsabilityDedection>;
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
    static enumDevices(deviceInfoCallback: Function, error: (err: ERRO) => void): void;
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
    bindWindowListener(): void;
    onPublishStateUpdateHandle(type: 0 | 1 | 2, streamId: string, error: ERRO): void;
}

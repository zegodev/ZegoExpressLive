import { PlayOption, ERRO } from '../common/zego.entity';
import { ZegoDataReport } from '../common/zego.datareport';
import { ZegoSignal } from '../common/zego.signal';
import { Logger } from '../common/zego.logger';
export declare class ZegoPlayWeb {
    logger: Logger;
    signal: ZegoSignal;
    state: number;
    candidateInfo: never[];
    waitICETimer: any;
    waitingICETimeInterval: number;
    waitingOfferTimer: any;
    waitingOfferTimeInterval: number;
    waitingServerTimer: any;
    waitingServerTimerInterval: number;
    qualityTimer: any;
    qualityTimeInterval: number;
    playQualityList: never[];
    maxQualityListCount: number;
    lastPlayStats: {
        audioPacketsLost: number;
        videoPacketsLost: number;
        time: number;
        audioTime: number;
        videoTime: number;
        audioBytesReceived: number;
        videoBytesReceived: number;
        framesDecoded: number;
        framesReceived: number;
        framesDropped: number;
    };
    dataReport: ZegoDataReport;
    reportSeq: number;
    videoSizeCallback: boolean;
    qualityUpload: boolean;
    qualityUploadInterval: number;
    qualityUploadLastTime: number;
    maxRetryCount: number;
    currentRetryCount: number;
    retryState: number;
    streamId: string | null;
    sessionId: number | string;
    sessionSeq: number;
    answerSeq: number;
    audioOputput: any;
    getRomoteStreamSuc: any;
    peerConnection: RTCPeerConnection | any;
    playOption: PlayOption | {};
    closeSessionSignal: boolean;
    constructor(log: Logger, signal: ZegoSignal | null, dataReport: ZegoDataReport, qualityTimeInterval: number);
    startPlay(streamId: string, success: (stream: MediaStream) => void, playOption?: PlayOption): void;
    private onCreatePlaySessionSuccess;
    onCreateOfferSuccess(desc: {
        sdp: any;
    }): void;
    private onSetLocalDescriptionSuccess;
    private onRecvMediaDesc;
    private onRecvCandidateInfo;
    private onIceCandidate;
    private onConnectionStateChange;
    private onIceConnectionStateChange;
    private checkPlayConnectionFailedState;
    private shouldRetryPlay;
    private startRetryPlay;
    private clearTryPlayTimer;
    private tryStartPlay;
    private clearPlayQualityTimer;
    private resetPlay;
    private setPlayQualityTimer;
    private getPlayStats;
    private getNetQuality;
    private uploadPlayQuality;
    private onRecvResetSession;
    private onRecvCloseSession;
    private onGotRemoteStream;
    private sendCandidateInfo;
    private shouldSendCloseSession;
    private playStateUpdateError;
    onPlayStateUpdate(type: number, streamId: string | null, error?: ERRO): void;
    onPlayQualityUpdate(streamId: string, quality: object): void;
    stopPlay(): void;
    onDisconnect(): void;
}

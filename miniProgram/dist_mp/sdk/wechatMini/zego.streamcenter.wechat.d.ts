/**
 ZegoStreamCenter
 */
import { ZegoStreamCenter } from '../common/ZegoStreamCenter';
import { LoggerWechat } from './zego.logger.wx';
import { ZegoDataReport } from '../common/zego.datareport';
import { StateCenter } from '../common/clientBase/stateCenter';
import { Logger } from '../common/zego.logger';
import { QualityStats, StreamQuality } from '../common/zego.entity';
export declare class ZegoStreamCenterWechat extends ZegoStreamCenter {
    dataReport: ZegoDataReport;
    playerList: any;
    playerCount: number;
    logger: LoggerWechat;
    playingList: any;
    publishingList: never[];
    eventSeq: number;
    streamEventMap: any;
    playerWaitingList: never[];
    playerStatistics: {};
    constructor(log: LoggerWechat | Logger, stateCenter: StateCenter);
    updatePlayingState(streamid: string, streamParams?: any, start?: boolean): void;
    updatePublishingState(streamid: string, streamParams?: string, start?: boolean): void;
    updateStreamState(streamid: string, start: boolean, streamParams: string, streamList: Array<{
        streamid: string;
        params: string;
    }>): void;
    isPlaying(): boolean;
    isPublishing(): boolean;
    startPlayingStream(streamid: string, streamUrlList: string[], dispatchType?: number): any;
    startPlayer(streamid: string, streamUrlList: string[], dispatchType: number, playerType: number): any;
    stopPlayingStream(streamid: string | undefined): void;
    stopPlayer(streamid: string | number): void;
    startPublishingStream(streamid: string, streamUrlList: string[], dispatchType?: number): any;
    stopPublishingStream(streamid: string | undefined): void;
    updatePlayerState(streamid: string, event: any): void;
    updatePlayerNetStatus(streamid: string, event: any): void;
    reset(): void;
    reportPublishEvent(streamid: string, error?: any): void;
    reportPlayEvent(streamid: string, error?: any): void;
    onPlayStateUpdate(type: number, streamid: string, error: any): void;
    onPlayQualityUpdate(streamid: any, streamQuality: any): void;
    onPublishStateUpdate(type: number, streamid: string, error: number | {
        code: string | number;
        msg: string;
    } | undefined): void;
    onPublishQualityUpdate(streamid: any, streamQuality: any): void;
    onPublisherStreamUrlUpdate(streamid: any, url: any): void;
    onPlayerStreamUrlUpdate(streamid: any, url: any): void;
    getReconnectLimit(sourceType: number): number;
    onPlayerStart(streamid: string, playerType: number): void;
    onPlayerStop(streamid: string, playerType: number, error: any): void;
    onPlayerRetry(streamid: string, playerType: number): void;
    onPlayerQuality(streamid: string, streamQuality: {
        videoBitrate: any;
        audioBitrate: any;
        videoFPS: any;
        videoHeight: any;
        videoWidth: any;
    }, playerType: number): void;
    onStreamUrlUpdate(streamid: string, url: string, playerType: number): void;
    getStats(callBack: (stats: QualityStats) => void): void;
    setStats(streamId: string, streamQuality: StreamQuality, type: 0 | 1, callBack: (stats: QualityStats) => void): void;
}

import { SocketCenter } from './socketCenter';
import { StateCenter } from './stateCenter';
import { CdnPushConfig, mixStreamConfig, ERRO } from '../zego.entity';
import { Logger } from '../zego.logger';
export declare class StreamHandler {
    private logger;
    private socketCenter;
    private stateCenter;
    constructor(logger: Logger, stateCenter: StateCenter, socketCenter: SocketCenter);
    setCDNInfo(streamInfo: {
        urlsFlv: string;
        urlsHls: string;
        urlsRtmp: string;
    }, streamItem: {
        urls_flv: string;
        urls_m3u8: string;
        urls_rtmp: string;
    }): void;
    onStreamUpdated(type: number, streamList: any[]): void;
    onStreamExtraInfoUpdated(streamList: any[]): void;
    handleStreamStart(lastRunState: number, msg: any): void;
    onPublishStateUpdate(type: number, streamId: string, error: ERRO | number): void;
    updateStreamInfo(streamid: string, cmd: string | number, stream_extra_info?: string, error?: Function): void;
    handleStreamUpdateRsp(msg: any): void;
    handleFetchStreamListRsp(msg: any): void;
    private handleFullUpdateStream;
    handlePushStreamUpdateMsg(msg: any): void;
    private handleAddedStreamList;
    private handleDeletedStreamList;
    private handleUpdatedStreamList;
    private fetchStreamList;
    makeCallbackStreamList(streamList: any[]): {
        userId: any;
        userName: any;
        extraInfo: any;
        streamId: any;
        roomId: string;
        urlsFlv: string;
        urlsRtmp: string;
        urlsHls: string;
        urlsHttpsFlv: string;
        urlsHttpsHls: string;
    }[];
    updateMixStream(mixStreamConfig: mixStreamConfig, successCallback: Function, errorCallback: (err: ERRO) => void): boolean;
    publishTarget(cdnPushConfig: CdnPushConfig, success: Function, error: Function): void;
    stopMixStream(taskid: string, successCallback: Function, errorCallback: (err: ERRO) => void): boolean;
    updateStreamExtraInfo(streamid: string, extraInfo: string): boolean;
}

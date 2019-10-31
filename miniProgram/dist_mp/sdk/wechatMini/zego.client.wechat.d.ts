import { ZegoStreamCenterWechat } from './zego.streamcenter.wechat';
import { ZegoWebSocket } from './zego.webSocket';
import { E_CLIENT_TYPE, ENUM_DISPATCH_TYPE, ENUM_PLAY_SOURCE_TYPE, PublishOption, wxQualityStats, ERRO, WxListener, wxConfig } from '../common/zego.entity';
import { BaseCenter } from '../common/clientBase/index';
export declare class ZegoClient extends BaseCenter {
    streamCenter: ZegoStreamCenterWechat;
    preferPlaySourceType: ENUM_PLAY_SOURCE_TYPE;
    preferPublishSourceType: ENUM_DISPATCH_TYPE;
    customCdnUrl: string;
    currentPlaySourceType: ENUM_DISPATCH_TYPE;
    mixStreamList: {
        [index: string]: any;
    };
    ultraPlaySourceType: string;
    constructor(appId: number, server: string, userId: string);
    config(option: wxConfig): boolean;
    protected getSocket(server: string): ZegoWebSocket;
    on<k extends keyof WxListener>(listener: k, callBack: WxListener[k]): boolean;
    off<k extends keyof WxListener>(listener: k, callBack?: WxListener[k]): boolean;
    private setPreferPlaySourceType;
    private setPreferPublishSourceType;
    getPlayerUrl(streamId: string, playOption?: {
        streamParams?: string;
        isMix?: boolean;
    }): Promise<{
        streamId: string;
        url: string;
    }>;
    stopPlayer(streamId: string): boolean;
    startPusher(streamId: string, publishOption?: PublishOption): Promise<{
        streamId: string;
        url: string;
    }>;
    stopPusher(streamId: string): Promise<void>;
    getStats(callBack: (stats: wxQualityStats) => void): void;
    updatePlayerState(streamId: string, event: any): void;
    updatePlayerNetStatus(streamId: string, event: any): void;
    private startPlayingStreamFromCDN;
    private startPlayingStreamFromBGP;
    private fetchPublishStreamUrl;
    private fetchPlayStreamUrl;
    updateStreamInfo(streamId: any, cmd: string | number, stream_extra_info?: any, error?: any): void;
    private handleStreamUpdateRsp;
    private doPlayStream;
    private handleFetchStreamPublishUrlRsp;
    private handleFetchStreamUrlRsp;
    private doPublishStream;
    protected setCDNInfo(_streamInfo: {
        urlFlv: string;
        urlHls: string;
        urlRtmp: string;
    }, _streamItem: {
        urls_flv: string;
        urls_m3u8: string;
        urls_rtmp: string;
    }): void;
    protected loginBodyData(): {
        id_name: string;
        nick_name: string;
        role: 1 | 2;
        token: string;
        version: any;
        room_name: string;
        user_state_flag: number;
        room_create_flag: number;
        client_type: E_CLIENT_TYPE;
        third_token: string;
    };
    protected WebrtcOnPublishStateUpdateHandle(_type: 0 | 1 | 2, _streamid: string, _error: ERRO): void;
    static isSupportLive(): Promise<{
        code: number;
        msg: string;
    }>;
    private onPublishStateUpdateHandle;
}

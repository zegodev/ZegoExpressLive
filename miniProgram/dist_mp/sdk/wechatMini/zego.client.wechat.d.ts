import { ZegoStreamCenterWechat } from './zego.streamcenter.wechat';
import { ZegoWebSocket } from './zego.webSocket';
import { E_CLIENT_TYPE, ENUM_DISPATCH_TYPE, ENUM_PLAY_SOURCE_TYPE, PublishOption, QualityStats, ERRO } from '../common/zego.entity';
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
    constructor(appid: number, server: string, idName: string);
    getSocket(server: string): ZegoWebSocket;
    setPreferPlaySourceType(sourceType: number): boolean;
    setPreferPublishSourceType(sourceType: 1 | 0, customUrl?: string): boolean;
    getPlayUrls(streamId: string, streamParams: string): Promise<{
        streamId: string;
        url: string;
    }>;
    stopPlay(streamid: string): boolean;
    getPublishUrls(streamid: string, publishOption?: PublishOption): Promise<{
        streamId: string;
        url: string;
    }>;
    stopPublish(streamid: string): boolean;
    getStats(callBack: (stats: QualityStats) => void): void;
    updatePlayerState(streamid: any, event: any): void;
    updatePlayerNetStatus(streamid: any, event: any): void;
    startPlayingMixStream(mixStreamId: string, stream_params: any): boolean;
    stopPlayingMixStream(mixStreamId: string): boolean;
    startPlayingStreamFromCDN(streamid: any): boolean;
    startPlayingStreamFromBGP(this: any, streamid: string): boolean;
    fetchPublishStreamUrl(streamid: string): void;
    fetchPlayStreamUrl(streamid: string, urlType: string): void;
    updateStreamInfo(streamid: any, cmd: string | number, stream_extra_info?: any, error?: any): void;
    handleStreamUpdateRsp(msg: {
        body: {
            err_code: string | number;
            stream_seq: string | number;
            stream_info: {
                stream_id: any;
            }[];
        };
    }): void;
    doPlayStream(streamid: string, streamUrls: string[], sourceType: number | undefined): boolean;
    handleFetchStreamPublishUrlRsp(msg: {
        header: {
            seq: string | number;
        };
        body: {
            err_code: number;
            stream_url_info: {
                stream_id: any;
                urls_ws: any;
            };
        };
    }): void;
    handleFetchStreamUrlRsp(msg: {
        header: {
            seq: string | number;
        };
        body: {
            err_code: number;
            stream_url_infos: any;
        };
    }): void;
    doPublishStream(streamid: string, streamUrls: string[]): boolean;
    setCDNInfo(_streamInfo: {
        urlsFlv: string;
        urlsHls: string;
        urlsRtmp: string;
    }, _streamItem: {
        urls_flv: string;
        urls_m3u8: string;
        urls_rtmp: string;
    }): void;
    loginBodyData(): {
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
    WebrtcOnPublishStateUpdateHandle(_type: 0 | 1 | 2, _streamid: string, _error: ERRO): void;
    static isSupportLive(sucCall: {
        (arg0: {
            code: number;
            msg: string;
        }): void;
        (arg0: {
            code: number;
            msg: string;
        }): void;
    }, errCall: (arg0: any) => void): void;
    onPublishStateUpdateHandle(type: 0 | 1 | 2, streamid: string, error: ERRO): void;
}

import { ERRO } from '../zego.entity';
import { SocketCenter } from './socketCenter';
import { StateCenter } from './stateCenter';
import { RoomHandler } from './roomHandler';
import { StreamHandler } from './streamHandler';
import { HeartBeatHandler } from './heartBeatHandler';
import { MessageHandler } from './messageHandler';
import { LiveHandler } from './liveHandler';
import { Logger } from '../zego.logger';
import { ZegoStreamCenter } from '../ZegoStreamCenter';
import { ZegoWebSocket } from '../../wechatMini/zego.webSocket';
export declare abstract class Common {
    logger: Logger;
    streamCenter: ZegoStreamCenter;
    socketCenter: SocketCenter;
    roomHandler: RoomHandler;
    heartBeatHandler: HeartBeatHandler;
    streamHandler: StreamHandler;
    messageHandler: MessageHandler;
    liveHandler: LiveHandler;
    stateCenter: StateCenter;
    abstract getSocket(server: string): ZegoWebSocket | WebSocket;
    abstract setCDNInfo(streamInfo: {
        urlsFlv: string;
        urlsHls: string;
        urlsRtmp: string;
    }, streamItem: {
        urls_flv: string;
        urls_m3u8: string;
        urls_rtmp: string;
    }): void;
    abstract WebrtcOnPublishStateUpdateHandle(type: 0 | 1 | 2, streamid: string, error: ERRO): void;
    abstract loginBodyData(): {
        [index: string]: string | number | any[];
    };
    resetStreamCenter(): void;
    protected handleFetchWebRtcUrlRsp(msg: any, success?: (stream: MediaStream) => void): void;
}

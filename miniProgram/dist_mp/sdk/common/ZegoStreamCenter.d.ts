import { Logger } from './zego.logger';
import { ERRO, PlayerInfo, StreamQuality } from './zego.entity';
import { StateCenter } from './clientBase/stateCenter';
export declare abstract class ZegoStreamCenter {
    playerList: {
        [index: string]: PlayerInfo;
    };
    publisherList: any;
    constructor(log: Logger, stateCenter: StateCenter);
    abstract stopPlayingStream(streamId: string): void;
    abstract reset(): void;
    abstract startPlayingStream(streamid: string, serverUrls: string[], third?: any): boolean;
    abstract startPublishingStream(streamid: string, serverUrls: string[], preferPublishSourceType?: number): boolean;
    abstract onPlayStateUpdate(type: 0 | 1 | 2, streamid: string, error: ERRO): void;
    abstract onPlayQualityUpdate(streamId: string, streamQuality: StreamQuality): void;
    abstract onPublishStateUpdate(type: 0 | 1 | 2, streamid: string, error: ERRO): void;
    abstract onPublishQualityUpdate(streamId: string, streamQuality: StreamQuality): void;
    abstract onPlayerStreamUrlUpdate(streamid: string, url: string, type: string): void;
    setSessionInfo(appid: number, userid: string, token: string, testEnvironment: boolean): void;
}

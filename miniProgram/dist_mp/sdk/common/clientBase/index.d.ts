import { Common } from './common';
import { Config, ERRO, StreamInfo, CdnPushConfig, mixStreamConfig } from '../zego.entity';
export declare abstract class BaseCenter extends Common {
    constructor();
    init(): void;
    bindSocketHandler(): void;
    bindStreamHandler(): void;
    bindHeatBeatHandler(): void;
    bindRoomHandler(): void;
    bindMessageHandler(): void;
    bindLiveHandler(): void;
    bindStreamCenterHandler(): void;
    /*********
     *
     * 下面的方法微信和web端实现一样，共用
     *
     *
     * ****/
    config(option: Config): boolean;
    login(roomId: string, token: string, param?: {
        authToken: string;
    }): Promise<StreamInfo[]>;
    logout(): boolean;
    setUserStateUpdate(update: boolean): void;
    sendCustomCommand(dstMembers: string[], customContent: string | Record<string, any>, success: (seq: number, customContent: string) => void, error: (err: ERRO, seq: number, customContent: string) => void): boolean;
    sendRoomMsg(msgCategory: 1 | 2, msgContent: string): Promise<{
        seq: number;
        msgId: string;
        msgCategory: number;
        msgType: number;
        msgContent: string;
    }>;
    sendReliableMessage(type: string, data: string, success: (seq: number) => void, error: (err: ERRO, seq: number) => void): void;
    sendBigRoomMessage(category: 1 | 2, type: 1 | 2 | 3, content: string, success: (seq: number, messageId: string) => void, error: (err: ERRO, seq: number) => void): void;
    sendRelayMessage(type: string, data: string, success: (seq: number) => void, error: (err: ERRO, seq: number) => void): void;
    requestJoinLive(destIdName: string, success: (seq: number) => void, error: (err: ERRO, seq: number) => void, resultCallback: (result: boolean, fromUserId: string, fromUserName: string) => void): boolean;
    inviteJoinLive(destIdName: string, success: (seq: number) => void, error: (err: ERRO, seq: number) => void, resultCallback: (result: boolean, fromUserId: string, fromUserName: string) => void): boolean;
    endJoinLive(destIdName: string, success: (seq: number) => void, error: (err: ERRO, seq: number) => void): boolean;
    respondJoinLive(requestId: string, respondResult: boolean, success?: (seq: number) => void, error?: (err: ERRO, seq: number) => void): boolean;
    startMixStream(mixStreamConfig: mixStreamConfig): Promise<Array<{
        streamId?: string;
        rtmpUrl: Array<string> | string | null;
        hlsUrl: Array<string> | string | null;
        flvUrl: Array<string> | string | null;
    }>>;
    stopMixStream(taskId: string): Promise<void>;
    publishTarget(cdnPushConfig: CdnPushConfig, success: Function, error: Function): void;
    updateStreamExtraInfo(streamid: string, extraInfo: string): boolean;
    on(listener: string, callBack: Function): void;
    actionListener(listener: string, ...args: Array<any>): void;
    static getCurrentVersion(): string;
}

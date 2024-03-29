import { SocketCenter } from './socketCenter';
import { StateCenter } from './stateCenter';
import { ChatInfo, ERRO, MessageInfo } from '../zego.entity';
import { Logger } from '../zego.logger';
export declare class MessageHandler {
    private logger;
    private socketCenter;
    private stateCenter;
    constructor(logger: Logger, stateCenter: StateCenter, socketCenter: SocketCenter);
    sendCustomCommand(dstMembers: string[], customContent: string | Record<string, any>, success: (seq: number, customContent: string) => void, error: (err: ERRO, seq: number, customContent: string) => void): boolean;
    private handleSendCustomMsgRsp;
    handlePushCustomMsg(msg: {
        body: {
            custommsg: string;
        };
    }): void;
    onRecvCustomCommand(from_userid: string, from_idname: string, custom_content: string): void;
    sendRoomMsg(msg_category: 1 | 2, msg_content: string, success: Function, error: Function): void;
    handleSendRoomMsgRsp(msg: {
        header: {
            seq: string;
        };
        body: {
            err_code: number;
            msg_id: any;
        };
    }): void;
    onRecvRoomMsg(chat_data: ChatInfo[], server_msg_id: number, ret_msg_id: number): void;
    sendReliableMessage(type: string, data: string, success: (seq: number) => void, error: (err: ERRO, seq: number) => void): void;
    sendBigRoomMessage(category: 1 | 2, type: 1 | 2 | 3, content: string, success?: ((seq: number, messageId: string) => void) | null, error?: ((err: ERRO, seq: number) => void) | null): void;
    handlePushMergeMsg(msg: any): void;
    handlePushBigRooMsg(bodyString: string): void;
    onRecvBigRoomMessage(messageList: MessageInfo[], roomId: string): void;
    sendBigRoomMessageInternal(msgs: any, success: any, error: any): void;
    handleBigImMsgRsp(msg: any): void;
    setBigImTimer(offset: number, timeWindow: number): void;
    onBigImTimer(): void;
    sendRelayMessage(type: string, data: string, success: (seq: number) => void, error: (err: ERRO, seq: number) => void): void;
    sendRelayMessageInternal(type: string, data: string, success: Function | null | undefined, error: Function | null | undefined): void;
    setRelayTimer(offset: number, timeWindow: number): void;
    onRelayTimer(): void;
    handlePushTransMsg(msg: {
        body: {
            trans_type: any;
            trans_seq: any;
            trans_user_idname: string;
            trans_data: string;
        };
    }): void;
    onRecvReliableMessage(type: string, seq: number, data: string): void;
}

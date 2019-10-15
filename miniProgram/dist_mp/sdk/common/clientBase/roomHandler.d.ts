import { ENUM_RUN_STATE, ERRO, StreamInfo, UserInfo } from '../zego.entity';
import { SocketCenter } from './socketCenter';
import { StateCenter } from './stateCenter';
import { Logger } from '../zego.logger';
export declare class RoomHandler {
    private socketCenter;
    private logger;
    private stateCenter;
    constructor(logger: Logger, stateCenter: StateCenter, socketCenter: SocketCenter);
    setRunState(newRunState: ENUM_RUN_STATE): void;
    private resetTryLogin;
    private resetBigRoomInfo;
    resetRoom(roomid?: string): void;
    resetRoomCallBack(): void;
    onDisconnect(err: ERRO): void;
    loginSuccessCallBack(lastRunState: number, msg: any): void;
    onGetTotalUserList(roomId: string, userList: any[]): void;
    login(roomid: string, token: string, authToken: string, success: (list: StreamInfo[]) => void, error: (err: ERRO) => void): void;
    loginBodyData(): void;
    private tryLogin;
    private handleLoginRsp;
    private handleLoginFail;
    private handleLoginSuccess;
    private openHandler;
    private closeHandler;
    logout(): boolean;
    setUserStateUpdate(update: boolean): boolean;
    fetchUserList(): void;
    private fetchUserListWithPageV2;
    private fetchUserListWithPage;
    private handleFetchUserListRspV2;
    private handleFetchUserListRsp;
    private handleLogoutRsp;
    handlePushUserStateUpdateMsg(msg: {
        body: {
            user_actions: any;
            user_list_seq: number;
            room_id: string;
        };
    }): void;
    onUserStateUpdate(roomId: string, userList: UserInfo[]): void;
}

import { ZegoSignal } from './zego.signal';
import { ZegoPlayWeb } from '../webrtc/zego.play.web';
import { ZegoVideoDecodeType } from '../../types/index';
export declare const PROTO_VERSION: any;
export declare const ROOMVERSION: any;
export declare enum ENUM_LOG_LEVEL {
    debug = 0,
    info = 1,
    warn = 2,
    error = 3,
    report = 99,
    disable = 100
}
export declare enum ENUM_REMOTE_TYPE {
    disable = 0,
    websocket = 1,
    https = 2
}
export interface webConfig {
    nickName?: string;
    logLevel?: ENUM_LOG_LEVEL;
    logUrl?: string;
    remoteLogLevel?: ENUM_LOG_LEVEL;
}
export interface wxConfig {
    nickName?: string;
    logLevel?: ENUM_LOG_LEVEL;
    logUrl?: string;
    remoteLogLevel?: ENUM_LOG_LEVEL;
    pushSourceType?: 0 | 1;
    playSourceType?: 0 | 1;
}
export interface UsabilityDetection {
    webRtc: boolean;
    capture: boolean;
    videoDecodeType: {
        H264: boolean;
        H265: boolean;
        VP8: boolean;
        VP9: boolean;
    };
    screenSharing: boolean;
}
export declare const sdkErrorList: {
    CLIENT: string;
    SERVER: string;
    SUCCESS: {
        code: string;
        msg: string;
    };
    PARAM: {
        code: string;
        msg: string;
    };
    HEARTBEAT_TIMEOUT: {
        code: string;
        msg: string;
    };
    LOGIN_TIMEOUT: {
        code: string;
        msg: string;
    };
    SEND_MSG_TIMEOUT: {
        code: string;
        msg: string;
    };
    RESET_QUEUE: {
        code: string;
        msg: string;
    };
    LOGIN_DISCONNECT: {
        code: string;
        msg: string;
    };
    KICK_OUT: {
        code: string;
        msg: string;
    };
    UNKNOWN: {
        code: string;
        msg: string;
    };
    FREQ_LIMITED: {
        code: string;
        msg: string;
    };
};
export interface DataStatisticsItemEvent {
    event: string;
    abs_time: number;
    time_consumed?: number;
    msg_ext?: {
        [index: string]: string | number;
    };
}
export interface DataStatisticsItem {
    abs_time: number;
    time_consumed: number;
    error: number;
    events: DataStatisticsItemEvent[];
    msg_ext?: any;
    itemtype?: string;
}
export interface DataStatistics {
    [index: string]: DataStatisticsItem;
}
export declare enum ENUM_SIGNAL_STATE {
    disconnected = 0,
    connecting = 1,
    connected = 2
}
export declare const ENUM_RESOLUTION_TYPE: {
    LOW: {
        width: number;
        height: number;
        frameRate: number;
        bitRate: number;
    };
    MEDIUM: {
        width: number;
        height: number;
        frameRate: number;
        bitRate: number;
    };
    HIGH: {
        width: number;
        height: number;
        frameRate: number;
        bitRate: number;
    };
};
export declare const ENUM_SCREEM_RESOLUTION_TYPE: {
    LOW: {
        width: number;
        height: number;
        frameRate: number;
        bitRate: number;
    };
    MEDIUM: {
        width: number;
        height: number;
        frameRate: number;
        bitRate: number;
    };
    HIGH: {
        width: number;
        height: number;
        frameRate: number;
        bitRate: number;
    };
};
export declare const ENUM_RETRY_STATE: {
    didNotStart: number;
    retrying: number;
    finished: number;
};
export declare const ENUM_PUBLISH_STATE: {
    start: number;
    waitingSessionRsp: number;
    waitingOffserRsp: number;
    waitingServerAnswer: number;
    waitingServerICE: number;
    connecting: number;
    publishing: number;
    stop: number;
    didNotStart: number;
};
export declare const ENUM_PLAY_STATE: {
    start: number;
    waitingSessionRsp: number;
    waitingOffserRsp: number;
    waitingServerAnswer: number;
    waitingServerICE: number;
    connecting: number;
    playing: number;
    stop: number;
    didNotStart: number;
};
export interface VideoInfo {
    width: number;
    height: number;
    frameRate: number;
    bitRate: number;
}
export declare const ENUM_CONNECT_STATE: {
    disconnect: number;
    connecting: number;
    connected: number;
};
export declare const MAX_TRY_CONNECT_COUNT = 3;
export declare const SEND_MSG_RESET = 2;
export declare const SEND_MSG_TIMEOUT = 1;
export declare const MAX_TRY_HEARTBEAT_COUNT = 5;
export declare const ENUM_PUBLISH_STREAM_STATE: {
    waiting_url: number;
    tryPublish: number;
    update_info: number;
    publishing: number;
    stop: number;
};
export declare const ENUM_STREAM_SUB_CMD: {
    liveNone: number;
    liveBegin: number;
    liveEnd: number;
    liveUpdate: number;
};
export declare const ENUM_STREAM_UPDATE_TYPE: {
    added: number;
    deleted: number;
};
export declare enum ENUM_RUN_STATE {
    logout = 0,
    trylogin = 1,
    login = 2
}
export declare const ENUM_PUBLISH_STATE_UPDATE: {
    start: number;
    error: number;
    retry: number;
};
export declare const ENUM_PLAY_STATE_UPDATE: {
    start: number;
    error: number;
    retry: number;
};
export interface StreamQuality {
    videoBitrate: number;
    videoFramesDecoded?: number;
    videoFramesDropped?: number;
    videoPacketsLostRate?: number;
    videoQuality?: number;
    videoWidth?: number;
    videoHeight?: number;
    audioBitrate: number;
    audioJitter?: number;
    audioLevel?: number;
    audioPacketsLost?: number;
    audioPacketsLostRate?: number;
    audioQuality?: number;
    audioSamplingRate?: number;
    audioSendLevel?: number;
    playData?: number;
    videoFPS: number;
    frameHeight: number;
    frameWidth: number;
    videoTransferFPS: number;
    audioCodeType: string;
    nackCount: number;
    pliCount: number;
    totalRoundTripTime: number;
    currentRoundTripTime: number;
}
export interface StreamInfo {
    streamId: string;
    userId: string;
    userName: string;
    extraInfo: string;
    urlsFlv: string | null;
    urlsRtmp: string | null;
    urlsHls: string | null;
    urlsHttpsFlv: string | null;
    urlsHttpsHls: string | null;
}
export interface ERRO {
    code: string | number;
    msg: string;
}
export declare const MAX_TRY_LOGIN_COUNT = 5;
export declare const TRY_LOGIN_INTERVAL: number[];
export declare const MINIUM_HEARTBEAT_INTERVAL = 3000;
export declare const ENUM_STREAM_UPDATE_CMD: {
    added: number;
    deleted: number;
    updated: number;
};
export declare const SERVER_ERROR_CODE = 10000;
export declare const MIXSTREAM_ERROR_CODE = 10000;
export interface WaitingInfo {
    streamId: string;
    success: Function;
    error: Function;
}
export interface SignalInfo {
    signal: ZegoSignal;
    state: number;
    publishWaitingList: WaitingInfo[];
    playWaitingList: WaitingInfo[];
    publishConnectedList: string[];
    playConnectedList: string[];
    tokenInfo: any;
}
export interface PlayerInfo {
    player: ZegoPlayWeb;
    signal: ZegoSignal | null;
    serverUrls: string[];
    retryCount: number;
    playOption: PlayOption;
}
export declare enum QUALITYLEVEL {
    low = 1,
    stantard = 2,
    hight = 3,
    custome = 4
}
export interface MediaStreamConstraints {
    audio?: boolean;
    audioInput?: string;
    video?: boolean;
    facingMode?: string;
    videoInput?: string;
    videoQuality?: QUALITYLEVEL;
    horizontal?: boolean;
    externalCapture?: boolean;
    height?: number;
    frameRate?: number;
    width?: number;
    bitRate?: number;
    audioBitRate?: number;
    externalMediaStream?: MediaStream;
    noiseSuppression?: boolean;
    autoGainControl?: boolean;
    echoCancellation?: boolean;
    mediaSource?: 'screen' | 'application' | 'window';
    screen?: boolean;
    source?: HTMLElement | MediaStream;
}
export interface Constraints {
    camera?: {
        audio?: boolean;
        audioInput?: string;
        video?: boolean;
        height?: number;
        frameRate?: number;
        width?: number;
        bitRate?: number;
        audioBitRate?: number;
        facingMode?: string;
        videoInput?: string;
        videoQuality?: QUALITYLEVEL;
        horizontal?: boolean;
        noiseSuppression?: boolean;
        autoGainControl?: boolean;
        echoCancellation?: boolean;
    } | MediaStreamConstraints;
    screen?: {
        audio?: boolean;
        videoQuality?: 1 | 2 | 3 | 4;
        width?: number;
        height?: number;
        bitRate?: number;
        frameRate?: number;
    } | MediaStreamConstraints | boolean;
    external?: {
        source: HTMLMediaElement | MediaStream;
        bitRate?: number;
    } | MediaStreamConstraints;
}
export interface ScreenConfig {
    audio?: boolean;
    width?: number;
    height?: number;
    frameRate?: number;
    bitRate?: number;
}
export interface DeviceInfo {
    label: string;
    deviceId: string;
}
export declare const ENUM_SIGNAL_SUB_CMD: {
    none: number;
    joinLiveRequest: number;
    joinLiveResult: number;
    joinLiveInvite: number;
    joinLiveStop: number;
};
export declare const ENUM_PUSH_SIGNAL_SUB_CMD: {
    none: number;
    pushJoinLiveRequest: number;
    pushJoinLiveResult: number;
    pushJoinLiveInvite: number;
    pushJoinLiveStop: number;
};
export interface ChatInfo {
    id_name: string;
    nick_name: string;
    role: number;
    msg_id: string;
    msg_category: number;
    msg_type: number;
    msg_content: string;
    send_time: number;
}
export interface UserInfo {
    action: 1 | 2;
    idName: string;
    nickName: string;
    loginTime: string;
}
export interface MessageInfo {
    idName: string;
    nickName: string;
    messageId: string;
    category: number;
    type: number;
    content: string;
    time: number;
}
export interface AudioMixConfig {
    loop?: boolean;
    playTime?: number;
    replace?: boolean;
    streamId: string;
    effectId: number;
}
export interface CdnPushConfig {
    type: 'addpush' | 'delpush' | 'clearpush';
    streamId: string;
    pushUrl: string;
}
export interface webQualityStats {
    video: {
        videoBitrate: number;
        videoFPS: number;
        videoTransferFPS?: number;
        frameHeight?: number;
        frameWidth?: number;
    };
    audio: {
        audioBitrate: number;
        audioCodeType?: string;
        audioJitter?: number;
        audioLevel?: number;
        audioPacketsLost?: number;
        audioPacketsLostRate?: number;
        audioQuality?: number;
    };
    streamId: string;
    type: 1 | 0;
    roomId?: string;
    nackCount?: number;
    pliCount?: number;
    totalRoundTripTime?: number;
}
export interface wxQualityStats {
    video: {
        videoBitrate: number;
        videoFPS: number;
        videoHeight?: number;
        videoWidth?: number;
    };
    audio: {
        audioBitrate: number;
    };
    streamId: string;
    type: 0 | 1;
    roomId: '';
}
export interface MixStreamConfig {
    taskId: string;
    inputList: Array<{
        streamId: string;
        layout: {
            top: number;
            left: number;
            bottom: number;
            right: number;
        };
    }>;
    outputList: Array<{
        streamId?: string;
        outputUrl?: string;
        outputBitrate?: number;
        outputFps?: number;
        outputWidth?: number;
        outputHeight?: number;
        outputAudioConfig?: number;
        outputAudioBitrate?: number;
        outputAudioChannels?: number;
    }>;
    advance?: MixStreamAdvance;
}
export interface MixStreamAdvance {
    userData?: string;
    outputBgColor?: number;
    outputBgImage?: string;
    videoCodec?: 'vp8' | 'h264';
    waterMark?: {
        image: string;
        layout: {
            top: number;
            bottom: number;
            left: number;
            right: number;
        };
    };
    extraParams?: Array<{
        key: string;
        value: string;
    }>;
}
export interface WebListener {
    userStateUpdate: (roomId: string, userList: UserInfo[]) => void;
    totalUserList: (roomId: string, userList: {
        userId: string;
        userName: string;
    }[]) => void;
    updateOnlineCount: (roomId: string, userCount: number) => void;
    recvCustomCommand: (fromUserId: string, fromIdName: string, customContent: string) => void;
    recvRoomMsg: (chatData: Array<{
        userId: string;
        userName: string;
        msgId: number;
        type: number;
        content: string;
        sendTime: number;
    }>) => void;
    remoteStreamUpdated: (type: 0 | 1, streamList: StreamInfo[]) => void;
    streamExtraInfoUpdated: (streamList: {
        streamId: string;
        userId: string;
        userName: string;
        extraInfo: string;
    }[]) => void;
    pullStateChange: (result: {
        type: 0 | 1 | 2;
        streamId: string;
        error: ERRO;
    }) => void;
    publishStateChange: (result: {
        type: 0 | 1 | 2;
        streamId: string;
        error: ERRO;
    }) => void;
    roomStateUpdate: (state: 'KICKOUT' | 'DISCONNECT' | 'RECONNECT', error: ERRO) => void;
    screenSharingEnded: () => void;
}
export interface WxListener {
    userStateUpdate: (roomId: string, userList: UserInfo[]) => void;
    totalUserList: (roomId: string, userList: {
        userId: string;
        userName: string;
    }[]) => void;
    updateOnlineCount: (roomId: string, userCount: number) => void;
    recvCustomCommand: (fromUserId: string, fromIdName: string, customContent: string) => void;
    recvRoomMsg: (chatData: Array<{
        userId: string;
        userName: string;
        msgId: number;
        type: number;
        content: string;
        sendTime: number;
    }>) => void;
    remoteStreamUpdated: (type: 0 | 1, streamList: StreamInfo[]) => void;
    streamExtraInfoUpdated: (streamList: {
        streamId: string;
        userId: string;
        userName: string;
        extraInfo: string;
    }[]) => void;
    pullStateChange: (result: {
        type: 0 | 1 | 2;
        streamId: string;
        error: ERRO;
    }) => void;
    publishStateChange: (result: {
        type: 0 | 1 | 2;
        streamId: string;
        error: ERRO;
    }) => void;
    roomStateUpdate: (state: 'KICKOUT' | 'DISCONNECT' | 'RECONNECT', error: ERRO) => void;
}
export declare enum ENUM_PLAY_SOURCE_TYPE {
    auto = 0,
    ultra = 1
}
export declare enum ENUM_DISPATCH_TYPE {
    cdn = 0,
    ultra = 1,
    customUrl = 2
}
export declare type PublishOption = {
    streamParams?: string;
    extraInfo?: string;
    audioBitRate?: number;
    cdnUrl?: string;
    videoDecodeType?: ZegoVideoDecodeType;
};
export declare type PlayOption = {
    video?: boolean;
    audio?: boolean;
    streamParams?: string;
    videoDecodeType?: ZegoVideoDecodeType;
};
export declare enum E_CLIENT_TYPE {
    ClientType_None = 0,
    ClientType_H5 = 1,
    ClientType_SmallPragram = 2,
    ClientType_Webrtc = 3
}
export declare class ListNode {
    _id: number | null;
    _data: any;
    next: ListNode | null;
    prev: ListNode | null;
    constructor(id?: number | null, data?: any);
    id: number | null;
    data: any;
    hasNext(): number | null;
    hasPrev(): number | null;
}
export declare class LinkedList {
    start: ListNode;
    end: ListNode;
    _idCounter: number;
    _numNodes: number;
    constructor();
    /**
     *   Inserts a node before another node in the linked list
     *   @param {Node} toInsertBefore
     *   @param {Node} node
     */
    insertBefore(toInsertBefore: ListNode, data: any): ListNode;
    /**
     *   Adds data wrapped in a Node object to the end of the linked list
     *   @param {object} data
     */
    addLast(data: any): ListNode;
    /**
     *   Alias for addLast
     *   @param {object} data
     */
    add(data: any): ListNode;
    /**
     *   Gets and returns the first node in the linked list or null
     *   @return {Node/null}
     */
    getFirst(): ListNode | null;
    /**
     *   Gets and returns the last node in the linked list or null
     *   @return {Node/null}
     */
    getLast(): ListNode | null;
    /**
     *   Gets and returns the size of the linked list
     *   @return {number}
     */
    size(): number;
    /**
     *   (Internal) Gets and returns the node at the specified index starting from the first in the linked list
     *   Use getAt instead of this function
     *   @param {number} index
     */
    getFromFirst(index: number): ListNode;
    /**
     *   Gets and returns the Node at the specified index in the linked list
     *   @param {number} index
     */
    get(index: number): ListNode | null;
    /**
     *   Removes and returns node from the linked list by rearranging pointers
     *   @param {Node} node
     *   @return {Node}
     */
    remove(node: ListNode): ListNode;
    /**
     *   Removes and returns the first node in the linked list if it exists, otherwise returns null
     *   @return {Node/null}
     */
    removeFirst(): ListNode | null;
    /**
     *   Removes and returns the last node in the linked list if it exists, otherwise returns null
     *   @return {Node/null}
     */
    removeLast(): ListNode | null;
    /**
     *   Removes all nodes from the list
     */
    removeAll(): void;
    /**
     *    Iterates the list calling the given fn for each node
     *    @param {function} fn
     */
    each(iterator: any): void;
    find(iterator: Function): ListNode | null;
    map(iterator: Function): ListNode[];
    /**
     *    Alias for addLast
     *    @param {object} data
     */
    push(data: any): ListNode;
    /**
     *    Performs insertBefore on the first node
     *    @param {object} data
     */
    unshift(data: any): void;
    /**
     *    Alias for removeLast
     */
    pop(): ListNode | null;
    /**
     *    Alias for removeFirst()
     */
    shift(): ListNode | null;
}

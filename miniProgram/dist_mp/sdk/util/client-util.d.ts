import { ERRO } from '../common/zego.entity';
import { Logger } from '../common/zego.logger';
export declare class ClientUtil {
    static checkConfigParam(appid: number, server: string, idName: string, logger: Logger): boolean;
    static registerCallback(fName: string, option: {
        success?: Function;
        error?: Function;
    }, callbackList: {
        [index: string]: Function;
    }): void;
    static actionErrorCallback(fName: string, callbackList: {
        [index: string]: Function;
    }): Function;
    static actionSuccessCallback(fName: string, callbackList: {
        [index: string]: Function;
    }): Function;
    /**
         错误管理
         */
    static getServerError(code: string | number): {
        code: string;
        msg: string;
    } | {
        code: number;
        msg: string;
    };
    static isKeepTryLogin(code: number): boolean;
    static mergeStreamList(logger: Logger, idName: string, oldStreamList: any[], newStreamList: any[], callbackResult: {
        (addStreamList: any[], delStreamList: any[], updateStreamList: any[]): void;
        (arg0: any[], arg1: any[], arg2: any[]): void;
    }): void;
    static checkCustomCommandParam(param: {
        dest_id_name: string[];
        custom_msg: string;
    }): boolean;
    static generateRandumNumber(maxNum: number): number;
    static uuid(len?: number, radix?: number): string;
    static supportDetection(screenShotReady: boolean, success: Function, error: (err: ERRO) => void): Promise<void>;
    static compareVersion(v1: string[] | string, v2: string | string[]): 0 | 1 | -1;
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
    static supportVideoCodeType(sucCall: {
        (videoDecodeType: any): void;
        (arg0: {
            H264: boolean;
            VP8: boolean;
            VP9: boolean;
            H265: boolean;
        }): void;
    }, errCall: {
        (err: any): void;
        (arg0: any): void;
        (arg0: boolean): void;
    }): void;
    static inlineWorker(func: Function): Worker | null;
    static getBrowser(): string;
}

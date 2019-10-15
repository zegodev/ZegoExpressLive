import { ZegoVideoDecodeType } from '../../types';
export declare class SdpUtil {
    static zegoSdp(sdp: string): string;
    static getSDPByVideDecodeType(sdp: string, type: ZegoVideoDecodeType): string;
}

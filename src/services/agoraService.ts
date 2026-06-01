
import AgoraRTC from "agora-rtc-sdk-ng";

const joinAgora = async (
    appId: string,
    token: string,
    channelName: string,
    uid: string | number
) => {

    const client =
        AgoraRTC.createClient({
            mode: "rtc",
            codec: "vp8"
        });

    await client.join(
        appId,
        channelName,
        token,
        uid
    );

    return client;
};


export {
    joinAgora
};

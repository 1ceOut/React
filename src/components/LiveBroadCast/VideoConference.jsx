import { AudioTrack, useTracks, VideoTrack } from "@livekit/components-react";
import { Track } from "livekit-client";
import Subtitle from "./Subtitle.jsx";

// eslint-disable-next-line react/prop-types
const VideoConference = ({ publisherName, style }) => {
    const trackRefs = useTracks([
        Track.Source.Camera]);

    const screenRefs = useTracks([ Track.Source.ScreenShare])

    const audioRef = useTracks([Track.Source.Microphone]);

    const mainCamTrackRef = trackRefs.find((trackRef) => trackRef.participant.name.startsWith("방장"));
    const mainAudioTrackRef = audioRef.find((trackRef) => trackRef.participant.name.startsWith("방장"));
    const screenShareTrackRef = screenRefs.find((trackRef) => trackRef.participant.name.startsWith("방장")); // 화면 공유 트랙 찾기

    return (
        <div style={{ ...style, position: 'relative' }}>
            {screenShareTrackRef ? ( // 화면 공유가 있을 경우
                <>
                    <VideoTrack
                        trackRef={screenShareTrackRef}
                        style={{ width: '100%', height: '100%' }}
                    />
                    <AudioTrack trackRef={mainAudioTrackRef} />
                    <div style={{
                        position: 'absolute',
                        bottom: '10px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        color: 'white',
                        padding: '5px 10px',
                        borderRadius: '5px',
                        maxWidth: '80%',
                        textAlign: 'center'
                    }}>
                        <Subtitle publisher={publisherName} />
                    </div>
                </>
            ) : mainCamTrackRef ? ( // 화면 공유가 없고 카메라가 있을 경우
                <>
                    <VideoTrack
                        trackRef={mainCamTrackRef}
                        style={{ width: '100%', height: '100%', transform: 'scaleX(-1)' }} // 좌우 반전
                    />
                    <AudioTrack trackRef={mainAudioTrackRef} />
                    <div style={{
                        position: 'absolute',
                        bottom: '10px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        color: 'white',
                        padding: '5px 10px',
                        borderRadius: '5px',
                        maxWidth: '80%',
                        textAlign: 'center'
                    }}>
                        <Subtitle publisher={publisherName} />
                    </div>
                </>
            ) : (
                <div style={style} className={"text-center"}>
                    <h1>방송이 종료되었습니다.</h1>
                    <p>잠시 후 다시 시도해 주세요.</p>
                </div>
            )}
        </div>
    );
}

export default VideoConference;

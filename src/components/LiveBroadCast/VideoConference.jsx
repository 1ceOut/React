import { useTracks, VideoTrack} from "@livekit/components-react";
import {Track} from "livekit-client";
import Subtitle from "./Subtitle.jsx";

// eslint-disable-next-line react/prop-types
const VideoConference = ({ publisherName, style }) => {

    const trackRefs = useTracks([
        { source: Track.Source.Camera, withPlaceholder: true },
        { source: Track.Source.Microphone, withPlaceholder: true },
        { source: Track.Source.ScreenShare, withPlaceholder: true },
        { source: Track.Source.ScreenShareAudio, withPlaceholder: true },
    ]);

    const mainCamTrackRef = trackRefs.find((trackRef) => trackRef.participant.name === publisherName);

    return (
        <div style={{ ...style, position: 'relative' }}>
            {mainCamTrackRef ? (
                <>
                    <VideoTrack
                        trackRef={mainCamTrackRef}
                        style={{ width: '100%', height: '100%' }}
                    />
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
                        <Subtitle publisher={publisherName}/>
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
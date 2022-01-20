import React, { useState } from 'react'
import ReactPlayer from 'react-player'
import AWS from "aws-sdk";
import { STREAM_NAME, ACCESS_KEY_ID, SECRET_ACCESS_KEY, REGION } from '../constants/kinesisConstants'




export default function Videopalyer() {

    const [hlsUrl, sethlsUrl] = useState(null);


    var streamName = STREAM_NAME;
    // Step 1: Configure SDK Clients
    var options = {
        accessKeyId: ACCESS_KEY_ID,
        secretAccessKey: SECRET_ACCESS_KEY,
        region: REGION
    }
    var kinesisVideo = new AWS.KinesisVideo(options);
    var kinesisVideoArchivedContent = new AWS.KinesisVideoArchivedMedia(options);

    // Step 2: Get a data endpoint for the stream
    kinesisVideo.getDataEndpoint({
        StreamName: streamName,
        APIName: "GET_HLS_STREAMING_SESSION_URL"
    }, function (err, response) {
        if (err) { return console.error(err); }
        console.log('Data endpoint: ' + response.DataEndpoint);
        kinesisVideoArchivedContent.endpoint = new AWS.Endpoint(response.DataEndpoint);

        // Step 3: Get an HLS Streaming Session URL
        console.log('Fetching HLS Streaming Session URL');
        var playbackMode = 'LIVE'; // 'LIVE' or 'ON_DEMAND'
        //var startTimestamp = new Date('START_TIMESTAMP'); // For ON_DEMAND only
        //var endTimestamp = new Date('END_TIMESTAMP'); // For ON_DEMAND only
        var fragmentSelectorType = 'SERVER_TIMESTAMP'; // 'SERVER_TIMESTAMP' or 'PRODUCER_TIMESTAMP'
        const SESSION_EXPIRATION_SECONDS = 60 * 60
        console.log("kinesisVideo=>", kinesisVideo);
        const protocol = 'DSH';

        let hlsUrl = '';
        if (protocol === 'DASH') {
            hlsUrl = kinesisVideoArchivedContent.getDASHStreamingSessionURL({
                StreamName: streamName,
                PlaybackMode: playbackMode,
                HLSFragmentSelector: {
                    FragmentSelectorType: fragmentSelectorType,
                    TimestampRange: playbackMode === 'LIVE' ? undefined : {
                        //            StartTimestamp: startTimestamp,
                        //            EndTimestamp: endTimestamp
                    }
                },
                Expires: parseInt(SESSION_EXPIRATION_SECONDS)
            }, function (err, response) {
                if (err) { return console.error("Darn", err); }
                console.log('HLS Streaming Session URL: ' + response.HLSStreamingSessionURL, response);
            }
            )
        }
        else {
            hlsUrl = kinesisVideoArchivedContent.getHLSStreamingSessionURL({
                StreamName: streamName,
                PlaybackMode: playbackMode,
                HLSFragmentSelector: {
                    FragmentSelectorType: fragmentSelectorType,
                    TimestampRange: playbackMode === 'LIVE' ? undefined : {
                        //            StartTimestamp: startTimestamp,
                        //            EndTimestamp: endTimestamp
                    }
                },
                Expires: parseInt(SESSION_EXPIRATION_SECONDS)
            }, function (err, response) {
                if (err) { return console.error("Darn", err); }
                console.log('HLS Streaming Session URL: ' + response.HLSStreamingSessionURL, response);
                sethlsUrl(response.HLSStreamingSessionURL);
            }
            )
        }

    });
    console.log("hlsUrl", hlsUrl)
    return (
        < ReactPlayer url={hlsUrl} />
        // <ReactPlayer
        //     url='https://www.youtube.com/watch?v=ysz5S6PUM-U'
        // />
    );
}

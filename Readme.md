`mkdir hls`


`node server.js`

`cd hls`

`python3 -m http.server 8080`

`ffmpeg -i rtmp://localhost/live/test -c copy -f hls test.m3u8`

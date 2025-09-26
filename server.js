const NodeMediaServer = require('node-media-server');
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 8000;

app.use(cors());
app.use('/hls', express.static(path.join(__dirname, 'hls')));

app.listen(PORT, () => {
  console.log(`HTTP server running at http://localhost:${PORT}`);
});

const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60
  },
  trans: {
    ffmpeg: '/usr/bin/ffmpeg',
    tasks: [
      {
        app: 'live',
        vc: 'libx264',
        ac: 'aac',
        hls: true,
        hlsPath: path.join(__dirname, 'hls'),
        hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
        dash: false
      }
    ]
  },
};

const nms = new NodeMediaServer(config);
nms.run();

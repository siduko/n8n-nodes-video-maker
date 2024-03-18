"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoMaker = void 0;
const editly_1 = require("./libs/editly");
const VideoMaker_node_options_1 = require("./VideoMaker.node.options");
class VideoMaker {
    constructor() {
        this.description = VideoMaker_node_options_1.nodeDescription;
    }
    async execute() {
        const items = this.getInputData();
        const movieWidth = this.getNodeParameter('width', 0);
        const movieHeight = this.getNodeParameter('height', 0);
        const returnData = [];
        for (let i = 0; i < items.length; i++) {
            const newItem = {
                json: {},
                binary: {},
                pairedItem: {
                    item: i,
                },
            };
            const editly = await (0, editly_1.getEditly)();
            await editly({
                enableFfmpegLog: true,
                outPath: '/home/node/data/audio2.mp4',
                width: movieWidth, height: movieHeight,
                defaults: {
                    layer: { fontPath: '/home/node/data/PatuaOne-Regular.ttf' },
                },
                clips: [
                    { duration: 15, layers: { type: 'title-background', text: 'Audio track' } },
                    { layers: [{ type: 'image', path: '/home/node/data/1.jpg' }] },
                    { layers: [{ type: 'image', path: '/home/node/data/2.jpg' }] },
                    { layers: [{ type: 'fill-color', color: 'white' }, { type: 'image', path: '/home/node/data/3.jpg', resizeMode: 'contain' }] },
                    { layers: [{ type: 'fill-color', color: 'white' }, { type: 'image', path: '/home/node/data/4.jpg', resizeMode: 'contain' }] },
                    { layers: [{ type: 'image', path: '/home/node/data/5.jpg', resizeMode: 'cover' }] },
                    { layers: [{ type: 'image', path: '/home/node/data/6.jpg', resizeMode: 'cover' }] },
                    { layers: [{ type: 'image', path: '/home/node/data/1.jpg', resizeMode: 'stretch' }] },
                    { layers: [{ type: 'image', path: '/home/node/data/2.jpg', resizeMode: 'stretch' }] },
                ],
                audioNorm: { enable: true, gaussSize: 3, maxGain: 100 },
                clipsAudioVolume: 50,
                audioTracks: [
                    { path: '/home/node/data/futuristic-beat-146661.mp3', cutFrom: 18 },
                ],
            });
            newItem.binary['data'] = movie;
            returnData.push(newItem);
        }
        return this.prepareOutputData(returnData);
    }
}
exports.VideoMaker = VideoMaker;
//# sourceMappingURL=VideoMaker.node.js.map
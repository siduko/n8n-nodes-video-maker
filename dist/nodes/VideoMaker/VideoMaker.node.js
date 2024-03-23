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
        const width = this.getNodeParameter('width', 0);
        const height = this.getNodeParameter('height', 0);
        const enableFfmpegLog = this.getNodeParameter('enableFfmpegLog', 0);
        const defaultParams = this.getNodeParameter('default', 0);
        const clipParams = this.getNodeParameter('clips', 0);
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
            const clips = (clipParams['item']).map((item) => {
                var _a;
                return Object.assign(Object.assign({}, item), { layers: (_a = item['layers'].item) !== null && _a !== void 0 ? _a : [] });
            });
            console.log(JSON.stringify(clips), 'clipParams');
            await editly({
                outPath: 'home/node/data/audio2.mp4',
                width,
                height,
                enableFfmpegLog,
                defaults: defaultParams,
                clips,
            });
            newItem.binary['data'] = movie;
            returnData.push(newItem);
        }
        return this.prepareOutputData(returnData);
    }
}
exports.VideoMaker = VideoMaker;
//# sourceMappingURL=VideoMaker.node.js.map
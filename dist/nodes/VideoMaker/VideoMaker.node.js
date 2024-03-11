"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoMaker = void 0;
const etroNode = require('etro-node');
const VideoMaker_node_options_1 = require("./VideoMaker.node.options");
const puppeteer_1 = __importDefault(require("puppeteer"));
class VideoMaker {
    constructor() {
        this.description = VideoMaker_node_options_1.nodeDescription;
    }
    async execute() {
        const items = this.getInputData();
        const parameters = this.getNodeParameter('parameters', 0);
        const movieWidth = this.getNodeParameter('width', 0);
        const movieHeight = this.getNodeParameter('height', 0);
        let returnData = [];
        for (let i = 0; i < items.length; i++) {
            const newItem = {
                json: {},
                binary: {},
                pairedItem: {
                    item: i,
                },
            };
            const browser = await puppeteer_1.default.launch({
                args: ['--no-sandbox'],
                headless: true
            });
            const page = await browser.newPage();
            const movie = await new Promise((resolve, reject) => {
                etroNode(function () {
                    const canvas = document.createElement('canvas');
                    document.body.appendChild(canvas);
                    const movie = new etro.Movie({
                        canvas
                    });
                    movie.width = movieWidth;
                    movie.height = movieHeight;
                    movie.layers.push(new etro.layer.Image({
                        startTime: 0,
                        duration: 5,
                        source: new Image(),
                        sourceX: 0,
                        sourceY: 0,
                        sourceWidth: 400,
                        sourceHeight: 400,
                        x: 0,
                        y: 0,
                        width: 400,
                        height: 400,
                        opacity: 1,
                    }));
                    movie.record({
                        frameRate: 30,
                    }).then(window.done);
                }, parameters, resolve, page);
            });
            newItem.binary['data'] = movie;
            returnData.push(newItem);
        }
        return this.prepareOutputData(returnData);
    }
}
exports.VideoMaker = VideoMaker;
//# sourceMappingURL=VideoMaker.node.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodeDescription = void 0;
exports.nodeDescription = {
    displayName: "Video Maker",
    name: "VideoMaker",
    group: ["VideoMaker"],
    version: 1,
    description: "Video maker",
    defaults: {
        name: "Html to Image",
        color: "#125580",
    },
    icon: "file:node-icon.svg",
    inputs: ["main"],
    outputs: ["main"],
    properties: [
        {
            displayName: "Parameters",
            name: "parameters",
            type: "json",
            default: ''
        },
        {
            displayName: "Width",
            name: "width",
            type: "number",
            default: 1024
        },
        {
            displayName: "Height",
            name: "height",
            type: "number",
            default: 768
        },
    ],
};
//# sourceMappingURL=VideoMaker.node.options.js.map
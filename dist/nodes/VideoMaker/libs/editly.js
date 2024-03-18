"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEditly = void 0;
const getEditly = async () => {
    const lib = await eval(`import('editly')`);
    return lib.default;
};
exports.getEditly = getEditly;
//# sourceMappingURL=editly.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sha256Cryto = void 0;
const js_sha256_1 = require("js-sha256");
class Sha256Cryto {
    async encrypt(value) {
        return (0, js_sha256_1.sha256)(value);
    }
    async compare(normal, encryted) {
        return encryted === (0, js_sha256_1.sha256)(normal);
    }
}
exports.Sha256Cryto = Sha256Cryto;

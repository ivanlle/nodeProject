"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadProfilePicture = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const uploadProfilePicture = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    if (!request.isMultipart()) {
        return reply.status(400).send('Request is not multipart');
    }
    const data = yield request.file();
    if (!data) {
        return reply.status(404).send('No file uploaded');
    }
    const uploadDir = path_1.default.join(__dirname, '../../uploads');
    yield fs_extra_1.default.ensureDir(uploadDir);
    const filePath = path_1.default.join(uploadDir, data.filename);
    yield fs_extra_1.default.writeFile(filePath, yield data.toBuffer());
    reply.send({ message: 'File uploaded successfully', filePath });
});
exports.uploadProfilePicture = uploadProfilePicture;

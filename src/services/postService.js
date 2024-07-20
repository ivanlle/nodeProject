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
exports.deletePost = exports.updatePost = exports.getPostById = exports.createPost = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const createPost = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma_1.default.post.create({
        data,
    });
});
exports.createPost = createPost;
const getPostById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma_1.default.post.findUnique({
        where: { id },
        include: { author: true },
    });
});
exports.getPostById = getPostById;
const updatePost = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma_1.default.post.update({
        where: { id },
        data,
    });
});
exports.updatePost = updatePost;
const deletePost = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma_1.default.post.delete({
        where: { id },
    });
});
exports.deletePost = deletePost;

"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.getPostById = exports.createPost = void 0;
const postService = __importStar(require("../services/postService"));
const createPost = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = request.body;
        const post = yield postService.createPost(data);
        reply.code(201).send(post);
    }
    catch (error) {
        reply.status(400).send('Error creating post');
    }
});
exports.createPost = createPost;
const getPostById = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = request.params;
        if (id) {
            return reply.status(400).send('Invalid Post ID');
        }
        const post = yield postService.getPostById(id);
        if (!post) {
            return reply.status(404).send('Post not found');
        }
        reply.send(post);
    }
    catch (error) {
        reply.status(400).send('Error fetching post');
    }
});
exports.getPostById = getPostById;
const updatePost = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = request.params;
        if (id) {
            return reply.status(400).send('Invalid Post ID');
        }
        const data = request.body;
        const post = yield postService.updatePost(id, data);
        reply.send(post);
    }
    catch (error) {
        reply.status(400).send('Error updating post');
    }
});
exports.updatePost = updatePost;
const deletePost = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = request.params;
        if (id) {
            return reply.status(400).send('Invalid Post ID');
        }
        yield postService.deletePost(id);
        reply.code(204).send();
    }
    catch (error) {
        reply.status(400).send('Error deleting post');
    }
});
exports.deletePost = deletePost;

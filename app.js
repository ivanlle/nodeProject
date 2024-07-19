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
const fastify_1 = __importDefault(require("fastify"));
const userRoutes_1 = require("./src/routes/userRoutes");
const ajv_compiler_1 = require("@fastify/ajv-compiler");
const server = (0, fastify_1.default)({
    logger: true,
    ajv: {
        customOptions: {
            removeAdditional: 'all',
            useDefaults: true,
            coerceTypes: true,
            allErrors: true,
            strict: false,
        },
        plugins: [ajv_compiler_1.AjvCompiler],
    },
});
//routes
server.register(userRoutes_1.userRoutes);
server.get('/helloWorld', (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    return 'Hello world!\n';
}));
server.listen({ port: 8080 }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});

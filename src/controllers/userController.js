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
exports.deleteUser = exports.updateUser = exports.getUsers = exports.getUser = exports.createUser = void 0;
const userService = __importStar(require("../services/userService"));
const dniPattern = /^\d{8}[A-Z]$/;
const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const namePattern = /^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]+$/;
const createUser = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const data = request.body;
    //Validate data 
    if (!dniPattern.test(data.dni)) {
        reply.status(400).send({ message: 'Incorrect Dni make sure you meet the standard' });
    }
    else if (!emailPattern.test(data.email)) {
        reply.status(400).send({ message: 'Incorrect email format' });
    }
    else if (!(typeof data.age === 'number')) {
        reply.status(400).send({ message: 'Incorrect age format, you have to send a number.' });
    }
    else if (!namePattern.test(data.firstName)) {
        reply.status(400).send({ message: 'Incorrect firstName, invalid character entered' });
    }
    else if (!namePattern.test(data.lastName)) {
        reply.status(400).send({ message: 'Incorrect lastName, invalid character entered' });
    }
    else {
        const user = yield userService.createUser(data);
        reply.send(user);
    }
});
exports.createUser = createUser;
const getUser = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = request.params;
    const user = yield userService.getUserById(parseInt(id));
    if (user) {
        reply.send(user);
    }
    else {
        reply.status(404).send({ message: 'User not found' });
    }
});
exports.getUser = getUser;
const getUsers = (_request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield userService.getAllUsers();
    reply.send(users);
});
exports.getUsers = getUsers;
const updateUser = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = request.params;
    const data = request.body;
    try {
        //Validate data 
        if (!data.age && !data.dni && !data.email && !data.firstName && !data.lastName) {
            return reply.status(400).send({ message: 'No data' });
        }
        if (data.dni) {
            if (!dniPattern.test(data.dni)) {
                reply.status(400).send({ message: 'Incorrect Dni make sure you meet the standard' });
            }
            ;
        }
        if (data.email) {
            if (!emailPattern.test(data.email)) {
                reply.status(400).send({ message: 'Incorrect email format' });
            }
        }
        if (data.age) {
            if (!(typeof (data.age) === 'number')) {
                reply.status(400).send({ message: 'Incorrect age format, you have to send a number.' });
            }
        }
        if (data.firstName) {
            if (!namePattern.test(data.firstName)) {
                reply.status(400).send({ message: 'Incorrect firstName, invalid character entered' });
            }
        }
        if (data.lastName) {
            if (!namePattern.test(data.lastName)) {
                reply.status(400).send({ message: 'Incorrect lastName, invalid character entered' });
            }
        }
        const user = yield userService.updateUser(parseInt(id), data);
        reply.send(user);
    }
    catch (error) {
        reply.status(404).send({ message: 'User not found' });
    }
});
exports.updateUser = updateUser;
const deleteUser = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = request.params;
    try {
        yield userService.deleteUser(parseInt(id));
        reply.send({ message: 'User deleted successfully' });
    }
    catch (error) {
        reply.status(404).send({ message: 'User not found' });
    }
});
exports.deleteUser = deleteUser;

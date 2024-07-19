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
exports.deleteUser = exports.updateUser = exports.getAllUsers = exports.getUserById = exports.createUser = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma_1.default.user.create({
        data
    });
});
exports.createUser = createUser;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma_1.default.user.findUnique({
        where: { id },
    });
});
exports.getUserById = getUserById;
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return prisma_1.default.user.findMany();
});
exports.getAllUsers = getAllUsers;
const updateUser = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma_1.default.user.update({
        where: { id },
        data,
    });
});
exports.updateUser = updateUser;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma_1.default.user.delete({
        where: { id },
    });
});
exports.deleteUser = deleteUser;

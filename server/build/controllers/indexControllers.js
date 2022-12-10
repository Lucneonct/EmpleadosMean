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
exports.indexController = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const simple_body_validator_1 = require("simple-body-validator");
const Empleado_1 = __importDefault(require("../models/Empleado"));
class IndexController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const empleados = yield Empleado_1.default.find();
            res.send(empleados);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const result = (0, simple_body_validator_1.make)(req.body, {
                nombre: 'required|string',
                apellido: 'required|string',
                edad: 'required|integer'
            });
            if (!result.validate()) {
                return res.json(result.errors().messages);
            }
            ;
            const empleado = new Empleado_1.default(req.body);
            yield empleado.save();
            res.json({
                message: "Data created as successfully",
                empleado
            });
        });
    }
    modify(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const empleado = mongoose_1.default.Types.ObjectId.isValid(id) ? yield Empleado_1.default.findById(id) : null;
            if (!empleado) {
                return res.json({
                    id: "The id param is invalid or doesn't exist"
                });
            }
            const result = (0, simple_body_validator_1.make)(req.body, {
                nombre: 'required|string',
                apellido: 'required|string',
                edad: 'required|integer',
                caracteristicas: 'array'
            });
            if (!result.validate()) {
                return res.json(result.errors().messages);
            }
            ;
            const { nombre, apellido, edad, caracteristicas } = req.body;
            empleado.nombre = nombre;
            empleado.apellido = apellido;
            empleado.edad = edad;
            empleado.caracteristicas = caracteristicas;
            empleado.save();
            res.json({
                message: "Data created successfully",
                empleado
            });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const empleado = mongoose_1.default.Types.ObjectId.isValid(id) ? yield Empleado_1.default.findById(id) : null;
            if (!empleado) {
                return res.json({
                    id: "The id param is invalid or doesn't exist"
                });
            }
            empleado.delete();
            res.json({
                message: "Entry deleted as successfully"
            });
        });
    }
}
exports.indexController = new IndexController();

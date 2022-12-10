import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { make } from 'simple-body-validator';
import Empleado from '../models/Empleado';

class IndexController {    
    public async index(req: Request, res: Response) {
        const empleados = await Empleado.find();

        res.send(empleados)
    }

    public async create (req: Request, res: Response) {
        console.log(req.body);
        const result = make(req.body, {
            nombre: 'required|string',
            apellido: 'required|string',
            edad: 'required|integer'
        });
        
        if(!result.validate()) {
            return res.json(result.errors().messages);            
        };

        const empleado = new Empleado(req.body);
        await empleado.save()

        res.json({
            message: "Data created as successfully",
            empleado
        });
    }

    public async modify (req: Request, res: Response) {
        const { id } = req.params;
        const empleado = mongoose.Types.ObjectId.isValid(id) ? await Empleado.findById(id) : null;

        if(!empleado) {
            return res.json({
                id: "The id param is invalid or doesn't exist"
            });   
        }

        
        const result = make(req.body, {
            nombre: 'required|string',
            apellido: 'required|string',
            edad: 'required|integer',
            caracteristicas: 'array'
        });

        if(!result.validate()) {
            return res.json(result.errors().messages);            
        };
        
        const { nombre, apellido, edad, caracteristicas } = req.body
        empleado.nombre = nombre;
        empleado.apellido = apellido;
        empleado.edad = edad;
        empleado.caracteristicas = caracteristicas;
        empleado.save();

        res.json({
            message: "Data created successfully",
            empleado
        });
    }

    public async delete (req: Request, res: Response) {
        const { id } = req.params;
        const empleado = mongoose.Types.ObjectId.isValid(id) ? await Empleado.findById(id) : null;

        if(!empleado) {
            return res.json({
                id: "The id param is invalid or doesn't exist"
            });   
        }
        
        empleado.delete();
        res.json({
            message: "Entry deleted as successfully"
        })
    }
}

export const indexController = new IndexController();
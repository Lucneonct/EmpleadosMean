export class Empleado {
    _id?: string;
    nombre: string;
    apellido: string;
    edad: number;
    caracteristicas: string[];
    
    constructor(nombre: string, apellido: string, edad: number, caracteristicas?: string[], _id?: string) {
        this._id = _id;
        this.nombre = nombre;                        //
        this.apellido = apellido;                    // 
        this.edad = edad;                            // Constructor para armar mi empleado
        this.caracteristicas = caracteristicas || [];//
    }

    addCaracteristica(value: string) {
        this.caracteristicas.push(value)
    }

    removeCaracteristica(index: number) {
        this.caracteristicas.splice(index, 1)
    }

    clone() {
        const { nombre, apellido, edad, caracteristicas, _id } = this;
        return new Empleado(nombre, apellido, edad, [...caracteristicas], _id)
    }
}


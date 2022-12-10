import { Injectable } from '@angular/core';
import { Empleado } from '../models/empleado.model';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {
  private list: Empleado[] = [];

  constructor(private data: DataService) {
    this.syncList();
  }

  getList() {                                  //
    return this.list;                          // Obtengo la lista de empleados
  }                                            // => Empleado[]

  async syncList() {
    try {
      const response = await this.data.getEmpleados();

      this.list.splice(0, this.list.length);
      response.data.forEach(empleado => {
        const { nombre, apellido, edad, caracteristicas, _id } = empleado;
        const newEmpleado = new Empleado(nombre, apellido, edad, caracteristicas, _id);
        this.list.push(newEmpleado);
      })
      this.data.stopLoading()
    } catch (e) {

      alert(e);
      this.data.stopLoading();;
    }
  }

  async addNew(empleado: Empleado) {
    try {
      const response = await this.data.addEmpleado(empleado);

      const { empleado: { nombre, apellido, edad, caracteristicas, _id } } = response.data;
      const newEmpleado = new Empleado(nombre, apellido, edad, caracteristicas, _id);
      this.list.push(newEmpleado);
      this.data.stopLoading()
    } catch (e) {

      alert(e);
      this.data.stopLoading();;
    }
  }

  async delete(empleado: Empleado) {
    try {
      const response = await this.data.deleteEmpleado(empleado._id as string);

      this.list.forEach((actualEmpleado, index) => {
        if (empleado._id === actualEmpleado._id) {
          this.list.splice(index, 1)
        }
        this.data.stopLoading()
      })
    } catch (e) {

      alert(e);
      this.data.stopLoading();;
    }
  }

  get(id: string) {
    return this.list.filter(actual => actual._id === id)[0];
  }

  async edit(editedEmpleado: Empleado) {
    const empleado = this.get(editedEmpleado._id as string);
    const { nombre, apellido, edad, caracteristicas, _id } = editedEmpleado;

    try {
      const response = await this.data.editEmpleado(editedEmpleado);
      if (response.status !== 200) return
      empleado.nombre = nombre;
      empleado.apellido = apellido;
      empleado.edad = edad;
      empleado.caracteristicas = caracteristicas;
      empleado._id = _id;
      this.data.stopLoading()
    } catch (e) {

      alert(e);
      this.data.stopLoading();
    }
  }
}

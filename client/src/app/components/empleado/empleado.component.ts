import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { Empleado } from '../../models/empleado.model';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent {
  @Input() empleado!: Empleado;
  @Input() i!: number;

  constructor(private empleadosService: EmpleadosService, private data: DataService) {
  }

  isLoading() {
    return this.data.isLoading()
  }

  agregarCaracteristica = async (value: string) => {
    const editedEmpleado = this.empleado.clone()
    editedEmpleado.addCaracteristica(value);

    this.empleadosService.edit(editedEmpleado);
  }

  eliminarCaracteristica = async (index: number) => {
    const editedEmpleado = this.empleado.clone()
    editedEmpleado.removeCaracteristica(index);

    this.empleadosService.edit(editedEmpleado);
  }

  eliminarEmpleado = () => {
    this.empleadosService.delete(this.empleado);
  }
}

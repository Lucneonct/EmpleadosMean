import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Empleado } from 'src/app/models/empleado.model';
import { DataService } from 'src/app/services/data.service';
import { EmpleadosService } from 'src/app/services/empleados.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {
  nombre: string = ""
  apellido: string = ""
  edad: number = 0
  
  constructor(private empleadoService: EmpleadosService, private router: Router, private data: DataService) {
  }

  isLoading() {
    return this.data.isLoading()
  }

  agregarEmpleado: () => void = () => {
    if(!(this.nombre && this.apellido && this.edad)) {
      alert("Faltan datos por rellenar")
    } else {
      const newEmpleado = new Empleado(this.nombre, this.apellido, this.edad);

      this.empleadoService.addNew(newEmpleado);
      this.router.navigate([""])
    }
  }

}

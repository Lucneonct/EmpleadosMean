import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Empleado } from 'src/app/models/empleado.model';
import { DataService } from 'src/app/services/data.service';
import { EmpleadosService } from 'src/app/services/empleados.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {
  id!: string;
  empleado!: Empleado;
  editableEmpleado!: Empleado;

  constructor(private empleadosService: EmpleadosService, private router: Router, private route: ActivatedRoute, private data: DataService) {
    this.id = this.route.snapshot.params['id'];
    this.empleado = this.empleadosService.get(this.id);
  }
  ngOnInit(): void {
    if (!(this.empleado && this.id)) {
      this.router.navigate(["/"])
    } else {
      this.editableEmpleado = this.empleado.clone();
    }
  }

  isLoading() {
    return this.data.isLoading();
  }

  editarEmpleado = () => {
    this.empleadosService.edit(this.editableEmpleado);
    this.router.navigate([""])
  }

  eliminarEmpleado = () => {
    this.empleadosService.delete(this.editableEmpleado);
    this.router.navigate([""])
  }
}

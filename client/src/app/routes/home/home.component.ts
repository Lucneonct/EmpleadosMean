import { Component, OnInit } from '@angular/core';
import { Empleado } from 'src/app/models/empleado.model';
import { EmpleadosService } from 'src/app/services/empleados.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  empleados: Empleado[] = [];

  constructor(private empleadosService: EmpleadosService) {
  }
  ngOnInit(): void {
    this.empleados = this.empleadosService.getList();
  }

}

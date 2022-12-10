import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-caracteristicas-empleado',
  templateUrl: './caracteristicas-empleado.component.html',
  styleUrls: ['./caracteristicas-empleado.component.css']
})
export class CaracteristicasEmpleadoComponent {
  @Input() caracteristicas!: string[];
  @Input() i!: number;
  @Output() onDelete = new EventEmitter<number>();
  @Output() onCreate = new EventEmitter<string>();

  constructor(private data: DataService) {}

  agregarCaracteristica = (input: HTMLInputElement) => {
    if(!input.value) {
      alert("No puede estar vacío");
      input.focus()
    } else {
      this.onCreate.emit(input.value);
      input.value="";
    }
  }
  
  isLoading() {
    return this.data.isLoading();
  }

  eliminarCaracteristica = (index: number) => {
    this.onDelete.emit(index)
  }
}

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { EmpleadoComponent } from './components/empleado/empleado.component';
import { CaracteristicasEmpleadoComponent } from './components/caracteristicas-empleado/caracteristicas-empleado.component';
import { EmpleadosService } from './services/empleados.service';
import { HomeComponent } from './routes/home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './routes/about/about.component';
import { FormularioComponent } from './routes/formulario/formulario.component';
import { EditarComponent } from './routes/editar/editar.component';
import { NotFoundComponent } from './routes/not-found/not-found.component';
import { DataService } from './services/data.service';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'form', 
    component: FormularioComponent
  },
  {
    path: 'edit/:id',
    component: EditarComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    EmpleadoComponent,
    CaracteristicasEmpleadoComponent,
    HomeComponent,
    FormularioComponent,
    EditarComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [
    EmpleadosService,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import axios from '../helpers/axios';
import { Empleado } from '../models/empleado.model';

interface empleadoPostResponse {
  message: string,
  empleado: Empleado
}

const baseUrl = "http://localhost:3000";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  loading: boolean;

  constructor(private httpClient: HttpClient) {
    this.loading = true;
  }

  isLoading() {
    return this.loading;
  }

  startLoading() {
    this.loading = true;
  }

  stopLoading() {
    this.loading = false;
  }

  async getEmpleados() {
    this.startLoading()
    return await axios.get<Empleado[]>('');
  }

  async addEmpleado(empleado: Empleado) {
    this.startLoading();
    return await axios.post<empleadoPostResponse>('', empleado);
  }

  async deleteEmpleado(id: string) {
    this.startLoading()
    return axios.delete(id);
  }

  async editEmpleado(empleado: Empleado) {
    this.startLoading()
    return await axios.put(empleado._id as string, empleado);
  }
}

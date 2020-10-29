import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../models/customer.model';
import { map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private url = 'http://localhost:3000';

  constructor( private http: HttpClient ) { }

  crearCliente( cliente: Customer ) {

    return this.http.post(`${ this.url }/customers/`, cliente)
                    .pipe(map((resp: any) => {
                      cliente.ID = resp.name;
                      return cliente;
                    }));
  }

  actualizarCliente( cliente: Customer ) {

    const clienteTemp = {
       ...cliente 
    };

    delete clienteTemp.ID;

    return this.http.put(`${this.url}/customers/${cliente.ID}`, clienteTemp);

  }

  borrarCliente(id: number) {
    return this.http.delete(`${this.url}/customers/${id}`);
  }

  getCliente(id: number){
    return this.http.get(`${this.url}/customers/${id}`);
  }

  getClientes(){
    return this.http.get(`${this.url}/customers`)
                    .pipe(
                      map(this.crearArreglo),
                      delay(10)
                    );
  }

  private crearArreglo(clientesObj: object){

    const clientes: Customer[] = [];

    if(clientesObj === null) {
      return [];
    }

    Object.keys(clientesObj).forEach(key => {
      const cliente: Customer = clientesObj[key];
      cliente.ID = Number(key);

      clientes.push(cliente);
    });

    return clientes;
  }
}

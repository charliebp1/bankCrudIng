import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  clientes: Customer[] = [];
  cargando = false;

  constructor(private ClientesService: CustomerService) { }

  ngOnInit(): void {

    this.cargando = true;

    this.ClientesService.getClientes()
                      .subscribe( resp => {
                          this.clientes = resp;
                          this.cargando = false;
                      });
  
  }

  borrarCliente( cliente: Customer, i: number ) {
        
    Swal.fire({
        title: '¿Estás seguro?',
        text: `Está seguro que desea borrar a ${ cliente.Name }`,
        icon: 'question',
        showConfirmButton: true,
        showCancelButton: true 
    }).then( resp => {
        if(resp.value){
          this.clientes.splice(i, 1);
          this.ClientesService.borrarCliente(cliente.ID).subscribe();
        }
    });

    
  
  }

}

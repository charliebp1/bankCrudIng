import { Component, OnInit, ɵConsole } from '@angular/core';
import { Customer } from 'src/app/models/customer.model';
import { NgForm } from '@angular/forms';
import { CustomerService } from 'src/app/services/customer.service';

import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';

import  Swal  from 'sweetalert2';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})

export class CustomerComponent implements OnInit {

  cliente: Customer;

  constructor( private clienteService: CustomerService,
    private route: ActivatedRoute) { 

  }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if ( id !== 'nuevo'){

      this.clienteService.getCliente(Number(id))
                        .subscribe((resp: Customer) => {
                            this.cliente = resp;
                            this.cliente.ID = Number(id);
                        })
    }
  }

  guardar(form: NgForm) {

    if(form.invalid) {
      console.log('Formulario no válido');
      return;
    }
  
    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      icon: 'info',
      allowOutsideClick: false
    });

    Swal.showLoading();

    let peticion: Observable<any>;

    if(this.cliente.ID){
      peticion = this.clienteService.actualizarCliente(this.cliente);
    }else{
      peticion = this.clienteService.crearCliente(this.cliente);
    }

    peticion.subscribe( resp => {

      Swal.fire({
        title: this.cliente.ID,
        text: 'Se actualizó correctamente',
        icon: 'success'
      }); 
    })

    peticion.subscribe( resp => {

      Swal.fire({
        title: this.cliente.UUID,
        text: 'Se actualizó correctamente',
        icon: 'success'
      }); 
    })

    peticion.subscribe( resp => {

      Swal.fire({
        title: this.cliente.Name,
        text: 'Se actualizó correctamente',
        icon: 'success'
      }); 
    })
    
    peticion.subscribe( resp => {

      Swal.fire({
        title: this.cliente.Surname,
        text: 'Se actualizó correctamente',
        icon: 'success'
      }); 
    })

   
  
    peticion.subscribe( resp => {

      Swal.fire({
        title: this.cliente.Address,
        text: 'Se actualizó correctamente',
        icon: 'success'
      }); 
    })

    peticion.subscribe( resp => {

      Swal.fire({
        title: this.cliente.Email,
        text: 'Se actualizó correctamente',
        icon: 'success'
      }); 
    })
     
  }
}




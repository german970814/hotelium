import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'sweetalert2/dist/sweetalert2.css';
import swal from 'sweetalert2/dist/sweetalert2.js';
import APIClient from './../../api';


export default class extends Component {
  newCustomer() {
    this.props.onUserClickNewCustomerButton && this.props.onUserClickNewCustomerButton();
  }

  onUserClickDeleteCustomer(customer) {
    swal({
      title: 'Atención',
      text: '¿Seguro que quieres eliminar este cliente?',
      type: 'error',
      confirmButtonText: 'Eliminar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.value) {
        APIClient.deleteCustomer(customer.id).then(response => {
          if (response.code === 200) {
            window.$.notify({
              message: 'Se ha eliminado el cliente'
            }, {
                type: 'warning',
                timer: 4000
              }
            );
            this.props.onDeleted && this.props.onDeleted();
          } else if (response.code === 400) {
            window.$.notify({
              message: 'El cliente tiene reservas activas, no se puede eliminar'
            }, {
                type: 'danger',
                timer: 4000
              }
            );
          }
        });
      }
    });
  }

  render() {
    return <div className="card">
      <div className="header">
        <h4 className="title">Clientes</h4>
      </div>
      <ol className="breadcrumb">
        <li><button onClick={this.newCustomer.bind(this)} className="btn btn-sm">Nuevo cliente</button></li>
      </ol>
      <div className="content">
        <ul className="list-unstyled team-members">
          {Boolean(this.props.customers.length) && this.props.customers.map((customer, indx) => {
            return <li key={indx}>
              <div className="row">
                <div className="col-xs-5 text-left">
                  { `${customer.name} ${customer.last_name}` }
                </div>

                <div className="col-xs-7 text-right">
                  <Link to={`/customers/${customer.id}/edit`} className="btn btn-sm btn-success btn-icon"><i className="fa fa-pencil"></i></Link>
                  <button onClick={() => {this.onUserClickDeleteCustomer(customer)}} className="btn btn-sm btn-danger btn-icon"><i className="fa fa-trash"></i></button>
                </div>
              </div>
            </li>
          })}
        </ul>
      </div>
    </div>   
  }
}
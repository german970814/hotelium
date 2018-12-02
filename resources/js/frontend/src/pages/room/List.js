import React, { Component } from 'react';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import 'sweetalert2/dist/sweetalert2.css';
import swal from 'sweetalert2/dist/sweetalert2.js';
import APIClient from './../../api';


export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customers: [],
      selectedRoom: null,
      selectedCustomer: null,
    }
  }

  newRoom() {
    this.props.onUserClickNewRoomButton && this.props.onUserClickNewRoomButton();
  }

  showModal(id) {
    this.setState({ selectedRoom: id });
    window.$('#modal-reservation').modal('show');
  }

  showModalReservation(id) {
    this.setState({ selectedRoom: id });
    APIClient.getCustomerFromBooking(id).then(response => {
      if (response.code === 200) {
        this.setState({ customerBooking: response.data, selectedCustomer: response.data.id });
      }
    });
    window.$('#modal-reservation-detail').modal('show');
  }

  onSearchCustomer(value) {
    APIClient.getCustomers({q: value}).then(response => {
      if (response.code === 200) {
        this.setState({
          customers: response.data.data.map(customer => {
            return { value: customer.id, label: `${customer.name} ${customer.last_name}` }
          })
        })
      }
    });
  }

  onChangeSelectCustomer(selectedOption) {
    this.setState({ selectedCustomer: selectedOption.value });
  }

  bookingRoom() {
    Boolean(this.state.selectedCustomer) && APIClient.bookingRoom(this.state.selectedCustomer, this.state.selectedRoom).then(response => {
      if (response.code === 200) {
        this.props.onReservationAction && this.props.onReservationAction();
        window.$('#modal-reservation').modal('hide');
        window.$('#modal-reservation-detail').modal('hide');
        this.setState({ selectedCustomer: null });

        window.$.notify({
          message: 'La reserva ha sido modificada'
        }, {
            type: 'success',
            timer: 4000
          }
        );
      }
    });
  }

  onUserClickDeleteRoom(room) {
    swal({
      title: 'Atención',
      text: '¿Seguro que quieres eliminar esta habitación?',
      type: 'error',
      confirmButtonText: 'Eliminar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.value) {
        APIClient.deleteRoom(room.id).then(response => {
          if (response.code === 200) {
            window.$.notify({
              message: 'Se ha eliminado la habitación'
            }, {
                type: 'warning',
                timer: 4000
              }
            );
            this.props.onDeleted && this.props.onDeleted();
          } else if (response.code === 400) {
            window.$.notify({
              message: 'La habitación tiene reservas activas, no se puede eliminar'
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
        <h4 className="title">Habitaciones</h4>
      </div>
      <ol className="breadcrumb">
        <li><button onClick={this.newRoom.bind(this)} className="btn btn-sm">Nueva habitación</button></li>
      </ol>
      <div className="content">
        <ul className="list-unstyled team-members">
          {Boolean(this.props.rooms.length) && this.props.rooms.map((room, indx) => {
            return <li key={indx}>
              <div className="row">
                <div className="col-xs-6 text-left">
                  Habitación #{`${room.floor} - ${room.number}`}
                  <br />
                  <span style={{ color: `${room.status === 'F' ? '#68B3C8' : '#EB5E28'}` }} className="text-muted"><small>{room.status === 'F' ? 'Libre' : 'Reservada'}</small></span>
                </div>

                <div className="col-xs-6 text-right">
                  {room.status === 'F' && <button onClick={() => { this.showModal(room.id) }} className="btn btn-sm btn-info">Reservar</button>}
                  {room.status === 'R' && <button onClick={() => { this.showModalReservation(room.id) }} className="btn btn-sm btn-warning btn-icon"><i className="fa fa-eye"></i></button>}
                  <Link to={`/rooms/${room.id}/edit`} className="btn btn-sm btn-success btn-icon"><i className="fa fa-pencil"></i></Link>
                  <button onClick={() => {this.onUserClickDeleteRoom(room)}} className="btn btn-sm btn-danger btn-icon"><i className="fa fa-trash"></i></button>
                </div>
              </div>
            </li>
          })}
        </ul>
        <div className="modal" id="modal-reservation" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Reserva</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Escoge el cliente que reservará la habitación.</p>
                <Select
                  options={this.state.customers}
                  onInputChange={this.onSearchCustomer.bind(this)}
                  onChange={this.onChangeSelectCustomer.bind(this)} />
              </div>
              <div className="modal-footer">
                <button onClick={this.bookingRoom.bind(this)} type="button" className="btn btn-primary">Reservar</button>
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
              </div>
            </div>
          </div>
        </div>
        <div className="modal" id="modal-reservation-detail" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Reserva</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Esta habitación está reservada para el cliente <b>{`${this.state.customerBooking ? this.state.customerBooking.name : ''} ${this.state.customerBooking ? this.state.customerBooking.last_name : ''}`}</b>.</p>
              </div>
              <div className="modal-footer">
                <button onClick={this.bookingRoom.bind(this)} type="button" className="btn btn-danger">Cancelar Reserva</button>
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  }
}
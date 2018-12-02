import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

import Create from './Create';
import List from './List';

import APIClient from './../../api';

class CrudRoom extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      rooms: [],
      errors: [],
      room: {
        air: '',
        floor: '',
        number: '',
        room_type: '',
        number_beds: '',
        information: '',
      },
    }
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      this.getRoom();
    }
    this.fetchRooms();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.props.match.params.id && this.getRoom();
    }
  }

  getRoom() {
    APIClient.getRoom(this.props.match.params.id).then(response => {
      if (response.code === 200) {
        this.setState({ room: response.data });
      } else if (response.code === 404) {

      }
    });
  }

  fetchRooms() {
    APIClient.getRooms().then(response => {
      if (response.code === 200) {
        console.log(response.data.data)
        this.setState({ rooms: response.data.data });
      }
    });
  }

  resetRoom() {
    this.setState({
      errors: [],
      room: {
        air: '',
        floor: '',
        number: '',
        room_type: '',
        number_beds: '',
        information: '',
      }
    });
  }

  onUserClickNewRoomButton() {
    this.resetRoom();

    if (this.props.match.params.id) {
      this.props.history.push({pathname: '/rooms/'})
    }
  }

  onChangeField(event) {
    this.setState({
      room: Object.assign({}, this.state.room, {
        [event.target.name]: event.target.value
      })
    });
  }

  onReservationAction() {
    this.fetchRooms();
  }

  validateRoom() {
    Object.keys(this.state.room).forEach(key => {
      if (this.state.room[key] && !this.state.room[key].toString().trim()) {

      }
    });
  }

  onSubmit() {
    const errors = this.validateRoom();

    if (!errors) {
      let _method = this.state.room.id ? 'updateRoom' : 'createRoom';

      APIClient[_method](this.state.room, this.props.match.params.id).then(response => {
        console.log(response);

        if (response.code === 400) {
          this.setState({ errors: response.data.errors });
          window.$.notify({
            message: "Hay un error en el formulario"
          }, {
              type: 'danger',
              timer: 4000
            }
          );
        } else if (response.code === 200) {
          window.$.notify({
            message: this.state.room.id ? 'Habitación actualizada exitosamente' : 'Habitación creada exitosamente'
          }, {
              type: 'success',
              timer: 4000
            }
          );
          if (!this.state.room.id) {
            this.resetRoom();
          }
          this.fetchRooms();
        }
      });
    }
  }

  render() {
    return <div className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12 col-md-12">
            <div className="col-md-5 col-xs-12">
              <List
                rooms={this.state.rooms}
                onDeleted={this.onReservationAction.bind(this)}
                onReservationAction={this.onReservationAction.bind(this)}
                onUserClickNewRoomButton={this.onUserClickNewRoomButton.bind(this)} />
            </div>
            <div className="col-md-7 col-xs-12">
              <Create
                room={this.state.room}
                errors={this.state.errors}
                onSubmit={this.onSubmit.bind(this)}
                onChangeField={this.onChangeField.bind(this)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  }
}

export default withRouter(CrudRoom);

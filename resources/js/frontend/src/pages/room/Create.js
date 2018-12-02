import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';
import Switch from "react-switch";

const optionsRoomType = [
  { value: '', label: '---' },
  { value: 'S', label: 'Sencilla' },
  { value: 'D', label: 'Doble' },
  { value: 'U', label: 'Suite' },
];

class CreateRoom extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.props.onChangeField && this.props.onChangeField(event);
  }

  onChangeSwitch(value) {
    this.props.onChangeField && this.props.onChangeField({
      target: {
        name: 'air',
        value: value
      }
    });
  }

  validateForm() {
    Object.keys(this.props.room).forEach(key => {
      if (this.props.room[key] && !this.props.room[key].toString().trim()) {

      }
    });
  }

  onSubmit() {
    this.props.onSubmit && this.props.onSubmit();
  }

  onChangeSelect(selectedOption) {
    let objectLikeEvent = {
      target: {
        name: 'room_type',
        value: selectedOption.value
      }
    }
    this.props.onChangeField && this.props.onChangeField(objectLikeEvent);
  }

  getValueForSelect(input) {
    return optionsRoomType.find(option => {
      return option.value === input
    })
  }

  render() {
    return <div className="card">
      <div className="header">
        <h4 className="title">{this.props.room.id ? 'Editar ' : 'Crear '} Habitación</h4>
      </div>
      <div className="content">
        <form>
          <div className="row">
            <div className="col-md-5">
              <div className={`form-group ${'number' in this.props.errors ? 'has-error' : ''}`}>
                <label>Número</label>
                <input onChange={this.onChange} name="number" type="number" className="form-control border-input" placeholder="Número" value={this.props.room.number} />
                <div>
                  {
                    this.props.errors.number && this.props.errors.number.map((error, ind) => {
                      return <span key={ind}>{error}</span>
                    })
                  }
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className={`form-group ${'floor' in this.props.errors ? 'has-error' : ''}`}>
                <label>Piso</label>
                <input onChange={this.onChange} name="floor" type="text" className="form-control border-input" placeholder="Piso" value={this.props.room.floor} />
                <div>
                  {
                    this.props.errors.floor && this.props.errors.floor.map((error, ind) => {
                      return <span key={ind}>{error}</span>
                    })
                  }
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className={`form-group ${'air' in this.props.errors ? 'has-error' : ''}`}>
                <label>Aire</label>
                <Switch
                  onChange={this.onChangeSwitch.bind(this)}
                  checked={typeof this.props.room.air === 'string' ? (this.props.room.air === 'false' ? false: true) : this.props.room.air} />
                {/* <input onChange={this.onChange} name="air" type="checkbox" className="form-control border-input" placeholder="Aire" value={this.props.room.air} /> */}
                <div>
                  {
                    this.props.errors.air && this.props.errors.air.map((error, ind) => {
                      return <span key={ind}>{error}</span>
                    })
                  }
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className={`form-group ${'room_type' in this.props.errors ? 'has-error' : ''}`}>
                <label>Tipo de habitación</label>
                <Select
                  onChange={this.onChangeSelect.bind(this)}
                  value={this.getValueForSelect(this.props.room.room_type || '')}
                  options={optionsRoomType} />
                <div>
                  {
                    this.props.errors.room_type && this.props.errors.room_type.map((error, ind) => {
                      return <span key={ind}>{error}</span>
                    })
                  }
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className={`form-group ${'number_beds' in this.props.errors ? 'has-error' : ''}`}>
                <label>Número de Camas</label>
                <input onChange={this.onChange} name="number_beds" type="number" className="form-control border-input" placeholder="Número de camas" value={this.props.room.number_beds || ''} />
                <div>
                  {
                    this.props.errors.number_beds && this.props.errors.number_beds.map((error, ind) => {
                      return <span key={ind}>{error}</span>
                    })
                  }
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label>Observaciones</label>
                <textarea onChange={this.onChange} rows="5" className="form-control border-input" placeholder="Observaciones" value={this.props.room.information || ''} />
              </div>
            </div>
          </div>

          <div className="text-center">
            <button onClick={this.onSubmit.bind(this)} type="button" className="btn btn-info btn-fill btn-wd">{this.props.room.id ? 'Actualizar' : 'Crear'}</button>
          </div>
          <div className="clearfix"></div>
        </form>
      </div>
    </div>
  }
}

export default withRouter(CreateRoom);

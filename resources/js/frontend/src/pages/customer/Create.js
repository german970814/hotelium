import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import Select from 'react-select';


const optionsIdentificationType = [
  { value: '', label: '---'},
  { value: 'PA', label: 'Pasaporte' },
  { value: 'CC', label: 'Cédula de ciudadanía' },
  { value: 'CE', label: 'Cédula de extranjería' },
  { value: 'TI', label: 'Tarjeta de identidad' },
];

class CreateClient extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.props.onChangeField && this.props.onChangeField(event);
  }

  onChangeSelect(selectedOption) {
    let objectLikeEvent = {
      target: {
        name: 'identification_type',
        value: selectedOption.value
      }
    }
    this.props.onChangeField && this.props.onChangeField(objectLikeEvent);
  }

  getValueForSelect(input) {
    return optionsIdentificationType.find(option => {
      return option.value === input
    })
  }

  validateForm() {
    Object.keys(this.props.customer).forEach(key => {
      if (this.props.customer[key] && !this.props.customer[key].toString().trim()) {

      }
    });
  }

  onSubmit() {
    this.props.onSubmit && this.props.onSubmit()
  }

  render() {
    return <div className="card">
      <div className="header">
        <h4 className="title">{this.props.customer.id ? 'Editar ' : 'Crear '} Cliente</h4>
      </div>
      <div className="content">
        <form>
          <div className="row">
            <div className="col-md-5">
              <div className={`form-group ${'name' in this.props.errors ? 'has-error' : ''}`}>
                <label>Nombres</label>
                <input onChange={this.onChange} name="name" type="text" className="form-control border-input" placeholder="Nombres" value={this.props.customer.name} />
                <div>
                  {
                    this.props.errors.name && this.props.errors.name.map((error, ind) => {
                      return <span key={ind}>{ error }</span>
                    })
                  }
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className={`form-group ${'last_name' in this.props.errors ? 'has-error' : ''}`}>
                <label>Apellidos</label>
                <input onChange={this.onChange} name="last_name" type="text" className="form-control border-input" placeholder="Apellidos" value={this.props.customer.last_name} />
                <div>
                  {
                    this.props.errors.last_name && this.props.errors.last_name.map((error, ind) => {
                      return <span key={ind}>{error}</span>
                    })
                  }
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className={`form-group ${'address' in this.props.errors ? 'has-error' : ''}`}>
                <label>Dirección</label>
                <input onChange={this.onChange} name="address" type="text" className="form-control border-input" placeholder="Dirección" value={this.props.customer.address} />
                <div>
                  {
                    this.props.errors.address && this.props.errors.address.map((error, ind) => {
                      return <span key={ind}>{error}</span>
                    })
                  }
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className={`form-group ${'phone' in this.props.errors ? 'has-error' : ''}`}>
                <label>Teléfono (opcional)</label>
                <input onChange={this.onChange} name="phone" type="text" className="form-control border-input" placeholder="Teléfono" value={this.props.customer.phone || ''} />
                <div>
                  {
                    this.props.errors.phone && this.props.errors.phone.map((error, ind) => {
                      return <span key={ind}>{error}</span>
                    })
                  }
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className={`form-group ${'cellphone' in this.props.errors ? 'has-error' : ''}`}>
                <label>Celular (opcional)</label>
                <input onChange={this.onChange} name="cellphone" type="text" className="form-control border-input" placeholder="Celular" value={this.props.customer.cellphone || ''} />
                <div>
                  {
                    this.props.errors.cellphone && this.props.errors.cellphone.map((error, ind) => {
                      return <span key={ind}>{error}</span>
                    })
                  }
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <div className={`form-group ${'identification_type' in this.props.errors ? 'has-error' : ''}`}>
                <label>Tipo de identificación</label>
                <Select
                  name="identification_type"
                  onChange={this.onChangeSelect.bind(this)}
                  value={this.getValueForSelect(this.props.customer.identification_type)}
                  options={optionsIdentificationType} />
                <div>
                  {
                    this.props.errors.identification_type && this.props.errors.identification_type.map((error, ind) => {
                      return <span key={ind}>{error}</span>
                    })
                  }
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className={`form-group ${'identification_number' in this.props.errors ? 'has-error' : ''}`}>
                <label>N. de identificación</label>
                <input onChange={this.onChange} name="identification_number" type="text" className="form-control border-input" placeholder="Identificación" value={this.props.customer.identification_number} />
                <div>
                  {
                    this.props.errors.identification_number && this.props.errors.identification_number.map((error, ind) => {
                      return <span key={ind}>{error}</span>
                    })
                  }
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className={`form-group ${'birthday_date' in this.props.errors ? 'has-error' : ''}`}>
                <label>Fecha de nacimiento</label>
                <input onChange={this.onChange} name="birthday_date" type="date" className="form-control border-input" placeholder="Fecha de Nacimiento" value={this.props.customer.birthday_date.replace(' 00:00:00', '')} />
                <div>
                  {
                    this.props.errors.birthday_date && this.props.errors.birthday_date.map((error, ind) => {
                      return <span key={ind}>{error}</span>
                    })
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="text-center">
            <button onClick={this.onSubmit.bind(this)} type="button" className="btn btn-info btn-fill btn-wd">{this.props.customer.id ? 'Actualizar' : 'Crear'}</button>
          </div>
          <div className="clearfix"></div>
        </form>
      </div>
    </div>
  }
}

export default withRouter(CreateClient);

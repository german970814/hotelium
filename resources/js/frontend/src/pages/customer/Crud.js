import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

import Create from './Create';
import List from './List';

import APIClient from './../../api';

class CrudCustomer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customers: [],
      errors: [],
      customer: {
        name: '',
        phone: '',
        status: '',
        address: '',
        cellphone: '',
        last_name: '',
        birthday_date: '',
        identification_type: '',
        identification_number: '',
      },
    }
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      this.getCustomer();
    }
    this.fetchCustomers();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.props.match.params.id && this.getCustomer();
    }
  }

  getCustomer() {
    APIClient.getCustomer(this.props.match.params.id).then(response => {
      if (response.code === 200) {
        this.setState({ customer: response.data });
      } else if (response.code === 404) {

      }
    });
  }

  fetchCustomers() {
    APIClient.getCustomers().then(response => {
      if (response.code === 200) {
        console.log(response.data.data)
        this.setState({ customers: response.data.data });
      }
    });
  }

  resetCustomer() {
    this.setState({
      errors: [],
      customer: {
        name: '',
        phone: '',
        status: '',
        address: '',
        cellphone: '',
        last_name: '',
        birthday_date: '',
        identification_type: '',
        identification_number: '',
      }
    });
  }

  onUserClickNewCustomerButton() {
    this.resetCustomer();

    if (this.props.match.params.id) {
      this.props.history.push({ pathname: '/customers/' })
    }
  }

  onChangeField(event) {
    this.setState({
      customer: Object.assign({}, this.state.customer, {
        [event.target.name]: event.target.value
      })
    });
  }

  validateCustomer() {
    Object.keys(this.state.customer).forEach(key => {
      if (this.state.customer[key] && !this.state.customer[key].toString().trim()) {

      }
    });
  }

  onDeleted() {
    this.fetchCustomers();
  }

  onSubmit() {
    const errors = this.validateCustomer();

    if (!errors) {
      let _method = this.state.customer.id ? 'updateCustomer' : 'createCustomer';

      APIClient[_method](this.state.customer, this.props.match.params.id).then(response => {
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
            message: this.state.customer.id ? 'Cliente actualizado exitosamente' : 'Cliente creado exitosamente'
          }, {
              type: 'success',
              timer: 4000
            }
          );
          if (!this.state.customer.id) {
            this.resetCustomer();
          }
          this.fetchCustomers();
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
                customers={this.state.customers}
                onDeleted={this.onDeleted.bind(this)}
                onUserClickNewCustomerButton={this.onUserClickNewCustomerButton.bind(this)} />
            </div>
            <div className="col-md-7 col-xs-12">
              <Create
                customer={this.state.customer}
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

export default withRouter(CrudCustomer);

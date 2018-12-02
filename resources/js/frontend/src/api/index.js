
const SERVER_HOST = 'http://localhost:8000';
const _client = window.fetch.bind(window);

export default {
  async createCustomer(data) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return await _client(`${SERVER_HOST}/json/customers`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: headers
    }).then(response => {
      return response.json();
    });
  },

  async updateCustomer(data, id) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return await _client(`${SERVER_HOST}/json/customers/${id}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: headers
    }).then(response => {
      return response.json();
    });
  },

  async getCustomers(data={}) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return await _client(`${SERVER_HOST}/json/customers?${window.$ && window.$.param(data)}`, {
      method: 'GET',
      headers: headers
    }).then(response => {
      return response.json();
    });
  },

  async getCustomer(id) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return await _client(`${SERVER_HOST}/json/customers/${id}`, {
      method: 'GET',
      headers: headers
    }).then(response => {
      return response.json();
    }); 
  },

  async deleteCustomer(id) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return await _client(`${SERVER_HOST}/json/customers/${id}/delete`, {
      method: 'POST',
      headers: headers
    }).then(response => {
      return response.json();
    }); 
  },

  async getRooms(data = {}) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return await _client(`${SERVER_HOST}/json/rooms`, {
      method: 'GET',
      headers: headers
    }).then(response => {
      return response.json();
    });
  },

  async createRoom(data) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return await _client(`${SERVER_HOST}/json/rooms`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: headers
    }).then(response => {
      return response.json();
    });
  },

  async updateRoom(data, id) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return await _client(`${SERVER_HOST}/json/rooms/${id}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: headers
    }).then(response => {
      return response.json();
    });
  },

  async getRoom(id) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return await _client(`${SERVER_HOST}/json/rooms/${id}`, {
      method: 'GET',
      headers: headers
    }).then(response => {
      return response.json();
    });
  },

  async deleteRoom(id) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return await _client(`${SERVER_HOST}/json/rooms/${id}/delete`, {
      method: 'POST',
      headers: headers
    }).then(response => {
      return response.json();
    });
  },

  async getCustomerFromBooking(roomId) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return await _client(`${SERVER_HOST}/json/reservations/client/${roomId}`, {
      method: 'GET',
      headers: headers
    }).then(response => {
      return response.json();
    });
  },

  async bookingRoom(customerId, roomId) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
  
    return await _client(`${SERVER_HOST}/json/reservations/${customerId}/${roomId}`, {
      method: 'POST',
      headers: headers
    }).then(response => {
      return response.json();
    });
  }
}

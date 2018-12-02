import React, { Component } from 'react';

export default class extends Component {
  render() {
    return <footer className="footer">
      <div className="container-fluid">
        <nav className="pull-left">
          <ul>
            <li>
              <a href="/">
                Home
              </a>
            </li>
            <li>
              <a href="https://es.stackoverflow.com/users/15252/german-alzate">
                Germán Alzate
              </a>
            </li>
            <li>
              <a href="https://github.com/german970814/hotelium">
                Repositorio
              </a>
            </li>
          </ul>
        </nav>
        <div className="copyright pull-right">
          &copy; {new Date().getFullYear()}, Creado con <i className="fa fa-heart heart"></i> por <a href="https://es.stackoverflow.com/users/15252/german-alzate">Germán Alzate</a>
        </div>
      </div>
    </footer>
  }
}
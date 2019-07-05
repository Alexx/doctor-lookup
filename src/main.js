import { DoctorList } from './doctors.js';
import './styles.css';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

$(document).ready(function () {
  $('#doctorForm').submit(function (event) {
    event.preventDefault();

    let service = new DoctorList();
    let promise = service.getDoctor();

    promise.then(function (response) {
      let body = JSON.parse(response);
      $('.output').text(body);
    }, function (error) {

      $('.output').text('Error message');
    });
  });
});

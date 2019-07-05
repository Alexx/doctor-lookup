const DoctorList = require('./doctors.js');
import './styles.css';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

$(document).ready(function () {
  $('#doctorForm').submit(function (event) {
    event.preventDefault();

    let service = new DoctorList;
    let promise = service.getDoctor();

    promise.then(function (response) {
      let body = JSON.parse(response);
      console.log(body);
      body.data.forEach(function (doctor) {
        const firstName = doctor.profile.first_name;
        const lastName = doctor.profile.last_name;
        const image = doctor.profile.image_url;

        doctor.practices.forEach(function (practice) {
          if (practice.within_search_area) {
            const address = `${practice.visit_address.city} ${practice.visit_address.state}, ${practice.visit_address.zip}
            \n${practice.visit_address.street}`;
            console.log(address);
          }
        });

      });
    }, function (error) {

      $('.output').text('Error message');
    });
  });
});

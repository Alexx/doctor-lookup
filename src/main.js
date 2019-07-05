const DoctorList = require('./doctors.js');
import './styles.css';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

let generateDoctorCard = (doctorFirstName, doctorLastName, image, acceptingNewPatience, address) => {
  let htmlForDoctor =
  `<div class='col-md-3'>
    <div class="card">
      <img class="card-img-top" src="${image}" alt="Card image cap">
      <div class="card-body">
      <h5 class="card-title">${doctorFirstName} ${doctorLastName}</h5>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">Address: ${address}</li>
        <li class="list-group-item">Accepting new patients: ${acceptingNewPatience}</li>
      </ul>
    </div>
  </div>`;

  $('#doctors').append(htmlForDoctor);
};

$(document).ready(function () {
  $('#doctorForm').submit(function (event) {
    event.preventDefault();
    $('#doctors').html('');
    const query = $('#medIssue').val();
    let service = new DoctorList;
    let promise = service.getDoctor(query);

    promise.then(function (response) {
      let body = JSON.parse(response);
      body.data.forEach(function (doctor) {

        const firstName = doctor.profile.first_name;
        const lastName = doctor.profile.last_name;
        const image = doctor.profile.image_url;

        doctor.practices.forEach(function (practice) {
          if (practice.within_search_area) {
            const acceptingNewPatience = practice.accepts_new_patients;
            const address = `${practice.visit_address.city} ${practice.visit_address.state}, ${practice.visit_address.zip}\n${practice.visit_address.street}`;
            generateDoctorCard(firstName, lastName, image, acceptingNewPatience, address);
          }
        });
      });
    }, function (error) {

      $('.output').text('Error message');
    });
  });
});

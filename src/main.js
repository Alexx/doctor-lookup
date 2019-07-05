const DoctorList = require('./doctors.js');
import './styles.css';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

let generateDoctorCards = (docArray) => {
  console.log(docArray);
  docArray.forEach(function(doctor) {
    let htmlForDoctor =
    `<div class='col-md-3'>
    <div class='card'>
    <img class='card-img-top' src='${doctor[2]}' alt='Card image cap'>
    <div class='card-body'>
    <h5 class='card-title'>${doctor[0]} ${doctor[1]}</h5>
    </div>
    <ul class='list-group list-group-flush'>
    <li class='list-group-item'>Address: ${doctor[3]}</li>
    <li class='list-group-item'>Accepting new patients: ${doctor[4]}</li>
    </ul>
    </div>
    </div>`;

    $('#doctors').append(htmlForDoctor);
  })
};

let checkEmpty = (docArray) => {
  debugger;
  if (docArray.length <= 0) {
    return new Error('Returned no doctors!')
  } else {
    return true;
  }
}

$(document).ready(function () {
  $('#doctorForm').submit(function (event) {
    let doctorArray = [];
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
        let address;
        let acceptingNewPatience;
        doctor.practices.forEach(function (practice) {
          if (practice.within_search_area) {
            acceptingNewPatience = practice.accepts_new_patients;
            address = `${practice.visit_address.city} ${practice.visit_address.state}, ${practice.visit_address.zip}\n${practice.visit_address.street}`;
          }
        });
        doctorArray.push([firstName, lastName, image, address, acceptingNewPatience]);

      });
      generateDoctorCards(doctorArray);
    }, function (error) {

      $('.output').text('Error message');
    });


    try {
      const isNotEmpty = checkEmpty(doctorArray);
      if (checkEmpty instanceof Error) {
        console.log(isNotEmpty.message);
        throw Error('Returned no doctors!');
      } else {
        console.log("Try was successful, so no need to catch!");
      }
    } catch(error) {
      console.error(`Alert! We have an error: ${error.message}`);
    }

  });
});

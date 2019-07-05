const DoctorList = require('./doctors.js');
import './styles.css';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

let generateDoctorCard = (doctorFirstName, doctorLastName, image, acceptingNewPatience, address) => {
  // let htmlForDoctor = `<div class='col-md-4'>
  //   <div class="card" style="width: 18rem;">
  //   <img class="card-img-top" src="${image}" alt="Card image cap">
  //   <div class="card-body">
  //   <h5 class="card-title">${doctorLastName} ${doctorLastName}</h5>
  //   </div>
  //   <ul class="list-group list-group-flush">
  //     <li class="list-group-item">Address: ${address}</li>
  //     <li class="list-group-item">Accepting new patients: ${acceptingNewPatience}</li>
  //   </ul>
  //   </div>
  // </div>`;

  console.log(`this is a last name: ${doctorLastName}`);
  $('#doctors').text = doctorLastName;
};

$(document).ready(function () {
  $('#doctorForm').submit(function (event) {
    event.preventDefault();
    const query = $('#medIssue').val();
    let service = new DoctorList;
    let promise = service.getDoctor(query);

    promise.then(function (response) {
      let body = JSON.parse(response);
      console.log(body);
      body.data.forEach(function (doctor) {
        const firstName = doctor.profile.first_name;
        const lastName = doctor.profile.last_name;
        const image = doctor.profile.image_url;
        console.log(`${firstName} ${lastName}\n${image}`);
        doctor.practices.forEach(function (practice) {
          if (practice.within_search_area) {
            const acceptingNewPatience = practice.accepts_new_patients;
            const address = `${practice.visit_address.city} ${practice.visit_address.state}, ${practice.visit_address.zip}
            \n${practice.visit_address.street}`;
            generateDoctorCard(firstName, lastName, image, acceptingNewPatience, address);
          }
        });
      });
    }, function (error) {

      $('.output').text('Error message');
    });
  });
});

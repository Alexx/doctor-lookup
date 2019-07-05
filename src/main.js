
const DoctorPull = require('./doctorAPI');
const DoctorList = require('./doctors');
import './styles.css';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

let displayDoctorCards = (docList) => {
  docList.doctors.forEach(function(doctor) {
    let htmlForDoctor =
    `<div class='col-md-3'>
       <div class='card'>
         <img class='card-img-top' src='${doctor[2]}' alt='Card image cap'>
         <div class='card-body'>
          <h5 class='card-title'>${doctor[0]} ${doctor[1]}</h5>
         </div>
         <ul class='list-group list-group-flush'>
           <li class='list-group-item'>Address: ${doctor[3]}</li>
           <li class='list-group-item'>Accepting new patients: ${doctor[4]}</ li>
         </ul>
       </div>
     </div>`;

    $('#doctors').append(htmlForDoctor);
  });
};

let checkEmpty = (docList) => {
  if (docList.doctors.length <= 0) {
    return new Error('Returned no doctors. Try to reword your search query.');
  } else {
    return true;
  }
};

let grabNewDoctor = (docList, doctor) => {
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
  return [firstName, lastName, image, address, acceptingNewPatience];
};

$(document).ready(function () {
  $('#doctorForm').submit(function (event) {
    event.preventDefault();
    let currentDoctorList = new DoctorList;
    $('#doctors').html('');
    $('#errorOutput').text('');
    const query = $('#medIssue').val();
    let service = new DoctorPull;
    let promise = service.getDoctor(query);

    promise.then(function (response) {
      let body = JSON.parse(response);
      body.data.forEach(function (doctor) {

        let currentDoc = grabNewDoctor(currentDoctorList, doctor);
        currentDoctorList.pushDoctor(currentDoc);

      });
      displayDoctorCards(currentDoctorList);
      try {
        const isNotEmpty = checkEmpty(currentDoctorList);
        if (isNotEmpty instanceof Error) {
          $('#errorOutput').text(isNotEmpty.message);
          throw Error('Returned no doctors. Try to reword your search query.');
        } else {
          console.log('Try was successful, so no need to catch!');
        }
      } catch(error) {
        console.error(`Alert! We have an error: ${error.message}`);
      }
    }, function (error) {

      $('.output').text('Error message');
    });
  });
});

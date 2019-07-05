const DoctorPull = require('./doctorAPI');
const DoctorList = require('./doctors');

test('test', () => {
  const testDoctorPull = new DoctorList;

  const medicalInput = 'Renee Robertson';
  const nameInput = 'Tooth Ache';
  const service = new DoctorPull;
  const promise = service.getDoctor(nameInput, medicalInput);

  promise.then(function (response) {
    const body = JSON.parse(response);
    for(const doctor of body.data) {

      const currentDoc = grabNewDoctor(testDoctorPull, doctor);
      testDoctorPull.pushDoctor(currentDoc);

    }

  }, function (error) {

    $('#errorOutput').text('Unexpected api error!');
  });
  console.log(testDoctorPull);

  expect(testDoctorPull.doctors).toBe('Renee Robertson');
});

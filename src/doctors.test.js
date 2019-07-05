const DoctorList = require('./doctors');

test('Should test if class inits an empty array', () => {
  let testList = new DoctorList;
  expect(testList.doctors.length).toBe(0);
});

class DoctorList{
  getDoctor(userQuery) {
    return new Promise(function (resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `https://api.betterdoctor.com/2016-03-01/doctors?query=${userQuery}&location=45.520%2C-122.677%2C100&user_location=45.520%2C-122.677&skip=0&limit=10&user_key=${process.env.apiKey}`;
      request.onload = function () {
        if (this.status === 200) {
          resolve(request.response);
        }else {
          reject(Error(request.statusText));
        }
      };

      request.open('GET', url, true);
      request.send();
    });
  }
}
module.exports = DoctorList;

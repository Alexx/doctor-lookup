class DoctorPull{
  getDoctor(nameQuery, conditionQuery) {
    return new Promise(function (resolve, reject) {
      const request = new XMLHttpRequest();
      let url;
      const frontAPI = 'https://api.betterdoctor.com/2016-03-01/doctors';
      const backAPI = '&location=45.520%2C-122.677%2C100&user_location=45.520%2C-122.677&skip=0&limit=10&user_key=';
      
      nameQuery === '' ? url = `${frontAPI}?query=${conditionQuery}${backAPI}${process.env.apiKey}` : url = `${frontAPI}?name=${nameQuery}&query=${conditionQuery}${backAPI}${process.env.apiKey}`;

      request.onload = function () {

        this.status === 200 ? resolve(request.response) : reject(Error(request.statusText));
      };

      request.open('GET', url, true);
      request.send();
    });
  }
}
module.exports = DoctorPull;

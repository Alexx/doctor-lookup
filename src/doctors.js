class DoctorList{
  getDoctor() {
    return new Promise(function (resolve, reject) {
      let request = new XMLHttpRequest();
      let url = process.env.apiKey;
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

import MedicalIssue from './../src/medicalissue.js';

describe('MedicalIssue', function() {

  beforeEach(function() {
    jasmine.clock().install();
  });

  afterEach(function() {
    jasmine.clock().uninstall();
  });

  it('should create an object constructor', function() {
    const issue = new MedicalIssue("symptom");
    expect(issue.symptom).toEqual("symptom")
  });

  it('should perform an XMLHttpRequest and wait for a result', function() {
    let result = "";
    const symptom = "dentist";
    const issue = new MedicalIssue(symptom);
    let promise = new Promise(function (resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `https://api.betterdoctor.com/2016-03-01/doctors?query=${issue.symptom}&location=or-portland&user_location=37.773%2C-122.413&skip=0&limit=1&user_key=${process.env.exports.apiKey}`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      };
      request.open("GET", url, true);
      request.send();
    });

    promise.then(function(response) {
      const body = JSON.parse(response);
      const doctorName = body.data[0].practices[0].name;
      result = doctorName;
    }, function(error) {
      const errorString = `There was an error processing your request: ${error.message}`;
      return errorString;
    });
    jasmine.clock().tick(6001);
    expect(result).toEqual("Richard Ashton, DM")
  })


});

import './scss/styles.scss';
import MedicalIssue from './medicalissue.js';
import $ from 'jquery';




$(document).ready(function(){
  $('#symptomButton').click(function() {
    const symptom = $('#symptom').val();
    const issue = new MedicalIssue(symptom);
    $('#symptom').val("");
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
      $(".results").html(doctorName)
    }, function(error) {
      const errorString = `There was an error processing your request: ${error.message}`;
      return errorString;
    });
  });
});

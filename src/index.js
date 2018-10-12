import './scss/styles.scss';
import MedicalIssue from './medicalissue.js';
import $ from 'jquery';




$(document).ready(function(){
  $('#symptomButton').click(function() {
    const symptom = $('#symptom').val();
    const issue = new MedicalIssue(symptom);
    $('#symptom').val("");
    let promise = issue.getDoctor(issue.symptom);

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

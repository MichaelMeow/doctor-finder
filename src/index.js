import './scss/styles.scss';
import MedicalIssue from './medicalissue.js';
import $ from 'jquery';




$(document).ready(function(){
  $('#symptomButton').click(function() {
    const symptom = $('#symptom').val();
    const issue = new MedicalIssue(symptom);
    $('#symptom').val("");
    let promise = issue.getDoctorBySymptom(issue.symptom);

    promise.then(function(response) {
      $(".results").html("");
      const body = JSON.parse(response);
      const dataArray = body.data;
      for (var i = 0; i < dataArray.length; i++) {
        $(".results").append("<ul>" + i);
        $(".results").append("<li>First Name: " + dataArray[i].profile.first_name + "</li>");
        $(".results").append("<li>Last Name: " + dataArray[i].profile.last_name + "</li>");
        $(".results").append("<li>Phone: " + dataArray[i].practices[0].phones[0].number + "</li>");
        $(".results").append("<li>Address: " + dataArray[i].practices[0].visit_address.street + "</li>");
        if (dataArray[i].practices[0].website){
          $(".results").append("<li>Website: " + dataArray[i].practices[0].website + "</li>");
        }
        $(".results").append("<li>Accepting New Patients?: " + dataArray[i].practices[0].accepts_new_patients + "</li>");
        $(".results").append("</ul>");
      }
    }, function(error) {
      const errorString = `There was an error processing your request: ${error.message}`;
      return errorString;
    });
  });

  $('#doctorNameButton').click(function() {
    const doctorName = $('#doctorName').val();
    const issue = new MedicalIssue(" ", doctorName);
    $('#doctorName').val("");
    let promise = issue.getDoctorByName(issue.doctorName);

    promise.then(function(response) {
      $(".doctorSearch").html("");
      const body = JSON.parse(response);
      const dataArray = body.data;
      for (var j = 0; j < dataArray.length; j++) {

        $(".doctorSearch").append("<ul>" + j);
        $(".doctorSearch").append("<li>First Name: " + dataArray[j].profile.first_name + "</li>");
        $(".doctorSearch").append("<li>Last Name: " + dataArray[j].profile.last_name + "</li>");
        $(".doctorSearch").append("<li>Phone: " + dataArray[j].practices[0].phones[0].number + "</li>");
        $(".doctorSearch").append("<li>Address: " + dataArray[j].practices[0].visit_address.street + "</li>");

        if (dataArray[j].practices[0].website){
          $(".doctorSearch").append("<li>Website: " + dataArray[j].practices[0].website + "</li>");
      }
        $(".doctorSearch").append("<li>Accepting New Patients?: " + dataArray[j].practices[0].accepts_new_patients + "</li>");

        $(".doctorSearch").append("</ul>");
      }
    }, function(error) {
      const errorString = `There was an error processing your request: ${error.message}`;
      return errorString;
    });
  });
});

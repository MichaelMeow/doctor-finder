import MedicalIssue from './../src/medicalissue.js';

describe('MedicalIssue', function() {

  it('should create an xmlhttprequest from the betterdoctor API', function() {
    // perform function and test for result
    const issue = new MedicalIssue("symptom");
    expect(issue.symptom).toEqual("symptom")
  });
  // it('should create an asynchronous request', function() {
  //   // perform function
  //   start timer in Javascript after promise
  //   finish request
  //   stop timer
  //   test that output time taken larger than zero
  //   expect().toEqual()
  // });

});

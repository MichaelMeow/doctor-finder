import MedicalIssue from './../src/medicalissue.js';

describe('MedicalIssue', function() {

  it('should create an object constructor', function() {
    // perform function and test for result
    const issue = new MedicalIssue("symptom");
    expect(issue.symptom).toEqual("symptom")
  });


});

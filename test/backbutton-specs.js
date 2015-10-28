var makeSuite = require('./helpers').makeSuite;

makeSuite('Test Suite 2', function() {

  it('should verify back button', function() {
    browser
      .elementByAccessibilityId('Graphics')
      .click()
      .elementByAccessibilityId('Arcs')
        .should.eventually.exist
      .back()
      .elementByName('App')
        .should.eventually.exist;
  });

});

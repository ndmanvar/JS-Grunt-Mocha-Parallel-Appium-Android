wd = require('wd');
require('colors');
var _ = require("lodash");
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
// var browser;
chai.use(chaiAsPromised);
chai.should();
chaiAsPromised.transferPromiseness = wd.transferPromiseness;

wd.configureHttp({
    timeout: 240000,
    retryDelay: 15000,
    retries: 5
});

function beforeEachExample(done) {
    var username = process.env.SAUCE_USERNAME;
    var accessKey = process.env.SAUCE_ACCESS_KEY;
    browser = wd.promiseChainRemote("ondemand.saucelabs.com", 80, username, accessKey);

    browser
        .init({
            name: this.currentTest.title,
            browserName: '',
            appiumVersion: '1.4.13',
            deviceName: process.env.deviceName,
            platformVersion: process.env.platformVersion,
            platformName: process.env.platformName,
            app: 'http://appium.s3.amazonaws.com/ContactManager.apk'
        })
        .nodeify(done);
};

function afterEachExample(done) {
    // allPassed = allPassed && (this.currentTest.state === 'passed');
    browser
        .quit()
        .sauceJobStatus(true)
        .nodeify(done);
};

function makeSuite(desc, cb) {
    describe(desc, function() {
        var browser;

        this.timeout(240000);

        beforeEach(beforeEachExample);
        cb();
        afterEach(afterEachExample);
    });
};

exports.makeSuite = makeSuite;

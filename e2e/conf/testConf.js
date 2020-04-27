const path = require('path');

exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  getPageTimeout: 70000,
  allScriptsTimeout: 70000,
  SELENIUM_PROMISE_MANAGER: false,
  framework: "custom",
  frameworkPath: require.resolve("protractor-cucumber-framework"),
  specs: ["../tests/cucumber/features/*.feature"],
  cucumberOpts: {
    strict: true,
    format: 'json:.tmp/results.json',
    require: [
      "../tests/cucumber/stepDefinitions/stepDefinition.js",
      "../support/*.js",
    ],
    tags: "(@smoke)",
  },

  multiCapabilities: [
    {
      browserName: "chrome",
      shardTestFiles: true,
      maxInstances: 1,
      chromeOptions: {
        useAutomationExtension: false,
        args: ["disable-infobars"],
      },
      metadata:  {

        device: 'Windows Server',
        platform: {
          name: 'WINDOWS',
          version: '2019'
        }
      }
  
    }],
  

plugins: [{
  package: require.resolve('protractor-multiple-cucumber-html-reporter-plugin'),
  options: {
    // read the options part
    automaticallyGenerateReport: true,
    removeExistingJsonReportFile: true,
    removeOriginalJsonReportFile: true,
    jsonOutputPath: '.tmp/json-output-folder/',
    reportPath: '.tmp/report/',
    saveCollectedJSON: true,
    reportName: 'myol Automation Test Reports',
    pageFooter: '<div><p>  testautomation  </p></div>',
    pageTitle: 'myol TEST',
    customData: {
      title: 'About Tested Software',
      data: [{
          label: 'Project',
          value: 'myol'
        },
        {
          label: 'Release 1.0.0',
          value: '1.1.0'
        }
      ]

    },
    displayDuration: true
  }
}]

};

const path = require('path');
const inputs = require("../support/helper");
const fs = require('fs-extra');

exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  getPageTimeout: 70000,
  allScriptsTimeout: 70000,
  SELENIUM_PROMISE_MANAGER: false,
  framework: "custom",
  frameworkPath: require.resolve("protractor-cucumber-framework"),
  specs: ["../tests/cucumber/features/createCheckInTest.feature",
  "../tests/cucumber/features/*.feature"*],
  cucumberOpts: {
    strict: true,
    format: 'json:.tmp/jsons/results.json',
    require: [
      "../tests/cucumber/stepDefinitions/stepDefinition.js",
      "../support/*.js",
    ],
    tags: "(@smoke)",
  },

  beforeLaunch : async () => {
  
    await fs.remove('broadcast/');     
    console.log('broadcast removed, success!')
},

afterLaunch : async () => {
    await fs.mkdir('broadcast/');
    await fs.copy('.tmp/', 'broadcast/');
    var d = new Date().toLocaleString();


    d = d.slice(0, 15)+d.slice(20);
    var folderName = d.replace(/\//g, '_').replace(/:/g, '.').replace(/,/g, '-').replace(/\s/g, '_');

    await fs.copy('broadcast/', '../reportsBackup'+'/'+folderName);
    console.log('.tmp moved to broadcast, success!')
    await fs.remove('.tmp/');
    console.log('.tmp/ removed, success!')
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
    saveCollectedJSON: false,
    automaticallyGenerateReport: true,
    removeExistingJsonReportFile: true,
    removeOriginalJsonReportFile: true,
    jsonOutputPath: '.tmp/json-output-folder/',
    reportPath: '.tmp/report/',
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
          label: 'Release',
          value: '1.0.0'
        },
        ,
            {label: 'Test Execution Time', value: new Date().toLocaleString().slice(0, 15) }
      ]

    },
    displayDuration: true

  }
}]

};

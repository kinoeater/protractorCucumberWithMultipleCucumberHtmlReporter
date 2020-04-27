const path = require('path');

exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  getPageTimeout: 70000,
  allScriptsTimeout: 70000,
  SELENIUM_PROMISE_MANAGER: false,
  framework: "custom",
  frameworkPath: require.resolve("protractor-cucumber-framework"),
  specs: ["../tests/cucumber/features/*.feature"*],
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
      browserName: 'firefox',
      shardTestFiles: true,
      maxInstances: 1,
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
        pageFooter: '<div><p>  myol  </p></div>',
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
                {label: 'Test Execution Time', value: new Date().toLocaleString() }
          ]
    
        },
        displayDuration: true
    
      }
    }]

};

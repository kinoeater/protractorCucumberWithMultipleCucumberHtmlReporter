"use strict";

const { BeforeAll, After, Status} = require("cucumber");

var {setDefaultTimeout} = require('cucumber');

const conf = require("../conf/chromeConf", "../conf/firefoxConf", "../conf/crossBrowserConf").config;

    BeforeAll({}, function() {

        setDefaultTimeout(10 * 6000);
        browser.manage().window().maximize();
       // return browser.get(conf.baseUrl);
    
    });
  

    After(function(scenario) {
        if (scenario.result.status === Status.FAILED) {
          const attach = this.attach; // cucumber's world object has attach function which should be used
          return browser.takeScreenshot().then(function(png) {
            const decodedImage = new Buffer(png, "base64");
            return attach(decodedImage, "image/png");
          });
        }
        browser.close();
      });
  
  


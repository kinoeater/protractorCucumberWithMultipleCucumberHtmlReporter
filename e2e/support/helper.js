
var fs = require('fs');

var Helper = function () {

    //WAIT FOR THE ELEMENT  TO PRESENT
    this.waitForElementPresent = function (element) {
        return browser.wait(() => (element.isPresent()), 60000);
    }

    //WAIT FOR THE ELEMENT  TO DISPLAY
    this.waitForElementDisplayed = function (element) {
        return browser.wait(() => (element.isDisplayed()), 60000);
    }

    //HARD CODED WAIT
    this.sleep = function (time) {
        browser.sleep(time); //5000
    }

    this.waitForElementVisibility = function (element) {
        let EC = protractor.ExpectedConditions;
        let condition = EC.visibilityOf(element);
        browser.wait(condition, 30000);
    }

    this.waitForElementPresence = async function (element) {
    
        let EC = protractor.ExpectedConditions;  
        await browser.wait(EC.presenceOf(element), 5000);
    }


    this.getClassAttribute = function (element) {
        return element.getAttribute('class');
    }

    this.getHiddenAttribute = function (element) {
        return element.getAttribute('aria-hidden');
    }

    this.getAreaDisabledAttribute = function (element) {
        return element.getAttribute('aria-disabled');
    }


    this.getAttributeValue = function (element) {
        return element.getAttribute('value');
    }

 
    this.getText = function (element) {
        return element.getText();
    }


    this.performEscape = async function () {
        await browser.actions().sendKeys(protractor.Key.ESCAPE).perform();
    }

    this.performEnter = async function () {
        await browser.actions().sendKeys(protractor.Key.ENTER).perform();
    }


    this.performTab = async function () {
        await browser.actions().sendKeys(protractor.Key.TAB).perform();
    }


    //CTRL + R
    this.refreshPage = async function () {
        return browser.actions().keyDown(protractor.Key.CONTROL).sendKeys('r').perform();
    }


    this.selectAllAction = async function () {
        return browser.actions().keyDown(protractor.Key.CONTROL).sendKeys('a').perform();
    }


    this.copyContentAction = async function () {
        return browser.actions().keyDown(protractor.Key.CONTROL).sendKeys('c').perform();
    }


    this.mouseMoveAction = async function (element) {
        return browser.actions().mouseMove(element).perform();
    }

    
    this.switchToNonAngularPage = function () {
        browser.ignoreSynchronization = true;
    };

    
    this.switchToAngularPage = function () {
        browser.ignoreSynchronization = false;
    };

    

    this.removeL = function (a) {
        const totalCapacityVolume = Number(a.replace("L","").replace(".","").trim());
    };

    this.moveDirectory = function move(oldPath, newPath, callback) {

        fs.rename(oldPath, newPath, function (err) {
            if (err) {
                if (err.code === 'EXDEV') {
                    copy();
                } else {
                    callback(err);
                }
                return;
            }
            callback();
        });
    
        function copy() {
            var readStream = fs.createReadStream(oldPath);
            var writeStream = fs.createWriteStream(newPath);
    
            readStream.on('error', callback);
            writeStream.on('error', callback);
    
            readStream.on('close', function () {
                fs.unlink(oldPath, callback);
            });
    
            readStream.pipe(writeStream);
        }
    }
}

module.exports = new Helper();
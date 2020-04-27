const { Given, When, Then } = require("cucumber");
const inputs = require("../../../support/inputs");
const pageElements = require("../../../support/pageElements");
const expect = require("chai").expect;

Given(/^google page is open$/, async () => {
  await browser.waitForAngularEnabled(false);
  // browser.waitForAngular();
  browser.driver.get("https://www.google.com/");
});

When(/^User logs in$/, async () => {
  await browser.waitForAngularEnabled(false);
});

When(/^User enters "([^"]*)" to "([^"]*)"$/, async (args1, args2) => {
  var EC = protractor.ExpectedConditions;
  await browser.wait(EC.visibilityOf(pageElements.pageElements(args2)), 10000);
  await pageElements.pageElements(args2).clear();
  await pageElements.pageElements(args2).sendKeys(inputs.inputs(args1));
});

When(/^User clicks on \"([^\"]*)\"$/, async function (args1) {
  var EC = protractor.ExpectedConditions;
  await browser.wait(EC.visibilityOf(pageElements.pageElements(args1)), 10000);
  await pageElements.pageElements(args1).click();
});

When(/^User clicks on \"([^\"]*)\" for \"([^\"]*)\"$/, async function (
  args1,
  args2
) {
  var EC = protractor.ExpectedConditions;
  await browser.wait(EC.visibilityOf(pageElements.pageElements(args1)), 10000);
  await pageElements.pageElements(args1).click();

  console.log(args2);
});

Then(/^User can see \"([^\"]*)\"$/, async function (args1) {
  let EC = protractor.ExpectedConditions;
  await browser.wait(EC.presenceOf(pageElements.pageElements(args1)), 10000);
  expect(await pageElements.pageElements(args1).isDisplayed()).to.be.true;
});

Then(/^User can see \"([^\"]*)\" that means \"([^\"]*)\"$/, async function (
  args1,
  args2
) {
  let EC = protractor.ExpectedConditions;
  await browser.wait(EC.presenceOf(pageElements.pageElements(args1)), 10000);
  console.log("Yes, found the element");
  console.log(args2);
});

Then(/^User cannot see \"([^\"]*)\" that means \"([^\"]*)\"$/, async function (
  args1,
  args2
) {
  await browser.sleep("1000");
  let items = await element.all(pageElements.pageElements(args1));
  console.log("items= " + items.length);
  expect(items.length).to.equal(0);
  console.log(args2);
});

Then(/^User still sees \"([^\"]*)\" that means \"([^\"]*)\"$/, async function (
  args1,
  args2
) {
  let EC = protractor.ExpectedConditions;
  await browser.wait(EC.invisibilityOf(pageElements.pageElements(args1)), 5000);
  console.log(args2);
});

When(/^User enters \"([^\"]*)\" different fuel value$/, async function (args1) {
  let elementListOfLoadedProductNames = element.all(by.css(".product-name"));
  let elementListOfGarbageIcons = element.all(
    by.css(".icon-garbage-can.clickable")
  );
  let EC = protractor.ExpectedConditions;
  let addButton = pageElements.pageElements("addButton");
  let fuelAmountInputArea = pageElements.pageElements("fuelAmountInputArea");

  for (let i = 1; i <= args1; i++) {
    let randomFuelAmount = Math.floor(Math.random() * Math.floor(30000));
    await browser.wait(EC.presenceOf(addButton), 10000);
    await fuelAmountInputArea.clear();
    console.log(i + ") Load Fuel amaount is: " + randomFuelAmount);
    await fuelAmountInputArea.sendKeys(randomFuelAmount);
    await browser.wait(EC.presenceOf(addButton), 10000);
    await addButton.click();
    console.log(
      "Loaded element type is: " +
        (await elementListOfLoadedProductNames.get(0).getText())
    );
  }

  await browser
    .actions()
    .mouseMove(elementListOfLoadedProductNames.get(args1 - 1))
    .perform();
  console.log(
    "Total amount of products: " +
      ((await elementListOfLoadedProductNames.count()) - 1)
  );
  console.log(
    "Total amount of delete icons: " + (await elementListOfGarbageIcons.count())
  );
});

When(
  /^User deletes first \"([^\"]*)\" entered fuel value entry$/,
  async function (args1) {
    let elementListOfGarbageIcons = element.all(
      by.css(".icon-garbage-can.clickable")
    );
    let elementListOfLoadedProductNames = element.all(by.css(".product-name"));
    let EC = protractor.ExpectedConditions;
    console.log(
      "Amount of products before deleting: " +
        ((await elementListOfLoadedProductNames.count()) - 1)
    );
    console.log(
      "Amount of delete icons before deleting: " +
        (await elementListOfGarbageIcons.count())
    );

    for (let i = 0; i < args1; i++) {
      let elementListOfGarbageIcons = element.all(
        by.css(".icon-garbage-can.clickable")
      );
      let elementListOfLoadedProductNames = element.all(
        by.css(".product-name")
      );
      await browser.wait(
        EC.presenceOf(elementListOfGarbageIcons.get(0)),
        10000
      );
      await elementListOfGarbageIcons.get(0).click();
      console.log(
        "Deleted element type is: " +
          (await elementListOfLoadedProductNames.get(0).getText())
      );
    }

    console.log(
      "Amount of products after deleting: " +
        ((await elementListOfLoadedProductNames.count()) - 1)
    );
    console.log(
      "Amount of delete icons after deleting: " +
        (await elementListOfGarbageIcons.count())
    );
  }
);

When(/^User counts the number of check-in before$/, async function () {
  let elementListcheckIns = element.all(by.css("tr.clickable"));
  console.log("Count of check-ins is: " + (await elementListcheckIns.count()));
  const fs = require("fs");
  var file_content = fs.readFileSync(
    "e2e/tests/cucumber/stepDefinitions/testData.json"
  );
  var content = JSON.parse(file_content);
  //change the value in the in-memory object
  content.checkInCountBefore = await elementListcheckIns.count();
  console.log(content.checkInCountBefore);
  //Serialize as JSON and Write it to testData file
  fs.writeFileSync(
    "e2e/tests/cucumber/stepDefinitions/testData.json",
    JSON.stringify(content)
  );
});

When(
  /^User counts the number of check-in after and verifies \"([^\"]*)\" new entry created$/,
  async function (args1) {
    let elementListcheckIns = element.all(by.css("tr.clickable"));
    await browser.sleep("4000");
    console.log(
      "Count of check-ins is: " + (await elementListcheckIns.count())
    );
    const fs = require("fs");
    var file_content = fs.readFileSync(
      "e2e/tests/cucumber/stepDefinitions/testData.json"
    );
    var content = JSON.parse(file_content);

    await browser.sleep("2000");
    content.checkInCountAfter = await elementListcheckIns.count();

    console.log(content.checkInCountBefore);
    console.log(content.checkInCountAfter);
    expect(
      content.checkInCountAfter - content.checkInCountBefore,
      "User counts the number of check-in after and verifies one new entry created"
    ).to.equal(1);

    //Serialize as JSON and Write it to testData file
    fs.writeFileSync(
      "e2e/tests/cucumber/stepDefinitions/testData.json",
      JSON.stringify(content)
    );
  }
);

When(/^User waits$/, async () => {
  await browser.sleep("2000");
  console.log("Wait for some time");
});

When(/^User clicks on nextButton$/, async () => {
  // await browser.sleep('4000');
  var EC = protractor.ExpectedConditions;
  await browser.wait(
    EC.presenceOf(pageElements.pageElements("nextButton")),
    10000
  );
  await pageElements.pageElements("nextButton").click();
});

When(/^User tests$/, async () => {

  await browser.sleep("5000");

  console.log(await browser.getAllWindowHandles());
  let b = await browser.executeScript(
    "let k = document.querySelectorAll('.fd-form__control.ng-valid.ng-dirty.ng-touched').length; return k;"
  );
  let c = await browser.element.all(by.css("alert-container"));
  console.log(c);
  //const text = await browser.executeScript(`return 'some text';`);
  // console.log(b);
});

When(/^User clicks on an entry$/, async () => {
  let elementListcheckIns = element.all(by.css("tr.clickable"));
  // await elementListcheckIns.get(4).click();

  await element(by.xpath(".//body//tr[5]")).click();
});

When(/^User clicks on \"([^\"]*)\" for \"([^\"]*)\" in order$/, async function (
  args1,
  args2
) {
  let unloadedProducts = element.all(by.css("tr.clickable"));
  let EC = protractor.ExpectedConditions;

  let numberOfProducts = await unloadedProducts.count();
  console.log("Number of product list is: " + (await numberOfProducts));

  for (let i = 0; i < numberOfProducts; i++) {
    await browser
      .actions()
      .mouseMove(pageElements.pageElements("orderItemstobeLoadedlabel"))
      .perform();
    // await browser.sleep('1000');
    let unloadedProducts = element.all(by.css("tr.clickable"));
    await browser.wait(EC.presenceOf(unloadedProducts.get(i)), 10000);
    console.log(
      "Entered product info before click is: " +
        (await unloadedProducts.get(i).getText())
    );
    await unloadedProducts.get(i).click();
    console.log(
      "Entered product info after click is: " +
        (await unloadedProducts.get(i).getText())
    );
    await browser
      .actions()
      .mouseMove(pageElements.pageElements("totalWeightofVehicleParts"))
      .perform();
    // await browser.sleep('1000');
  }

  let compartmentCapacities = element.all(
    by.css(pageElements.pageElements("compartmentHeaderCapacityText"))
  );
  let count = await compartmentCapacities.count();

  for (let a = 0; a <= 3; a++) {
    const stringA = await compartmentCapacities.get(a).getText(); // gets the current string value for each truck compartment
    const stringList = stringA.split(" / "); // converts it into two as total capacity and current load
    const currentlyloadedfuelVolume = Number(
      stringList[0].replace(".", "").trim()
    );
    const totalCapacityVolume = Number(
      stringList[1].replace("L", "").replace(".", "").trim()
    );
    let remaningCompartmentVolume =
      totalCapacityVolume - currentlyloadedfuelVolume;

    if (!remaningCompartmentVolume) {
      // press the "garbage icon" delete the loaded fuel
      // go to unloaded product list and click one of them "that is greater than totalCapacityVolume " to lead the compartment again
      // or below isea also reolves this
      // let randomFuelAmount = Math.floor(Math.random() * Math.floor(30000)); this
      // one should be greater than smallest value in the 4 compartment values...
    }
  }
});

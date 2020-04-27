
const pageElements = (locators) =>  ({


"searchBar": element(by.xpath(".//input[@name='q']"))

  
  })[locators]

  module.exports = {
    pageElements
  }
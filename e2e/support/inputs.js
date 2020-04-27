
const inputs = (testData) =>  ({


  "checkInURL": 'http://internal.scu.implico.de/q/onlinecheckin/login',
  "validUserName": 'tci_driver',
  "validPassWord": 'tci_driver',
  "inValidUserName": 'pablo',
  "inValidPassWord": 'vincent123',
  "validDate": '21.12.2020',
  "inValidDate": '01.03.2020',
  "newValidDate": '10.10.2021',
  "validDriverFirstName": 'Dorin',
  "validDriverLastName": 'Sonea',
  "inValidDriverFirstName": 'MUSTAFA',
  "inValidDriverLastName": 'YOL',
  "driverNameCapital": 'DORIS', 
  "validDriverBirthDate": '04.05.1977',
  "inValidDriverBirthDate": '04.05.2077',
  "driverLastNameCapital": 'SONEA',
  "vehiclePlate1": 'FG-HP196',
  "vehiclePlate2": 'KEH-IM488',
  "inValidVehiclePlate": '34-HP196',
  "validLadestammValue": '196822081',
  "inValidLadestammValue": '12422453',
  "desiredFuelAmount": '15000',
  'desiredFuelAmount2': '2000',
  'desiredFuelAmount3': '1000',
  'nothing': ' '




  })[testData]

  module.exports = {
    inputs
  }

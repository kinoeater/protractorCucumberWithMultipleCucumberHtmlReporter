Feature: Trial open google tests

     
   @docker
   Scenario:  tests on google
      Given google page is open
      When User can see "searchBar"
      And User enters "Hello" to "searchBar"
      And User waits
     
sap.ui.define([], function () {
    "use strict";
  
    return {
  
      classText: function (sClass) {
        switch (sClass) {
          case "10":
            return "Business Class";
          case "20":
            return "Economy Class";
          case "30":
            return "First Class";
          default:
            return sClass;
        }
      }
  
    };
  
  });
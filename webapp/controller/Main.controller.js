sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "com/demoapp/model/formatter",
],
function (Controller,JSONModel,formatter) {
    "use strict";

    return Controller.extend("com.demoapp.controller.Main", {


      formatter: formatter,


        onInit: function () {
// creating json model for storing data

var oModel = new JSONModel();

// assigning name for the json model
this.getView().setModel(oModel, "inputmodel");


// object = {}
// array = []


this.getOwnerComponent().getModel("Tablemodel").setData([]);


        },


        submit: function(evt)
        {
// input data ( object )
         var inputdata = this.getView().getModel("inputmodel").getData();

         var newobj = {};
         newobj['vbeln'] = inputdata.vbeln;
         newobj['vkorg'] = inputdata.vkorg;
         newobj['vtweg'] = inputdata.vtweg;
         newobj['spart'] = inputdata.spart
         // table data ( array)
         var tabledata = this.getOwnerComponent().getModel("Tablemodel").getData(); 
         // push object to array
         tabledata.push(newobj);

        // update the table model
       this.getOwnerComponent().getModel("Tablemodel").setData(tabledata);

        },

        edit: async function()
        {
            this.oDialog ??= await this.loadFragment({
				name: "com.demoapp.view.edit"
			});

			this.oDialog.open();


        },

        onTableselect: function(evt)
        {
      // to know the row number
      var path = evt.getSource().getSelectedItem().getBindingContext("Tablemodel").getPath();


      // specific row data
      var oData = this.getView().getModel("Tablemodel").getProperty(path);

      
      var newobj = {};
      newobj['vbeln'] = oData.vbeln;
      newobj['vkorg'] = oData.vkorg;
      newobj['vtweg'] = oData.vtweg;
      newobj['spart'] = oData.spart
      this.getOwnerComponent().getModel("editmodel").setData(newobj);

        },


        change: function(evt)
        {

          var oupdateddata = this.getOwnerComponent().getModel("editmodel").getData();
         var oTabledata = this.getOwnerComponent().getModel("Tablemodel").getData();        
          for(var i=0;i<oTabledata.length;i++)
          {

            if(oTabledata[i].vbeln == oupdateddata.vbeln)
            {

                oTabledata[i].vkorg = oupdateddata.vkorg;
                oTabledata[i].vtweg = oupdateddata.vtweg;
                oTabledata[i].spart = oupdateddata.spart;


            }




          }

          this.getOwnerComponent().getModel("Tablemodel").setData(oTabledata);
          this.oDialog.close();


        },



        delete: function()
        {

      // Get the selected record
      var oselectedrecord = this.getOwnerComponent().getModel("editmodel").getData();
      // get the table data
      var otabledata = this.getOwnerComponent().getModel("Tablemodel").getData();
      let arr = [];
      arr = $.grep(otabledata, function( ele )
     {
         return ele.vbeln != oselectedrecord.vbeln;
     }
     
     )

    this.getView().byId("table").removeSelections(true);
     this.getOwnerComponent().getModel("Tablemodel").setData(arr);


        }



    });
});

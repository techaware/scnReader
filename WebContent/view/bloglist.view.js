sap.ui.jsview("scnReader.view.bloglist", {

	getControllerName : function() {
		return "scnReader.controller.bloglist";
	},

	createContent : function(oController) {
		var c = sap.ui.commons;
		var aControls = [];
		
//		var oMatrixLayout = new sap.ui.commons.layout.MatrixLayout();
//		oMatrixLayout.bindContext("/RSSLink/0");		
		
	  	  var oRSS = new sap.ui.commons.TextField('RSSLink');
		  oRSS.bindProperty("value","M1>RSSLink");
		  oRSS.setTooltip("Paste RSS Link here");		
		  aControls.push(oRSS);
		  
	  	  var oItemCountLabel = new sap.ui.commons.Label('ItemCountLabel');
	  	oItemCountLabel.setText("RSS Item Count");
//		  oRSS.bindProperty("value","M1>ItemCount");
//		  oRSS.setTooltip("Count of RSS Items to be fetched ");		
		  aControls.push(oItemCountLabel);
		  
	  	  var oItemCount = new sap.ui.commons.TextField('ItemCount');
	  	oItemCount.bindProperty("value","M1>ItemCount");
	  	oItemCount.setTooltip("Count of RSS Items to be fetched ");		
		  aControls.push(oItemCount);	
		  
		var oBTNRSSSubmit = new sap.ui.commons.Button({
			text : "Submit",
			tooltip : "Submit",
			press : oController.onRSSSubmit
		});
		aControls.push(oBTNRSSSubmit);
		var oBTNGetNames = new sap.ui.commons.Button({
			text : "Get Names",
			tooltip : "Get Names",
			press : oController.onGetNames
		});
		aControls.push(oBTNGetNames);		
//		oMatrixLayout.createRow(
//				oRSS,oBTNRSSSubmit 
//			);			
//		  aControls.push(oMatrixLayout);
		 
		// Customers table
		var oTable = new sap.ui.table.DataTable("tblBlogs", {
			title : "Blogs",
//			width : "100%",
			visibleRowCount: 5,
			firstVisibleRow: 3,
//			visibleRowCount : 10,
			selectionMode : sap.ui.table.SelectionMode.Single,
			editable : false,
//			expanded : true,
			rowSelect : oController.onRowSelect
		});

		oTable.setExpandedVisibleRowCount(20);
		oTable.addColumn(new sap.ui.table.Column({
			label : new c.Label({
				text : "Title"
			}),
			template : new c.TextField({
				value : "{title}"
			})

		}));

		aControls.push(oTable);
		
		// concepts table
		var oTableNames = new sap.ui.table.DataTable({
			id : 'aTable',
			title: "Identified English Names",
			visibleRowCount: 5,
			firstVisibleRow: 3,
			selectionMode: sap.ui.table.SelectionMode.None,
//			toolbar: new sap.ui.commons.Toolbar({items: [ 
//				new sap.ui.commons.Button({text: "Button in the Toolbar", press: function() { alert("Button pressed!"); }})
//			]}),
//			extension: [
//				new sap.ui.commons.Button({text: "Button in the Extension Area", press: function() { alert("Button pressed!"); }})
//			]
		});		
		//Define the columns and the control templates to be used
		var oColumn1 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Names"}),
			template: new sap.ui.commons.TextView().bindProperty("text", "text()"),
			sortProperty: "names",
			filterProperty: "names",
			width: "200px"
		});		
		oTableNames.addColumn(oColumn1);
		var oColumn2 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Class"}),
			template: new sap.ui.commons.TextView().bindProperty("text", "@DictCanon"),
			sortProperty: "class",
			filterProperty: "class",
			width: "200px"
		});		
		oTableNames.addColumn(oColumn2);		
		aControls.push(oTableNames);		
		return aControls;
	}
});
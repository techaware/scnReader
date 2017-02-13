sap.ui.jsview("scnReader.view.blogcontent", {
	
	getControllerName : function() {
		return "scnReader.controller.blogcontent";
	},

	createContent : function(oController) {
		var aControls = [];

		// Back button
		var oToolbar = new sap.ui.commons.Toolbar("tlbBlog",{width:"100%",design:"Flat"});
		oToolbar.addItem(new sap.ui.commons.Button("btnBack",
				{
					text: "Back to blog list",
					enabled: true,
					press: oController.back
				})
		);
		oToolbar.addItem(new sap.ui.commons.Button("btnConcepts",
				{
					text: "Find Concepts",
					enabled: true,
					press: oController.getConcepts
				})
		);		
		// blog content
		var oHtml = new sap.ui.core.HTML("htmlBlog") ;

	
// concepts table
		var oTable = new sap.ui.table.DataTable({
			id : 'cTable',
			title: "Identified Concepts",
			visibleRowCount: 7,
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
			label: new sap.ui.commons.Label({text: "Concept Source"}),
			template: new sap.ui.commons.TextView().bindProperty("text", "text()"),
			sortProperty: "conceptSource",
			filterProperty: "conceptSource",
			width: "200px"
		});		
		oTable.addColumn(oColumn1);
		var oColumn2 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Class"}),
			template: new sap.ui.commons.TextView().bindProperty("text", "@DictCanon"),
			sortProperty: "class",
			filterProperty: "class",
			width: "200px"
		});		
		oTable.addColumn(oColumn2);
		aControls.push(oToolbar);		
		aControls.push(oTable);
		aControls.push(oHtml);		
		return aControls;
	}
});
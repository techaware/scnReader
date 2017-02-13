sap.ui.jsview("scnReader.view.shell", {

	getControllerName : function() {
		return "scnReader.controller.shell";
	},

	createContent : function(oController) {
		var aControls = [];

		var oShell = new sap.ui.ux3.Shell({
			id : "scnReaderShell",
			appTitle : "SCN Reader",			
			showSearchTool : false,
			showInspectorTool : false,
			showFeederTool : false,
			showLogoutButton : false,
			worksetItemSelected : oController.onWorksetItemSelected
		});

		// initiate views let controller determine content
		oShell.addWorksetItem(new sap.ui.ux3.NavigationItem({
			key : "tabBlogs", 
			text : "Blogs"
		}));
//		oShell.addWorksetItem(new sap.ui.ux3.NavigationItem({
//			key : "tabDiscussions", 
//			text : "Discussions"
//		}));

		aControls.push(oShell);

		return aControls;
	}
});
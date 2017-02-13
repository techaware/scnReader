jQuery.sap.registerModulePath("scnReader", "/scnReader");

// build the application shell and place on page
var oShell = sap.ui.view({
    type : sap.ui.core.mvc.ViewType.JS,
    id : "shellView",
    viewName : "scnReader.view.shell"
});

oShell.placeAt("shellArea");

function navigate(viewName, targetView, targetPlug, oEvent, oModel){
	
	var oShell = sap.ui.getCore().byId("scnReaderShell");
	var oView = sap.ui.getCore().byId(viewName);
	var oCtrl = null;
    		
//	instantiate the content view if it doesn't exist yet
	if (!oView) {
	    oView = sap.ui.view({
			type : sap.ui.core.mvc.ViewType.JS,
			id : viewName,
			viewName : targetView
	    });
	    
	    if(oModel){
//		    bind it to the same model
//		    oView.setModel(oModel );
//	    	sap.ui.getCore().setModel(oModel);
	    }
	}

	if(oView != null){
		oCtrl = oView.getController();
	}
	if(oCtrl != null){
//		Navigate to the content view			
		oCtrl[targetPlug](oEvent);
	}	

	//		show the view
	oShell.setContent(oView,true);				
	
	return oCtrl;
}
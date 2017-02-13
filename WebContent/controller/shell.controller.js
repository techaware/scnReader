sap.ui.controller("scnReader.controller.shell", {

    onInit : function() {
		var oShell = sap.ui.getCore().byId("scnReaderShell");
		if(oShell != null){
			oShell.setContent(this.getBlogList());			
		}
    },

    onWorksetItemSelected : function(oEvent) {
		var ctrl = this.oParent.getController();
		var itemKey = oEvent.getParameter("key");
		var oShell = sap.ui.getCore().byId("scnReaderShell");
	
		switch (itemKey) {
			case "tabBlogs":
				oShell.setContent(ctrl.getBlogList(), true);
			    break;

			case "tabDiscussions":
				oShell.setContent(ctrl.getDiscussionList(), true);
			    break;
		}

    },

    getBlogList : function() {
		var oView = sap.ui.getCore().byId("vwBlogList");
		
		if (!oView) {
		    oView = sap.ui.view({
				type : sap.ui.core.mvc.ViewType.JS,
				id : "vwBlogList",
				viewName : "scnReader.view.bloglist"
		    });
		}
		return oView;
    },
    
    getDiscussionList : function() {
		var oView = sap.ui.getCore().byId("vwDiscussionList");

		return oView;
    }
    
});
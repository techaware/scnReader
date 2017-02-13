//requires the sap.ui.ux3, sap.ui.model
/*---------------------------------------------------------------*/
sap.ui.controller("scnReader.controller.blogcontent", {	
    onInit : function() {
//    	var oModel = new sap.ui.model.xml.XMLModel();
//    	sap.ui.getCore().byId("cTable").setModel(oModel);
//    	sap.ui.getCore().byId("cTable").bindRows("/DictTerm");
    },

    onExit : function() {
    },

    onBeforeRendering : function(){	
    },

    onAfterRendering : function(){
    },
    
    inBound: function(oEvent ){
		var oContext = oEvent.getParameter("rowContext");
		var bindpath = oContext + "/description";
		
		this.setContent(bindpath);
    },
    
    setContent: function(bindpath){
		var id = "htmlBlog";
		var model = sap.ui.getCore().getModel();

		var core = sap.ui.getCore();
		if (core) var elem = core.byId(id);
		
		if (elem){
			elem.setContent( model.getProperty(bindpath) );
		}    	
    },
    
    back: function(oEvent ){
//		Navigate back to the list, Don't change the model    	
//    	var oShell = sap.ui.getCore().byId("scnReaderShell");
    	navigate("vwBlogList", "scnReader.view.bloglist", "inBound", oEvent, sap.ui.getCore().getModel());
    },
    
    getConcepts: function(oEvent ){
// get concepts
    	var id = "htmlBlog";
		var core = sap.ui.getCore();
		if (core) var elem = core.byId(id);
		
		var InputHtml =  elem.getContent();
		var InputText = $(InputHtml).text();
//		Parse html to get text

//		var InputText = "SAP UI5";
		var oModel = new sap.ui.model.xml.XMLModel();
		$.ajax({
		    url: 'http://localhost:8080/uima-simple-server-concept/',
		    type: 'POST',
		    data: 'text='+InputText+'&mode=inline', // or $('#myform').serializeArray()
		    dataType: "xml",
		    success: function(xml) { 
		    	
			var $xmlDoc = $(xml);
		    	oModel.setData(xml);
		sap.ui.getCore().byId("cTable").setModel(oModel); 
		sap.ui.getCore().byId("cTable").bindRows("/NameAnnotation");  
		    }
//		    var abc;
//		    $(xml).find('DictTerm').each(function(){
//		    	abc = this.getAttribute('DictCanon')+abc;
//		    }
//		    		);
//		    sap.ui.getCore().byId("Response").setText(abc);
//		    
//		    						}
		});
    	
    }    
});



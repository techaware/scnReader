//requires the sap.ui.ux3, sap.ui.model
/*---------------------------------------------------------------*/
sap.ui.controller("scnReader.controller.bloglist", {	
    onInit : function() {
    	if(!sap.ui.getCore().getModel()){
		var oModelData = new sap.ui.model.json.JSONModel();
//		oModelData.forceNoCache();
		sap.ui.getCore().setModel(oModelData);
		sap.ui.getCore().byId("tblBlogs").bindRows("rss/channel/item");
		
		var oModelRSSLink = new sap.ui.model.json.JSONModel();
		oModelRSSLink.setProperty("RSSLink", "Enter RSS Link Here");
		oModelRSSLink.setProperty("ItemCount", "10");
		sap.ui.getCore().setModel(oModelRSSLink,"M1");		
    	}else{
    		sap.ui.getCore().byId("tblBlogs").bindRows("rss/channel/item");
    	}
		
//		sap.ui.getCore().byId("RSSLink").bindContext("M1");	
//		sap.ui.getCore().byId("RSSLink").setModel(oModelRSSLink);
//		var tmp = sap.ui.getCore().getModel("M1");
//    	sap.ui.getCore().byId("RSSLink").bindValue();
    	
//    	var oLink = sap.ui.getCore().getModel("M1");
   		
//    	var RSSUrl = sap.ui.getCore().byId("RSSLink").getValue();
//    	var oShell = sap.ui.getCore().byId("scnReaderShell");
//    	if (!RSSUrl){
//    		var oModel = new sap.ui.model.json.JSONModel();
//    		oModel.setProperty("RSSLink", "Enter RSS Link Here");
//    		oShell.setModel(oModel);
//    		sap.ui.getCore().byId("RSSLink").bindProperty("value","RSSLink");
////    		sap.ui.getCore().byId("RSSLink").setModel(oModel);
//    	}else{
//    		
//    	}
//    	if(oShell.getModel()){ 
//    		sap.ui.getCore().byId("RSSLink").bindProperty("value","RSSLink");
//    		sap.ui.getCore().byId("tblBlogs").bindRows("rss/channel/item");
//       	}     	
//		var sServiceUrl = "/scnReader/FeedMe?address=http:%2F%2Fscn.sap.com%2Fblogs%2Ffeeds%2Fposts";
    	
//    	if(!this.getView().getModel()){
//			var oModel = new sap.ui.model.json.JSONModel(sServiceUrl);
//			this.getView().setModel(oModel);
//    		    				
//   		sap.ui.getCore().byId("tblBlogs").bindRows("rss/channel/item");
//       	}
    },

    onExit : function() {
    },
    onRSSSubmit : function(oEvent) {
//    	get content from rss link
//    	var RSSUrl = sap.ui.getCore().byId("RSSLink").getValue();
    	
    	var RSSUrl = this.getModel("M1").getProperty("RSSLink");
    	var ItemCount = this.getModel("M1").getProperty("ItemCount");
    	var sServiceUrl = "/scnReader/FeedMe?address="+RSSUrl+"&numItems="+ItemCount; 
    	this.getModel().loadData(sServiceUrl);
    	var tmp = this.getModel();
//    	var oShell = sap.ui.getCore().byId("scnReaderShell");
    	
//    	if(!oShell.getModel()){
//		var oModel = new sap.ui.model.json.JSONModel(sServiceUrl);
//		oModel.setProperty("RSSLink", RSSUrl);
//		oShell.setModel(oModel);
//		sap.ui.getCore().byId("RSSLink").bindProperty("value","RSSLink");   				
//		sap.ui.getCore().byId("tblBlogs").bindRows("rss/channel/item");
//   	}    	
//    	navigate("vwBlogcontent", "scnReader.view.blogcontent", "inBound", oEvent, this.oParent.getModel());
    },
    onGetNames : function(oEvent) {
    	var RSSData = this.getModel().getData();
    	var allText = "";
		var oModel = new sap.ui.model.xml.XMLModel();
		var allxml;
    	$.each(RSSData.rss.channel.item, function(i, obj){
    		var thisText = $(obj.description).text();
    		var textCompact = thisText.replace(/\s+/g, ' ');
//    		allText = allText + textCompact;
    		$.ajax({
    		    url: 'http://localhost:8080/uima-simple-server-concept/',
    		    type: 'POST',
    		    data: 'text='+textCompact+'&mode=inline', // or $('#myform').serializeArray()
    		    dataType: "xml",
    		    async: false,
    		    success: function(xml) { 
    		    if(i == 0)
    		    	{
    		    	allxml = xml;
//    		    	var $xmlDoc = $(xml);
    		    	}else
    		    		{
    		    		resultEle = allxml.getElementsByTagName("result")[0];
    		    		x = xml.getElementsByTagName("result")[0];
    		    		j = x.childNodes.length;
    		    		while (x.childNodes[0])
    		    			{
    		    			resultEle.appendChild(x.childNodes[0]);
    		    			}
    		    		}
    		    }
    		});    		
    	}
    	);
	    oModel.setData(allxml);
		sap.ui.getCore().byId("aTable").setModel(oModel); 
		sap.ui.getCore().byId("aTable").bindRows("/NameAnnotation");  
		
//		var oModel = new sap.ui.model.xml.XMLModel();
//		$.ajax({
//		    url: 'http://localhost:8080/uima-simple-server-concept/',
//		    type: 'POST',
//		    data: 'text='+allText+'&mode=inline', // or $('#myform').serializeArray()
//		    dataType: "xml",
//		    success: function(xml) { 
//		    	
//			var $xmlDoc = $(xml);
//		    oModel.setData(xml);
//		sap.ui.getCore().byId("aTable").setModel(oModel); 
//		sap.ui.getCore().byId("aTable").bindRows("/NameAnnotation");  
//		    }
//		});    	
    },
    onRowSelect : function(oEvent) {
//    	navigate to the contents of the blog, pass model along
    	navigate("vwBlogcontent", "scnReader.view.blogcontent", "inBound", oEvent, this.oParent.getModel());
    },
    
    onBeforeRendering : function(){	
    },

    onAfterRendering : function(){
    },
    
    inBound: function(oEvent){
    }
});



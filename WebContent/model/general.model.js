/*---------------------------------------------------------------*/
// handy method to show the contents of the event. practical at design time
function showParameters(oEvent) {
	var params;
	var param;
	var text = "";
	
	if( oEvent != null ){
		params = oEvent.getParameters( );		
	}
	
	if( params != null ){
		for( param in params ){
			text = text + param + "=" + oEvent.getParameter(param) + "; ";
		}
	}
	alert( text );
	
}
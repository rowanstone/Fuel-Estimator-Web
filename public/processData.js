
sessionStorage.setItem("loggedIn", false );
var newClient = false;
var serverResponse = {};
var persistentclientId = {};
var persistentclientName = {};
var persistentclientAddress = {};
var persistentclientPhone = {};
var persistentclientEmail = {};

function isloggedIn(){  // Function does not work as expected right now. Need to keep login prompt from loading when session is logged in already
    if (sessionStorage.getItem("loggedIn") == true){
        login(show);
    }
    else
        login(hide);
}


const Http = new XMLHttpRequest();
const url='http://localhost:3000/clientInformation';


function login(showhide){
    if(showhide == "show"){
        document.getElementById('signInPrompt').style.visibility="visible";
    }
    else if(showhide == 'hide'){
        document.getElementById('signInPrompt').style.visibility="hidden";
    }
}

function clientSignIn(){

    login('hide');
    sessionStorage.setItem("loggedIn", true);
    let email = document.getElementById('email').value;


    console.log( "Existing client email is " + email);//document.getElementById('email').value;


    Http.open("GET", url+"?deliveryContactEmail="+email, true);
    Http.send();
    Http.onreadystatechange=(e)=>{
        serverResponse = JSON.parse(Http.responseText);   // convert server response to JSON object
        console.log(serverResponse);
        console.log(JSON.stringify(serverResponse[0].clientId));
        sessionStorage.setItem("clientId", serverResponse[0].clientId);
        sessionStorage.setItem("deliveryContactName", serverResponse[0].deliveryContactName);
        sessionStorage.setItem("deliveryAddress", serverResponse[0].deliveryAddress);
        sessionStorage.setItem("deliveryCity", serverResponse[0].deliveryCity);
        sessionStorage.setItem("deliveryState", serverResponse[0].deliveryState);
        sessionStorage.setItem("deliveryZipCode", serverResponse[0].deliveryZipCode);
        sessionStorage.setItem("deliveryContactPhone", serverResponse[0].deliveryContactPhone);
        sessionStorage.setItem("deliveryContactEmail", serverResponse[0].deliveryContactEmail);
        persistentclientId = sessionStorage.getItem("clientId");
        persistentclientName = sessionStorage.getItem("deliveryContactName");
        persistentclientAddress = sessionStorage.getItem("deliveryAddress")+" "+sessionStorage.getItem("deliveryCity")+
            " "+sessionStorage.getItem("deliveryState")+" "+sessionStorage.getItem("deliveryZipCode");
        persistentclientPhone = sessionStorage.getItem("deliveryContactPhone");
        persistentclientEmail = sessionStorage.getItem("deliveryContactEmail");
        console.log("Persistent Data = "+ persistentclientId + "\n" + persistentclientName + "\n" + persistentclientAddress+ "\n"
        +persistentclientPhone+ "\n"+persistentclientEmail);
		
	var clientId = document.getElementById("clientId");
        clientId.setAttribute("value", localStorage.getItem("storageId"));
		
	var clientName = document.getElementById("deliveryContactName");
        clientName.setAttribute("value", localStorage.getItem("storageName"));	
		
    var clientAddress = document.getElementById("deliveryAddress");
        clientAddress.setAttribute("value", sessionStorage.getItem("deliveryAddress"));
		
    var clientCity = document.getElementById("deliveryCity");
        clientCity.setAttribute("value", sessionStorage.getItem("deliveryCity"));
		
    var clientState = document.getElementById("deliveryState");
        clientState.setAttribute("value", sessionStorage.getItem("deliveryState"));
		
    var clientZip = document.getElementById("deliveryZipCode");
        clientZip.setAttribute("value", sessionStorage.getItem("deliveryZipCode"));
		
    var clientPhone = document.getElementById("deliveryContactPhone");
        clientPhone.setAttribute("value", sessionStorage.getItem("deliveryContactPhone"));
		
    var clientEmail = document.getElementById("deliveryContactEmail");
        clientEmail.setAttribute("value", sessionStorage.getItem("deliveryContactEmail"));
		
		localStorage.setItem("storageId",persistentclientId);
		localStorage.setItem("storageName",persistentclientName);
		localStorage.setItem("storagePhone",persistentclientPhone);
		localStorage.setItem("storageEmail",persistentclientEmail);
		localStorage.setItem("storageAddress",persistentclientAddress);

    };
	
    
		

}

function clientInfoPopulation(){
	document.getElementById('clientInfo').innerHTML = "Client ID: ".bold() + localStorage.getItem("storageId")
	+ "<br><br>" + "Name: ".bold() + localStorage.getItem("storageName")
	+ "<br><br>" + "Address: ".bold() + localStorage.getItem("storageAddress")
	+ "<br><br>" + "Phone: ".bold() + localStorage.getItem("storagePhone")
	+ "<br><br>" + "Email: ".bold() + localStorage.getItem("storageEmail");
	 
   /* sessionStorage.setItem("deliveryContactName", serverResponse[0].deliveryContactName);
	var populationName = sessionStorage.getItem("deliveryContactName");
	console.log('Client Name = " + populationName);
	
	var clientName = document.getElementById("deliveryContactName");
        clientName.setAttribute("value", sessionStorage.getItem("deliveryContactName")); */
}

function clientSignUp(){
    login('hide');
    newClient = true;
    let email = document.getElementById('email').value;
    console.log("New client email is" + email);//document.getElementById('email').value;

    /*document.forms['login'].action = 'http://http://localhost:3000/clientInformation';
    document.forms['login'].target = 'frame0';
    document.forms['login'].method = 'post';
    document.forms['login'].submit();*/

}

function calculate() {
    var gallonAmount = document.getElementById('gallonsRequested').value;
    var gallonPrice = document.getElementById('suggestedPrice').value;
    var result = document.getElementById('totalAmountDue');
    var myResult = gallonAmount * gallonPrice;
    document.getElementById('totalAmountDue').value = myResult;
}

function isKeyNumber(evt){
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;

    return true;
}

function isEmail(event){
    let regex = /^([_a-zA-Z0-9-]+)(\.[_a-zA-Z0-9-]+)*@([a-zA-Z0-9-]+\.)+([a-zA-Z]{2,3})$/;
    let email = (event.which) ? event.which : event.keyCode;
    return regex.test(email);

}
function submitQuote(){

    document.forms['quoteForm'].action = 'http://localhost:3000/fuelQuote';
    document.forms['quoteForm'].target = 'frame1';
    document.forms['quoteForm'].method = 'post';
    document.forms['quoteForm'].submit();
    alert("Fuel quote submitted!");
    return true;

}

function submitClient() {
    document.forms['quoteForm'].action = 'http://localhost:3000/clientInformation';
    document.forms['quoteForm'].target = 'frame2';
    document.forms['quoteForm'].method = 'post';
    console.log("Client info posted to server...");
    document.forms['quoteForm'].submit();
    alert("Client information submitted!");
    return true;
}
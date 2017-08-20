var e = document.querySelector("#title h1");

function listener(){
	console.log("console the element:",e);	
}


e.addEventListener("animationend", listener, false);
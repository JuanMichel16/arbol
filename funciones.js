import Arbol from './arbol.js';

function validarDatos() {
    console.clear();
    const expresion = document.querySelector('#expresion-algebraica').value;

    //Validar que no este vacio el input
    if(expresion === '') {
        console.log('Por favor de llenar todos los campos');
        return;
    } else {
        let et = new Arbol();

        let charArray = (infixToPostfix(tokenize(expresion)));
        let root = et.constructTree(charArray);
        console.log("Preorden:");
        et.preorder(root);
        console.log("Postorden:");
        et.postorder(root);
        console.log("Resultado:");
        console.log(eval(expresion));
    }
    
};

function infixToPostfix(infix){
    const presedences = ["-", "+", "*", "/"];
    
	var opsStack = [],
    	postfix = [];
    
    for(let token of infix){

    	if("number" === typeof token){
        	postfix.push(token); continue;
        }
        let topOfStack = opsStack[opsStack.length - 1];

        if(!opsStack.length || topOfStack == "("){
        	opsStack.push(token); continue;
        }

        if(token == "("){
	        opsStack.push(token); continue;
        }

        if(token == ")"){
        	while(opsStack.length){
            	let op = opsStack.pop();
                if(op == "(")	break;
                postfix.push(op);
            }
            continue;
        }
        // Step 5
		let prevPresedence = presedences.indexOf(topOfStack),
        	currPresedence = presedences.indexOf(token);
        while(currPresedence < prevPresedence){
            let op = opsStack.pop();
            postfix.push(op);
            prevPresedence = presedences.indexOf(opsStack[opsStack.length - 1]);
        }
        opsStack.push(token);
	}
    // Step 6
    while(opsStack.length){
        let op = opsStack.pop();
        if(op == "(")	break;
        postfix.push(op);
    }
    
    return postfix;
}

function tokenize(exp){
    const expresion = [];

    for(let letra of exp) {
        if(letra !== ' ') {
            expresion.push(letra)
        } 
    }

    let expresion1 = expresion.map((token, i) => /^\d$/.test(token) ? +token : token);
	return expresion1;
}


function log(obj){
	document.querySelector("pre").textContent += JSON.stringify(obj) + "\n";
}

export {validarDatos, tokenize, log, infixToPostfix};
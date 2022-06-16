
//FUNCOES DAS OPERACOES
function adicionar(num1, num2) {
	return Number(num1) + Number(num2)	
}

function subtrair(num1, num2) {
	return Number(num1) - Number(num2)	
}

function multiplicar(num1, num2) {
	return Number(num1) * Number(num2)	
}

function dividir(num1, num2) {
	if (Number(num1) == 0 || Number(num2) == 0) {
		alert('Os números precisam ser maiores que 0, honey! :)')
	} else {
		return Number(num1) / Number(num2)	
	}
}

//ESCOLHE QUAL FUNCAO DE OPERACAO CHAMAR, DE ACORDO COM O SIMBOLO DO OPERADOR
function operate(operador, n1, n2) {
	let res
	switch(operador) {
		case '+':
			res = adicionar(n1,n2)
			break

		case '-':
			res = subtrair(n1,n2)
			break

		case '*':
			res = multiplicar(n1,n2)
			break

		case '/':
			res = dividir(n1,n2)
			break

		default:
			alert(`O operador ${operador} é inválido. 
					Só aceitamos: +(soma), -(subtração), *(multiplicação), /(divisão)`)
	}
	return res
}

//DOM
let numeros = document.querySelectorAll('button.numeros')
let visor = document.querySelector('#visor')

let acBtn = document.querySelector('#AC')
let igualBtn = document.querySelector('#igual')
let apagarBtn = document.querySelector('#apagar')

let operadores = document.querySelectorAll('button.operadores')
let multiBtn = document.querySelector('#multiplicacao')
let diviBtn = document.querySelector('#divisao')
let somaBtn = document.querySelector('#soma')
let subBtn = document.querySelector('#subtracao')

let ponto_decimal = document.querySelector('#decimal')

//IMPRIME OS NÚMEROS NO VISOR
numeros.forEach((button)=>{
	button.addEventListener('click',()=>{
		visor.innerHTML += button.innerText
	})
})

//IMPRIMIR OS OPERADORES NO VISOR
//Analisa se o caractere anterior é algum operador
function isOperador(string) {
	if(string == '+' || string == '-' || string == '/' || string == '*') {
		return true
	} else {
		return false
	}
}
//imprime os operadores no visor, só se o caractere anterior for um número
operadores.forEach((operador)=>{
	operador.addEventListener('click', ()=>{
		if(visor.innerHTML.length != 0) {
			if(visor.innerHTML[visor.innerHTML.length-1] == '.' || isOperador(visor.innerHTML[visor.innerText.length-1])){
				alert('Insira um número antes de escolher um operador')
			}
			else {
				visor.innerHTML += ` ${operador.innerText} `
			}
		} else {
			alert('Insira um número antes de escolher um operador')
		}
	})
})

//LIMPA O VISOR
acBtn.addEventListener('click', ()=>{
	visor.innerHTML = ''
})

//APAGA OS CARACTERES
apagarBtn.addEventListener('click', ()=>{
	if(visor.innerHTML.length){
    	visor.innerHTML = visor.innerHTML.substr(0, visor.innerHTML.length - 1)
   }
})

//CAPTA OS OPERADORES E OS NÚMEROS E IMPRIME O RESULTADO DA FUNCAO OPERATE NO VISOR
igualBtn.addEventListener('click', ()=>{
	let visorArray = visor.innerHTML.split(' ')
	let ultimoElemento = visorArray[visorArray.length-1]

	//Se o último valor for vazio, será substituído pelo penúltimo
	if(ultimoElemento == '') {
		ultimoElemento = visorArray[visorArray.length-2]
	}

	//MENSAGENS DE ERRO
	//Se o último valor for um operador, a mensagem de erro disparará
	if(isOperador(ultimoElemento)){
		alert(`A expressões devem terminar em numeros`)
	}
	//Se o último carctere do último elemento do array for ".", essa mensagem disparará
	else if(ultimoElemento.split('')[ultimoElemento.split('').length-1] == '.') {
		alert('Insira um número ao final da expressão')
	}
	//CÁLCULOS
	else {
		//Faz o loop e chama a operate()
		let resultado
		for(let n in visorArray){
			if(n != 0 && n % 2 == 0) {
				resultado = operate(visorArray[n-1],visorArray[n-2], visorArray[n])
				visorArray[n] = resultado
			}
		}
		let resultadoFinal = visorArray[visorArray.length-1]

		//Se o resultado não for NaN ou undefined, imprime 'ERRO'
		if(resultadoFinal == NaN || resultadoFinal == undefined) {
			visor.innerHTML = 'ERRO'
		}
		//Imprime o resultado final
		else {
			//Função para arredondar casas decimais que eu confesso não ter entendido nada
			const round = (num, places) => {
				if (!("" + num).includes("e")) {
					return +(Math.round(num + "e+" + places)  + "e-" + places);
				} else {
					let arr = ("" + num).split("e");
					let sig = ""
					if (+arr[1] + places > 0) {
						sig = "+";
					}

					return +(Math.round(+arr[0] + "e" + sig + (+arr[1] + places)) + "e-" + places);
				}
			}
			visor.innerHTML = round(resultadoFinal,2)
		}
	}
})

//VERIFICA SE JÁ TEM UM PONTO NO NÚMERO, SE NÃO, ADICIONA PONTO DECIMAL
ponto_decimal.addEventListener('click',()=>{
	let visor_array = visor.innerHTML.split(' ')

	if(visor_array[visor_array.length-1].indexOf('.') == -1){
		visor.innerHTML += ponto_decimal.innerText
	} else {
		alert('Esse número já tem um ponto ;)')
	}
})

/*
	NÍVEL 2:
	#Incluir a ordem de precedência igual matemátia na escola e adicionar parênteses
	#Fazer o visor ser compatível com o teclado
*/
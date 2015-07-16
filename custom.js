
var historico = new Array();

var pad = function (n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

var getDataAtual = function () {
	d = new Date();

	var dia = d.getDay();
	var mes = d.getMonth();
	var ano = d.getFullYear();
	var hora = d.getHours();
	var minuto = d.getMinutes();
	var segundo = d.getSeconds();

	return pad(dia, 2) + "/" + pad(mes, 2) + "/" + pad(ano, 4) + " " + pad(hora, 2) + ":" + pad(minuto, 2) + ":" + pad(segundo, 2);
};

var incrementar = function ( value ){
    return value + 1;
};

var decrementar = function ( value ){
    return value - 1;
};

$(document).ready(function(){
    
    $(".operacao").on("click", function(){

    	var op = $(this).val();
    	var num1 = $("#num1").val();
    	var num2 = $("#num2").val();
    	var result = "";

        num1 = num1.replace(",", ".");
        num2 = num2.replace(",", ".");

    	if ( !num1 ) {
    		alert("Por favor, preencha o primeiro número!");
    	} else if ( isNaN ( num1 ) ) {
    		alert("O primeiro valor não contêm um número válido!");
    	} else if ( !num2 ) {
    		alert("Por favor, preencha o segundo número!");
    	} else if ( isNaN ( num2 ) ) {
    		alert("O segundo valor não contêm um número válido!");
    	} else  {

    		num1 = parseFloat(num1);
    		num2 = parseFloat(num2);

    		switch ( op ) {
    			case "+":
                    if ( num1.toString().indexOf(".") > -1 || num2.toString().indexOf(".") > -1 ) { // se for numero decimal, fazer usando soma normal
                        result =  num1 + num2;
                    } else { // se for numero inteiro, fazer com funcao de incrementar
                        soma = 0;
                        for(i = 1; i <= num1; i++) {
                            soma = incrementar(soma);
                        }

                        for(i = 1; i <= num2; i++) {
                            soma = incrementar(soma);
                        }

                        result = soma;
                    }
                    
    				historico.push("(" + getDataAtual() + ") " + num1 + " + " + num2 + " = " + result);
    			break;

    			case "-":
                    if ( num1.toString().indexOf(".") > -1 || num2.toString().indexOf(".") > -1 ) { // se for numero decimal, fazer usando subtração normal
                        result =  num1 - num2;
                    } else { // se for numero inteiro, fazer com funcao de decrementar
                        // usando funcoes decrementar
                        subtracao = num1;
                        for(i = 1; i <= num2; i++) {
                            subtracao = decrementar(subtracao);
                        }

                        result = subtracao;
                    }
                    
    				historico.push("(" + getDataAtual() + ") " + num1 + " - " + num2 + " = " + result);
    			break;

    			case "*":
    				result = num1 * num2;
    				historico.push("(" + getDataAtual() + ") " + num1 + " * " + num2 + " = " + result);
    			break;

    			case "/":
    				if ( num2 == 0 ) { 
    					alert("Não é possível fazer divisão por zero!"); 
    					result = "Erro!";
    				} else {
    					result = num1 / num2;
    					historico.push("(" + getDataAtual() + ") " + num1 + " / " + num2 + " = " + result);
    				}
    			break;

    			case "P":
    				result = Math.pow ( num1, num2 );
    				historico.push("(" + getDataAtual() + ") " + num1 + " elevado a " + num2 + " = " + result);
    			break;

    			case "R":
    				if ( num1 == 0 ) { 
    					alert("Não é possível fazer raiz zero de algum número!"); 
    					result = "Erro!";
    				} else {
    					result = Math.pow ( num2, 1 / num1 );
    					historico.push("(" + getDataAtual() + ") raiz " + num1 + " de " + num2 + " = " + result);
    				}
    			break;

    			default:
    				alert("Operação Inválida");
    			break;
    		}

            result = result.toString().replace(".", ",");
    		$("#result").val(result);


    	}

    });

	$("#limpar").on("click", function(){
		$("#num1").val("");
		$("#num2").val("");
		$("#result").val("");
		$("#div-historico").hide();
	});

	$("#exibe_hist").on("click", function(){
		var qtd = historico.length;
		if ( qtd > 0 ) {
			$("#div-historico").html("");
			for ( var i = 0; i < qtd; i++ ) {
			    var linha = $("<div></div>");
				var valor = historico[i];
				linha.append ( valor );
				$("#div-historico").append(linha);
			}
		} else {
			$("#div-historico").html("<div>Nenhum histórico encontrado!</div>");
		}
		$("#div-historico").show();
	});
    
});




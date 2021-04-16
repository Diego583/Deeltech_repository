
/*for (let user of users) { 
    let n = 0;
    document.getElementById("<%= user.nombre_usuario %>").oninput=()=>{
        for (let user of users) { 
             n+=document.getElementById("<%= user.nombre_usuario %>").value;
        }
        document.getElementById("tiempo_total").value=n;
        document.getElementById("porcentaje1").value = 100 - document.getElementById("tiempo_perdido").value - document.getElementById("errores_registro").value;
        document.getElementById("error").value = document.getElementById("tiempo_total").value * document.getElementById("errores_registro").value /100;
        document.getElementById("tiempo_perdido_p").value = document.getElementById("tiempo_total").value * document.getElementById("tiempo_perdido").value /100;
        document.getElementById("tiempo_restante").value = document.getElementById("tiempo_total").value - (document.getElementById("tiempo_total").value * document.getElementById("tiempo_perdido").value /100) - (document.getElementById("tiempo_total").value * document.getElementById("errores_registro").value /100); 
        document.getElementById("tiempo2").value = document.getElementById("tiempo_restante").value * document.getElementById("overhead").value /100;
        document.getElementById("tiempo3").value = document.getElementById("tiempo_restante").value - document.getElementById("tiempo2").value;
        document.getElementById("prod").value = document.getElementById("tiempo3").value * document.getElementById("productivas").value /100 ;
        document.getElementById("ope").value = document.getElementById("tiempo3").value * document.getElementById("operativos").value /100 ;
        document.getElementById("hum").value = document.getElementById("tiempo3").value * document.getElementById("humano").value /100 ;
        document.getElementById("tiempo_cmmi").value = document.getElementById("tiempo3").value * document.getElementById("cmmi").value /100 ;
    }
}*/

document.getElementById("tiempo_perdido").oninput=()=>{
    document.getElementById("porcentaje1").value = 100 - document.getElementById("tiempo_perdido").value - document.getElementById("errores_registro").value;
    document.getElementById("tiempo_perdido_p").value = document.getElementById("tiempo_total").value * document.getElementById("tiempo_perdido").value /100;
    document.getElementById("tiempo_restante").value = document.getElementById("tiempo_total").value - (document.getElementById("tiempo_total").value * document.getElementById("tiempo_perdido").value /100) - (document.getElementById("tiempo_total").value * document.getElementById("errores_registro").value /100); 
    document.getElementById("tiempo2").value = document.getElementById("tiempo_restante").value * document.getElementById("overhead").value /100;
    document.getElementById("tiempo3").value = document.getElementById("tiempo_restante").value - document.getElementById("tiempo2").value;
    document.getElementById("prod").value = document.getElementById("tiempo3").value * document.getElementById("productivas").value /100 ;
    document.getElementById("ope").value = document.getElementById("tiempo3").value * document.getElementById("operativos").value /100 ;
    document.getElementById("hum").value = document.getElementById("tiempo3").value * document.getElementById("humano").value /100 ;
    document.getElementById("tiempo_cmmi").value = document.getElementById("tiempo3").value * document.getElementById("cmmi").value /100 ;
}

document.getElementById("errores_registro").oninput=()=>{
    document.getElementById("porcentaje1").value = 100 - document.getElementById("tiempo_perdido").value - document.getElementById("errores_registro").value;
    document.getElementById("error").value = document.getElementById("tiempo_total").value * document.getElementById("errores_registro").value /100;
    document.getElementById("tiempo_restante").value = document.getElementById("tiempo_total").value - (document.getElementById("tiempo_total").value * document.getElementById("tiempo_perdido").value /100) - (document.getElementById("tiempo_total").value * document.getElementById("errores_registro").value /100); 
    document.getElementById("tiempo2").value = document.getElementById("tiempo_restante").value * document.getElementById("overhead").value /100;
    document.getElementById("tiempo3").value = document.getElementById("tiempo_restante").value - document.getElementById("tiempo2").value;
    document.getElementById("prod").value = document.getElementById("tiempo3").value * document.getElementById("productivas").value /100 ;
    document.getElementById("ope").value = document.getElementById("tiempo3").value * document.getElementById("operativos").value /100 ;
    document.getElementById("hum").value = document.getElementById("tiempo3").value * document.getElementById("humano").value /100 ;
    document.getElementById("tiempo_cmmi").value = document.getElementById("tiempo3").value * document.getElementById("cmmi").value /100 ;
}

document.getElementById("overhead").oninput=()=>{
    document.getElementById("porcentaje2").value = 100 - document.getElementById("overhead").value;
    document.getElementById("tiempo2").value=document.getElementById("tiempo_restante").value * document.getElementById("overhead").value /100;
    document.getElementById("tiempo3").value = document.getElementById("tiempo_restante").value - document.getElementById("tiempo2").value;
    document.getElementById("prod").value = document.getElementById("tiempo3").value * document.getElementById("productivas").value /100 ;
    document.getElementById("ope").value = document.getElementById("tiempo3").value * document.getElementById("operativos").value /100 ;
    document.getElementById("hum").value = document.getElementById("tiempo3").value * document.getElementById("humano").value /100 ;
    document.getElementById("tiempo_cmmi").value = document.getElementById("tiempo3").value * document.getElementById("cmmi").value /100 ;
}

document.getElementById("productivas").oninput=()=>{
    document.getElementById("prod").value = document.getElementById("tiempo3").value * document.getElementById("productivas").value /100 ;
}

document.getElementById("operativos").oninput=()=>{
    document.getElementById("ope").value = document.getElementById("tiempo3").value * document.getElementById("operativos").value /100 ;
}

document.getElementById("humano").oninput=()=>{
    document.getElementById("hum").value = document.getElementById("tiempo3").value * document.getElementById("humano").value /100 ;
}

document.getElementById("cmmi").oninput=()=>{
    document.getElementById("tiempo_cmmi").value = document.getElementById("tiempo3").value * document.getElementById("cmmi").value /100 ;
}
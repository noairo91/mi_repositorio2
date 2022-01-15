  const URLJSON= "JSON/servicios.json"
  $("#planes").append(`<button id="btn1">Ver Planes</button>`);
  $("#btn1").click(() => { 
  $.getJSON(URLJSON, function JSON(respuesta, estado){ 
  
     if (estado==="success"){
        let servicios = respuesta;
        for (const servicio of servicios) {
         $("#planes").append(
          `<div id="plan__container${servicio.id}" >
             <section class="planes__texto">
                <p class="planes__titulo">${servicio.id}-${servicio.title}</p>
                <p class="planes__subtitulo">${servicio.subtitle}</p>
                
                <ul id="detalleServicio${servicio.id}" class="planes__descripcion"> </ul>

             </section>

        
             <div id="comprar${servicio.id}">
             <input type="button" name="comprar${servicio.id}" id="comprar_plan${servicio.id}" value="¡Conseguilo Ahora!"/>
             <div id="div${servicio.id}"></div>

            </div>`    
         );
                     
         for (const detalle of servicio.description) {
           $(`#detalleServicio${servicio.id}`).append(`<li>${detalle}</li>`);
         } 
   
         $(`#comprar_plan${servicio.id}`).on("click", () =>
         showService(servicio.id, servicio.price)
        );}
        $('#btn1').hide();

        //funcion en la que se muestra el precio del servicio y conduce a obtener el precio final
        function showService (id,price){
         
          $(`#div${id}`).append(`<p> Precio del servicio: ${price} </p>
                           <label id="etiqueta${id}">Código de descuento (dto1 - dto2 - "vacio"):</label>
                           <input id="discount${id}" type="text" name="descuento">
                           <input id="ingresar${id}" type="button" value="Ingresar" name="btningresar">
                           <p id="discountPercent${id}">  </p>`);
      
                           $ (`#comprar_plan${id}`).hide();
                          
                           $(`#ingresar${id}`).click (ingresarDescuento);
                           
                           //funcion que calcula el precio final
                           function ingresarDescuento (){
                              let word =  $(`#discount${id}`).val().toUpperCase() ;
                              let dto1 = price-price*0.10;
                              let dto2 = price-price*0.15;                   

                               if(word == "DTO1"){
                                                                                                      
                                  $(`#discountPercent${id}`).append(`<p> Su descuento es del: 10% </p>
                                  <p id="disc1"> Su total a pagar es: ${dto1} </p> `);
                                 
                                                                         
                                  $( document ).ready(function() {
                                  $(`#discount${id}`).val('');})
                                  
                                  $(`#etiqueta${id}`).hide();
                                  $ (`#discount${id}`).hide();
                                  $(`#ingresar${id}`).hide();
                                  localStorage.setItem(`total`,dto1);
                                 }
                                                               
                               else if (word == "DTO2"){
                                $(`#discountPercent${id}`).append( `<p> Su descuento es del: 15% </p>
                                   <p> Su total a pagar es: ${dto2}</p>`);
                                                                     
                                $( document ).ready(function() {
                                $(`#discount${id}`).val('');})
                                
                                $(`#etiqueta${id}`).hide();
                                $ (`#discount${id}`).hide();
                                $(`#ingresar${id}`).hide();
                                localStorage.setItem(`total`,(dto2));
                              }

                               else{
                                $(`#discountPercent${id}`).append( `<p> Su total por el servicio seleccionado es:  ${price} </p>`);
                                                                                                                                     
                                $(`#etiqueta${id}`).hide();
                                $ (`#discount${id}`).hide();
                                $(`#ingresar${id}`).hide();
                                localStorage.setItem(`total`,(price))};

                                       //función que solo habilita la compra de 1 servicio
                                       function onlyService(){
                                       for (let i = 0; i < localStorage.length; i++) {
                                          let clave = localStorage.key(i);
                                          console.log(clave);
                                       if (clave != ""){
                                          $("input").hide();
                                       }
                                    }}
                                    onlyService()}}}})})
                                  





const config = require("../config");
async function crearOrden (req,res){ 
    console.log(req.body);
    const orden = {
        intent:"CAPTURE",
        purchase_units:[
            {
                amount: {
                    currency_code: "EUR",
                    value: "100"
                }
            }
        ],
        application_context: {
            brand_name: "Cines World",
            landing_page: "NO_PREFERENCE",
            user_action: "PAY_NOW",
            return_url: `http://localhost:${config.PORT}/capturar-orden`,
            cancer_url: `http://localhost:${config.PORT}/cancelar-orden`
        }
    }

    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");
    //Se utiliza para la autenticacion del cliente
    // Aquí debes añadir el grant_type nuevamente, ya que parece que la API espera que esté en el cuerpo de la solicitud.
    const bodyParams = new URLSearchParams();
    bodyParams.append("grant_type", "client_credentials"); 
    
    const response = await fetch(`${config.PAYPAL_API}/v1/oauth2/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            //btoa convierte la cadena enviada en base 64 y antes tiene el basic para especificar que la autenticacion es de tipo basica
            "Authorization": `Basic ${btoa(`${config.PAYPAL_API_CLIENT}:${config.PAYPAL_API_SECRET}`)}`
        },
        body: bodyParams
    });
    
    const data = await response.json();
    const accesoToken = data.access_token;

        const autorizacion = await fetch(`${config.PAYPAL_API}/v2/checkout/orders`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${accesoToken}`,
                "Content-Type": "application/json" // Especifica el tipo de contenido como application/json si el cuerpo de la solicitud es un objeto JSON
            },
            body: JSON.stringify(orden) // Convierte el objeto order a una cadena JSON para enviarlo como cuerpo de la solicitud
        });
        
        const vistaAutorizacion = await autorizacion.json();

    return res.json(vistaAutorizacion);
};

async function capturarOrden(req,res) {
    const { token } = req.query;

        const response = await fetch(`${config.PAYPAL_API}/v2/checkout/orders/${token}/capture`, {
            method: "POST",
            headers: {
                "Authorization": `Basic ${btoa(`${config.PAYPAL_API_CLIENT}:${config.PAYPAL_API_SECRET}`)}`,
                "Content-Type": "application/json" // Asegúrate de establecer el tipo de contenido adecuado
            }
        });
    const datosDevueltos = await response.json();

    res.redirect("http://localhost:4200/compraRealizada");
};

function cancelarOrden (req,res) {
    res.redirect("/");
};

module.exports = {crearOrden,capturarOrden,cancelarOrden};
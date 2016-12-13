'use strict'

var p = require('paypal-rest-sdk');
var fs = require('fs');

var Paypal = module.exports = {
    paymentId:null,
    init: function () {
        if (!Paypal.object) {
            try {
                var paypalConfig = fs.readFileSync(__dirname + '/paypal.json');
                var config = JSON.parse(paypalConfig.toString());
            } catch (e) {
            }
            p.configure(config.api);
        }
    },
    pay: function (payment,request,response) {
        p.payment.create(payment, function (error, payment) {
            if (error) {
                console.log(error);
            }else{
                if(payment.payer.payment_method === 'paypal'){

                    Paypal.paymentId = payment.id;
                    var credentials = { id : payment.id };
                    if (!request.auth.isAuthenticated) {
                        request.cookieAuth.set(credentials);
                    }
                    
                    var redirectUrl;
                    for(var i = 0; i < payment.links.length;i++){
                        var link = payment.links[i];
                        if(link.method === 'REDIRECT'){
                            redirectUrl = link.href;
                        }
                    }
                    response.redirect(redirectUrl);
                }  
            }
        });
    },
    execute: function(request,response){
        var id = request.auth.credentials.id;
        var payerId = request.query.PayerID;

        var details = { "payer_id" : payerId };
        p.payment.execute(id,details,function(error,payment){
            if(error){
                console.log(error);
            }else{
                console.log(payment);
                var id = payment.id;
                var state = payment.state;
                var cart = payment.cart;
                var email = payment.payer.payer_info.email;
                var first_name = payment.payer.payer_info.first_name;
                var last_name = payment.payer.payer_info.last_name;
                var payer_id = payment.payer.payer_info.payer_id;
                var shipping_address = payment.payer.payer_info.shipping_address;
                var country_code = payment.payer.payer_info.country_code;
                var amount = payment.transactions[0].amount;
                var item_list = payment.transactions[0].item_list;
                var create_time = payment.create_time;

                console.log(id,state,cart,email,first_name,last_name,payer_id,shipping_address,country_code,amount,item_list,create_time);

                var req = {
                    method: 'POST',
                    url: '/orders/add',
                    payload:  {
                        items_list: JSON.stringify(item_list.items),
                        amounts: JSON.stringify(amount),
                        order_id : id,
                        cart: cart,
                        email: email,
                        first_name: first_name,
                        last_name: last_name,
                        payer_id: payer_id,
                        shipping_address: JSON.stringify(item_list.shipping_address),
                        country_code: country_code,
                        create_time: create_time
                    }
                };

                global.server.inject(req, res => {
                    console.log('LOG: orders saved.');
                });

                response.redirect('http://localhost:4200/');
            }
        });
    }
};

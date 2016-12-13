var models = require('../Models');
var resp = require('../lib/response');
var jwt = require('jsonwebtoken');

var AdminController = function () {


    this.home = function (request, response) {

        if (!request.auth.isAuthenticated) {
            response.redirect('/login');
        }else{
            response('<html><head><title>Login page</title></head><body><h3>Welcome ' +
                        request.auth.credentials.email +
                        '!</h3><br/><form method="get" action="/logout">' +
                        '<input type="submit" value="Logout">' +
                        '</form></body></html>');
        }
    },

    this.login = function (request, response) {


        if (request.auth.isAuthenticated) {
            response.redirect('/admin/');
        }
      
        if (request.method === 'post'){
            if(!request.payload.username || !request.payload.password){
                message = 'Missing credentials';
             }else{
                models.User.checkUser(request.payload).then(function(result){
                    if(result.dataValues){
                        request.cookieAuth.set(result);
                        response.redirect('/admin/'); 
                    }else{
                        response.redirect('/admin/');
                    }
                })
                .catch(resp.jsonErrorReply(response))
                .done();
            }     
        }

        if (request.method === 'get') {

            return response('<html><head><title>Login page</title>' +
                '<style> body{margin:0;padding:0;} input[type="submit"]:hover{background:#999;color:white; cursor:pointer;} input[type="submit"]{ background-color:white; font-size:18px; font-weight:200; font-family:helvetica; width:400px; height:40px; border:2px solid #999; margin-top:5px; border-radius:2px;} input[type="text"],input[type="password"]{width:400px; font-size:18px; font-weight:200; margin-top:5px; border-radius:2px; height:40px; padding-left:10px;  border:1px solid #999;} form{width:400px;margin:250px auto; input{ width:250px; }'+
                '</style>' +
                '</head><body>' +
                
                '<form method="post" action="/login">' +
                '<div style="font-family:Halvetica; font-weight:200;font-size:28px; text-align:center;">GYOROK</div>'+
                '<input type="text" id="e" placeholder="Email" name="username"/>' +
                '<input type="password" id="p" placeholder="Password" name="password">' +
                '<input type="submit" onsubmit="check()" value="Login"></form>'+
                '</body></html>');
        }
    },

    this.logout = function(request,response){
        request.cookieAuth.clear();
        return response.redirect('/login');
    },

    this.requestToken = function(request,response){
        
        if(!request.payload.username || !request.payload.password){
                response({'error':'Missing credentials!'});
             }else{
                models.User.checkUser(request.payload).then(function(result){
                    if(result.dataValues){
                        var token = jwt.sign({id:result.dataValues.id},process.env.SECRET,{algorithm:'HS256'});
                        response({'token':token});

                    }else{
                        response({'error':'wrong credentials!'});
                    }
                })
                .catch(resp.jsonErrorReply(response))
                .done();
            }     
    }

    
}



module.exports = new AdminController();
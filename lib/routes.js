var CategoryController = require('../Controllers/CategoryController');
var SubcategoryController = require('../Controllers/SubCategoryController');
var ProductController = require('../Controllers/ProductController')
var StockController = require('../Controllers/StockController');
var ImageController = require('../Controllers/ImageController');
var DiscountController = require('../Controllers/DiscountController');
var MaterialController = require('../Controllers/MaterialController');
var UserController = require('../Controllers/UserController');
var CollectionController = require('../Controllers/CollectionController');
var AdminController = require('../Controllers/AdminController');
var NewsletterController = require('../Controllers/NewsletterController');
var OrderController = require('../Controllers/OrderController');
var utils = require('../lib/utils');
var pp = require('../paypal.js');

module.exports = [

    //CATEGORIES
    {
        method: 'GET',
        path: '/category/all',
        handler: CategoryController.all
    },
    {
        method: 'GET',
        path: '/category/{id}',
        handler: CategoryController.byId
    },
    {
        method: 'POST',
        path: '/category/add',
        handler: CategoryController.add
    },
    {
        method: 'DELETE',
        path: '/category/delete',
        handler: CategoryController.remove
    },
    {
        method: 'PUT',
        path: '/category/update',
        handler: CategoryController.update
    },
    {
        method: 'GET',
        path: '/categories',
        handler: CategoryController.allCategories
    },
    //SUBCATEGORIES
    {
        method: 'POST',
        path: '/subcategory/add',
        handler: SubcategoryController.add
    },
    {
        method: 'DELETE',
        path: '/subcategory/delete',
        handler: SubcategoryController.remove
    },
    {
        method: 'GET',
        path: '/subcategory/list/{cat_id}',
        handler: SubcategoryController.list
    },
    {
        method: 'GET',
        path: '/subcategory/{id}',
        handler: SubcategoryController.get
    },
    {
        method: 'PUT',
        path: '/subcategory/update',
        handler: SubcategoryController.updateSub
    },
    {
        method: 'GET',
        path: '/subcategory/unused',
        handler: SubcategoryController.unused
    },

    //PODUCTS
    {
        method: 'POST',
        path: '/products/add',
        handler: ProductController.add
    },
    {
        method: 'GET',
        path: '/products/all/{cat_id}',
        handler: ProductController.list
    },
    {
        method: 'GET',
        path: '/products/material/{id}',
        handler: ProductController.material
    },
    {
        method: 'GET',
        path: '/products/{id}',
        handler: ProductController.one
    },
    {
        method: 'DELETE',
        path: '/products/delete',
        handler: ProductController.remove
    },
    {
        method: 'PUT',
        path: '/products/update',
        handler: ProductController.update
    },
    {
        method: 'GET',
        path: '/products/search/{text}',
        handler: ProductController.search
    },
    {
        method: 'GET',
        path: '/products/allbygroup',
        handler: ProductController.allByGroup
    },
    {
        method: 'GET',
        path: '/products/new',
        handler: ProductController.newProducts
    },
    {
        method: 'GET',
        path: '/products/nocollection',
        handler: ProductController.nocollection
    },
    //STOCK

    {
        method: 'POST',
        path: '/stocks/add',
        handler: StockController.add
    },
    {
        method: 'PUT',
        path: '/stocks/update',
        handler: StockController.update
    },
    {
        method: 'DELETE',
        path: '/stocks/delete',
        handler: StockController.remove
    },
    {
        method: 'GET',
        path: '/stocks/list/{product_id}',
        handler: StockController.list
    },
    //IMAGES

    {
        method: 'POST',
        path: '/images/add',
        handler: ImageController.add
    },
    {
        method: 'DELETE',
        path: '/images/delete',
        handler: ImageController.remove
    },
    {
        method: 'PUT',
        path: '/images/feature',
        handler: ImageController.feature
    },
    {
        method: 'PUT',
        path: '/images/unfeature',
        handler: ImageController.unfeature
    },
    {
        method: 'GET',
        path: '/images/list/{product_id}',
        handler: ImageController.list
    },
    {
        method: 'GET',
        path: '/images/{name}',
        handler: ImageController.get
    },
    {
        method: 'GET',
        path: '/images/featured/{product_id}',
        handler: ImageController.featured
    },
    {
        method: 'POST',
        path: '/images/upload',
        config: {
            payload: {
                maxBytes: 209715200,
                output: 'stream',
                parse: true
            },
            handler: ImageController.upload
        }
    },
    {
        method: 'DELETE',
        path: '/images/unlink',
        handler: ImageController.unlink
    },

    //DISCOUNT
    {
        method: 'POST',
        path: '/discounts/add',
        handler: DiscountController.add
    },
    {
        method: 'POST',
        path: '/discounts/add/product',
        handler: DiscountController.addProduct
    },
    {
        method: 'GET',
        path: '/discounts/{ProductId}',
        handler: DiscountController.read
    },
    {
        method: 'DELETE',
        path: '/discounts/remove/product',
        handler: DiscountController.remove
    },
    {
        method: 'DELETE',
        path: '/discounts',
        handler: DiscountController.removeOne
    },
    {
        method: 'GET',
        path: '/discounts/all/{DiscountId}',
        handler: DiscountController.all
    },
    {
        method: 'GET',
        path: '/discounts/list',
        handler: DiscountController.list
    },
    {
        method: 'GET',
        path: '/discounts/one/{DiscountId}',
        handler: DiscountController.one
    },

    //MATERIALS
    {
        method: 'POST',
        path: '/materials/add',
        handler: MaterialController.add
    },
    {
        method: 'DELETE',
        path: '/materials',
        handler: MaterialController.remove
    },
    {
        method: 'PUT',
        path: '/materials/update',
        handler: MaterialController.update
    },
    {
        method: 'GET',
        path: '/materials',
        handler: MaterialController.all
    },
    {
        method: 'POST',
        path: '/materials/add/product',
        handler: MaterialController.insert
    },
    {
        method: 'GET',
        path: '/materials/get/{ProductId}',
        handler: MaterialController.get
    },
    {
        method: 'DELETE',
        path: '/materials/product',
        handler: MaterialController.removeForProduct
    },

    //USERS
    {
        method: 'POST',
        path: '/users/add',
        handler: UserController.add
    },
    {
        method: 'PUT',
        path: '/users/update',
        handler: UserController.update
    },
    {
        method: 'DELETE',
        path: '/users/delete',
        handler: UserController.remove
    },
    {
        method: 'GET',
        path: '/users/{id}',
        handler: UserController.read
    },
    {
        method: 'GET',
        path: '/users/all',
        handler: UserController.all
    },

    //COLLECTIONS
    {
        method: 'GET',
        path: '/collections/all',
        handler: CollectionController.all
    },
    {
        method: 'GET',
        path: '/collections/{id}',
        handler: CollectionController.byId
    },
    {
        method: 'POST',
        path: '/collections/add',
        handler: CollectionController.add
    },
    {
        method: 'DELETE',
        path: '/collections/delete',
        handler: CollectionController.remove
    },
    {
        method: 'PUT',
        path: '/collections/update',
        handler: CollectionController.update
    },
    {
        method: 'GET',
        path: '/collections/products/{id}',
        handler: CollectionController.list
    },
    {
        method: 'GET',
        path: '/collections/products/discounts/{id}',
        handler: CollectionController.prodcutsWithDiscount
    },

    //NEWSLETTER

    {
        method: 'POST',
        path: '/newsletters/add',
        handler: NewsletterController.add
    },
    {
        method: 'GET',
        path: '/newsletters',
        handler: NewsletterController.all
    },
    {
        method: 'DELETE',
        path: '/newsletters',
        handler: NewsletterController.remove
    },
    //ORDER
    {
        method: 'POST',
        path: '/orders/add',
        handler: OrderController.add
    },
    {
        method: 'DELETE',
        path: '/orders',
        handler: OrderController.remove
    },
    {
        method: 'PUT',
        path: '/orders',
        handler: OrderController.close
    },
    //ADMIN

    {
        method: 'GET',
        path: '/templates/{path*}',
        handler: {
            directory: {
                path: './templates',
                listing: false,
                index: false
            }
        }
    },
    {
        method: 'GET',
        path: '/node_modules/{path*}',
        handler: {
            directory: {
                path: './node_modules',
                listing: false,
                index: false
            }
        }
    },

    {
        method: 'GET',
        path: '/admin/{param*}',
        handler: (request, response) => {
            response.view('index.html', { name: request.auth.credentials.email, title: 'Dashboard' }, { layout: 'layout' });
        },
        config: {
            auth: 'session',
        }
    },
    {
        method: 'GET',
        path: '/admin/categories/{param*}',
        handler: (request, response) => {
            response.view('categories.html', { name: request.auth.credentials.email, title: 'Categories' }, { layout: 'layout' });
        },
        config: {
            auth: 'session',
        }
    },
    {
        method: 'GET',
        path: '/admin/collections/{param*}',
        handler: (request, response) => {
            response.view('collections.html', { name: request.auth.credentials.email, title: 'Collections' }, { layout: 'layout' });
        },
        config: {
            auth: 'session',
        }
    },
    {
        method: 'GET',
        path: '/admin/products/{param*}',
        handler: (request, response) => {
            response.view('products.html', { name: request.auth.credentials.email, title: 'Products' }, { layout: 'layout' });
        },
        config: {
            auth: 'session',
        }
    },
    {
        method: 'GET',
        path: '/admin',
        config: {
            handler: AdminController.home,
            auth: 'session',
        }
    },
    {
        method: ['POST', 'GET'],
        path: '/login',
        config: {
            handler: AdminController.login,
            plugins: { 'hapi-auth-cookie': { redirectTo: false } }
        }
    },
    {
        method: 'GET',
        path: '/logout',
        config: {
            handler: AdminController.logout
        }
    },
    {
        method: 'POST',
        path: '/token',
        handler: AdminController.requestToken
    },
    {
        method: 'GET',
        path: '/restricted',
        config: {
            auth: 'token',
            handler: function (request, response) {
                response({ text: 'You used a token!' }).header("Authorization", request.headers.authorization);
            }
        }
    },
    //PAYPAL
    {
        method: 'POST',
        path: '/pay',
        config: {
            plugins: { 'hapi-auth-cookie': { redirectTo: false } },
            handler: function (request, response) {
                var transactions = JSON.parse(decodeURIComponent(request.payload.message));

                var payment = {
                    "intent": "sale",
                    "payer": {
                        "payment_method": "paypal"
                    },
                    "redirect_urls": {
                        "return_url": "http://localhost:3000/execute",
                        "cancel_url": "http://localhost:3000/cancel"
                    },
                    "transactions": transactions
                };

                pp.pay(payment, request, response);
            }
        }
    },
    {
        method: 'GET',
        path: '/execute',
        handler: function (request, response) {
            pp.execute(request, response);
        },
        config: {
            auth: 'session',
        }
    },
    {
        method: 'GET',
        path: '/cancel',
        handler: function (request, response) {
            response.redirect('http://localhost:4200/');
        }
    }
];
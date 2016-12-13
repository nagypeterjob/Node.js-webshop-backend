$(document).ready(function () {

    var url = window.location.href;
    var path = url.split('admin/');
    var base = "http://localhost:3000"
    var products = null;
    var self = this;
    function retriveProducts(data) {
        self.products = data;
    }

    switch (path[1]) {
        case "": {
            break;
        }
        case "categories": {
            var selectedCategory = null;

            $.ajax({
                url: base + '/categories',
                method: 'get'
            }).done(function (data) {

                var html = "";
                for (var i = 0; i < data.length; i++) {
                    var name = data[i].name;
                    html += '<div class="panel panel-default">';
                    html += '<div class="panel-heading" role="tab" id="heading' + data[i].id + '">';
                    html += '<h4 class="panel-title">';
                    html += '<a role="button" class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse' + data[i].id + '" aria-expanded="false" aria-controls="collapse' + data[i].id + '">';
                    html += name;
                    html += '<span style="float:right" data-id="' + data[i].id + '" class="removecat glyphicon glyphicon-remove" aria-hidden="true"></span>';
                    html += '</a></h4></div>';
                    html += '<div id="collapse' + data[i].id + '" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading' + data[i].id + '"><div class="panel-body">';
                    for (var j = 0; j < data[i].sub.length; j++) {
                        html += '<input type="text" class="form-control edit-text" id="edit-text' + data[i].sub[j].id + '" value="' + data[i].sub[j].name + '"/>' +
                            '<span data-id="' + data[i].sub[j].id + '" class="edit glyphicon glyphicon-pencil"></span>' +
                            '<span data-id="' + data[i].sub[j].id + '" class="removesubcat glyphicon glyphicon-remove" aria-hidden="true"></span></br>';
                    }
                    html += '</div><div class="input-group">' +
                        '<span class="input-group-btn"><button id="modal" data-id="' + data[i].id + '" class="btn btn-default" type="button" data-toggle="modal" data-target=".bs-example-modal-sm" >Categorize older</button></span>' +
                        '<input type="text" class="form-control" id="new-subcategory-text' + data[i].id + '" placeholder="New subcategory"><span class="input-group-btn"><button class="btn btn-default" id="add-subcategory" data-id="' + data[i].id + '" type="button">Add</button></span></div>' +
                        '</div></div></div>';
                }
                $('#accordion').html(html);
                var activeCollapse = $.cookie('activeCollapseCategories');
                if (activeCollapse != null)
                    $("#" + activeCollapse).addClass('in');
            });

            $('#add-category').on('click', function () {
                var text = $('#new-category-text').val();
                if (text != null) {
                    $.post(base + '/category/add', { name: text })
                        .done(function (data) {
                            if (data.response.id) {
                                $('.panel-collapse').each(function () {
                                    var active = $(this);
                                    if (active.hasClass('in')) {
                                        $.cookie('activeCollapseCategories', active.attr('id'));
                                    }
                                });
                                window.location.reload();
                            }
                        });
                }
                return false;
            });

            $('body').on('click', '#add-subcategory', function () {
                var id = $(this).data('id');
                var text = $('#new-subcategory-text' + id).val();
                if (text != null) {
                    $.post(base + '/subcategory/add', { name: text, cat_id: id })
                        .done(function (data) {
                            if (data.response.id) {
                                $('.panel-collapse').each(function () {
                                    var active = $(this);
                                    if (active.hasClass('in')) {
                                        $.cookie('activeCollapseCategories', active.attr('id'));
                                    }
                                });
                                window.location.reload();
                            }
                        });
                }
                return false;
            });

            $('body').on('click', '.removecat', function (e) {
                e.preventDefault();
                var id = $(this).attr('data-id');

                $.ajax({
                    url: base + '/category/delete',
                    method: 'DELETE',
                    data: { id: id }
                }).done(function (data) {
                    if (data.response) {
                        $('.panel-collapse').each(function () {
                            var active = $(this);
                            if (active.hasClass('in')) {
                                $.cookie('activeCollapseCategories', active.attr('id'));
                            }
                        });
                        window.location.reload();
                    }
                });

                return false;
            });

            $('body').on('click', '.removesubcat', function (e) {
                e.preventDefault();
                var id = $(this).attr('data-id');

                $.ajax({
                    url: base + '/subcategory/delete',
                    method: 'DELETE',
                    data: { id: id }
                }).done(function (data) {
                    if (data.response) {
                        $('.panel-collapse').each(function () {
                            var active = $(this);
                            if (active.hasClass('in')) {
                                $.cookie('activeCollapseCategories', active.attr('id'));
                            }
                        });
                        window.location.reload();
                    }
                });
                return false;
            });

            $('body').on('click', '.edit', function (e) {
                e.preventDefault();
                var id = $(this).attr('data-id');
                var selector = '#edit-text' + id;
                var text = $(selector).val();

                $.ajax({
                    url: base + '/subcategory/update',
                    method: 'PUT',
                    data: { id: id, name: text }
                }).done(function (data) {
                    if (data.response) {
                        $('.panel-collapse').each(function () {
                            var active = $(this);
                            if (active.hasClass('in')) {
                                $.cookie('activeCollapseCategories', active.attr('id'));
                            }
                        });
                        window.location.reload();
                    }
                });
                return false;
            });

            $('body').on('click', '#modal', function () {
                selectedCategory = $(this).attr('data-id');
                $.ajax({
                    url: base + '/subcategory/unused',
                    method: 'GET'
                }).done(function (data) {

                    if (data.response.length) {
                        var offset = 2;
                        var html = "";
                        for (var i = 0; i < data.response.length; i++) {
                            html += '<div data-id="' + data.response[i].id + '" class="subcategory">';
                            html += data.response[i].name;
                            html += '</div>';
                            html += '<span data-id="' + data.response[i].id + '" style="margin-left:5px; float:right;margin-top:' + 8 + ';" class="removesubcat glyphicon glyphicon-remove" aria-hidden="true"></span>';
                            html += '</br>';
                        }

                        $('#modal-body').html(html);
                        $('#myModal').modal('show');
                    } else {
                        alert('There are no uncategorized subcategories!');
                    }
                });
                return false;
            });

            $('body').on('click', '.subcategory', function () {
                var elem = $(this);
                if (elem.hasClass('selected')) {
                    elem.removeClass('selected');
                } else {
                    elem.addClass('selected');
                }

                return false;
            });

            $('#updateUnused').on('click', function () {

                $('.selected').each(function (idx) {
                    var id = $(this).attr('data-id');

                    $.ajax({
                        method: 'PUT',
                        url: base + '/subcategory/update',
                        data: { id: id, cat_id: selectedCategory }
                    }).done(function (data) {

                    });
                });

                $('#myModal').modal('hide');
                return false;
            });

            break;
        }
        case "collections": {

            $.ajax({
                url: base + '/collections/all',
                method: 'GET'
            }).done(function (data) {
                var array = data.response;
                var html = '';
                if (array.length) {
                    for (var i = 0; i < array.length; i++) {
                        var name = array[i].name;
                        html += '<div class="panel panel-default">';
                        html += '<div class="panel-heading" data-id="' + array[i].id + '" role="tab" id="heading' + array[i].id + '">';
                        html += '<h4 class="panel-title">';
                        html += '<a role="button" class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse' + array[i].id + '" aria-expanded="false" aria-controls="collapse' + array[i].id + '">';
                        html += name;
                        html += '<span style="float:right" data-id="' + array[i].id + '" class="removecat glyphicon glyphicon-remove" aria-hidden="true"></span>';
                        html += '</a></h4></div>';
                        html += '<div id="collapse' + array[i].id + '" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading' + array[i].id + '"><div class="panel-body">';
                        html += '<div class="col-md-6">';
                        html += '<input type="text" id="name' + array[i].id + '" class="form-control" value="' + array[i].name + '"/>';
                        html += '<h4>Description:</h4>';
                        html += '<textarea id="description' + array[i].id + '" class="form-control">' + array[i].description + '</textarea>';
                        html += '<h4>Story:</h4>';
                        html += '<textarea id="story' + array[i].id + '" class="form-control">' + array[i].story + '</textarea>';
                        html += '<h4>Debut:</h4>';
                        html += '<input type="text" id="debut' + array[i].id + '" class="datepicker form-control" value="' + array[i].debut.split('T')[0] + '"/>';
                        html += '<h4>Season:</h4>';
                        html += '<select id="season' + array[i].id + '" ><option ' + (array[i].season == 'Spring' ? 'selected' : "") + ' >Spring</option><option ' + (array[i].season == 'Summer' ? 'selected' : "") + '>Summer</option><option ' + (array[i].season == 'Autumn' ? 'selected' : "") + '>Autumn</option><option ' + (array[i].season == 'Winter' ? 'selected' : "") + '>Winter</option></select>';
                        html += '<div><button type="button" id="update-btn" data-id="' + array[i].id + '" class="update-btn btn btn-primary">Update Collection</button></div>';
                        html += '</div>';
                        html += '<div class="col-md-6 products">';
                        html += '<h4>In collection:</h4>';
                        html += '<div id="incollection' + array[i].id + '"></div>';
                        html += '<h4>Add to collection:</h4>';
                        html += '<div id="notincollection' + array[i].id + '" class="notincollection"></div>';
                        html += '</div>';
                        html += '</div>' +
                            '</div></div></div>';
                    }
                    $('#accordion').html(html);
                    var activeCollapse = $.cookie('activeCollapseCollection');
                    if (activeCollapse != null)
                        $("#" + activeCollapse).addClass('in');

                    $('.panel-heading').each(function () {
                        var id = $(this).data('id');

                        $.ajax({
                            url: base + '/collections/products/' + id,
                            method: 'GET'
                        }).done(function (success) {

                            if (success.response.length) {
                                var products = success.response;
                                for (var i = 0; i < products.length; i++) {
                                    html = '<div class="collection-products">' + products[i].name + '<span style="float:right" id="removeproduct' + products[i].id + '" data-id="' + products[i].id + '" data-main-id="' + id + '" class="removeproduct glyphicon glyphicon-remove" aria-hidden="true"></span>' + '</div>';
                                    $('#incollection' + id).append(html);
                                }
                            }
                        });
                    });

                    $('.panel-heading').each(function () {
                        var id = $(this).data('id');

                        $.ajax({
                            url: base + '/products/nocollection',
                            method: 'GET'
                        }).done(function (success) {
                            if (success.response.length) {
                                var products = success.response;
                                for (var i = 0; i < products.length; i++) {
                                    html = '<div class="collection-products">' + products[i].name + '<span style="float:right" id="addproduct' + products[i].id + '" data-id="' + products[i].id + '" data-main-id="' + id + '"  class="addproduct glyphicon glyphicon-plus" aria-hidden="true"></span>' + '</div>';
                                    $('#notincollection' + id).append(html);
                                }
                            }
                        });
                    });

                    $('body').on('click', '.update-btn', function () {
                        var id = $(this).data('id');
                        var name = $('#name' + id).val();
                        var desc = $('#description' + id).val();
                        var story = $('#story' + id).val();
                        var debut = $('#debut' + id).val();
                        var season = $('#season' + id).val();
                        $.ajax({
                            url: base + '/collections/update',
                            method: 'PUT',
                            data: { name: name, description: desc, story: story, debut: debut, season: season, id: id }
                        }).done(function (data) {
                            console.log(data);
                        });
                    });

                    $('.datepicker').datepicker({
                        dateFormat: 'yy-mm-dd'
                    });

                    $('body').on('click', '.removeproduct', function () {
                        var id = $(this).data('id');
                        var main = $(this).data('main-id');
                        $.ajax({
                            url: base + '/products/update',
                            method: 'PUT',
                            data: { CollectionId: null, id: id }
                        }).done(function (data) {
                            if (data.response[0] == 1) {
                                $('.panel-collapse').each(function () {
                                    var active = $(this);
                                    if (active.hasClass('in')) {
                                        $.cookie('activeCollapseCollection', active.attr('id'));
                                    }
                                });
                                window.location.reload();
                            }
                        });
                    });


                    $('body').on('click', '.addproduct', function () {
                        var id = $(this).data('id');
                        var main = $(this).data('main-id');
                        $.ajax({
                            url: base + '/products/update',
                            method: 'PUT',
                            data: { CollectionId: main, id: id }
                        }).done(function (data) {
                            window.location.reload();
                            $('.panel-collapse').each(function () {
                                var active = $(this);
                                if (active.hasClass('in')) {
                                    $.cookie('activeCollapseCollection', active.attr('id'));
                                }
                            });
                        });
                    });

                }
            });
        }
        case "products":
        case "products#": {
            initSelects();

            setTimeout(() => {
                updateLabelSize();
            }, 2000);

            $.ajax({
                url: base + '/products/allbygroup',
                method: 'GET'
            }).done(data => {
                if (data.response.length) {
                    var products = data.response;
                    retriveProducts(products);
                    var dict = {};

                    for (var idx in data.response) {

                        if (dict.hasOwnProperty(products[idx].catname))
                            dict[products[idx].catname].push(products[idx]);
                        else {
                            dict[products[idx].catname] = [];
                            dict[products[idx].catname].push(products[idx]);
                        }
                    }

                    $.each(dict, (k, v) => {

                        $('#product-menu')
                            .append($('<h3>' + k + '</h3><ul id="' + k + '"></ul>'));
                        v.forEach(product => {
                            $('#' + k)
                                .append($('<li></li>')
                                    .attr('data-id', product.id).append($('<div class="img-wrapper" id="img-wrapper' + product.id + '"><img src="" id="image' + product.id + '" /></div>'))
                                    .append($('<a href="#" class="select-product" data-id="' + product.id + '"><div class="details-wrapper" data-id="' + product.id + '"><div class="product-name" data-id="' + product.id + '">' + product.name + '</div><div data-id="' + product.id + '">' + product.description + '</div><div class="glyphicon glyphicon-menu-right"></div></div></a>')));

                            $.ajax({
                                url: base + '/images/featured/' + product.id,
                                method: 'GET'
                            }).done(data => {
                                if (data.response != null) {
                                    $('#image' + product.id).attr('src', base + "/images/" + data.response.path);
                                } else {
                                    $('#img-wrapper' + product.id).append($('<div class="glyphicon glyphicon-picture" aria-hidden="true"></div>'));
                                }
                            });
                        });
                    });
                }
            });

            $('body').on('click', '.select-product', () => {
                var id = $(this).data('id');
            });

            $('#product-new').on('click', () => {
                $('#product-name').val('');
                $('#product-description').val('');
                $('#product-date').text('-');
                $('#product-price').val('');
                $('#product-collection option')[0].selected = true;
                $('#product-category option')[0].selected = true;
                $("#product-materials > option").attr("selected", false);
                $('#product-materials').prop('selectedIndex', -1);
                $('#product-files').val('');
                $('.product-size').val('');
                $('#images-list').empty();
                initSelects();
                $('input[type=text]').change();

            });

            function updateLabelSize() {
                var maxWidth = 0;
                $('.size-label').each(function (i, obj) {
                    var w = $(this).width();
                    if (maxWidth < w)
                        maxWidth = w;
                });
                $('.size-label').width(maxWidth);
            }

            function initSelects() {
                if ($('#product-collection option').size() == 1) {
                    $.ajax({
                        url: base + '/collections/all',
                        method: 'GET'
                    }).done((data) => {
                        if (data.response.length) {
                            var collections = data.response;
                            for (var i = 0; i < collections.length; i++) {
                                $('#product-collection').append($('<option value="' + collections[i].id + '" data-id="' + collections[i].id + '">' + collections[i].name + '</option>'));
                            }
                        }
                    });
                }
                if ($('#product-category option').size() == 1) {
                    $.ajax({
                        url: base + '/categories',
                        method: 'GET'
                    }).done((data) => {
                        if (data.length) {
                            for (var i = 0; i < data.length; i++) {
                                var main_cat = data[i].name;
                                for (var j = 0; j < data[i].sub.length; j++) {
                                    $('#product-category').append($('<option value="' + data[i].sub[j].id + '" data-id="' + data[i].sub[j].id + '">' + main_cat + '-' + data[i].sub[j].name + '</option>'));
                                }
                            }
                        }
                    });
                }
                if ($('#product-materials option').size() == 1) {
                    $.ajax({
                        url: base + '/materials',
                        method: 'GET'
                    }).done((data) => {
                        if (data.response.length) {
                            for (var i = 0; i < data.response.length; i++) {
                                $('#product-materials').append($('<option value="' + data.response[i].id + '" data-id="' + data.response[i].id + '">' + data.response[i].name + '</option>'));
                            }
                        }
                    });
                }
            }

            $('body').on('click', '.select-product', (e) => {
                var id = e.target.getAttribute('data-id');
                var selected = null;
                for (var i = 0; i < self.products.length; i++)
                    if (self.products[i].id == id)
                        selected = self.products[i];
                if (selected) {
                    $("#product-materials > option").attr("selected", false);
                    $('#product-image-upload').attr('data-selected', id);
                    $('#product-name').val(selected.name);
                    $('#product-description').val(selected.description);
                    $('#product-date').text(selected.date_added.split('T')[0]);
                    $('#product-price').val(selected.price);
                    $('#product-collection').val(selected.CollectionId).change();
                    $('#product-category').val(selected.SubCategoryId).change();

                    $.ajax({
                        url: base + '/stocks/list/' + selected.id,
                        method: 'GET'
                    }).done((data) => {
                        if (data.response && data.response.id) {
                            $('#product-xl-text').val(data.response.num_xl);
                            $('#product-l-text').val(data.response.num_l);
                            $('#product-m-text').val(data.response.num_m);
                            $('#product-s-text').val(data.response.num_s);
                            $('#product-xs-text').val(data.response.num_xs);
                            $('#product-xl-text').attr('data-id', data.response.id);
                            updateLabelSize();
                        }
                    });
                    $('input[type=text]').change();
                    $.ajax({
                        url: base + '/materials/get/' + selected.id,
                        method: 'GET'
                    }).done((data) => {
                        if (data.response.length) {
                            var materials = data.response;
                            for (var i = 0; i < materials.length; i++) {
                                $('#product-materials option[value="' + materials[i].Id + '"]').attr("selected", true);
                            }
                            $('#product-materials').trigger('focus');
                        }
                    });

                    $.ajax({
                        url: base + '/images/list/' + selected.id,
                        method: 'GET'
                    }).done((data) => {
                        console.log(data.response);
                        if (data.response.length) {
                            $('#images-list').html('');
                            var images = data.response;
                            for (var i = 0; i < images.length; i++) {
                                $('#images-list').append($('<div class="image-wrapper"><img data-productid="' + id + '" data-id="' + images[i].id + '" class="image ' + (images[i].featured ? 'featured' : "") + '"  src="/images/' + images[i].path + '" alt="' + selected.name + '" /><div data-imageid="' + images[i].id + '" data-name="' + images[i].path + '" data-id="' + id + '" class="remove-image glyphicon glyphicon-remove"></div></div>'));
                            }
                        }
                        else {
                            $('#images-list').html('');
                            $('#images-list').append($('<h3>No Images Found</h3>'));
                        }
                    });

                }
            });


            $('#product-image-upload').on('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                var id = $('#product-image-upload').data('selected');

                if (id) {
                    var formData = new FormData();
                    var files = $('#product-files').get(0).files;
                    var selected = null;
                    for (var i = 0; i < self.products.length; i++)
                        if (self.products[i].id == id)
                            selected = self.products[i];

                    for (var i = 0; i < files.length; i++) {
                        formData.append('name' + i, files[i].name);
                        formData.append('img' + i, files[i]);
                    }

                    $.ajax({
                        method: 'POST',
                        url: base + '/images/upload',
                        data: formData,
                        cache: false,
                        contentType: false,
                        processData: false
                    }).done((data) => {
                        if (data.response) {

                            var images = data.response.images;
                            //TODO upload resposne

                            if (images.length) {
                                $('#collapseOne').collapse('toggle');
                                for (var i = 0; i < images.length; i++) {
                                    $('#images-list h3').remove();
                                    $('#images-list').append($('<div class="image-wrapper"><img data-productid="' + id + '" data-id="' + images[i].id + '" class="image ' + (images[i].featured ? 'featured' : "") + '" src="/images/' + images[i] + '" alt="' + selected.name + '" /><div data-id="' + id + '" data-name="' + images[i] + '" data-imageid="' + images[i].id + '" class="remove-image glyphicon glyphicon-remove"></div></div>'));

                                    $.ajax({
                                        url: base + '/images/add',
                                        method: 'POST',
                                        data: {
                                            path: images[i],
                                            title: selected.name ? selected.name : "",
                                            ProductId: id
                                        }
                                    }).done((resp) => {
                                        console.log(resp);
                                        var img = resp.response;
                                        registerRecordToImage(img.id, img.path);
                                    });
                                }
                            }

                        }
                    });
                } else {
                    //TODO
                    alert('You must choose a product in order to upload a photos!');
                }

                function registerRecordToImage(ImageId, name) {
                    var elem = $('div').find("[data-name='" + name + "']");
                    elem.attr('data-imageid', ImageId);
                }
                return false;
            });

            $('body').on('click', '.image', (e) => {

                $.each($('.image'), (i, elem) => {
                    if ($(elem).hasClass('featured'))
                        $(elem).removeClass('featured');
                });
                $(e.target).addClass('featured');

                $.ajax({
                    url: base + '/images/unfeature',
                    method: 'PUT',
                    data: { ProductId: $(e.target).data('productid') },
                    success: function (data) {
                        $.ajax({
                            url: base + '/images/feature',
                            method: 'PUT',
                            data: { feature: 1, id: $(e.target).data('id') }
                        }).done((data) => {
                            console.log(data);
                        });
                    }
                }).done((data) => {

                });
            });

            $('body').on('click', '.remove-image', (e) => {
                var target = $(e.target);
                var imageid = target.data('imageid');
                var name = $('div').find("[data-imageid='" + imageid + "']").data('name');

                $.ajax({
                    url: base + '/images/delete',
                    method: 'DELETE',
                    data: { id: imageid }
                }).done((data) => {
                    //TODO üzenet a törlés sikeréről
                });

                $.ajax({
                    url: base + '/images/unlink',
                    method: 'DELETE',
                    data: { name: name }
                }).done((data) => {
                });
                target.parent().remove();
            });

            $('#product-save').on('click', () => {
                var id = $('#product-image-upload').data('selected');
                if (id) {
                    var materials = $('#product-materials').val();

                    $.ajax({
                        url: base + '/products/update',
                        method: 'PUT',
                        data: {
                            name: $('#product-name').val(),
                            description: $('#product-description').val(),
                            price: $('#product-price').val(),
                            SubCategoryId: $('#product-category').val() ? $('#product-category').val() : null,
                            CollectionId: $('#product-collection').val() ? $('#product-collection').val() : null,
                            id: id
                        }
                    }).done((data) => {
                        console.log(data);
                    });

                    $.ajax({
                        url: base + '/materials/product',
                        method: 'DELETE',
                        data: { ProductId: id}
                    }).done((data) => {
                        console.log(data);
                    });

                    for (var i = 0; i < materials.length; i++) {
                        $.ajax({
                            url: base + '/materials/add/product',
                            method: 'POST',
                            data: { ProductId: id, MaterialId: materials[i] }
                        }).done((data) => {
                            console.log(data);
                        });
                    }

                    $.ajax({
                        url: base + '/stocks/update',
                        method: 'PUT',
                        data: {
                            num_xs: $('#product-xs-text').val(),
                            num_s: $('#product-s-text').val(),
                            num_m: $('#product-m-text').val(),
                            num_l: $('#product-l-text').val(),
                            num_xl: $('#product-xl-text').val(),
                            ProductId: id,
                            id: $('#product-xl-text').data('id')
                        }
                    }).done((data) => {
                        console.log(data);
                    });

                } else {
                    //TODO
                    alert('Please select a product!');
                }
            });
        }
    }
});

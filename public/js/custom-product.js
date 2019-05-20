$(document).ready(function() {
    var flagUpdate = false;

    getProductsToDisplay(1,10);

    $("body").on("click", "#product-management #page .item", function(){
        let numPage = $(this).text();

        // Clear content in tbody of the table
        $("#product-table tbody").html("");

        // Ajax to get data;
        getProductsToDisplay(numPage, 10);
    });

    function getProductsToDisplay(page, limit) {
        
        $.ajax({
            type: 'GET',
            data: {
                page: page,
                limit: limit,
            },
            url: '/products/search-limit',
            success: (result) => {
                for (let i = 0; i< result.length; i++) {
                    let id = result[i].product_id;
                    let name = result[i].product_name;
                    let type = result[i].product_type;
                    let brand = result[i].product_brand;
                    let price = result[i].product_price;
                    let qty = result[i].product_amount;
                    let category = result[i].product_category;
                    let color = result[i].product_color;
                    let weight = result[i].product_weight;
                    $("#product-table tbody").append(
                        addProductToTable(id, name, type, brand, price, qty, category, color, weight)
                    );
                    
                    // Add pop-up to icon
                    addPopup();
                }

                // Display message if there is no data to display
                addNoDataMessage();

            },
            error: (err) => {
                console.log(err);
            }
        });
    }

    // Remove user 
    $("body").on("click", ".remove", function() {
        let productName = $(this).closest("tr").find(".tab-product-name").text();
        let productId = $(this).closest("tr").find(".tab-product-id").text();
       
        if (confirm("Are you sure to remove " + productName + " ?")) {
            $.ajax({
                type: 'GET',
                data: {
                    product_id: productId
                },
                url: '/products/delete-product',
                success: (result) => {
                    location.reload();
                },
                error: (err) => {
                    console.log(err);
                }
            });
        }
    });

    // Add new product
    $("body").on("click", "#add-product-btn", function() {
        flagUpdate = false;
        $('#add-product-modal').modal({
            blurring: true,
            closable: false,
            onShow: function () {
                $("#add-product-modal").css("margin-top","-25%");
                $("#add-product-modal").css("margin-left","-28%");

                ClearModal();
                $("input[name=modalProductName]").attr("disabled", false);
            }
            // show modal
        }).modal('show');
    });

    // Update user information
    $("body").on("click", ".update", function() {
        let productId = $(this).closest("tr").find(".tab-product-id").attr("data-id");
        flagUpdate = true;

        $.ajax({
            type: 'GET',
            data: {
                productId: productId
            },
            url: '/products/find-product',
            success: (result) => {
                $('#add-product-modal').modal({
                    blurring: true,
                    closable: false,
                    onShow: function () {
                        $("#add-product-modal").css("margin-top","-20%");
                        $("#add-product-modal").css("margin-left","-28%");

                        //  Get data to display
                        $("#product-img").attr("src", result.product_image_url);
                        $("input[name=modalProductName]").val(result.product_name);
                        $("input[name=modalProductName]").attr("disabled", true);
                        $("select[name=modalProductCat]").val(result.product_category);
                        $("select[name=modalProductColor]").val(result.product_color);
                        $("select[name=modalProductBrand]").val(result.product_brand);
                        $("textarea[name=modalProductDescript]").val(result.product_description);
                        $("input[name=modalProductType]").val(result.product_type);
                        $("input[name=modalProductPrice]").val(result.product_price);
                        $("input[name=modalProductQty]").val(result.product_amount);
                        $("input[name=modalProductWeight]").val(result.product_weight);
                    }
                    // show modal
                }).modal('show');
            },
            error: (err) => {
                console.log(err);
            }
        });

        
    });
    
    // Create new user
    $("body").on("click", "#finish-create-product-btn", function() {
        let product_img_url = $("#product-img").attr("src");   
        let product_name = $("input[name=modalProductName]").val();
        let product_category = $("select[name=modalProductCat]").val();
        let product_color = $("select[name=modalProductColor]").val();
        let product_brand = $("select[name=modalProductBrand]").val();
        let product_description = $("textarea[name=modalProductDescript]").val();
        let product_type = $("input[name=modalProductType]").val();
        let product_price = $("input[name=modalProductPrice]").val();
        let product_amount = $("input[name=modalProductQty]").val();
        let product_weight = $("input[name=modalProductWeight]").val();

        if (flagUpdate == false) {
            $.ajax({
                type: 'POST',
                data: {
                    product_img_url : product_img_url,
                    product_description : product_description,
                    product_name : product_name,
                    product_category : product_category,
                    product_color : product_color,
                    product_brand : product_brand,
                    product_type : product_type,
                    product_price : product_price,
                    product_amount: product_amount,
                    product_weight: product_weight
                },
                url: '/products/create',
                success: (result) => {
                    location.reload();
                    alert(product_name + " successfully created !");
                },
                error: (err) => {
                    console.log(err);
                }
            });
        }
        else {

            $.ajax({
                type: 'GET',
                data: {
                    product_name : product_name,
                    updateData : {
                        product_img_url : product_img_url,
                        product_description : product_description,
                        product_category : product_category,
                        product_color : product_color,
                        product_brand : product_brand,
                        product_type : product_type,
                        product_price : product_price,
                        product_amount: product_amount,
                        product_weight: product_weight
                    }
                },
                url: '/products/update-product',
                success: (result) => {
                    location.reload();
                    alert(product_name + " successfully updated !");
                },
                error: (err) => {
                    console.log(err);
                }
            });
        }
    });

    // Choose image
    $("body").on("click" ,"#product-img", function() {
        $("#product-img-input").click();
    });

    // Process product image input
    $("#product-img-input").on("change", function() {
        var file = $(this).get()[0].files[0];

        var data = new FormData();
        data.append('file', file);

        $.ajax({
            type: 'POST',
            enctype: 'multipart/form-data',
            data: data,
            url: '/products/upload-image',
            contentType: false,
            processData: false,
            cache: false,
            success: function() {
                var name = file.name;
                
                $("#product-img").attr("src", "./img/uploads/" + name);
    
            },
            error: function() {
                console.log('File is not uploaded');
            }
        });
    });

    // Search User
    $("#search-product").keyup(function(){
        let productName = $(this).val();
        if (productName != "") {
            $.ajax({
                type: 'GET',
                data: {
                    product_name: productName
                },
                url: '/products/search',
                success: (result) => {
                    if (result != []) {
                        // Clear tbody content
                        $("#product-table tbody").text("");
                        // Get data to display

                        for (let i = 0; i< result.length; i++) {
                            let id = result[i].product_id;
                            let name = result[i].product_name;
                            let type = result[i].product_type;
                            let brand = result[i].product_brand;
                            let price = result[i].product_price;
                            let qty = result[i].product_amount;
                            let category = result[i].product_category;
                            let color = result[i].product_color;
                            let weight = result[i].product_weight;
                            $("#product-table tbody").append(
                                addProductToTable(id, name, type, brand, price, qty, category, color, weight)
                            );
                            
                            // Add pop-up to icon
                            addPopup();
                        }
                    }
                    else {
                        // Display message if there is no data to display
                        addNoDataMessage();
                    }
                },
                error: (err) => {
                    console.log(err);
                }
            });
        }
        
    });

    // Prevent price malformed characters
    $("input[name=modalProductPrice]").on("keyup", function(){
        let price = $(this).val();

        $(this).val(priceFormat(price));
    });

    function priceFormat(price) {
        let cleaned = price.replace(/[^0-9]/gi, '')
        let priceLen = cleaned.length;
    
        if (priceLen == 0) {
            return "";
        }
        else if (priceLen < 4) {
            return cleaned.substr(0,3) ;
        }
        else if (priceLen < 7) {
            return cleaned.substr(0,3) + '.' + cleaned.substr(3,3);
        }
        else if (priceLen < 10) {
            return cleaned.substr(0,3) + '.' + cleaned.substr(3,3) + '.' + cleaned.substr(6,3);
        }
        else {
            return cleaned.substr(0,3) + '.' + cleaned.substr(3,3) + '.' + cleaned.substr(6,3) + '.' + cleaned.substr(9,3);
        }
    }

    // Add product
    function addProductToTable(id, name, type, brand, price, qty, category, color, weight) {
        let diplayColor = ''
        switch (color) {
            case 'Black':
                diplayColor = `<span class="ui black label">` + color + `</span>`;
                break;
            case 'White':
                diplayColor = `<span class="ui white label">` + color + `</span>`;
                break;
            case 'Red':
                diplayColor = `<span class="ui red label">` + color + `</span>`;
                break;
            case 'Yellow':
                diplayColor = `<span class="ui yellow label">` + color + `</span>`;
                break;
            case 'Orange':
                diplayColor = `<span class="ui orange label">` + color + `</span>`;
                break;
            case 'Blue Coral':
            case 'Blue':
                diplayColor = `<span class="ui blue label">` + color + `</span>`;
                break;
            case 'Green':
                diplayColor = `<span class="ui green label">` + color + `</span>`;
                break;
            case 'Pink':
                diplayColor = `<span class="ui green label">` + color + `</span>`;
                break;
            default:
                diplayColor = `<span class="ui label">` + color + `</span>`;
                break;  
        }

        content = 
        `
        <tr>
            <td class="center aligned tab-product-id" data-id="` + id + `">` + id + `</td>
            <td class="center aligned tab-product-name" ><span class="ui teal basic label">` + name + `</span></td>
            <td class="center aligned ">` + type + `</td>
            <td class="center aligned ">` + brand +`</td>
            <td class="center aligned "><span class="ui red basic label">` + price + ` ₫</span></td>
            <td class="center aligned ">` + qty + `</td>
            <td class="center aligned " >` + category + `</td>
            <td class="center aligned " >` + diplayColor + `</td>
            <td class="center aligned " >` + weight + ` g </td>
            <td class="center aligned ">
                <a class="remove"> 
                    <i class="trash icon"></i>
                </a>
                <a class="update">
                    <i class="info circle icon"></i>
                </a>
            </td>
        </tr>
        `;

        return content;
    }

    // Message
    function addNoDataMessage() {
        if ($("#product-table tbody").text() == "") {
            $("#user-table tbody").append(
                `<tr>
                    <td class="center aligned" colspan="9"><h1> No data to display</h1></td>
                </tr>`
            );
        }
    }


    // Popup
    function addPopup() {
        $('.remove')
            .popup({
                content: 'Remove'
            });
    
        $('.update')
            .popup({
                content: 'Update information'
            });
    }
});


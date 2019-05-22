$(document).ready(function(){
    var flagUpdate = false;
    // Get data in the first time when access to page
    getUsersToDisplay(1,10);

    $("body").on("click", "#user-management #page .item", function(){
        let numPage = $(this).text();

        // Clear content in tbody of the table
        $("#user-table tbody").html("");

        // Ajax to get data;
        getUsersToDisplay(numPage, 10);
    });

    function getUsersToDisplay(page, limit) {
        
        $.ajax({
            type: 'GET',
            data: {
                page: page,
                limit: limit,
            },
            url: '/users/search-limit',
            success: (result) => {
                for (let i = 0; i< result.length; i++) {
                    let id = result[i].user_id;
                    let email = result[i].user_email;
                    let phone = result[i].user_phone;
                    let gender = result[i].is_female;
                    let firstName = result[i].user_firstname;
                    let lastName = result[i].user_lastname;
                    let address = result[i].user_address;
                    let role_id = result[i].role_id;
                    $("#user-table tbody").append(
                        addUserToTable(id, email, phone, gender, firstName, lastName, address, role_id)
                    );
                    
                    // Add pop-up to icon
                    addUserPopup();
                }

                // Display message if there is no data to display
                addNoDataMessage();

            },
            error: (err) => {
                console.log(err);
            }
        });
    }

    function addNoDataMessage() {
        if ($("#user-table tbody").text() == "") {
            $("#user-table tbody").append(
                `<tr>
                    <td class="center aligned" colspan="9"><h1> No data to display</h1></td>
                </tr>`
            );
        }
    }

    // Remove user 
    $("body").on("click", ".remove-user", function() {
        let userMail = $(this).closest("tr").find(".user-email").text();
        if (confirm("Are you sure to remove " + userMail + " ?")) {
            $.ajax({
                type: 'GET',
                data: {
                    email: userMail
                },
                url: '/users/delete-user',
                success: (result) => {
                    location.reload();
                },
                error: (err) => {
                    console.log(err);
                }
            });
        }
    });

    // Add new user
    $("body").on("click", "#add-user-btn", function() {
        flagUpdate = false;
        $('#add-user-modal').modal({
            blurring: true,
            closable: false,
            onShow: function () {
                
                $("#add-user-modal").css("margin-top","-20%");
                $("#add-user-modal").css("margin-left","-28%");

                // Get user information from table
    
                $("input[name=modalUserPassword]").attr("disabled", false);
                $("input[name=modalUserMail]").attr("disabled", false);
            }
            // show modal
        }).modal('show');
    });

    // Update user information
    $("body").on("click", ".update-user", function() {
        let email = $(this).closest("tr").find(".user-email").text();
        flagUpdate = true;

        $.ajax({
            type: 'GET',
            data: {
                email: email
            },
            url: '/users/find-user',
            success: (result) => {
                $('#add-user-modal').modal({
                    blurring: true,
                    closable: false,
                    onShow: function () {
                        $("#add-user-modal").css("margin-top","-20%");
                        $("#add-user-modal").css("margin-left","-28%");
                        //  Get data to display
                        $("input[name=modalUserMail]").val(email);
                        $("input[name=modalUserMail]").attr("disabled", true);
                        $("input[name=modalUserPassword]").val(result.user_password);
                        $("input[name=modalUserPassword]").attr("disabled", true);
                        $("input[name=modalUserPhone]").val(result.user_phone);
                        $("input[name=modalUserGender]").removeAttr('checked');
                        $("input[name=modalUserGender][value=" + result.is_female + "]").attr("checked","checked");
                        $("input[name=modalUserFirstname]").val(result.user_firstname);
                        $("input[name=modalUserLastname]").val(result.user_lastname);
                        $("input[name=modalUserAddress]").val(result.user_address);
                        $("select[name=modalUserRole]").val(result.role_id);
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
    $("body").on("click", "#finish-create-user-btn", function() {
        let user_email = $("input[name=modalUserMail]").val();
        let user_password = $("input[name=modalUserPassword]").val();
        let user_phone = $("input[name=modalUserPhone]").val();
        let is_female = $("input[name=modalUserGender]:checked").val();
        let user_firstname = $("input[name=modalUserFirstname]").val();
        let user_lastname = $("input[name=modalUserLastname]").val();
        let user_address = $("input[name=modalUserAddress]").val();
        let user_role = $("select[name=modalUserRole]").val();

        if (flagUpdate == false) {
            $.ajax({
                type: 'POST',
                data: {
                    user_email : user_email,
                    user_password : user_password,
                    user_phone : user_phone,
                    is_female : is_female,
                    user_firstname : user_firstname,
                    user_lastname : user_lastname,
                    user_address : user_address,
                    role_id: user_role,
                },
                url: '/users/signup',
                success: (result) => {
                    location.reload();
                    alert(user_email + " successfully created !");
                },
                error: (err) => {
                    console.log(err);
                }
            });
        }
        else {
            console.log(user_role);
            $.ajax({
                type: 'GET',
                data: {
                    email : user_email,
                    updateData : {
                        user_phone : user_phone,
                        is_female : is_female,
                        user_firstname : user_firstname,
                        user_lastname : user_lastname,
                        user_address : user_address,
                        role_id: user_role,
                    }
                },
                url: '/users/update-user',
                success: (result) => {
                    location.reload();
                    alert(user_email + " successfully updated !");
                },
                error: (err) => {
                    console.log(err);
                }
            });
        }
    });
    
    // Search User
    $("#search-user").keyup(function(){
        let userMail = $(this).val();
        
        $.ajax({
            type: 'GET',
            data: {
                email: userMail
            },
            url: '/users/search',
            success: (result) => {
                if (result != []) {
                    // Clear tbody content
                    $("#user-table tbody").text("");
                    // Get data to display
                    for (let i = 0; i< result.length; i++) {
                        let id = result[i].user_id;
                        let email = result[i].user_email;
                        let phone = result[i].user_phone;
                        let gender = result[i].is_female;
                        let firstName = result[i].user_firstname;
                        let lastName = result[i].user_lastname;
                        let address = result[i].user_address;
                        let role_id = result[i].role_id;
                        $("#user-table tbody").append(
                            addUserToTable(id, email, phone, gender, firstName, lastName, address, role_id)
                        );
                        
                        // Add pop-up to icon
                        addUserPopup();
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
        
    });
});

function addUserToTable(id, email, phone, gender, firstName, lastName, address, role_id) {
    gender = ((gender == 0) ? 'Male' : 'Female');
    var role = ((role_id == 0) ? '<span class="ui red basic label">Admin</span>' : '<span class="ui olive basic label">Customer</span>')

    content = 
    `
    <tr>
        <td class="center aligned ">` + id + `</td>
        <td class="center aligned user-email "><span class="ui teal basic label">` + email + `</span></td>
        <td>` + phone + `</td>
        <td>` + gender +`</td>
        <td>` + firstName + `</td>
        <td>` + lastName + `</td>
        <td>` + address + `</td>
        <td class="center aligned" data-id="`+ role_id+`">` + role + `</td>
        <td class="center aligned">
            <a class="remove-user"> 
                <i class="trash icon"></i>
            </a>
            <a class="update-user">
                <i class="info circle icon"></i>
            </a>
        </td>
    </tr>
    `;

    return content;

}

function addUserPopup() {
    $('.remove-user')
        .popup({
            content: 'Remove'
        });

    $('.update-user')
        .popup({
            content: 'Update information'
        });
}

function ClearModal() {
    $(".ui .modal").form('reset');
}


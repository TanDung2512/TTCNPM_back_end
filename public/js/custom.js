$(document).ready(function(){

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
                    $("#user-table tbody").append(
                        addUserToTable(id, email, phone, gender, firstName, lastName, address)
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
                    <td class="center aligned" colspan="8"><h1> No data to display</h1></td>
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
        $('#add-user-modal').modal({
            blurring: true,
            closable: false,
            onShow: function () {
                $("#add-user-modal").css("margin-top","-20%");
                $("#add-user-modal").css("margin-left","-28%");
            }
            // show modal
        }).modal('show');
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
    });
    
    // Search User
    $("#search-user").keyup(function(){
        let userMail = $(this).val();
        
        if (userMail.length > 3) {
            console.log(userMail.length);
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
                            $("#user-table tbody").append(
                                addUserToTable(id, email, phone, gender, firstName, lastName, address)
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
        }
    });
});

function addUserToTable(id, email, phone, gender, firstName, lastName, address) {
    gender = ((gender == 0) ? 'Male' : 'Female');
    content = 
    `
    <tr>
        <td class="center aligned">` + id + `</td>
        <td class="center aligned user-email "><span class="ui teal basic label">` + email + `</span></td>
        <td>` + phone + `</td>
        <td>` + gender +`</td>
        <td>` + firstName + `</td>
        <td>` + lastName + `</td>
        <td>` + address + `</td>
        <td class="center aligned">
            <a class="remove-user"> 
                <i class="trash icon"></i>
            </a>
            <a class="update-user">
                <i class="info icon"></i>
            </a>
        </td>
    </tr>
    `;

    return content;

}

function addUserPopup() {
    $('.remove-user')
        .popup({
            content: 'Remove this user'
        });

    $('.update-user')
        .popup({
            content: 'Update user information'
        });
}


$(document).ready(function(){

    $.ajax({
        type: 'GET',
        data: {
            offset: 0,
            limit: 10,
        },
        url: 'http://localhost:3003/users/search-limit',
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
                addUserPopup()
            }

        },
        error: (err) => {
            console.log(err);
        }
    });

    // Remove user 
    $("body").on("click", ".remove-user", function() {
        let userMail = $(this).closest("tr").find(".user-email").text();
        if (confirm("Are you sure to remove " + userMail + " ?")) {
            $.ajax({
                type: 'GET',
                data: {
                    email: userMail
                },
                url: 'http://localhost:3003/users/delete-user',
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
});

function addUserToTable(id, email, phone, gender, firstName, lastName, address) {
    gender = ((gender == 0) ? 'Male' : 'Female');
    content = 
    `
    <tr>
        <td class="center aligned">` + id + `</td>
        <td class="center aligned user-email "><span class="ui blue basic label">` + email + `</span></td>
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


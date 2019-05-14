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
            }

        },
        error: (err) => {
            console.log(err);
        }
    });

});

function addUserToTable(id, email, phone, gender, firstName, lastName, address) {
    gender = ((gender == 0) ? 'Male' : 'Female');
    content = 
    `
    <tr>
        <td>` + id + `</td>
        <td class="single line">` + email + `</td>
        <td>` + phone + `</td>
        <td>` + gender +`</td>
        <td>` + firstName + `</td>
        <td>` + lastName + `</td>
        <td>` + address + `</td>
    </tr>
    `;

    return content;

}
$(document).ready(function(){

    $("#edit-btn").on("click", function() {
        $(".data-edit").removeClass("disabled");
        $("select[name=userGender]").attr("disabled", false);

        $(".hide-btn").show();
        $(".show-btn").hide();
    });

    $("#cancel-btn").on("click", function() {
        $(".data-edit").addClass("disabled");
        $("select[name=userGender]").attr("disabled", true);

        $(".hide-btn").hide();
        $(".show-btn").show();
    });

    $("#submit-btn").on("click", function() {
        var email = $("input[name=userEmail]").val();
        var phone = $("input[name=userPhone]").val();
        var gender = $("select[name=userGender]").val();
        var firstName = $("input[name=userFirstName]").val();
        var lastName = $("input[name=userLastName]").val();
        var address = $("input[name=userAddress]").val();
        var role = $("input[name=userRole]").val();

        console.log(role);
        $.ajax({
            type: 'GET',
            data: {
                email : email,
                updateData : {
                    user_phone : phone,
                    is_female : gender,
                    user_firstname : firstName,
                    user_lastname : lastName,
                    user_address : address, 
                    user_role : role,
                }
            },
            url: '/users/update-user',
            success: (result) => {
                location.reload();
                alert(email + " successfully updated !");
            },
            error: (err) => {
                console.log(err);
            }
        });

    });
});
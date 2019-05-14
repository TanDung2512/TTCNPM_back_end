$(document).ready(function(){

    $.ajax({
        type: 'GET',
        data: {
            offset: 0,
            limit: 10,
        },
        url: 'http://localhost:3003/users/search-limit',
        success: (result) => {
            console.log(result);
            console.log(aihih);
        },
        error: (err) => {
            console.log(err);
        }
    });

});
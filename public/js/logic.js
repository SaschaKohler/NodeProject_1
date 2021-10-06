function  display_error(errorDiv,errorUl,data){
    $(errorDiv).css('display','block');
    var errors = JSON.parse(data.responseText);
    var errorsContainer = $(errorUl);
    errorsContainer.innerHTML = '';
    var errorsList = '';

    for(var i=0;i< errors.length; i++)
    {
        errorsList += '<li>' + errors[i].msg + '</li>';
    }
    errorsContainer.html(errorsList);
}




$(document).on('click', '#loginModalFormButton', function (e) {
    e.preventDefault();

    $.ajax({
            url: '/login',
            type: 'POST',
            data: {
                username: $('#username').val(),
                password: $('#password').val()
            },
            success: function (data) {
                alert('Submission successful');
                $('#error-group-login').css('display', 'none');
                $('#errors-login').empty();
                console.log(data);
            },
            error: function (data) {

                display_error('#error-group-login','#errors-login', data);
            }

        });
});


$(document).on('click','#registerFormButton', function (e) {
    e.preventDefault();

    $.ajax({
        url:'/register',
        type:'post',
        data: {
            username: $('#usernameForReg').val(),
            email: $('#emailForReg').val(),
            password: $('#passwordForReg').val(),
            passwordConfirm: $('#passwordConfirm').val()
        },
        success: function(){
            alert('Submission successful');
            $('#errors-register').empty();
            $('#error-group-register').css('display','none');
        },
        error: function (data){
            display_error('#error-group-register','#errors-register',data);
        }
    });
});
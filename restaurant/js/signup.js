$(document).on('click', '#btnSubmit', function(e){
    e.preventDefault();
    var submitBtn = $('#btnSubmit');
    var prevContent = submitBtn.html();
    submitBtn.html('<i class="fa fa-spin font-size-16 align-middle me-2"></i> Creating');
    let data = {};
    $.each($('#signupform').serializeArray(), function(k,v){
        data[v.name] = v.value; 
    });

    $.ajax({
        url: `${baseUrl}/api/customer/create-customer`,
        type: "POST",
        dataType: "json",
        data: data,
        success: (result) => {
                // $.growl.notice({
                //     message: result.msg
                // });
                submitBtn.html(prevContent);
                setTimeout(function(){
                    location.assign(`signin.html`);
                }, 1000);
        },
        fail: (xhr) => {
            console.log(xhr);
            showError('Something went wrong! Please check your internet connection.');
            submitBtn.html(prevContent);
        },
        error: (xhr) => {
            console.log(xhr);
            showError(xhr.responseJSON.message);
            submitBtn.html(prevContent);
        }
    });
})
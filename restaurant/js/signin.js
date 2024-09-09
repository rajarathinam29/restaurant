$(document).on('click', '#btnSubmit', function(e){
    e.preventDefault();
    var submitBtn = $('#btnSubmit');
    var prevContent = submitBtn.html();
    submitBtn.html('<i class="fa fa-spin font-size-16 align-middle me-2"></i> Login...');
    let data = {};
    $.each($('#signinform').serializeArray(), function(k,v){
        data[v.name] = v.value; 
    });

    $.ajax({
        url: `${baseUrl}/api/customer/login`,
        type: "POST",
        dataType: "json",
        data: data,
        success: (result) => {
                // $.growl.notice({
                //     message: result.msg
                // });
            submitBtn.html(prevContent);
            localStorage.setItem('RestaurantClient', JSON.stringify(result));
            setTimeout(function(){
                location.assign(`index.html`);
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
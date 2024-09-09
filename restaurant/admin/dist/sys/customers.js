$(document).on('click', '#btnAddCustomer', function(){
    $('#customerAddForm').find('input').val('');
    $('#customerAddForm').find('select').val('').trigger('change');
    $('#modal-add').modal('show');

    $('#btnAddSave').unbind().click(function(){
        
        let data = {};
        $.each($('#customerAddForm').serializeArray(), function(k,v){
            data[v.name] = v.value; 
        });

        $.ajax({
            url: `${baseUrl}/api/customer/create-customer`,
            type: "POST",
            dataType: "json",
            data: data,
            success: (result) => {
                $('#modal-add').modal('hide');
                
                getCustomers();   
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
})

var customersData = [];
function getCustomers(){
    customersData = [];
    let data = {};

    $.ajax({
        url: `${baseUrl}/api/customers`,
        type: "POST",
        dataType: "json",
        data: data,
        success: (result) => {
                // $.growl.notice({
                //     message: result.msg
                // });
                customersData = result;
                showCustomers();
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
}

function showCustomers(){
    if ( $.fn.dataTable.isDataTable( '#customersTbl' ) ) {
        $('#customersTbl').DataTable().destroy();
    }
    $('#customersContent').empty();
    if(customersData.length){
        $.each(customersData, function(k, v){
            var $tr = $('<tr />', {id:k});
            $tr.append(
                $('<td />', {html:`${k+1}`}),
                $('<td />', {html:`${v.first_name} ${v.last_name}`}),
                $('<td />', {html:`${v.phone_no}`}),
                $('<td />', {html:`${v.email}`}),
                $('<td />').append(
                    `<button type="button" class="btn btn-sm btn-outline-success btnView"><i class="fas fa-eye"></i></button>
                    <button type="button" class="btn btn-sm btn-outline-primary btnEdit"><i class="fas fa-edit"></i></button>
                    <button type="button" class="btn btn-sm btn-outline-danger btnDelete"><i class="fas fa-trash"></i></button>`
                ),
            );
            
            $('#customersContent').append($tr);
        });
    }
    //Buttons examples
    var table = $('#customersTbl').DataTable({
        lengthChange: true,
        buttons: ['copy', 'excel', 'pdf', 'colvis'],
        language: {
          searchPlaceholder: 'Search...',
          scrollX: "100%",
          sSearch: '',
          lengthMenu: '_MENU_ '
        }
    });
    table.buttons().container().appendTo('#customersTbl_wrapper .col-md-6:eq(0)');
}

$(document).on('click', '.btnView', function(){
    var k = $(this).parents('tr').attr('id');
    $('#tdName').html(`${customersData[k].first_name} ${customersData[k].last_name}`)
    $('#tdPhoneNo').html(`${customersData[k].phone_no}`)
    $('#tdMail').html(`${customersData[k].email}`)
    $('#tdAddress').html(`${customersData[k].address}`)
    $('#tdUsername').html(`${customersData[k].user_name}`)
    $('#modal-view').modal('show');
})

$(document).on('click', '.btnEdit', function(){
    var k = $(this).parents('tr').attr('id');
    $('#customerEditForm').find('input[name="first_name"]').val(customersData[k].first_name);
    $('#customerEditForm').find('input[name="last_name"]').val(customersData[k].last_name);
    $('#customerEditForm').find('input[name="email"]').val(customersData[k].email);
    $('#customerEditForm').find('input[name="phone_no"]').val(customersData[k].phone_no);
    $('#customerEditForm').find('input[name="address"]').val(customersData[k].address);
    $('#customerEditForm').find('input[name="user_name"]').val(customersData[k].user_name);
    $('#modal-edit').modal('show');

    $('#btnEditSave').unbind().click(function(){
        
        let data = {};
        $.each($('#customerEditForm').serializeArray(), function(k,v){
            data[v.name] = v.value; 
        });

        $.ajax({
            url: `${baseUrl}/api/customer/update-customer/${customersData[k].id}`,
            type: "PUT",
            dataType: "json",
            data: data,
            success: (result) => {
                $('#modal-edit').modal('hide');
                
                getCustomers();   
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
});

$(document).on('click', '.btnDelete', function(){
    var k = $(this).parents('tr').attr('id');
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.value) {
            let data = {};
            $.ajax({
                url: `${baseUrl}/api/customer/delete-customer/${customersData[k].id}`,
                type: 'DELETE',
                data: data,
                success: function(result){
                    getCustomers();
                },
                fail: function (xhr, textStatus, errorThrown) {
                    console.log(xhr);
                    Swal.fire({
                      icon: 'error',
                      title: 'No Internet connection',
                      text: 'Something went wrong! Please check your internet connection.'
                    });
                },
                error: function (xhr, textStatus) {
                    console.log(xhr);
                    Swal.fire({
                      icon: 'error',
                      title: 'Oops...',
                      text: 'Something went wrong!'
                    });
                }
            });
        }
    });
    
})

$(()=>{
    getCustomers()
})
$(document).on('click', '#btnAddRole', function(){
    $('#roleAddForm').find('input').val('');
    $('#roleAddForm').find('select').val('').trigger('change');
    $('#modal-add').modal('show');

    $('#btnAddSave').unbind().click(function(){
        
        let data = {};
        $.each($('#roleAddForm').serializeArray(), function(k,v){
            data[v.name] = v.value; 
        });

        $.ajax({
            url: `${baseUrl}/api/userRole/create`,
            type: "POST",
            dataType: "json",
            data: data,
            success: (result) => {
                $('#modal-add').modal('hide');
                
                getUserRole();   
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

var userRole = [];
function getUserRole(){
    userRole = [];
    let data = {};

    $.ajax({
        url: `${baseUrl}/api/userRoles`,
        type: "POST",
        dataType: "json",
        data: data,
        success: (result) => {
                // $.growl.notice({
                //     message: result.msg
                // });
                userRole = result;
                showUserRole();
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

function showUserRole(){
    if ( $.fn.dataTable.isDataTable( '#roleTbl' ) ) {
        $('#roleTbl').DataTable().destroy();
    }
    $('#roleContent').empty();
    if(userRole.length){
        $.each(userRole, function(k, v){
            var $tr = $('<tr />', {id:k});
            $tr.append(
                $('<td />', {html:`${k+1}`}),
                $('<td />', {html:`${v.role_name} `}),
                $('<td />').append(
                    `<button type="button" class="btn btn-sm btn-outline-success btnView"><i class="fas fa-lock"></i></button>
                    <button type="button" class="btn btn-sm btn-outline-primary btnEdit"><i class="fas fa-edit"></i></button>`
                ),
            );
            
            $('#roleContent').append($tr);
        });
    }
    //Buttons examples
    var table = $('#roleTbl').DataTable({
        lengthChange: true,
        buttons: ['copy', 'excel', 'pdf', 'colvis'],
        language: {
          searchPlaceholder: 'Search...',
          scrollX: "100%",
          sSearch: '',
          lengthMenu: '_MENU_ '
        }
    });
    table.buttons().container().appendTo('#roleTbl_wrapper .col-md-6:eq(0)');
}

$(document).on('click', '.btnView', function(){
    var k = $(this).parents('tr').attr('id');
    $('#tdName').html(`${userRole[k].first_name} ${userRole[k].last_name}`)
    $('#tdPhoneNo').html(`${userRole[k].phone_no}`)
    $('#tdMail').html(`${userRole[k].email}`)
    $('#tdAddress').html(`${userRole[k].address}`)
    $('#tdUsername').html(`${userRole[k].user_name}`)
    $('#tdRole').html(`<span class="badge badge-success">${userRole[k].role_name}</span>`)
    $('#modal-view').modal('show');
})

$(document).on('click', '.btnEdit', function(){
    var k = $(this).parents('tr').attr('id');
    $('#roleEditForm').find('input[name="role_name"]').val(userRole[k].role_name);
    $('#modal-edit').modal('show');

    $('#btnEditSave').unbind().click(function(){
        
        let data = {};
        $.each($('#roleEditForm').serializeArray(), function(k,v){
            data[v.name] = v.value; 
        });

        $.ajax({
            url: `${baseUrl}/api/userRole/update/${userRole[k].id}`,
            type: "PUT",
            dataType: "json",
            data: data,
            success: (result) => {
                $('#modal-edit').modal('hide');
                
                getUserRole();   
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



$(()=>{
    getUserRole()
})
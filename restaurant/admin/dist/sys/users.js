$(document).on('click', '#btnAddUser', function(){
    $('#userAddForm').find('input').val('');
    $('#userAddForm').find('select').val('').trigger('change');
    $('#modal-add').modal('show');

    $('#btnAddSave').unbind().click(function(){
        
        let data = {};
        $.each($('#userAddForm').serializeArray(), function(k,v){
            data[v.name] = v.value; 
        });

        $.ajax({
            url: `${baseUrl}/api/user/create`,
            type: "POST",
            dataType: "json",
            data: data,
            success: (result) => {
                $('#modal-add').modal('hide');
                
                getUsers();   
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
                userRole= result;
                $('select[name="role"]').empty().append('<option value="">Select Role</option>');
                if(userRole.length){
                    $.each(userRole, (k,v)=>{
                        $('select[name="role"]').append(`<option value="${v.id}">${v.role_name}</option>`);
                    })
                }
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

var usersData = [];
function getUsers(){
    usersData = [];
    let data = {};

    $.ajax({
        url: `${baseUrl}/api/users`,
        type: "POST",
        dataType: "json",
        data: data,
        success: (result) => {
                // $.growl.notice({
                //     message: result.msg
                // });
                usersData = result;
                showUsers();
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

function showUsers(){
    if ( $.fn.dataTable.isDataTable( '#usersTbl' ) ) {
        $('#usersTbl').DataTable().destroy();
    }
    $('#usersContent').empty();
    if(usersData.length){
        $.each(usersData, function(k, v){
            var $tr = $('<tr />', {id:k});
            $tr.append(
                $('<td />', {html:`${k+1}`}),
                $('<td />', {html:`${v.first_name} ${v.last_name}`}),
                $('<td />', {html:`${v.phone_no}`}),
                $('<td />', {html:`${v.email}`}),
                $('<td />', {html:`<span class="badge badge-success"> ${v.role_name}</span>`}),
                $('<td />').append(
                    `<button type="button" class="btn btn-sm btn-outline-success btnView"><i class="fas fa-eye"></i></button>
                    <button type="button" class="btn btn-sm btn-outline-primary btnEdit"><i class="fas fa-edit"></i></button>
                    <button type="button" class="btn btn-sm btn-outline-danger btnDelete"><i class="fas fa-trash"></i></button>`
                ),
            );
            
            $('#usersContent').append($tr);
        });
    }
    //Buttons examples
    var table = $('#usersTbl').DataTable({
        lengthChange: true,
        buttons: ['copy', 'excel', 'pdf', 'colvis'],
        language: {
          searchPlaceholder: 'Search...',
          scrollX: "100%",
          sSearch: '',
          lengthMenu: '_MENU_ '
        }
    });
    table.buttons().container().appendTo('#usersTbl_wrapper .col-md-6:eq(0)');
}

$(document).on('click', '.btnView', function(){
    var k = $(this).parents('tr').attr('id');
    $('#tdName').html(`${usersData[k].first_name} ${usersData[k].last_name}`)
    $('#tdPhoneNo').html(`${usersData[k].phone_no}`)
    $('#tdMail').html(`${usersData[k].email}`)
    $('#tdAddress').html(`${usersData[k].address}`)
    $('#tdUsername').html(`${usersData[k].user_name}`)
    $('#tdRole').html(`<span class="badge badge-success">${usersData[k].role_name}</span>`)
    $('#modal-view').modal('show');
})

$(document).on('click', '.btnEdit', function(){
    var k = $(this).parents('tr').attr('id');
    $('#userEditForm').find('input[name="first_name"]').val(usersData[k].first_name);
    $('#userEditForm').find('input[name="last_name"]').val(usersData[k].last_name);
    $('#userEditForm').find('input[name="email"]').val(usersData[k].email);
    $('#userEditForm').find('input[name="phone_no"]').val(usersData[k].phone_no);
    $('#userEditForm').find('input[name="address"]').val(usersData[k].address);
    $('#userEditForm').find('input[name="user_name"]').val(usersData[k].user_name);
    $('#userEditForm').find('select[name="role"]').val(usersData[k].user_role).trigger('change');
    $('#modal-edit').modal('show');

    $('#btnEditSave').unbind().click(function(){
        
        let data = {};
        $.each($('#userEditForm').serializeArray(), function(k,v){
            data[v.name] = v.value; 
        });

        $.ajax({
            url: `${baseUrl}/api/user/update/${usersData[k].id}`,
            type: "PUT",
            dataType: "json",
            data: data,
            success: (result) => {
                $('#modal-edit').modal('hide');
                
                getUsers();   
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
                url: `${baseUrl}/api/user/delete/${usersData[k].id}`,
                type: 'DELETE',
                data: data,
                success: function(result){
                    getUsers();
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
    getUserRole();
    getUsers()
})
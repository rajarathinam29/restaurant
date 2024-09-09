$(document).on('click', '#btnAddCategory', function(){
    $('#categoryAddForm').find('input').val('');
    $('#categoryAddForm').find('select').val('').trigger('change');
    $('#modal-add').modal('show');

    $('#btnAddSave').unbind().click(function(){
        
        let data = {};
        $.each($('#categoryAddForm').serializeArray(), function(k,v){
            data[v.name] = v.value; 
        });

        $.ajax({
            url: `${baseUrl}/api/productCategory/create`,
            type: "POST",
            dataType: "json",
            data: data,
            success: (result) => {
                $('#modal-add').modal('hide');
                
                getCategory();   
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

var categoryData = [];
function getCategory(){
    categoryData = [];
    let data = {};

    $.ajax({
        url: `${baseUrl}/api/productCategories`,
        type: "POST",
        dataType: "json",
        data: data,
        success: (result) => {
                // $.growl.notice({
                //     message: result.msg
                // });
                categoryData = result;
                showCategory();
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

function showCategory(){
    if ( $.fn.dataTable.isDataTable( '#categoryTbl' ) ) {
        $('#categoryTbl').DataTable().destroy();
    }
    $('#categoryContent').empty();
    if(categoryData.length){
        $.each(categoryData, function(k, v){
            var $tr = $('<tr />', {id:k});
            $tr.append(
                $('<td />', {html:`${k+1}`}),
                $('<td />', {html:`${v.category_name}`}),
                $('<td />', {html:`${v.description}`}),
                $('<td />').append(
                    `<button type="button" class="btn btn-sm btn-outline-success btnView"><i class="fas fa-eye"></i></button>
                    <button type="button" class="btn btn-sm btn-outline-primary btnEdit"><i class="fas fa-edit"></i></button>
                    <button type="button" class="btn btn-sm btn-outline-danger btnDelete"><i class="fas fa-trash"></i></button>`
                ),
            );
            
            $('#categoryContent').append($tr);
        });
    }
    //Buttons examples
    var table = $('#categoryTbl').DataTable({
        lengthChange: true,
        buttons: ['copy', 'excel', 'pdf', 'colvis'],
        language: {
          searchPlaceholder: 'Search...',
          scrollX: "100%",
          sSearch: '',
          lengthMenu: '_MENU_ '
        }
    });
    table.buttons().container().appendTo('#categoryTbl_wrapper .col-md-6:eq(0)');
}

$(document).on('click', '.btnView', function(){
    var k = $(this).parents('tr').attr('id');
    $('#tdCategoryName').html(`${categoryData[k].category_name}`)
    $('#tdDescription').html(`${categoryData[k].description}`)
    $('#modal-view').modal('show');
})

$(document).on('click', '.btnEdit', function(){
    var k = $(this).parents('tr').attr('id');
    $('#categoryEditForm').find('input[name="category_name"]').val(categoryData[k].category_name);
    $('#categoryEditForm').find('input[name="description"]').val(categoryData[k].description);
    $('#modal-edit').modal('show');

    $('#btnEditSave').unbind().click(function(){
        
        let data = {};
        $.each($('#categoryEditForm').serializeArray(), function(k,v){
            data[v.name] = v.value; 
        });

        $.ajax({
            url: `${baseUrl}/api/productCategory/update/${categoryData[k].id}`,
            type: "PUT",
            dataType: "json",
            data: data,
            success: (result) => {
                $('#modal-edit').modal('hide');
                
                getCategory();   
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
                url: `${baseUrl}/api/productCategory/delete/${categoryData[k].id}`,
                type: 'DELETE',
                data: data,
                success: function(result){
                    getCategory();
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
    getCategory()
})
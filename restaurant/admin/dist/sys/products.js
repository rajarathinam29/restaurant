$(document).on('click', '#btnAddFood', function(){
    $('#foodAddForm').find('input').val('');
    $('#foodAddForm').find('select').val('').trigger('change');
    $('#modal-add').modal('show');

    $('#btnAddSave').unbind().click(function(){
        
        let data = {};
        $.each($('#foodAddForm').serializeArray(), function(k,v){
            data[v.name] = v.value; 
        });

        $.ajax({
            url: `${baseUrl}/api/product/create`,
            type: "POST",
            dataType: "json",
            data: data,
            success: (result) => {
                $('#modal-add').modal('hide');
                
                getProducts();   
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
var categories = [];
function getCategories(){
    categories = [];
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
                categories= result;
                $('select[name="category_id"]').empty().append('<option value="">Select Category</option>');
                if(categories.length){
                    $.each(categories, (k,v)=>{
                        $('select[name="category_id"]').append(`<option value="${v.id}">${v.category_name}</option>`);
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

var productsData = [];
function getProducts(){
    productsData = [];
    let data = {};

    $.ajax({
        url: `${baseUrl}/api/products`,
        type: "POST",
        dataType: "json",
        data: data,
        success: (result) => {
                // $.growl.notice({
                //     message: result.msg
                // });
                productsData = result;
                showProducts();
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

function showProducts(){
    if ( $.fn.dataTable.isDataTable( '#foodsTbl' ) ) {
        $('#foodsTbl').DataTable().destroy();
    }
    $('#foodsContent').empty();
    if(productsData.length){
        $.each(productsData, function(k, v){
            var $tr = $('<tr />', {id:k});
            $tr.append(
                $('<td />', {html:`${k+1}`}),
                $('<td />', {html:`${v.product_name} `}),
                $('<td />', {html:`<span class="badge badge-success"> ${v.category_name}</span>`}),
                $('<td />', {html:`${v.cost_price}`}),
                $('<td />', {html:`${v.sale_price}`}),
                
                $('<td />').append(
                    `<button type="button" class="btn btn-sm btn-outline-success btnView"><i class="fas fa-eye"></i></button>
                    <button type="button" class="btn btn-sm btn-outline-primary btnEdit"><i class="fas fa-edit"></i></button>
                    <button type="button" class="btn btn-sm btn-outline-danger btnDelete"><i class="fas fa-trash"></i></button>`
                ),
            );
            
            $('#foodsContent').append($tr);
        });
    }
    //Buttons examples
    var table = $('#foodsTbl').DataTable({
        lengthChange: true,
        buttons: ['copy', 'excel', 'pdf', 'colvis'],
        language: {
          searchPlaceholder: 'Search...',
          scrollX: "100%",
          sSearch: '',
          lengthMenu: '_MENU_ '
        }
    });
    table.buttons().container().appendTo('#foodsTbl_wrapper .col-md-6:eq(0)');
}

$(document).on('click', '.btnView', function(){
    var k = $(this).parents('tr').attr('id');
    $('#tdName').html(`${productsData[k].product_name}`)
    $('#tdCategory').html(`<span class="badge badge-success">${productsData[k].category_name}</span>`)
    $('#tdCostPrice').html(`${productsData[k].cost_price}`)
    $('#tdSalePrice').html(`${productsData[k].sale_price}`)
    
    $('#modal-view').modal('show');
})

$(document).on('click', '.btnEdit', function(){
    var k = $(this).parents('tr').attr('id');
    $('#foodEditForm').find('input[name="product_name"]').val(productsData[k].product_name);
    $('#foodEditForm').find('input[name="cost_price"]').val(productsData[k].cost_price);
    $('#foodEditForm').find('input[name="sale_price"]').val(productsData[k].sale_price);
    $('#foodEditForm').find('select[name="category_id"]').val(productsData[k].category_id).trigger('change');
    $('#modal-edit').modal('show');

    $('#btnEditSave').unbind().click(function(){
        
        let data = {};
        $.each($('#foodEditForm').serializeArray(), function(k,v){
            data[v.name] = v.value; 
        });

        $.ajax({
            url: `${baseUrl}/api/product/update/${productsData[k].id}`,
            type: "PUT",
            dataType: "json",
            data: data,
            success: (result) => {
                $('#modal-edit').modal('hide');
                
                getProducts();   
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
                url: `${baseUrl}/api/product/delete/${productsData[k].id}`,
                type: 'DELETE',
                data: data,
                success: function(result){
                    getProducts();
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
    getCategories();
    getProducts()
})
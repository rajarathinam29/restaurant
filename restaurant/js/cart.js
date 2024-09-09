
var subtotal = 0;
function showOrders(){
    
    if(orders.length){
        $.each(orders, (k,v)=>{
            var qty = +v.qty;
            var salePrice = +v.sale_price;
            var total  = qty*salePrice
            subtotal += total;
            $('#cartContent').append(`
                <tr>
                    <td>${k+1}</td>
                    <td>${v.product_name}</td>
                    <td style="text-align:right;">${qty}</td>
                    <td style="text-align:right;">${total.toFixed(2)}</td>
                </tr>`)
        })
    }
    $('#cartContent').append(`
        <tr>
            <th style="text-align:right;" colspan="3">Total</th>
            <td style="text-align:right;">${subtotal.toFixed(2)}</td>
        </tr>`);
}

$(document).on('click', '#btnCheckout', function(){
    if(!clientSession){
        location.assign(`signin.html`);
        return false;
    }

    var date = new Date();
    let data = {};
    data.orderDate = `${date.getFullYear()}-${setZero(date.getMonth()+1)}-${setZero(date.getDate())}`;
    data.orderType = '0';
    data.customerId = clientSession[0].id;
    data.payment_status = 1;
    data.status = 0;
    data.netTotal = subtotal;
    data.discount = 0;
    data.additionalCharge = 0;
    data.orders = JSON.stringify(orders);

    $.ajax({
        url: `${baseUrl}/api/order/create`,
        type: "POST",
        dataType: "json",
        data: data,
        success: (result) => {
                // $.growl.notice({
                //     message: result.msg
                // });
            // submitBtn.html(prevContent);
            orders = [];
            localStorage.setItem('RestaurantClientOrder', JSON.stringify(orders));
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

function setZero(val){
    if(val<10){
        val = `0${val}`;
    }
    return val;
}
$(()=>{
    showOrders();
})
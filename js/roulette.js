var betNumber;
function numberPicker(num) {
    betNumber = num;
    if(betNumber == 0){
        $('.pholder').html('<b style="color: lightgreen;">'+betNumber+'</b>');
    }else if(betNumber % 2 == 0){
        $('.pholder').html('<b style="color: rgb(236, 53, 53);">'+betNumber+'</b>');
    }else{
        $('.pholder').html('<b style="color: rgb(44, 44, 44);">'+betNumber+'</b>');
    }
}

function roll() {
    var betAmount = $('#bet').val();
    if(betAmount === ''){
        alert('Invalid bet!');
    }else if(betNumber === ''){
        alert('Pick a number!');
    }else{
        $.ajax({
            url: "http://localhost:3000/roulette",
            type: 'GET',
            headers: {
                "task": "roulette" // custom header
            },
            data: {
                number: betNumber,
                amount: betAmount
            },
            success: function(response) {
                // if a success response is received, print it here:
                alert(response); 
        
            },
            error: function(error) {
                console.error("Error:", error);
            }
        });
    }
}
$(document).ready(() => {
    $('#answerBtn').click((e) => {
        console.log('btn clicked');
        e.preventDefault();

        const answer = $('#answer').val();

        $.ajax({
            url: 'http://localhost:3000/',
            data: {answer: answer},
            success: (response) => {alert(response);},
            error: (error) => {alert(error);}
        });
    });
}); 
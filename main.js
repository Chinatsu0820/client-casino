$(document).ready(() => {
    $('#answerBtn').click((e) => {
        console.log('btn clicked');
        e.preventDefault();

        const resposta = $('#answer').val();

        $.ajax({
            url: 'http://localhost:3000/',
            data: {answer: resposta},
            success: (response) => {alert(response);},
            error: (error) => {alert(error);}
        });
    });
}); 
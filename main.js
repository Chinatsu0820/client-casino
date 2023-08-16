$(document).ready(() => {
    $('#answerBtn').click((e) => {
        console.log('jujujuujjjjjjjjjjjjjjjjjj');
        e.preventDefault();

        const answer = $('#answer').val();

        $.ajax({
            url: 'http://localhost:3000/',
            data: {answer: answer},
            success: () => {alert('right answer!!');}
        });
    });
}); 
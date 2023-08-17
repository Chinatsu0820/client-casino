$('.blackjack').append(`
    <section class="dealer">
        <section class="cards-inhand">
            <section class="score">
                <div>Dealer:</div>
                <div id="score-inhand-dealer">0</div>
            </section>
            <div id="drawn-card-dealer"></div>
        </section>
        </section>
        <section class="player">
        <section class="cards-inhand">
            <section class="score">
                <div>Player:</div>
                <div id="score-inhand">0</div>
            </section>
            <div id="drawn-card"></div>
        </section>
        <section class="buttons">
            <button id="card-draw">Hit</button>
            <button id="stand">Stand</button>
            <button id="next-game">Next Game</button>
        </section>
    </section>
`);

// var suits = ["spades", "diamonds", "clubs", "hearts"];
// var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

let deck = new Array();
let cardsInHandP = new Array();
let cardsInHandD = new Array();

gameDefault();

$('#card-draw').click(() => {
    drawCard(deck, '#drawn-card', '#score-inhand', cardsInHandP);
})

$('#next-game').click(() => {
    $('#card-draw').prop("disabled", false);
    $('#stand').prop("disabled", false);
    gameDefault();
});

$('#stand').click(() => {
    $('#card-draw').prop("disabled", true);
    $('#stand').prop("disabled", true);

    let scoreP = parseInt($('#score-inhand').text());
    let scoreD = parseInt($('#score-inhand-dealer').text());
    while (scoreD < 17) {
        drawCard(deck, '#drawn-card-dealer', '#score-inhand-dealer', cardsInHandP);
        scoreD = parseInt($('#score-inhand-dealer').text());
    }

    if ($('#score-inhand-dealer').text().includes('BUST')) {
        $('#score-inhand').append('<br>You win!');
        return;
    } if (scoreD < scoreP) {
        $('#score-inhand').append('<br>You win!');
        return;
    } if (scoreD === scoreP) {
        $('#score-inhand').append('<br>Push!');
        return;
    } else {
        $('#score-inhand').append('<br>You lost!');
        return;
    }
})

function gameDefault() {
    getDeck();

    // Player Default
    cardsInHandP = [];
    $('#score-inhand').text(0);
    $('#drawn-card').empty();

    // Player 1st card
    setTimeout(() => {
        drawCard(deck, '#drawn-card', '#score-inhand', cardsInHandP);
        // Player 2nd card
        setTimeout(() => {
            drawCard(deck, '#drawn-card', '#score-inhand', cardsInHandP);
        }, 500);
    }, 500);

    // Dealer default
    cardsInHandD = [];
    $('#score-inhand-dealer').text(0);
    $('#drawn-card-dealer').empty();

    // Dealer 1st card
    setTimeout(() => {
        drawCard(deck, '#drawn-card-dealer', '#score-inhand-dealer', cardsInHandP);
    }, 500);
}

function getDeck() {
    // for (let i = 0; i < suits.length; i++) {
    //     for (let x = 0; x < values.length; x++) {
    //         let card = { Value: values[x], Suit: suits[i] };
    //         deck.push(card);
    //     }
    // }
    // console.log(deck);

    $.ajax({
        url: "http://localhost:3000/blackjack",
        type: 'GET',
        headers: {
            "task": "blackjack" // custom header
        },
        success: function (response) {
            deck = response;
        },
        error: function (error) {
            console.error("Error:", error);
        }
    });
    return deck;
}

function drawCard(deck, cardElement, scoreElement, cardsInHand) {
    $(cardElement).append(renderCard(deck[0]));
    cardsInHand.push(deck[0]);

    scoreInHand = parseInt($(scoreElement).text());
    let drawnValue = deck[0].Value
    if (isNaN(parseInt(drawnValue))) {
        if (drawnValue == 'A') {
            scoreInHand += 11;
        } else {
            scoreInHand += 10;
        }
    } else {
        scoreInHand += parseInt(drawnValue);
    }

    // for (let i = 0; i < cardsInHand.length; i++) {
    //     $("#drawn-card").append(renderCard(cardsInHand[i]));
    // }
    $(scoreElement).text(scoreInHand);

    if (scoreInHand > 21) {
        $('#card-draw').prop("disabled", true);
        $('#stand').prop("disabled", true);
        $(scoreElement).append('<br>BUST!');
    }
    deck.shift();
}

function renderCard(oneCard) {
    let card = document.createElement("div");
    let value = document.createElement("div");
    let suit = document.createElement("div");
    card.className = "card";
    value.className = "value";
    suit.className = "suit " + oneCard.Suit;

    value.innerHTML = oneCard.Value;
    card.appendChild(value);
    card.appendChild(suit);

    return card;
}
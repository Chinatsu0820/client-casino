const mySlotElement = document.createElement("my-slot");
mySlotElement.innerHTML = `
<style media="screen">
.slot-score {
    color: yellow;
    margin-bottom: 2rem;
}

.slot {
      float: left;
      width: calc(100% / 3);
      font-size: 4rem;
      color: white;
}

.game {
  background-color: rgb(35, 35, 143);
  margin: 0 auto;
  width: 40rem;
  text-align: center;
  padding: 3rem;
}

#stop {
    font-size: 2rem;
    font-weight: bold;
    padding: 1rem;
    background-color: rgb(236, 56, 56);
    margin-top: 3rem;
}

#reset {
    margin-top: 2rem;
    font-weight: bold;
    padding: 0.5rem;
    background-color: rgb(3, 121, 3);
}
</style>

<div class="game">
<p class="slot-score">SCORE: <span id="score">0</span>&emsp;LEVEL: <span id="level">1</span></p>

    <div id="slot0" class="slot"></div>

    <div id="slot1" class="slot"></div>

    <div id="slot2" class="slot"></div>

<div>
<button id="stop">STOP</button>
</div>

<button id="reset">RESET</button>

</div>
`;

document.getElementById('game-slot').appendChild(mySlotElement);

// スロットゲームの処理
// 即時関数で囲っておく　IIFE (Immediately Invoked Function Expression)
// 即時関数＝関数を定義すると同時に実行するための構文
(function () {
    let score = 0; // 得点
    let level = 1; // レベル
    let interval = [100, 400, 200]; // スロットのスピード
    let timers = []; // スロット
    let results = []; // スロットを止めた時の数字

    // スロットをスタートさせる
    startSlot();

    function startSlot() {

        // 初期化（空の状態に戻す）
        timers = []; // スロット
        results = []; // スロットを止めた時の数字

        // スロットの最初の数字を設定
        document.getElementById('slot0').textContent = 1;
        document.getElementById('slot1').textContent = 3;
        document.getElementById('slot2').textContent = 5;

        // スロットを回す
        runSlot(0);
        runSlot(1);
        runSlot(2);
    }

    // スロットを回す処理の中身
    function runSlot(num) {

        // 全てのスロットの現在表示されているテキストを取得
        let slotValue = document.getElementById('slot' + num);

        // 9より上の数字になったら0へ戻る
        if (slotValue.textContent < 9) {
            slotValue.textContent++;
        } else {
            slotValue.textContent = 0;
        }

        // スロットの数字をカウントさせる
        timers[num] = setTimeout(function () {

            // スロットの数字をカウントさせる処理
            runSlot(num);
        }, interval[num]);
    }

    // 左のボタンをクリックした時のイベントハンドラ
    document.getElementById('stop').onclick = function () {
        // 各スロットの回転タイマーをクリア
        clearTimeout(timers[0]);
        clearTimeout(timers[1]);
        clearTimeout(timers[2]);

        // スロットを止めた処理
        stopSlot(0);
        stopSlot(1);
        stopSlot(2);

        // 止めた結果をチェック
        checkResult();
    }


    // スロットを止めた処理
    function stopSlot(num) {
        // スロットの結果を results 配列に格納
        results[num] = document.getElementById('slot' + num).textContent;
    }


    // 全てのスロットを止めた結果
    function checkResult() {

        // 3つの数字が同じであれば次へ、そうでなければGAMEOVER
        if (results[0] == results[1] && results[0] == results[2]) {
            alert('Congratulations! Challenging to the next stage!');

            score += 100; // 得点を足す
            level += 1;
            interval *= 0.8; // スロットのスピードを早める
            // 得点追加の処理
            getScore();
            // 次のゲームに進む
            startSlot();
        } else {
            gameover();
        }
    }

    // 得点追加時の処理
    function getScore() {
        document.getElementById('score').textContent = score;
        document.getElementById('level').textContent = level;
    }

    // 揃えられなかった時
    function gameover() {
        alert('Game over... Try again!');
    }

    document.getElementById('reset').onclick = function () {
        // スロットを全て止める
        clearTimeout(timers[0]);
        clearTimeout(timers[1]);
        clearTimeout(timers[2]);

        // 初期化
        document.getElementById('score').textContent = 0;
        document.getElementById('level').textContent = 1;
        score = 0;
        level = 1;
        interval = [100, 400, 200];
        timers = [];
        results = [];

        // スロットスタート
        startSlot();
    }

})();


// --------------Server ver------------------

document.addEventListener('DOMContentLoaded', () => {
    const stop = document.getElementById('stop');

    // ボタンクリック時の処理(スロットを止めるためのリクエストをサーバーに送信)
    stop.addEventListener('click', () => {
        $.ajax({
            url: "http://localhost:3000/slot", // サーバーのURL
            type: 'POST', // POSTリクエストを送信
            success: function (response) {
                console.log("Response:", response);

                // サーバーから受け取った結果に基づいて処理を行う
                if (response.success) {
                    const reward = response.reward;
                    const newScore = response.newScore;
                    console.log("I won $", reward);
                    console.log("New Score:", newScore);
                } else {
                    // ゲームオーバーの場合の処理
                    console.log("Game Over");
                }
            },
            error: function (error) {
                console.error("Error:", error);
            }
        });
    });
});

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

.slot-button {
    font-weight: bold;
    padding: 1rem;
    background-color: rgb(236, 56, 56);
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

<div class="slot">
    <div id="slot0">2</div>
    <button id="stop0" class="slot-button">STOP</button>
</div>

<div class="slot">
    <div id="slot1">5</div>
    <button id="stop1" class="slot-button">STOP</button>
</div>

<div class="slot">
    <div id="slot2">8</div>
    <button id="stop2" class="slot-button">STOP</button>
</div>
<button id="reset">RESET</button>
</div>
`;

document.body.appendChild(mySlotElement);

// スロットゲームの処理
// 即時関数で囲っておく（スコープを限定）
// 即時関数＝関数を定義すると同時に実行するための構文
(function () {
    let score = 0; // 得点
    let level = 1; // レベル
    let interval = 400; // スロットのスピード
    let timers = []; // スロット
    let results = []; // スロットを止めた時の数字
    let stopCount = [0, 0, 0]; // スロットを止めたか判別に使用(ボタンクリックの回数)

    // 左のSTOPをクリックした時スロットを止める
    document.getElementById('stop0').onclick = function () {
        stopSlot(0);
    }

    // 中央のSTOPをクリックした時スロットを止める
    document.getElementById('stop1').onclick = function () {
        stopSlot(1);
    }

    // 右のSTOPをクリックした時スロットを止める
    document.getElementById('stop2').onclick = function () {
        stopSlot(2);
    }

    // スロットをスタートさせる
    startSlot();

    function startSlot() {

        // 初期化（空の状態に戻す）
        stopCount = [0, 0, 0]; // スロットを止めたか判別に使用
        timers = []; // スロット
        results = []; // スロットを止めた時の数字

        // スロットの最初の数字を設定
        document.getElementById('slot0').textContent = 2;
        document.getElementById('slot1').textContent = 5;
        document.getElementById('slot2').textContent = 8;

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
        }, interval);
    }

    // スロットを止める処理の中身
    function stopSlot(num) {

        // スロットを止める
        clearTimeout(timers[num]);

        // スロットを止めた際の数字を取得
        results[num] = document.getElementById('slot' + num).textContent;

        // スロットを止めたことを記録
        stopCount[num] = 1;

        // 全てのスロットを止めた場合に結果を表示する
        if (stopCount[0] * stopCount[1] * stopCount[2] == 1) {
            checkResult();
        }
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
        interval = 400;
        timers = [];
        results = [];
        stopCount = [0, 0, 0];

        // スロットスタート
        startSlot();
    }

})();
// Back-end logic:
function Game() {
  this.players = [];
  this.currentId = 0;
}

Game.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

Game.prototype.findPlayer = function(id) {
  for (var i=0; i< this.players.length; i++) {
    if (this.players[i]) {
      if (this.players[i].id == id) {
        return this.players[i];
      }
    }
  };
  return false;
}

Game.prototype.addPlayer = function(player){
  player.id = this.assignId();
  this.players.push(player);
}

function Player(name, totalScore, turn) {
  this.name = name;
  this.totalScore = totalScore;
  this.turn = turn;
}

generateNumber = function() {
  var numberRolled = Math.floor( Math.random() * 6) +1;
  return numberRolled;
}

Player.prototype.rollDice = function() {
  var turnScore = 0;
  var diceRoll = generateNumber();
  if (diceRoll != 1) {
    turnScore += diceRoll;
    showDiceRoll(this.id, diceRoll);
  } else if (diceRoll === 1) {
    turnScore = 0;
    showDiceRoll(this.id, diceRoll);
    endTurn(this.id);
  }
  return turnScore;
}

// Front-end logic:
var game = new Game();

function showPlayerScore(playerId) {
  var player = game.findPlayer(playerId);
  $(".player" + player.id + "TurnScore").html();
  $(".player" + player.id + "Total").html();
}

function showDiceRoll(playerId, roll) {
  var player = game.findPlayer(playerId);
  $(".player" + player.id + "Roll").html(roll);
}

function endTurn(id) {
  var currentPlayer = game.findPlayer(id);
  $("button#player" + currentPlayer.id + "Hold").click(function() {
    currentPlayer.totalScore += turnScore;
    showPlayerScore(id);
    turnScore = 0;
  });
}

$(document).ready(function() {
  $("button#start-play").click(function(event) {
    event.preventDefault();
    var player1Name = $("input#player1Name").val();
    var player2Name = $("input#player2Name").val();
    var player1Score = 0;
    var player2Score = 0;
    var player1Turn = 0;
    var player2Turn = 0;

    var player1 = new Player(player1Name, player1Score, player1Turn);
    var player2 = new Player(player2Name, player2Score, player2Turn);
    game.addPlayer(player1);
    game.addPlayer(player2);

    console.log(player1.id);
    console.log(player2.id);
    $("#initialScreen").hide();
    $("#gameScreen").show();
    $("#name1").html(player1Name);
    $("#name2").html(player2Name);

    $("button#roll").click(function(event){
      event.preventDefault();

      player1.rollDice();
      showPlayerScore(player1.id);
    });

    // $("button#hold").click(function() {
      
    })
  })
// })
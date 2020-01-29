// Back-end logic:
function Game() {
  this.players = [];
  this.currentId = 0;
  this.currentPlayer = 1;
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

function Player(name, totalScore, turnScore) {
  this.name = name;
  this.totalScore = totalScore;
  this.turnScore = turnScore;
}

var generateNumber = function() {
  var numberRolled = Math.floor( Math.random() * 6) +1;
  return numberRolled;
}

Player.prototype.rollDice = function() {
  var diceRoll = generateNumber();
  if (diceRoll != 1) {
    this.turnScore += diceRoll;
    showDiceRoll(this.id, diceRoll);
  } else if (diceRoll == 1) {
    this.turnScore = 0;
    showDiceRoll(this.id, diceRoll);
    endTurn(this.id);
  }
  showPlayerScore(this.id, this.turnScore, this.totalScore);
  return this.turnScore;
}

// Front-end logic:
var game = new Game();

function showPlayerScore(playerId, turnScore, playerScore) {
  $(".player" + playerId + "TurnScore").html(turnScore);
  $(".player" + playerId + "Total").html(playerScore);
}

function showDiceRoll(playerId, roll) {
  var player = game.findPlayer(playerId);
  $(".player" + player.id + "Roll").html(roll);
}

function endTurn(id) {
  var player = game.findPlayer(id);
  player.totalScore += player.turnScore;
  showPlayerScore(player.id, player.turnScore, player.totalScore);
  player.turnScore = 0;
  if (game.currentPlayer === 1) {
    game.currentPlayer = 2;
  } else {
    game.currentPlayer = 1;
  }
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
    $("#initialScreen").hide();
    $("#gameScreen").show();
    $("#name1").html(player1Name);
    $("#name2").html(player2Name);

    $("button#roll").click(function(event){
      event.preventDefault();
      var playerRolling = game.findPlayer(game.currentPlayer);
      playerRolling.rollDice();
    });

    $("button#hold").click(function(event) {
      event.preventDefault();
      endTurn(game.currentPlayer);
    });
  });
});
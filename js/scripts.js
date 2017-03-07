//Back-end logic
var diceRoller = function(sides) {
  return Math.ceil(Math.random() * sides);
};

function Character(charName, hP, attackStat, attackModifier, defenseStat){
  this.charName = charName;
  this.hP = hP;
  this.attackStat = attackStat;
  this.attackModifier = attackModifier;
  this.defenseStat = defenseStat;
};

Character.prototype.attack = function(){
  return this.attackStat + diceRoller(this.attackModifier);
};

Character.prototype.defense = function(){
  return this.defenseStat;
};

Character.prototype.outcome = function(c1Attack, c2Defense){
  if (c1Attack > c2Defense) {
    this.hP -= (c1Attack - c2Defense);
  }
  if (this.hP < 0) {
    this.death();
  }
};

var characters = [];

var newCharacter = new Character("Max", 100, 10, 10, 10);
characters.push(newCharacter);
var newCharacter = new Character("Dick", 100, 10, 5, 15);
characters.push(newCharacter);

function p1Attack() {
  player1.attack();
  player2.outcome();
  $("#p2Status").text(player2.hP);
};
function p1Defend() {
  player1.defense();
  $("#p1Status").text("P1 is choosing to defend.");
};
function p2Attack() {
  player2.attack();
  player1.outcome();
  $("#p1Status").text(player1.hP);
};
function p2Defend() {
  player2.defense();
  $("#p2Status").text("P2 is choosing to defend.");
};

//Front-end logic
$(document).ready(function() {

  $("#p1Attack").click(function() {
    event.preventDefault();
    p1Attack();
  });
  $("#p1Defend").click(function() {
    event.preventDefault();
    p2Defend();
  });
  $("#p2Attack").click(function() {
    event.preventDefault();
    p1Attack();
  });
  $("#p2Defend").click(function() {
    event.preventDefault();
    p2Defend();
  });

});

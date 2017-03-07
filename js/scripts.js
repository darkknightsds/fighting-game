//Back-end logic
var switchTurns = function() {
  passivePlayer.defenseModifier = 0;
  activePlayer = passivePlayer;
  passivePlayer = placeHolder;
};

var diceRoller = function(sides) {
  return Math.ceil(Math.random() * sides);
};

function Character(charName, hP, attackStat, attackModifier, defenseStat, defenseModifier){
  this.charName = charName;
  this.hP = hP;
  this.attackStat = attackStat;
  this.attackModifier = attackModifier;
  this.defenseStat = defenseStat;
  this.defenseModifier = 0;
};

Character.prototype.attack = function() {
  return this.attackStat + diceRoller(this.attackModifier);
};

Character.prototype.defense = function() {
  return this.defenseStat;
};

Character.prototype.death = function() {
  $("#death-div").text("Foolish mortal! You are no match for me.");
};

Character.prototype.outcome = function(c1Attack, c2Defense) {
  if (c1Attack > c2Defense) {
   return this.hP -= (c1Attack - c2Defense);
 } else {
   return 0;
 }
  if (this.hP <= 0) {
    this.death();
  } else {
    switchTurns();
  }
};

var characters = [];

var max = new Character("Max", 100, 10, 10, 10);
characters.push(max);
var dick = new Character("Dick", 100, 10, 5, 15);
characters.push(dick);

var activePlayer = characters[0];
var passivePlayer = characters[1];

function p1Attack() {
  passivePlayer.outcome(activePlayer.attack(), passivePlayer.defense());
  if (passivePlayer.hP > 0) {
      $("#p2Status").text(passivePlayer.hP);
    } else {
      $("#p2Status").text(passivePlayer.charName + " is dead!");
    }
};

function p2Attack() {
  passivePlayer.outcome(activePlayer.attack(), passivePlayer.defense());
  if (passivePlayer.hP > 0) {
      $("#p1Status").text(passivePlayer.hP);
    } else {
      $("#p1Status").text(passivePlayer.charName + " is dead!");
    }
};

// function p1Defend() {
//   max.defense();
//   $("#p1Status").text("P1 is choosing to defend.");
// };

// function p2Defend() {
//   dick.defense();
//   $("#p2Status").text("P2 is choosing to defend.");
// };

//Front-end logic
$(document).ready(function() {

  $("#p1Attack").click(function() {
    event.preventDefault();
    p1Attack();
  });

  $("#p2Attack").click(function() {
    event.preventDefault();
    p2Attack();
  });

  // $("#p1Defend").click(function() {
  //   event.preventDefault();
  //   p2Defend();
  // });

  // $("#p2Defend").click(function() {
  //   event.preventDefault();
  //   p2Defend();
  // });

});

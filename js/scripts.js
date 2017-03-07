//Back-end logic
var switchTurns = function() {
  if (passivePlayer.hP <= 0) {alert(passivePlayer.charName + " has died.")}
  placeHolder = activePlayer;
  passivePlayer.defenseModifier = 0;
  activePlayer = passivePlayer;
  passivePlayer = placeHolder;
  console.log(activePlayer);
  console.log(passivePlayer);
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

Character.prototype.attack = function(){
  return this.attackStat + diceRoller(this.attackModifier);
};

Character.prototype.defense = function(){
  return this.defenseStat + this.defenseModifier;
};

Character.prototype.outcome = function(c1Attack, c2Defense){
  if (c1Attack > c2Defense) {
    this.hP -= (c1Attack - c2Defense);
  }
  return this.hP;
};

var characters = [];

var max = new Character("Max", 100, 10, 10, 10);
characters.push(max);
var dick = new Character("Dick", 100, 10, 5, 15);
characters.push(dick);
activePlayer = characters[0];
passivePlayer = characters[1];

function attack() {
  passivePlayer.outcome(activePlayer.attack(), passivePlayer.defense());
  $("#p2Status").text(characters[1].hP);
  switchTurns();
};

function defend() {
  activePlayer.defenseModifier = (activePlayer.defenseStat)/3;
  switchTurns();



}
// function p1Defend() {
//   max.defense();
//   $("#p1Status").text("P1 is choosing to defend.");
// };
function p2Attack() {
  characters[0].outcome(characters[1].attack(), characters[0].defense());
  $("#p1Status").text(characters[0].hP);
  switchTurns();
};
// function p2Defend() {
//   dick.defense();
//   $("#p2Status").text("P2 is choosing to defend.");
// };

//Front-end logic
$(document).ready(function() {
  $("#p1Name").text((characters[0].charName));
  $("#p2Name").text((characters[1].charName));

  $("#p1Attack").click(function() {
    p1Attack();
  });
  $("#p1Defend").click(function() {
    p1Defend();
  });
  $("#p2Attack").click(function() {
    p2Attack();
  });
  $("#p2Defend").click(function() {
    p2Defend();
  });
});

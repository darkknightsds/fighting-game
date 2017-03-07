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

Character.prototype.death = function(){
  return this.charName + " is dead!";
};

Character.prototype.outcome = function(c1Attack, c2Defense){
  if (c1Attack > c2Defense) {
   return this.hP -= (c1Attack - c2Defense);
 } else {
   return 0;
 }
  // if (this.hP <= 0) {
  //   return this.charName + " is dead!";
  // } else if (c1Attack > c2Defense) {
  //   return this.hP -= (c1Attack - c2Defense);
  // } else {
  //   return 0;
  // }
};


var characters = [];

var max = new Character("Max", 100, 10, 10, 10);
characters.push(max);
var dick = new Character("Dick", 100, 10, 5, 15);
characters.push(dick);

function p1Attack() {
  characters[1].outcome(characters[0].attack(), characters[1].defense());
  if (characters[1].hP > 0) {
      $("#p2Status").text(characters[1].hP);
    } else {
      $("#p2Status").text(characters[1].charName + " is dead!");
    }
};
// function p1Defend() {
//   max.defense();
//   $("#p1Status").text("P1 is choosing to defend.");
// };
function p2Attack() {
  characters[0].outcome(characters[1].attack(), characters[0].defense());
  if (characters[0].hP > 0) {
      $("#p1Status").text(characters[0].hP);
    } else {
      $("#p1Status").text(characters[0].charName + " is dead!");
    }
};
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
  // $("#p1Defend").click(function() {
  //   event.preventDefault();
  //   p2Defend();
  // });
  $("#p2Attack").click(function() {
    event.preventDefault();
    p2Attack();
  });
  // $("#p2Defend").click(function() {
  //   event.preventDefault();
  //   p2Defend();
  // });
});

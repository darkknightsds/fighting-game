//Back-end logic
function Character(charName, hP, attackStat, defenseStat){
  this.charName = charName;
  this.hP = hP;
  this.attackStat = attackStat;
  this.defenseStat = defenseStat;
};

Character.prototype.attack = function(){
  return this.attackStat;
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

//Front-end logic
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

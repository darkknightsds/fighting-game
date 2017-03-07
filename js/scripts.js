//back-end
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
    return this.hP -= (c1Attack - c2Defense);
  } else {
    return 0;
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





//front-end

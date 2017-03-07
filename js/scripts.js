//back-end

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




//front-end

//Back-end logic
var switchTurns = function() {
  if (passivePlayer.hitPoints <= 0) {alert(passivePlayer.charName + " has died.")}
  placeHolder = activePlayer;
  passivePlayer.defenseModifier = 0;
  activePlayer = passivePlayer;
  passivePlayer = placeHolder;
  console.log(activePlayer);
  console.log(passivePlayer);
  toggleButtons();
};

var diceRoller = function(sides, rolls) {
  var sum = 0;
  for (i = 1; i <= rolls; i++) {
    sum += Math.ceil(Math.random() * sides);
  }
  return sum;
};

function Character(charName, charImgUrl, hitPoints, attackStat, attackModifier, defenseStat, defenseModifier){
  this.charName = charName;
  this.charImgUrl = charImgUrl
  this.hitPoints = hitPoints;
  this.attackStat = attackStat;
  this.attackModifier = attackModifier;
  this.defenseStat = defenseStat;
  this.defenseModifier = 0;
  this.specialPoints = 3;
};

Character.prototype.attack = function() {
  return this.attackStat + diceRoller(this.attackModifier, 1);
};

Character.prototype.defense = function(){
  return this.defenseStat + this.defenseModifier;
};

Character.prototype.special = function() {
  if (this.specialPoints >= 1) {
    this.specialPoints--;
    return this.attackStat + diceRoller(this.attackModifier, 2);
  } else {
    alert("You're too tired for special attacks! A swing and a miss!");
  }
};

Character.prototype.death = function() {
  $("#death-div").text("Foolish mortal! You are no match for me.");
};

Character.prototype.outcome = function(c1Attack, c2Defense) {
  if (c1Attack > c2Defense) {

    this.hitPoints -= (c1Attack - c2Defense);

  }
  return this.hitPoints;
};

var characters = [];

var max = new Character("Max", "img/player1.jpg", 40, 10, 10, 10);
characters.push(max);
var dick = new Character("Dick", "img/player2.jpg", 40, 10, 5, 15);
characters.push(dick);

var setInitialTurnOrder = function() {
  activePlayer = characters[0];
  passivePlayer = characters[1];
};
setInitialTurnOrder();

function attackButtonAction() {
  passivePlayer.outcome(activePlayer.attack(), passivePlayer.defense());
  $("#" + passivePlayer.charName + "hitPoints").text(passivePlayer.hitPoints);
  switchTurns();
};

function defendButtonAction() {
  activePlayer.defenseModifier = Math.floor((activePlayer.defenseStat)/3);
  if (activePlayer.specialPoints < 3) {
    activePlayer.specialPoints++;
    $("#" + activePlayer.charName + "specialPoints").text(activePlayer.specialPoints);
  }
  switchTurns();
}

function specialButtonAction() {
  passivePlayer.outcome(activePlayer.special(), passivePlayer.defense());
  $("#" + passivePlayer.charName + "hitPoints").text(passivePlayer.hitPoints);
  $("#" + activePlayer.charName + "specialPoints").text(activePlayer.specialPoints);
  switchTurns();
}

var toggleButtons = function() {
  $(".btn").each(function() {
    if (this.hasAttribute("disabled")) {
      $(this).prop("disabled", false);
    } else {
      $(this).prop("disabled", true);
    }
  });
};


//Front-end logic
$(document).ready(function() {

var populatePlayerInterface = function(player) {
  $("div#playerInterface").append('<div class="col-md-6">' +
                                      '<img src="' +
                                      player.charImgUrl +
                                      '" alt="' +
                                      player.charName +
                                      '" id="' +
                                      player.charName +
                                      'Image">' +
                                      '<h2>' +
                                      player.charName +
                                      '</h2>' +
                                    '</div>'
  );
  $("div#playerStatus").append('<div class="col-md-6">' +
                                  '<p>Hit points: ' +
                                    '<span id="' +
                                    player.charName +
                                    'hitPoints">' +
                                    player.hitPoints +
                                    '</span>' +
                                  '</p>' +
                                  '<p>Special points: ' +
                                    '<span id="' +
                                    player.charName +
                                    'specialPoints">' +
                                    player.specialPoints +
                                    '</span>' +
                                  '</p>' +
                                '</div>'
  );
  $("div#playerControls").append('<div class="col-md-6">' +
                                    '<button class="btn attack" type="click">Attack</button>' +
                                    '<button class="btn defend" type="click">Defend</button>' +
                                    '<button class="btn special" type="click">Special</button>' +
                                  '</div>'
  );
};

populatePlayerInterface(activePlayer);
switchTurns();
populatePlayerInterface(activePlayer);
switchTurns();

  $(".attack").click(function() {
    attackButtonAction();
  });

  $(".defend").click(function() {
    defendButtonAction();
  });

  $(".special").click(function() {
    specialButtonAction();
  });

});

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

function Character(charName, charID, charImgUrl, strength, vitality, agility, luck) {
  this.charName = charName;
  this.charID = charID;
  this.charImgUrl = charImgUrl;
  this.strength = strength;
  this.vitality = vitality;
  this.agility = agility;
  this.luck = luck;
  this.hitPoints = vitality * 10;
  this.attackStat = strength * 5;
  this.attackModifier = strength * 5;
  this.defenseStat = agility * 5;
  this.defenseModifier = 0;
  this.specialPoints = luck;
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

var newCharacter = new Character("MegaMutant Mountain Master", "mmmm", "img/player1.jpg", 7, 3, 3, 3);
characters.push(newCharacter);
var newCharacter = new Character("Amtrak", "amtrak", "img/player2.jpg", 3, 3, 7, 3);
characters.push(newCharacter);
var newCharacter = new Character("Semi-Gloss", "sg", "img/player1.jpg", 3, 7, 3, 3);
characters.push(newCharacter);
var newCharacter = new Character("Thunder ghost", "tg", "img/player1.jpg", 3, 3, 3, 7);
characters.push(newCharacter);
var newCharacter = new Character("Shadow Dick", "sd", "img/player1.jpg", 4, 4, 4, 4);
characters.push(newCharacter);
var newCharacter = new Character("Samurai Brain Infecter", "sbi", "img/player1.jpg", 5, 5, 3, 3);
characters.push(newCharacter);
var newCharacter = new Character("The Cat & The Gat", "tcatg", "img/player1.jpg", 3, 5, 5, 3);
characters.push(newCharacter);
var newCharacter = new Character("Loaded Chamber", "lc", "img/player1.jpg", 3, 3, 5, 5);
characters.push(newCharacter);
var newCharacter = new Character("Dynamite Force","df", "img/player1.jpg", 5, 3, 3, 5);
characters.push(newCharacter);
var newCharacter = new Character("Murder Saint", "ms", "img/player1.jpg", 5, 3, 5, 3);
characters.push(newCharacter);
var newCharacter = new Character("Sinister Savante", "ss", "img/player1.jpg", 3, 5, 3, 5);
characters.push(newCharacter);

var setInitialTurnOrder = function() {
  activePlayer = characters[0];
  passivePlayer = characters[1];
};
setInitialTurnOrder();

function attackButtonAction() {
  passivePlayer.outcome(activePlayer.attack(), passivePlayer.defense());
  $("#" + passivePlayer.charID + "hitPoints").text(passivePlayer.hitPoints);
  switchTurns();
};

function defendButtonAction() {
  activePlayer.defenseModifier = Math.floor((activePlayer.defenseStat)/3);
  if (activePlayer.specialPoints < 3) {
    activePlayer.specialPoints++;
    $("#" + activePlayer.charID + "specialPoints").text(activePlayer.specialPoints);
  }
  switchTurns();
}

function specialButtonAction() {
  passivePlayer.outcome(activePlayer.special(), passivePlayer.defense());
  $("#" + passivePlayer.charID + "hitPoints").text(passivePlayer.hitPoints);
  $("#" + activePlayer.charID + "specialPoints").text(activePlayer.specialPoints);
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
                                      player.charID +
                                      'Image">' +
                                      '<h2>' +
                                      player.charName +
                                      '</h2>' +
                                    '</div>'
  );
  $("div#playerStatus").append('<div class="col-md-6">' +
                                  '<p>Hit points: ' +
                                    '<span id="' +
                                    player.charID +
                                    'hitPoints">' +
                                    player.hitPoints +
                                    '</span>' +
                                  '</p>' +
                                  '<p>Special points: ' +
                                    '<span id="' +
                                    player.charID +
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

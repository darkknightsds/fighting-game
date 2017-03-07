//Back-end logic
var switchTurns = function() {
  if (passivePlayer.hP <= 0) {alert(passivePlayer.charName + " has died.")}
  placeHolder = activePlayer;
  passivePlayer.defenseModifier = 0;
  activePlayer = passivePlayer;
  passivePlayer = placeHolder;
  console.log(activePlayer);
  console.log(passivePlayer);
  toggleButtons();
};

var diceRoller = function(sides) {
  return Math.ceil(Math.random() * sides);
};

function Character(charName, charImgUrl, hP, attackStat, attackModifier, defenseStat, defenseModifier){
  this.charName = charName;
  this.charImgUrl = charImgUrl
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

var max = new Character("Max", "img/player1.jpg", 100, 10, 10, 10);
characters.push(max);
var dick = new Character("Dick", "img/player2.jpg", 100, 10, 5, 15);
characters.push(dick);

var setInitialTurnOrder = function() {
  activePlayer = characters[0];
  passivePlayer = characters[1];
};
setInitialTurnOrder();

function attackButton() {
  passivePlayer.outcome(activePlayer.attack(), passivePlayer.defense());
  $("#" + passivePlayer.charName + "Status").text(passivePlayer.hP);
  switchTurns();
};

function defendButton() {
  activePlayer.defenseModifier = (activePlayer.defenseStat)/3;
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
                                    'Status">' +
                                    player.hP +
                                    '</span>' +
                                  '</p>' +
                                '</div>'
  );
  $("div#playerControls").append('<div class="col-md-6">' +
                                    '<button class="btn attack" type="click">Attack</button>' +
                                    '<button class="btn defend" type="click">Defend</button>' +
                                  '</div>'
  );
};

populatePlayerInterface(activePlayer);
switchTurns();
populatePlayerInterface(activePlayer);
switchTurns();


  $("#p1Name").text((characters[0].charName));
  $("#p2Name").text((characters[1].charName));

  $(".attack").click(function() {
    attackButton();
  });
  $(".defend").click(function() {
    defendButton();
  });
});

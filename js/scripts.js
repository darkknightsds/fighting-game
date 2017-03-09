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

var newCharacter = new Character("MegaMutant Mountain Master", "mmmm", "img/mega-mutant-mountain-master.jpg", 7, 3, 3, 3);
characters.push(newCharacter);
var newCharacter = new Character("Amtrak", "amtrak", "img/amtrak.jpg", 3, 3, 7, 3);
characters.push(newCharacter);
var newCharacter = new Character("Semi-Gloss", "sg", "img/semi-gloss.jpg", 3, 7, 3, 3);
characters.push(newCharacter);
var newCharacter = new Character("Thunder ghost", "tg", "img/thunder-ghost.jpg", 3, 3, 3, 7);
characters.push(newCharacter);
var newCharacter = new Character("Shadow Dick", "sd", "img/shadow-dick.jpg", 4, 4, 4, 4);
characters.push(newCharacter);
var newCharacter = new Character("Samurai Brain Infecter", "sbi", "img/samurai-brain-infecter.jpg", 5, 5, 3, 3);
characters.push(newCharacter);
var newCharacter = new Character("The Cat & The Gat", "tcatg", "img/the-cat-and-the-gat.jpg", 3, 5, 5, 3);
characters.push(newCharacter);
var newCharacter = new Character("Loaded Chamber", "lc", "img/loaded-chamber.jpg", 3, 3, 5, 5);
characters.push(newCharacter);
var newCharacter = new Character("Dynamite Force","df", "img/dynamite-force.jpg", 5, 3, 3, 5);
characters.push(newCharacter);
var newCharacter = new Character("Murder Saint", "ms", "img/murder-saint.jpg", 5, 3, 5, 3);
characters.push(newCharacter);
var newCharacter = new Character("Sinister Savante", "ss", "img/sinister-savante.jpg", 3, 5, 3, 5);
characters.push(newCharacter);

var setInitialTurnOrder = function(player1Selection, player2Selection) {
  activePlayer = player1Selection;
  passivePlayer = player2Selection;
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
  // debugger;
  $("#player2form").hide();
  $("#playSpace").hide();
  $("#submitP1Selection").hide();
  $("#submitP2Selection").hide();


for (i = 0; i < characters.length; i++) {
  // if (characters[i].hitPoints > 0) {
    $("select#p1Choices").append('<option value="' +
                                    i +
                                    '">' +
                                    characters[i].charName +
                                    '</option>'
                                  );
  // }
}

$("#p1Choices").change(function() {
  index = $("#p1Choices").val();
  $("#p1Preview").html('<p>' + characters[index].charName + '</p>' +
                        '<img src="' + characters[index].charImgUrl + '" alt="' + characters[index].charName + '">' +
                        '<p> Strength: ' + characters[index].strength + '</p>' +
                        '<p> Vitality: ' + characters[index].vitality + '</p>' +
                        '<p> Agility: ' + characters[index].agility + '</p>' +
                        '<p> Luck: ' + characters[index].luck + '</p>' +
                        '<p> Hit Points: ' + characters[index].hitPoints + '</p>' +
                        '<p> Base Attack: ' + characters[index].attackStat + '</p>' +
                        '<p> Base Attack: ' + characters[index].defenseStat + '</p>' +
                        '<p> Special Attack Points: ' + characters[index].specialPoints + '</p>'
  );
  $("#submitP1Selection").show();
});

$("#p2Choices").change(function() {
  index = $("#p2Choices").val();
  $("#p2Preview").html('<p>' + characters[index].charName + '</p>' +
                        '<img src="' + characters[index].charImgUrl + '" alt="' + characters[index].charName + '">' +
                        '<p> Strength: ' + characters[index].strength + '</p>' +
                        '<p> Vitality: ' + characters[index].vitality + '</p>' +
                        '<p> Agility: ' + characters[index].agility + '</p>' +
                        '<p> Luck: ' + characters[index].luck + '</p>' +
                        '<p> Hit Points: ' + characters[index].hitPoints + '</p>' +
                        '<p> Base Attack: ' + characters[index].attackStat + '</p>' +
                        '<p> Base Attack: ' + characters[index].defenseStat + '</p>' +
                        '<p> Special Attack Points: ' + characters[index].specialPoints + '</p>'
  );
  $("#submitP2Selection").show();
});


  $("#submitP1Selection").click(function() {
    // debugger;
    event.preventDefault();
    $("#player1form").hide();
    $("#player2form").show();
    player1Selection = characters[$("#p1Choices").val()];
    for (i = 0; i < characters.length; i++) {
      if (characters[i].hitPoints > 0 && characters[i] != player1Selection) {
        $("select#p2Choices").append('<option value="' +
                                        i +
                                        '">' +
                                        characters[i].charName +
                                        '</option>'
                                      );
      }
    }



  });


  $("#submitP2Selection").click(function() {
    event.preventDefault();
    $(".characterSelector").hide();
    $(".playSpace").show();
    player2Selection = characters[$("#p2Choices").val()];
    setInitialTurnOrder(player1Selection, player2Selection);

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
});

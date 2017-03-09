//Back-end logic
var turnCounter=1;
var switchTurns = function() {
  if (passivePlayer.hitPoints <= 0) {
    passivePlayer.death();
  }
  placeHolder = activePlayer;
  passivePlayer.defenseModifier = 0;
  activePlayer = passivePlayer;
  passivePlayer = placeHolder;
  turnCounter++;
  countTurn();
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
  $("#death-div").append('<p>' + passivePlayer.charName + ' has <span class="dead">died.</span></p>');
  if (activePlayer === player1Selection) {
    $("#death-div").append('<p>Player 1, you are victorious!</p>');
    $("#death-div").append('<p>Click the button to receive the next challenger.</p>');
    $("#playerControls2").hide();
  } else {
    $("#death-div").append('<p>Player 2, you are victorious!</p>');
    $("#death-div").append('<p>Click the button to receive the next challenger.</p>');
    $("#playerControls1").hide();
  }
  $("#nextChallenger").show();
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
var newCharacter = new Character("Pula Umbra", "pu", "img/pula-umbra.jpg", 4, 4, 4, 4);
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
  if ((turnCounter %2) != 0 && (passivePlayer.hitPoints <=0)) {
    console.log(passivePlayer.hitPoints)
  move("#img1")
    .x(400)
    .y(0)
    .ease('in-out')
    .then()
    .x(-400)
    .then()
    .y(-0)
    .duration('2s')
    .pop()
    .pop()
    .end();
  $("#img2").addClass('animated hinge');
} else if ((turnCounter %2) != 0) {
  move("#img1")
    .x(400)
    .y(0)
    .ease('in-out')
    .then()
    .x(-400)
    .then()
    .y(-0)
    .duration('2s')
    .pop()
    .pop()
    .end();
} else if ((turnCounter %2) === 0 && (passivePlayer.hitPoints <=0)) {
  move("#img2")
    .x(-400)
    .y(0)
    .ease('in-out')
    .then()
    .x(400)
    .then()
    .y(-0)
    .duration('2s')
    .pop()
    .pop()
    .end();
    $("#img1").addClass('animated hinge');
  } else if ((turnCounter %2) === 0) {
    move("#img2")
      .x(-400)
      .y(0)
      .ease('in-out')
      .then()
      .x(400)
      .then()
      .y(-0)
      .duration('2s')
      .pop()
      .pop()
      .end();
  } else {
    console.log("Done")
  }
  switchTurns();
};

function defendButtonAction() {
  activePlayer.defenseModifier = Math.floor((activePlayer.defenseStat)/3);
  if (activePlayer.specialPoints < 3) {
    activePlayer.specialPoints++;
    $("#" + activePlayer.charID + "specialPoints").text(activePlayer.specialPoints);
  } else {
    console.log("Done");
  }
  if ((turnCounter %2) != 0) {
    move("#img1")
    .x(-100)
    .y(0)
    .ease('in-out')
    .then()
    .x(100)
    .then()
    .y(-0)
    .duration('2s')
    .pop()
    .pop()
    .end();
  } else if ((turnCounter %2) === 0) {
    move("#img2")
    .x(100)
    .y(0)
    .ease('in-out')
    .then()
    .x(-100)
    .then()
    .y(-0)
    .duration('2s')
    .pop()
    .pop()
    .end();
  } else {
    console.log("Done")
  }
  switchTurns();
}

function specialButtonAction() {
  passivePlayer.outcome(activePlayer.special(), passivePlayer.defense());
  $("#" + passivePlayer.charID + "hitPoints").text(passivePlayer.hitPoints);
  $("#" + activePlayer.charID + "specialPoints").text(activePlayer.specialPoints);
  if ((turnCounter %2) != 0 && (passivePlayer.hitPoints <=0)) {
  move("#img1")
    .rotate(180)
    .then()
    .rotate(180)
    .pop()
    .end();
  $("#img2").addClass('animated hinge');
} else if ((turnCounter %2) != 0){
  move("#img1")
    .rotate(180)
    .then()
    .rotate(180)
    .pop()
    .end();
} else if ((turnCounter %2) === 0 && (passivePlayer.hitPoints <=0)) {
  move("#img2")
    .rotate(180)
    .then()
    .rotate(180)
    .pop()
    .end();
    $("#img1").addClass('animated hinge');
  } else if ((turnCounter %2) === 0) {
  move("#img2")
    .rotate(180)
    .then()
    .rotate(180)
    .pop()
    .end();
  }
  else {
    console.log("Done")
  }
  switchTurns();
}

var countTurn = function(){
if ((turnCounter %2) != 0){
  $(".attack1, .defend1, .special1").show();
  $(".attack2, .defend2, .special2").hide();
}
else if ((turnCounter %2) === 0){
    $(".attack1, .defend1, .special1").hide();
    $(".attack2, .defend2, .special2").show();
  }
};


//Front-end logic
$(document).ready(function() {
  $("#player2form").hide();
  $("#playSpace").hide();
  $("#submitP1Selection").hide();
  $("#submitP2Selection").hide();
  $("#nextChallenger").hide();

for (i = 0; i < characters.length; i++) {
    $("select#p1Choices").append('<option value="' +
                                    i +
                                    '">' +
                                    characters[i].charName +
                                    '</option>'
                                  );
}

$("#p1Choices").change(function() {
  index = $("#p1Choices").val();
  $("#p1Preview").html('<p class="char-name">' + characters[index].charName + '</p>' +
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
  $("#p2Preview").html('<p class="char-name">' + characters[index].charName + '</p>' +
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

var populatePlayerInterface = function(player1, player2) {
  $("div#img1").append(
                                      '<img src="' +
                                      player1.charImgUrl +
                                      '" alt="' +
                                      player1.charName +
                                      '" id="' +
                                      player1.charID +
                                      'Image">'
                                    );
  $("div#img2").append(
                                      '<img src="' +
                                      player2.charImgUrl +
                                      '" alt="' +
                                      player2.charName +
                                      '" id="' +
                                      player2.charID +
                                      'Image">'

                                    );
  $("#playerStatus1").append(
                                        '<h2 class="char-name">' +
                                        player1.charName +
                                        '</h2>' +
                                        '<p>Hit points: ' +
                                          '<span id="' +
                                          player1.charID +
                                          'hitPoints">' +
                                          player1.hitPoints +
                                          '</span>' +
                                        '</p>' +
                                        '<p>Special points: ' +
                                          '<span id="' +
                                          player1.charID +
                                          'specialPoints">' +
                                          player1.specialPoints +
                                          '</span>' +
                                        '</p>'
  );

  $("#playerStatus2").append(
                                        '<h2 class="char-name">' +
                                        player2.charName +
                                        '</h2>' +
                                        '<p>Hit points: ' +
                                          '<span id="' +
                                          player2.charID +
                                          'hitPoints">' +
                                          player2.hitPoints +
                                          '</span>' +
                                        '</p>' +
                                        '<p>Special points: ' +
                                          '<span id="' +
                                          player2.charID +
                                          'specialPoints">' +
                                          player2.specialPoints +
                                          '</span>' +
                                        '</p>'
  );

  $("#playerControls1").append(

                                    '<button class="btn attack1" type="click">Attack</button>' +
                                    '<button class="btn defend1" type="click">Defend</button>' +
                                    '<button class="btn special1" type="click">Special</button>'
  );
  $("#playerControls2").append(

                                    '<button class="btn attack2" type="click">Attack</button>' +
                                    '<button class="btn defend2" type="click">Defend</button>' +
                                    '<button class="btn special2" type="click">Special</button>'

  );
  $(".attack2, .defend2, .special2").hide();
};


populatePlayerInterface(activePlayer, passivePlayer);

  $(".attack1").click(function() {
    attackButtonAction();
  });

  $(".defend1").click(function() {
    defendButtonAction();
  });

  $(".special1").click(function() {
    specialButtonAction();
  });

  $(".attack2").click(function() {
    attackButtonAction();
  });

  $(".defend2").click(function() {
    defendButtonAction();
  });

  $(".special2").click(function() {
    specialButtonAction();
  });
  });
});

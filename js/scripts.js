//Front-end logic
function p1Attack {
  player1.attack();
  player2.outcome();
  $("#p2Status").text(player2.hP);
};
function p1Defend {
  player1.defend();
  $("#p1Status").text("P1 is choosing to defend.");
};
function p2Attack {
  player2.attack();
  player1.outcome();
  $("#p1Status").text(player1.hP);
};
function p2Defend {
  player2.defend();
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

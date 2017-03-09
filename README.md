# _Combat Management System_

#### _Choose a fighter and battle! 3-9-2017_

#### By _Liam Stabeno, Nathaniel Meyer, Shane Stafford, & Evan Bishop_

## Description
_A team effort in using HTML, CSS, Javascript, & jQuery. Combat Management System is a fighting game where two players choose their individual fighters whose stat points are preallocated into different attributes, and then take turns attacking. There are three choices on your turn: Attack, Defend, and Special. Attack will roll a die and deal damage accordingly. Special will use up one of three special points and deal 2x damage to the opposing character. Defend will increase your defense rating when the opposing player next attacks, as well as give you one extra special point (You may not have more than three). The game ends when one characters HP reaches 0!_

#### Specifications
| Behavior |  Input   |  Output  |
|----------|:--------:|:--------:|
| A character constructor will create many characters for players to choose from | function Character(charName, charID, charImgUrl, strength, vitality, agility, luck) | "Amtrak", "amtrak", "img/amtrak.jpg", 3, 3, 7, 3) |
| Allow players to select a character | "P1 Select", "P2 Default" | Amtrak, Semi-Gloss |
| Have player 1 start by hiding player 2 buttons | "Start" | --P1 Buttons Show |
| Apply damage to opponent on attack |"Attack" button | -10 HP from opponent |
| Apply extra damage on special attack | "Special" button | -20 HP from opponent |
| Allow users to "defend" for better defense on opponent's next attack | "Defend" button | + defense rating boost |
|	Switch turns after action | --Hide player 1 buttons-- | --Show player 2 buttons-- |
|	Deduct appropriate amount of hit points until a character dies | Player 2: 0 hp | Player 1 wins! |


## Setup/Installation requirements

* _Donwload or Clone this repository_
* _Navigate to your web browsers default download directory and open this folder_
* _Double Click index.html_
* _Press the 'Play' button on the 'Game Time' screen_
* _Choose your fighters, and then battle!_
* _When one character is defeated, or whenever you like, reload the page  and choose new characters._
* _Experiment and have fun!_

## Known Bugs

## Support and contact details

## Technologies used
_HTML, CSS, Javascript, jQuery_
<!-- ### License -->

Copyright (c) 2016 **_Liam Stabeno, Nathaniel Meyer, Shane Stafford, & Evan Bishop_**

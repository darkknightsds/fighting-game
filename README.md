Specs

| Requirement |  Input   |  Output  | MVP |
|----------|:--------:|:--------:|:--------:|
| A character constructor consisting of name, hp, attack rating, defense rating, basic attacks | | | MVP |
| 2 stock characters | | | MVP |
| A character prototype to determine attack strength | | | MVP |
| (A character prototype to determine defense) | | | MVP |
| Apply damage & check for death | | | MVP |
| Turn management: | | | MVP |
|	I. Determine whose turn it is | | | MVP |
| II. (Expire effects) | | | Tier 1 |
|	III. Await user action | | | MVP |
|	IV. Apply outcome of user action (call prototypes):| | | MVP |
|		A. Attack | | | MVP |
|      1. call the attack prototype | | | MVP |
|      2. the defense prototype | | | MVP |
|      3. apply damage | | | MVP |
|      4. check for death | | | MVP |
|		B. Defend | | | MVP |
|      1. buff the defense rating for 1 round | | | MVP |
|		C. Special - Stronger attack | | | Tier 1 |
|   D. Determine next player | | | MVP |

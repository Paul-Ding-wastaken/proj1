# How to play
To start playing you **MUST** select valid options for both the difficulty and first-turn.
**Difficulties**:
- Hard, unbeatable.
- Medium, will try to defend.
- Easy, is easy.
**First-Turn**
- Me First, the cpu is going to move first.
- You First, you get to go first.

## Links
*Button inspiration* https://uiverse.io/Sergestra/angry-dragonfly-60

## Author's note
Despite medium being relatively straight-forward, there is a bug if you play the following sequence of moves:
   - Select "medium difficulty"
   - Select "You First"
   - Play in the bottom left corner as your first move.
   - If the bot plays anywhere but the left column, play in the middle of the left column
   - This is where there is a chance for the bot to not block the top left corner.
The source of this bug is still unknown but does not affect the hard bot's gameplay.


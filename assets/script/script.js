
    $(document).ready(function () {

        var characters = {
            Maul: {
                attack: 10,
                health: 0,
                currAtt: 0,
                counter: function() {
                    this.currAtt += 14;
                }
            },

            Solo: {
                attack: 16,
                health: 0,
                currAtt: 0,
                counter: function() {
                    this.currAtt += 10;
                }
            },

            Vadar: {
                attack: 12,
                health: 0,
                currAtt: 0,
                counter: function() {
                    this.currAtt += 6;
                }
            },

            Yoda: {
                attack: 18,
                health: 0,
                currAtt: 0,
                counter: function() {
                    this.currAtt += 6;
                }
            },
        }

        

            var isChosen = false;
            var isDefending = false;

            var chosenChar;
            var player;
            var chosenEnemy;
            var enemy;

            var defeat;
            


            // On start click (first) reset divs and scores to correct locations and values
            $("#start").on("click", function () {
                $("#start, #enemies, #defender").hide();
                isChosen = false;
                isDefending = false;
                characters.Maul.currAtt = 0;
                characters.Maul.health = 90;
                characters.Vadar.currAtt = 0;
                characters.Vadar.health = 140;
                characters.Yoda.currAtt = 0;
                characters.Yoda.health = 130;
                characters.Solo.currAtt = 0;
                characters.Solo.health = 100;
                defeat = 0;
                $(".choose, #choosePlayer, #list, #image, .defeated").show();
                $("button").removeClass("defeated");
                $("#choosePlayer").append($(".image"));
                $("#statusPlayer, #statusEnemy").hide();
                $("#maul").html(characters.Maul.health);
                $("#vadar").html(characters.Vadar.health);
                $("#yoda").html(characters.Yoda.health);
                $("#solo").html(characters.Solo.health);
                
            });



            // On Character Click (first)
            $(".image").on("click", function () {
                // if player has not been chosen
                if (isChosen === false) {
                    chosenChar = $(this).val();
                    player = characters[chosenChar];
                    $("#character").append(this);
                    isChosen = true;
                    $("#enemies").append($(".choose .image"));
                    $("#character, #enemies").show();
                    $("#choosePlayer").hide();           

                // if player has been chosen and defender has not been chosen
                } else if (isDefending === false) {
                    chosenEnemy = $(this).val();
                    enemy = characters[chosenEnemy];
                    $(this).addClass("defeated");
                    $("#defender").append(this);
                    isDefending = true;
                    $("#fight, #defender").show();
                    
                } else // if both have been chosen
                        {
                    return false;
                }
            });

           

            // On Attack Click (third)
            $("#fight").on("click", function () {
                // if characters are inside div
                enemy.health = enemy.health - player.currAtt;
                player.health = player.health - enemy.attack;
                $("#maul").html(characters.Maul.health);
                $("#vadar").html(characters.Vadar.health);
                $("#yoda").html(characters.Yoda.health);
                $("#solo").html(characters.Solo.health);
                $("#statusPlayer, #statusEnemy").show();
                console.log(defeat);
                // if currently fighting, display attacks
                if (defeat.length === 3) {
                    $("#character").show();
                    $("#character").html("You win!!");
                    $("#start").show();
                } else if (player.health > 0 && enemy.health > 0) {
                    player.counter();
                    $("#statusPlayer").html("You have attacked " + chosenEnemy + " with " + player.currAtt + " points");
                    $("#statusEnemy").html(chosenEnemy + " has attacked " + chosenChar + " with " + enemy.attack + " points");
                // if player loses display you lose and show start button
                } else if (player.health <= 0 && enemy.health > 0) {
                    $("#character").hide();
                    $("#statusPlayer").html("You have lost the war.");
                    $("#statusEnemy").html(chosenEnemy + " will never be defeated!");
                    $("#start").show();
                    $("#fight").hide();
                // if player wins display you win and show start button
                } else if (player.health > 0 && enemy.health <= 0) {
                    $("#statusPlayer").html("You win this round. Pick another enemy to battle");
                    $("#statusEnemy").hide();
                    $("#fight, #defender, .defeated").hide();
                    defeat++
                    isDefending = false;
                } else {
                    return false;
                }


            });

            


});

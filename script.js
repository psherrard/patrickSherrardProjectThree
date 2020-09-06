// NOTE: One bug that didn't get fixed is that the user can click two tiles and if they click a third tile before the first two tiles flip back, the first tile will get stuck.

$(document).ready(function () {
    $('html, body').css({
        overflow: 'hidden',
        height: '100%'
    });

    $(".btn1").click(function () {
        // I was having trouble with my mediaquery when the tiles behind were resized. This is a temporary solution.
        $('html, body').css({
            overflow: 'auto',
            height: 'auto'
        });
        $('.landingPage, .bgImage').fadeOut();
        setTimeout (function() {
            // Sweet alert isn't good when it comes to resizing. I would make this different in the future. Also button doesn't work, so I put showCloseButton:true as a place holder for accessibility.
            Swal.fire({
                html:`
                <h2 class="sATitle">Objective</h2>
                <p class="sADes">Click the tiles to find a matching pair, 8 matches is a win!</p>`,
                showCloseButton: true,
                showConfirmButton: false,
                background:
                `url(./assets/planetWinPage.png)
                no-repeat
                center`,
            })
        },500);
    });


    // Using the Fisher–Yates Shuffle to shuffle the array 

    function shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    let boxNumber = {
        box: [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8],
    }
    shuffle(boxNumber.box);

    let boxId = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

    // Give element with the class of .box a data attribute and id from array
    $('.box').each(function (index) {
        $(this).attr('data-boxValue', boxNumber.box[index]);
        $(this).attr('id', boxId[index]);

    // getImage with the random array value into a variable to imageOnDeck. When this is clicked, imageOnDeck is appended in a div
        let imageOnDeck = getImage(boxNumber.box[index]);
        $(this).append(`<div class="boxFace boxFaceBack">${imageOnDeck}</div>`);
    });

    // getImage function returns image if index matches the number.
    function getImage(index) {
        if (index === 1) {
            return ('<img src="./assets/comet.png" alt="comet"> ')
        } if (index === 2) {
            return ('<img src="./assets/astronaut.png" alt="astronaut">')
        } if (index === 3) {
            return ('<img src="./assets/satellite.png" alt="satellite">')
        } if (index === 4) {
            return ('<img src="./assets/solarSystem.png" alt="solarSystem">')
        } if (index === 5) {
            return ('<img src="./assets/constellation.png" alt="constellation">')
        } if (index === 6) {
            return ('<img src="./assets/spaceShip.png" alt="spaceShip">')
        } if (index === 7) {
            return ('<img src="./assets/telescope.png" alt="telescope">')
        } if (index === 8) {
            return ('<img src="./assets/planet.png" alt="planet">')
        }
    }


    //  Global variables
    let hasFlippedTile = false;
    let lockBoard = false;
    let firstTile, secondTile;
    let match = 0;
    let clickCount = 0;

    //when a tile with the class of .box is click, add a class of .isFlipped to turn over the card. 
    $('.box').on('keypress click', function (e) {
        e.preventDefault();
        if (lockBoard) return;
        if (!hasFlippedTile) {
            if (lockBoard) return;
            hasFlippedTile = true;
            firstTile = this;
            $(this).toggleClass('isFlipped');
        } else {
            if ((this) !== firstTile) {
                $(this).toggleClass('isFlipped');
                hasFlippedTile = false;
                lockBoard = true;
                secondTile = this;
                clickCount++;
                // If firstTile and secondTiles data value match AND the id isnt the same, turn off click and +1 to match variable.
                if (firstTile.getAttribute("data-boxValue") === secondTile.getAttribute("data-boxValue") && firstTile.getAttribute('id') != secondTile.getAttribute('id')) {
                    $('.isFlipped').off('keypress click');
                    match++;
                    lockBoard = false;
                    // Display winning screen here with the amount of moves. (I know this shouldn't be 4 levels deep. I brought it up with Darshana and she told me that the logic makes sense)
                    if (match === 8) {
                        Swal.fire({
                            html:
                                `<h2 class="sATitle">Congrats Ya Cunt!</h2>
                                <p class="sAClick">It took you ${clickCount} moves</p>
                                <a href=""><button class="playAgain">Play Again?</button></a>`,
                            showConfirmButton: false,
                            background: 
                                `url(./assets/planetWinPage.png)
                                no-repeat
                                center`,
                        })
                    }
                } else {
                    // else tiles don't match, remove class of isFlipped
                    setTimeout(function () {
                        firstTile.classList.remove('isFlipped');
                        secondTile.classList.remove('isFlipped');
                        lockBoard = false;
                    }, 950);
                }
            } else {
                // I was planning on doing an animation for when the user clicks the same tile.
            }
            $('.clickCount').html(`Moves: ${clickCount}`)
        }

    });

});


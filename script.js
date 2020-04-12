$(document).ready(function () {

    $(".btn1").click(function () {
        $('.landingPage, .bgImage').fadeOut();
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

    // Give element with the class of .box a data attribute from the array
    $('.box').each(function (index) {
        $(this).attr('data-boxValue', boxNumber.box[index]);
        $(this).attr('id', boxId[index]);

        // getImage with the random array value into a variable to imageOnDeck. When this is clicked, imageOnDeck is appended in a div
        let imageOnDeck = getImage(boxNumber.box[index]);
        $(this).append(`<div tabindex="0" class="boxFace boxFaceBack">${imageOnDeck}</div>`);
    });

    // getImage function returns image if index matches the number.
    function getImage(index) {
        if (index === 1) {
            return ('<img class="cover" src="./assets/comet.jpg"> ')
        } if (index === 2) {
            return ('<img src="./assets/moon-1.jpg">')
        } if (index === 3) {
            return ('<img src="./assets/satellite.jpg">')
        } if (index === 4) {
            return ('<img src="./assets/solar-system.jpg">')
        } if (index === 5) {
            return ('<img src="./assets/space-dude.jpg">')
        } if (index === 6) {
            return ('<img src="./assets/space-ship.jpg">')
        } if (index === 7) {
            return ('<img src="./assets/telescope.jpg">')
        } if (index === 8) {
            return ('<img src="./assets/ufo.jpg">')
        }
    }


    //  Global variables 
    let hasFlippedTile = false;
    let firstTile, secondTile;
    let match = 7;
    let clickCount = 0;

    //when a tile with the class of .box is click, add a class of .isFlipped to turn over the card. 
    $('.box').on('click', function (e) {
        e.preventDefault();
        console.log('click event');
        // $(this).toggleClass('isFlipped');
        if (!hasFlippedTile) {
            hasFlippedTile = true;
            firstTile = this;
            $(this).toggleClass('isFlipped');
        } else {
            if ((this) !== firstTile) {
                $(this).toggleClass('isFlipped');
                hasFlippedTile = false;
                secondTile = this;
                clickCount++;
                console.log(clickCount);
                // If firstTile and secondTiles data value match AND the id isnt the same, turn off click and +1 to match variable.
                if (firstTile.getAttribute("data-boxValue") === secondTile.getAttribute("data-boxValue") && firstTile.getAttribute('id') != secondTile.getAttribute('id')) {
                    $('.isFlipped').off('click');
                    match++;
                    // Display winning screen here with the amount of moves.
                    if (match === 8) {
                        // $('.results').html(`
                        // <h2>YOU WIN!</h2>
                        // <p>It took you ${clickCount} moves</p>
                        // `);
                        Swal.fire({
                            html:
                                `<h2 class="sATitle">Congrats!</h2>
                                <p class="sAClick">It took you ${clickCount} moves</p>
                                <a href=""><button class="playAgain">Play Again?</button></a>`,
                            showConfirmButton: false,
                            // height:600,
                            background: 
                                `url(./assets/planet.png)
                                no-repeat
                                center`,
                        })
                    }
                } else {
                    // else tiles don't match, remove class of isFlipped
                    // console.log('else flip');
                    setTimeout(function () {
                        firstTile.classList.remove('isFlipped');
                        secondTile.classList.remove('isFlipped');

                    }, 950);
                }
            } else {
                console.log('same tile');
                // do animation here

            }
            // console.log(firstTile.getAttribute('data-boxValue'));
            // console.log(secondTile.getAttribute('data-boxValue'));
            $('.clickCount').html(`Moves: ${clickCount}`)
        }


    });

});


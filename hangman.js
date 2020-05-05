$(function() {
  const word_array = ['apple', 'gorgonzola', 'comedy', 'masterpiece', 'wonderful', 'standard', 'table', 'structure', 'remarkable', 'fantastic', 'ferrari', 'butterfly', 'yellow', 'destruction', 'eventually', 'drastically', 'gentleman', 'yesterday', 'sister', 'catastrophic', 'skywalker', 'treasure'];
  const $letters = $('.game__letter');
  
  const welcomeText = () => {
    const textsPrim = ['Welcome. Do you want to play a game? I do.', 'Hello there.', 'Marvelous. Another one to play with.', 'Heh. Welcome.', 'Greetings, mortal. Don\'t be afraid.', 'It\'s so good to see you.', 'There you are. I was wondering where have you been.'];
    const randomizePrimText = Math.floor(Math.random() * textsPrim.length);
    const textsSec = ['We\'re going to have so much fun together.', 'It will be fun, I promise.', 'I think you will enjoy your stay here.', 'I am dying to begin.', 'It is only going to get better from now on.', 'Shall we begin?', 'Let us play.'];
    const randomizeSecText = Math.floor(Math.random() * textsSec.length);
    return {
      firstText: textsPrim[randomizePrimText],
      secondText: textsSec[randomizeSecText]
    }
  };
  
  const game = () => {
    // console.log(welcomeText().firstText, welcomeText().secondText);
    let mistakes = 0;
    let lives = 7;
    let correctLetters = 0;
    $('.hangman__life-counter').text(lives);
    const random = Math.floor(Math.random() * word_array.length);
    // console.log(random);
    const selectedWord = word_array[random];
    // console.log(selectedWord);
    const splitSelectedWord = selectedWord.split('');
    // console.log(splitSelectedWord);
    $letters.prop('disabled', false);

    // Fill the texts on the left
    $('.hangman__text').text(welcomeText().firstText).animate({ opacity: '1' },2000, () => {
      $('.hangman__secondtext').text(welcomeText().secondText).animate({ opacity: '1' }, 1500, () => { $('.hangman__variables').animate({ opacity: '1' }, 1500);
      $('.title').animate({ opacity: '1' }, 2000) });
    });
    

    // Add the letters for guessing and apply data to them
    for (let i = 0; i < splitSelectedWord.length; i++) {
      $('.game__word-container').append($('<p class="game__word-letter"></p>').text('_'));
      $('.game__word-letter').eq(i).data('letter', splitSelectedWord[i]);
    }

    // console.log($('.game__word-letter').eq(3).data('letter'));

    // Add event handlers for filling up the letters
    for (let i = 0; i < $letters.length; i++) {
      $letters.eq(i).on('click', function() {
        let currLetter = $(this).text().toLowerCase();
        // console.log($(this));
        $(this).prop('disabled', true);
        if (splitSelectedWord.includes(currLetter)) {
          $('.game__word-letter').map(function(letter) {
            // console.log(letter, $(this));
            if ($(this).data('letter') == currLetter) {
              $(this).text(currLetter.toUpperCase());
              correctLetters++;
            }
          });
          // console.log('includes!');
        } else {
          $('.hangman__used-letters').append(currLetter);
          mistakes++;
          lives--;
          $('.hangman__life-counter').text(lives);
        };
        // Game over
        if (mistakes > 6) {
          $letters.prop('disabled', true);
          $('.gameover').css('display', 'flex').hide().fadeIn(1000, () => {
            $('.gameover__youdied').fadeIn(1000).css('animation', 'gameover 1.5s forwards');
            setTimeout(() => {
              $('.tryagain').animate({opacity: '1'}, 1000);
            }, 1000)
          });
        };
        // Try again button
        $('.tryagain').on('click', function() {
          $('.gameover').fadeOut(1000, () => {
            window.location.reload();
          });
        });   
        // Victory
        if (correctLetters == splitSelectedWord.length) {
          $letters.prop('disabled', true);
          $('.youwin').css('display', 'flex').hide().fadeIn(1000, () => {
            $('.youwin__victory').fadeIn(500).css('animation', 'gameover 1.2s forwards reverse');
            setTimeout(() => {
              $('.tryagain').animate({opacity: '1'}, 1000);
            }, 1500)
          });
        };       
      });
    }; // end of for
  };

  game();
});
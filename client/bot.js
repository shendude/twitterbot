//starts sentence with random sentence starter
var startSentence = function(freqs) {
  var sentence = ['_null'];
  var keys = Object.keys(freqs._null);
  var first ='..';
  while (first.slice(0, 1).match(/[^A-Z]/) || first.slice(-1).match(/[^a-zA-Z]/) || first.length === 0){
    first = keys[keys.length * Math.random() << 0];
  }
  sentence.push(first);

  return sentence;
}

//given a sentence, add another word
var addWord = function(arr, totals, freqs) {
  var a = arr.slice(-2, -1);
  var b = arr.slice(-1);
  if (!freqs[a][b]) {
    return null;
  }
  var c = Object.keys(freqs[a][b]);

  var i = 0;
  var word = '...';
  var total = totals[a+b] * Math.random() << 0;
  while (total >= 0) {
    word = c[i];
    total -= freqs[a][b][c[i]];
    i++;
  }
  while (word.slice(-1).match(/[^a-zA-Z]/) || word.length === 0) {
    if (i === 0) {
      break;
    }
    i--;
    word = c[i];
  }
  return arr.concat(word);
};

//given a sentence, tries to finish it
var finishSentence = function(sentence, totals, freqs, myCards) {
  if (sentence === null) {
    return null;
  }
  var endings = myCards[sentence[sentence.length - 1]];
  if (endings) {
    return sentence.slice(0, -1).concat(endings[endings.length * Math.random() << 0]);
  } else {
    sentence = addWord(sentence, totals, freqs);
    return finishSentence(sentence, totals, freqs, myCards);
  }
};

//markov bot generator, generates sentences of n base words long 
var generate = function(n, totals, freqs, myCards){
  //get first word
  var sent = startSentence(freqs);
  for (var i = 1; i <= n; i++) {
    sent = addWord(sent, totals, freqs);
    if (sent === null) {
      sent = startSentence(freqs);
      i = 1;
    }
  }
  sent = finishSentence(sent, totals, freqs, myCards);
  if (sent === null) {
    return generate(n, totals, freqs, myCards);
  } else {
    return sent;
  }
};

export default generate;

//custom inputfilter for sherlock holmes lines of text
//actual lines of story text is indented with 5 spaces only
var myFilter = function(string) {
  return (string.length > 5 && string[5] !== ' ');
}


//markov chain text parser/generator. creates a probability graph as javascript object
var freqs = {};
var totals = {};
var myCards = {};

var parseCards = function() {
  var result = {};
  var first = ''
  for (var card of cards) {
    var arr = card.split(' ');
    arr[0] = arr[0].toLowerCase();
    if (!result[arr[0]]) {
      result[arr[0]] = [];
    }
    result[arr[0]].push(arr);
  }
  myCards = result;
}


//turns blob of text into into array of sentences
var parseBlob = function(string) {
  var rows = string.split(/\r?\n/g);
  var sentences = [];
  var trailing = '';
  var add = function(string) {
    if (string.length + trailing.length > 40) {
      if (trailing.length) {
        sentences.push(trailing + string);
        trailing = '';
      } else {
        sentences.push(string);
      }
    }
  };
  for (var line of rows) {
    line = line.split('"').join('');
    if (myFilter(line)) {
      var temp = line.slice(5).split(/(?!Dr|Mr|Mrs|Miss|Master)\. /);
      for (var i = 0; i < temp.length; i++) {
        if (i < temp.length - 1) {
          add(temp[i] + '.');
        } else {
          if (temp[i].slice(-1) === '.') {
            add(temp[i]);
          } else {
            trailing += temp[i] + ' ';
          }
        }
      }
    }
  }
  return sentences;
}

//parses an array of sentences to an object
//then to an mongodb-compatable array
var parseLines = function(lines) {
  var words = [];
  //obj representation of markov graph
  var increment = function(a, b, c) {
    if (!totals[a + b]) {totals[a + b] = 0}
    if (!freqs[a]) {freqs[a] = {}};
    if (!freqs[a][b]) {freqs[a][b] = {}};
    if (!freqs[a][b][c]) {freqs[a][b][c] = 0}
    totals[a+b]++;
    freqs[a][b][c]++;
  }
  for (var sentence of lines) {
    words = sentence.split(' ');
    for (var i = 0; i < words.length - 1; i++) {
      if (i === 0) {
        increment('_null', words[i], words[i+1]);
      } else {
        increment(words[i-1], words[i], words[i+1]);
      }
    }
  }
  parseCards();
}

export {myFilter, parseCards, parseBlob, parseLines};
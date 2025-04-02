'use strict'

function getRandomId(length = 6) {
  var chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  var charsLength = chars.length;
  var randomId = '';
  

  for(var i=0; i<length; i++) {
    randomId += chars[Math.floor(Math.random() * charsLength)];
  }

  return randomId;
}

function getRandomIntInclusive(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}

function generateSentence(wordCount = 10) {
  const words = [
    "when", "you", "realize", "that", "dog", "cat", "coffee", "sleep", "banana",
    "gaming", "wifi", "loading", "potato", "brain", "mood", "me", "life", "struggle",
    "work", "school", "Monday", "Friday", "pizza", "hungry", "tired", "why", "help",
    "nope", "bruh", "epic", "fail", "success", "random", "suspicious", "sus", "drama",
    "meme", "legend", "respect", "waiting", "unexpected", "chaos", "doggo", "vibe",
    "dancing", "screaming", "crying", "laughing", "problem", "solution", "angry", "confused",
    "overthinking", "regret", "too much", "too little", "genius", "404", "loading", "sleeping",
    "woke up", "relatable", "why tho", "big brain", "small brain", "error", "nothing", "everything"
  ];

  let sentence = [];
  for (let i = 0; i < wordCount; i++) {
    let randomWord = words[Math.floor(Math.random() * words.length)];
    sentence.push(randomWord);
  }

  return sentence.join(" ").charAt(0).toUpperCase() + sentence.join(" ").slice(1);
}
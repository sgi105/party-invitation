const randomWords = require('random-words')

const randomCodeGenerator = () => {
  const word = randomWords({
    exactly: 1,
    maxLength: 3,
  })[0].toUpperCase()
  const number = Math.floor(Math.random() * 900 + 100)
  const code = word + number
  return code
}

module.exports = randomCodeGenerator

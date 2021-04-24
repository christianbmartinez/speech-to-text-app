var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var recognition = new SpeechRecognition()
recognition.continuous = false
recognition.lang = 'en-US'
recognition.interimResults = true
recognition.maxAlternatives = 1

const output = document.getElementById('output')
const button = document.querySelector('.button')
const accuracy = document.getElementById('accuracy')
let listening = false

startSpeech = () => {
  listening = true
  button.classList.add('pulse')
  recognition.start()
  console.log('Listening for speech.')
}

endSpeech = () => {
  listening = false
  button.classList.remove('pulse')
  recognition.stop()
  console.log('Stopped Listening.')
}

button.onclick = () => {
  !listening ? startSpeech() : endSpeech()
}

recognition.onresult = e => {
  let result = e.results[0][0].transcript
  let phrase = result.charAt(0).toUpperCase() + result.slice(1)
  output.innerHTML = phrase + '.'
  accuracy.innerHTML = `I am ${Math.round((e.results[0][0].confidence / 100) * 10000) + '%'} sure that's what you said.`
}

recognition.onspeechend = () => {
  endSpeech()
}

recognition.onnomatch = () => {
  output.innerHTML = 'I didn\'t recognise that.'
  endSpeech()
}

recognition.onerror = e => {
  output.innerHTML = 'Error occurred. Please try again.'
  console.log(e.error)
  endSpeech()
}
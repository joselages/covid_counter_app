const isMobile = /Mobi|Android/i.test(navigator.userAgent);
const allCounterButtons = document.getElementsByClassName("js-counterBtn");
const inputWrapperSentence = document.querySelector(".js-inputWrapperSentence");
const informationContainer = document.querySelector(".js-informationContainer");
const sqrMetersInput = document.querySelector(".js-sqrMeterInput");
let inputError = false;
function validateSquareMeters(input) {
  let inputedVal = input.value.trim();
  let onlyNumbersRegex = /^[0-9]+$/;
  let infoMessage,
    classToAdd = "";
  let isError,
    isInfo = false;

    inputError = false;

  if (parseInt(inputedVal) === 0 || inputedVal.length < 1) {
    //empty or 0
    isError = true;
    infoMessage = "🙃 Por favor insira o tamanho do seu estabelecimento.";
  } else if (!onlyNumbersRegex.test(inputedVal)) {
    //its a number
    isError = true;
    infoMessage =
      "🤦‍♂️ O tamanho do estabelecimento tem de ser um número inteiro...";
  }

  if (inputedVal > 99999) {
    isInfo = true;
    infoMessage =
      "💡 Sabias que o teu estabelecimento é maior que a cidade de Lisboa?";
  }

  if (inputedVal > 92210000) {
    isInfo = true;
    infoMessage = "💡 Sabias que o teu estabelecimento é maior que Portugal?";
  }

  if (inputedVal > 148930000000000) {
    isInfo = true;
    infoMessage =
      "🌎 Sabias que o teu estabelecimento é maior que o mundo inteiro?";
  }

  if (isError) {
    classToAdd = "-error";
    inputError = true;
  }

  if (isInfo) {
    classToAdd = "-info";
  }

  informationContainer.classList.remove("-error", "-info");

  if (isError || isInfo) {
    informationContainer.classList.add(classToAdd);
    informationContainer.innerHTML = infoMessage;
  }
}

function resizeInput(value) {
  let isChrome = navigator.userAgent.toLowerCase().indexOf("chrome") > -1;

  if (isChrome || isMobile) {
    return value.length - 1;
  }

  return value.length;
}

sqrMetersInput.addEventListener("input", function () {
  validateSquareMeters(this);

  if (this.value < 2 || isMobile) {
    this.size = 1;
    return;
  }

  this.size = resizeInput(this.value);
});

document.addEventListener("DOMContentLoaded", function () {

  sqrMetersInput.size = resizeInput(sqrMetersInput.value);
});


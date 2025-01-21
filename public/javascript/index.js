
const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');

hamburger.addEventListener('click', () => {
  menu.classList.toggle('active');
});
function calculateBMI() {
  const weight = parseFloat(document.getElementById('weight').value);
  const height = parseFloat(document.getElementById('height').value) / 100; // Convert height to meters
  const resultElement = document.getElementById('bmi-result');

  if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
    resultElement.textContent = 'Please enter valid values for weight and height.';
    resultElement.style.color = 'red';
    return;
  }

  const bmi = (weight / (height * height)).toFixed(2);

  let message = `Your BMI is ${bmi}. `;
  if (bmi < 18.5) {
    message += 'You are underweight.';
  } else if (bmi >= 18.5 && bmi < 24.9) {
    message += 'You have a normal weight.';
  } else if (bmi >= 25 && bmi < 29.9) {
    message += 'You are overweight.';
  } else {
    message += 'You are obese.';
  }

  resultElement.textContent = message;
  resultElement.style.color = '#333';
}


function isLeapYear(year){
  return (year % 4 === 0 && year % 100 !== 0 ) || year % 400 === 0

}

function isValidDate(day, month, year) {
  // Verificar se o dia é válido para o mês
  if (month === 2) { // Fevereiro
    if (isLeapYear(year)) {
      return day <= 29;
    } else {
      return day <= 28;
    }
  } else {
    // Verificar outros meses
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return day <= daysInMonth[month - 1];
  }
}


function Calcular() {
  // Obter valores dos campos de entrada
  let DayInput = document.getElementById("Day");
  let MonthInput = document.getElementById("Month");
  let YearInput = document.getElementById("Year");

  // Obter valores dos campos e remover espaços em branco
  let dayValue = DayInput.value.trim();
  let monthValue = MonthInput.value.trim();
  let yearValue = YearInput.value.trim();

  // Obter elementos para exibir mensagens de erro
  const dayError = document.getElementById("error");
  const monthError = document.getElementById("error2");
  const yearError = document.getElementById("error3");
  const Dayleap = document.getElementById("Dayleap")

  // Limpar mensagens de erro anteriores
  dayError.textContent = "";
  monthError.textContent = "";
  yearError.textContent = "";
  Dayleap.textContent = ""

  // Obter a data atual
  let currentDate = new Date();
  let currentYear = currentDate.getFullYear();
  let currentDay = currentDate.getDate();
  let currentMonth = currentDate.getMonth() + 1; // Mês é base 0, então adicionamos 1

  // Variável para verificar se os valores são válidos
  let validValues = true;

  // Validar e exibir mensagens de erro
  if (dayValue === "" || dayValue === 0 || dayValue > 31) {
    dayError.textContent = "This field is required ";
    validValues = false;
  }
  if (monthValue === "" || monthValue < 1 || monthValue > 12) {
    monthError.textContent = "This field is required";
    validValues = false;
  }
  if (yearValue === "") {
    yearError.textContent = "This field is required";
    validValues = false;
  }
  if (yearValue < 1900 || yearValue > currentYear) {
    yearError.textContent = "O ano deve estar entre 1900 e o ano atual";
    validValues = false;
  }

  // Verificar se a data é válida
if(!isValidDate(parseInt(dayValue) , parseInt(monthValue), parseInt(yearValue))){
  document.getElementById("Dayleap").textContent = "  "
  validValues = false
}

  // Se os valores forem válidos, calcular a idade
  if (validValues) {
    // Calcular idade
    let dob = new Date(yearValue, monthValue - 1, dayValue); // Mês é base 0
    let age = currentYear - dob.getFullYear();
    let dayDiff = currentDay - dob.getDate();
    let monthDiff = currentMonth - (dob.getMonth() + 1); // Mês é base 0

    // Ajustar idade se ainda não tiver feito aniversário neste ano
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
      monthDiff = 12 - Math.abs(monthDiff); // Corrigir a diferença de meses
      dayDiff = dob.getDate() - currentDay; // Corrigir a diferença de dias
    }

    // Exibir resultados
    document.getElementById("Ryears").textContent = age;
    document.getElementById("Rmonths").textContent = Math.abs(monthDiff);
    document.getElementById("Rdays").textContent = Math.abs(dayDiff); // Usar valor absoluto para o número de dias

    // Bloquear o botão
    if (dayValue > 31 || dayValue === "") {
      document.getElementById("calcButton").disabled = true;
    }
    if (monthValue > 12 || monthValue === "") {
      document.getElementById("calcButton").disabled = true;
    }
    if (yearValue > currentYear || yearValue === "" ) {
      document.getElementById("calcButton").disabled = true;
    }
    if(!validValues){
      document.getElementById("calcButton").disabled = true
    }else{
      document.getElementById("calcButton").disabled = false
    }
    if(dayValue == 29 && monthValue == 2 && isLeapYear(parseInt(yearValue))){
      document.getElementById("Dayleap").textContent = "Ano bissexto"
    }else{
      document.getElementById("Dayleap").textContent= ""
    }
    
  }
}

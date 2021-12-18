
  const flagFrom = document.getElementById('flag-from');
  const flagTo = document.getElementById('flag-to');
  
  const fromAmountInput = document.getElementById('fromAmount');
  const fromCurrencyLi = document.getElementById('fromCurrency');
  const toAmountInput = document.getElementById('toAmount');
  const toCurrencyLi = document.getElementById('toCurrency');
  
  const rateLi = document.querySelector('.rate');
  const exchange = document.querySelector('#exchange');
  
  flagFrom.innerHTML = `<img src="./flags/${fromCurrencyLi.value}.png" width="30" class="cpt transition"/>`;
  flagTo.innerHTML = `<img src="./flags/${toCurrencyLi.value}.png" width="30" class="cpt transition"/>`;
  
  
  fromAmountInput.addEventListener('input', calculate);
  fromCurrencyLi.addEventListener('change', changeFlagFrom, calculate);
  toAmountInput.addEventListener('input', calculate);
  toCurrencyLi.addEventListener('change', changeFlagTo, calculate);
  
  function changeFlagFrom() {
    flagFrom.innerHTML = `<img src="./flags/${fromCurrencyLi.value}.png" width="30" class="cpt"/>`;
  }
  
  function changeFlagTo() {
    flagTo.innerHTML = `<img src="./flags/${toCurrencyLi.value}.png" width="30" class="cpt"/>`;
  }
  
  exchange.addEventListener('click', ()=>{
    const temp = fromCurrencyLi.value;
    fromCurrencyLi.value = toCurrencyLi.value;
    toCurrencyLi.value = temp;
    changeFlagFrom();
    changeFlagTo();
    calculate();
  });
  
  function calculate(){
    const fromCurrency = fromCurrencyLi.value;
    const toCurrency = toCurrencyLi.value;
  
    fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
      .then(res => res.json())
      .then(res =>{
      const rate = res.rates[toCurrency];
      rateLi.innerText = `1 ${fromCurrency} = ${rate} ${toCurrency}`;
      toAmountInput.value = (fromAmountInput.value * rate).toFixed(2);
    })
  }
  calculate();
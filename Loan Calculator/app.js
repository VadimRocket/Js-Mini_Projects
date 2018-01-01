const ERRORMESSAGE = 'Please check your numbers';

/*Listen for submit */ 
document.getElementById('loan-form').addEventListener('submit', function(e){
    hideResults();
    showLoader();   
    /**
     * delay Calculate Results 
     * @param {func|code, delay} calculateResults, 2000
     */   
    setTimeout(calculateResults, 2000);

    e.preventDefault();
});

// func calculate Results 
function calculateResults(){
   // UI variables
   const amount = document.getElementById('amount');    
   const interest = document.getElementById('interest');
   const years = document.getElementById('years');
   const monthlyPayment = document.getElementById('monthly-payment'); 
   const totalPayment = document.getElementById('total-payment'); 
   const totalInterest = document.getElementById('total-interest'); 

   const principal = parseFloat(amount.value); 
   const calculatedInterest = parseFloat(interest.value) / 100 / 12;
   const calculatedPayments = parseFloat(years.value) * 12;
   
   /**
    * Compute monthly payment - Вычислить ежемесячный платеж
    * The Math.pow() function returns the base to the exponent power, that is, baseexponent.
    */
   const x = Math.pow(1 + calculatedInterest, calculatedPayments);
   const monthly = (principal*x*calculatedInterest)/(x-1);
   
   if(isFinite(monthly)){
   
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);
    showResults();
    hideLoader();

    if(totalPayment.value < 0 || totalInterest.value < 0 || monthlyPayment.value < 0 ) showError(ERRORMESSAGE);

   }else{   
    showError(ERRORMESSAGE);
   }

}
/**
 * function showError
 * @param {ERRORMESSAGE} error 
 */
function showError(error){
    //Create div
    const errorDiv = document.createElement('div');
    // Get elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    //Add class
    errorDiv.className ='alert alert-danger';
    // Create text node add append to Div
    errorDiv.appendChild(document.createTextNode(error));
    // Insert Error above heading
    card.insertBefore(errorDiv, heading);
    // Clear error after 3 sec
    setTimeout(clearError, 3000);

    hideLoader();
    hideResults();
}

function clearError(){
    document.querySelector('.alert').remove();
}
function  hideLoader(){
    document.getElementById('loading').style.display = 'none';
}
function showLoader(){
    document.getElementById('loading').style.display = 'block';
}
function hideResults(){
    document.getElementById('results').style.display = 'none';
}
function showResults(){
    document.getElementById('results').style.display = 'block';
}

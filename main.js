// Inputs
let cashFlow = document.getElementById('cashFlow');
let shortTerm = document.getElementById('shortTerm').value;
let discountRate = document.getElementById('discountRate').value/100; //To decimals

console.log(discountRate);
// Output
let intrinsicValue = document.getElementById('intrinsicVal');

// Calculation when button pressed
function refresh(){
    let cash=cashFlow.value;
    let total=0;
    let oneYear=0;
    for(var i=1;i<=shortTerm;i++){
        oneYear=cash/Math.pow((1+discountRate),i);
        console.log(oneYear);
        total+=oneYear;
    }

    total=Math.round(total * 100) / 100;
    intrinsicValue.innerHTML=total;
}




// Calculation when button pressed
function refresh(){

    // Input
    let cashFlow = document.getElementById('cashFlow');
    let shortTerm = document.getElementById('shortTerm').value;
    let discountRate = document.getElementById('discountRate').value/100; //To decimals
    let discountRateGrowth = discountRate+1;
    let growthRate = document.getElementById('growthRate').value/100+1; //To decimals
    let perpetuity = document.getElementById('perpetuity').value/100;
    let annual = document.getElementById('annual');
    let shareCount = document.getElementById('shareCount').value;
    let sharePrice = document.getElementById('sharePrice').value;

    let cash=cashFlow.value;
    let total=0; // Total cashflows
    let oneYear=0; //One year cashflows
    let annualReturn;
    
    // Data for the table 
    let FCF=[];//Freecash flows
    let DF=[];
    let DFvalue=1;
    let DFCF=[];

    // Output
    let intrinsicValue = document.getElementById('intrinsicVal');
    let marketCap = document.getElementById('marketCap');
    let sumOfDFCF = document.getElementById('DFCF');
    let sumOfDPCF = document.getElementById('DPCF');

    for(var i=1;i<=shortTerm;i++){
        oneYear=cash/Math.pow((1+discountRate),i);
        cash=cash*growthRate;
        FCF.push(Math.round(cash*100)/100);
        DFvalue=DFvalue*discountRateGrowth;
        DF.push((Math.round(DFvalue*100)/100));
        console.log('cash'+cash);
        oneYear*=growthRate;
        DFCF.push(Math.round(oneYear*100)/100);
        console.log(oneYear);
        total+=oneYear;
    }

    console.log('final year '+oneYear);

    // Perpetuity cashflows after 10 year
    // let terminal=oneYear*(1+perpetuity)/(WACC-perpetuity); //Optional terminal value
    let terminal=(oneYear*growthRate)*(1+perpetuity)/((discountRate+(0.01-(perpetuity/10)))-perpetuity);

    // Display Sum of DFCF and PDCF
    sumOfDFCF.innerHTML=total.toFixed(2);
    sumOfDPCF.innerHTML=terminal.toFixed(2);

    console.log('total '+total);
    console.log('terminal '+terminal);
    total+=terminal;
    total=Math.round(total * 100) / 100;
    
    // Creates table
    createTable(FCF,DF,DFCF,total,terminal);
    
    // Marketcap
    let marketC=document.getElementById('shareCount').value*document.getElementById('sharePrice').value;
    marketC=Math.round(marketC * 100) / 100;

    // Valuation
    intrinsicValue.innerHTML=total+' B';
    marketCap.innerHTML=marketC+' B';

    // Annual returns
    calculateAnnual(); 
    
}

function calculateAnnual(){
    
    var step = 0.0001;
    for (var i = 0; i < 50; i++) {
        xa = xb = i / 100;
        console.log(i);
        var counter = 0;
        do {
            xa = xb;
            xb = iterate(xa);
            counter++;
        } while ((Math.abs(xb - xa) > step) && (counter < 30) && (Math.abs(xb - xa) < 1));
            if ((Math.abs(xb - xa) <= step)) {
                console.log('breaK')
                break;
            }
            }
        if ((Math.abs(xb - xa) <= step)) {
            var ndr = xb * 100;
            ndr=Math.round(ndr*100)/100;
            annual.innerHTML=ndr+'%';;
        } 
}

function iterate(x) {
    var freecashflow = cashFlow.value;
    var gAfter10 = Number(perpetuity.value/100);
    var growth10 = Number(growthRate.value/100)+1;
    var percent101 = 1 + x;
    var years = Number(shortTerm.value) + 1;
    var exponent = Math.pow(growth10, years);
    var f0 = freecashflow * exponent * (1 + gAfter10) / (x - gAfter10) / Math.pow(percent101, years) +
    freecashflow * (1 - Math.pow(growth10 / percent101, years)) / (1 - growth10 / percent101) - freecashflow - sharePrice.value * shareCount.value;
    var fder = -freecashflow * (1 + gAfter10) * exponent * (1 / Math.pow(percent101, years) / Math.pow(-gAfter10 + x, 2) + years * Math.pow(x + 1, -1 - years) / (-gAfter10 + x)) +
    freecashflow * (years * exponent * Math.pow(percent101, -1 - years) / (1 - growth10 / percent101) - growth10 * (1 - exponent / Math.pow(percent101, years)) / Math.pow((1 - growth10 / percent101) * percent101, 2));
    var result = x - f0 / fder;
    return result;
}

function createTable(dataFCF,dataDF,dataDFCF,total,terminal){
    let data=document.getElementsByClassName('data')[0];
    // Clear table
    if(data.childElementCount!=0){
        for(var i=0;i<=44;i++){
            if(data.childElementCount==0){
                break;
            }
            data.removeChild(data.childNodes[0]);
        }
    }  
    // Create years
    for(var i=1;i<=10;i++){
        var block= document.createElement('div');
        block.className='block';
        block.innerHTML=i;
        data.appendChild(block);
    }
    // Create FCF
    for(var i=1;i<=10;i++){
        var block= document.createElement('div');
        block.className='block';
        block.innerHTML=dataFCF[i-1];
        data.appendChild(block);
    }
    // Create DF
    for(var i=1;i<=10;i++){
        var block= document.createElement('div');
        block.className='block';
        block.innerHTML=dataDF[i-1];
        data.appendChild(block);
    }
    // Create DFCF
    for(var i=1;i<=10;i++){
        var block= document.createElement('div');
        block.className='block';
        block.innerHTML=dataDFCF[i-1];
        data.appendChild(block);
    }
    // Create Sum of DFCF and Terminal
    for(var i=0;i<4;i++){
        var sumOfDFCF = document.createElement('div');
        sumOfDFCF.className = 'blockSum';
        data.appendChild(sumOfDFCF);
    }
}


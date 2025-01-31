


function validate() {
  //get form inputs
  
  
  //get all
  const cardNumber = document.getElementById("card_number").value;
  const expirationMonth = document.getElementById("expiration_month").value;
  const expirationYear = document.getElementById("expiration_year").value;
  const securityCode = document.getElementById("security_code").value;
  
  

  //regex for mastercard and the cvv
  let mastercardRegex = /^((5[1-5][0-9]{2})|(222[1-9])|(22[3-9][0-9])|(2[3-6][0-9]{2})|(27[01][0-9])|2720)[0-9]{12}$/;
  let securityCodeRegex = /^\d{3,4}$/;
  
  //validate all
  if(!mastercardRegex.test(cardNumber) && expirationYear === "Select Year" && expirationMonth === "Select Month" && !securityCodeRegex.test(securityCode)){
    alert("Please fill out the form");
    return;
  }
  //validate card number
  if (!mastercardRegex.test(cardNumber)) {
    alert("Invalid Mastercard number");
    return;
  }

  //validate expiration month
  if (expirationMonth === "" || expirationMonth === "Select Month") {
    alert("Please select expiration month");
    return;
  }

  //validate expiration year
  if (expirationYear === "" || expirationYear === "Select Year") {
    alert("Please select expiration year.");
    return;
  }

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1; //getMonth returns 0-based month
  const expMonth = parseInt(expirationMonth, 10);
  const expYear = parseInt(expirationYear, 10);

  if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
    alert("The expiration date cannot be in the past");
    return;
  }

  //validate security code (3-4 digits)
  if (!securityCodeRegex.test(securityCode)) {
    alert("Invalid security code");
    return;
  }

  
    //API Validation
  const url = "https://mudfoot.doc.stu.mmu.ac.uk/node/api/creditcard";
  

  fetch(url,{
  method: "post",
  body: JSON.stringify({
    "master_card": cardNumber,
    "exp_year": expirationYear,
    "exp_month": expirationMonth,
    "cvv_code": securityCode
  }),
  headers:{
      "Content-Type": "application/json"
    }
  
  })
    .then((response) =>{
         if (response.status == 200){
             throw "Card Successful!"
         }else if (response.status == 400){
             throw "Bad Data Sent to Server.";
         } else{
             throw "Something Went Wrong.";
         }
        })

       .then((json) =>{
         alert("Card Successful");
          + json["master_card"]
       })

       .catch((error) =>{
         alert(error);
       })
       alert("Payment Confirmed!")

       const maskedCardNumber = "**** **** **** " + cardNumber.slice(-4);
       window.location.href = "success.html?cardNumber=" + encodeURIComponent(maskedCardNumber);
      

      

  //form is valid
  return true; 
  
  

  


}




  

    

    

      

  



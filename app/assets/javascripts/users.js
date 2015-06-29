$(document).ready(function(){
  Stripe.setPublischableKey($('meta[name="stripe-key"]').attr('content'));
  // Watch for a form submission:
  $("#form-submit-btn").click(function(event){
    //prevent form's default behaviour so that it doesn't yet submit
    event.preventDefault();
    //disable button to prevent additional clicks
    $('input[type-submit]').prop('disabled',true);
    var error = false;
    //Grab the values from credit card fields and stores in variables
    var ccNum = $('#card_number').val(),
        cvcNum = $('#card_code').val(),
        expMonth = $('#card_month').val(),
        expYear = $('#card_year').val();
    
    if (!error) {
      //Send card information to Stripe
      //Get the Stripe token:
      Stripe.createToken({
        number: ccNum,
        cvc: cvcNum,
        exp_month: expMonth,
        exp_year: expYear
      }, stripeResponseHandler);
    }
    return false;
    }); //form submission
  
  //Stripe sends back a response which includes a card token
  function stripeResponseHandler(status, response){
    //get a reference to the form:
    var f = $("#new_user");
    
    //get the token from the response:
    var token = response.id;
    
    //add the token to the form:
    f.append('<input type="hidden" name="user[stripe_card_token]" value= "' + token + '" />');
    
    //submit the form:
    //submit the first form, if there are multiple
    f.get(0).submit();
    
  }

  });
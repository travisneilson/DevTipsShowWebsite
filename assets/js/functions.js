$(function(){

  $('.jquerycourse-submit').on('click', function(){

    var $form = $(this).parents('form');

    if(validate($form)) {
      postContactToGoogle($form);
    }

    return false;
  });


});

function postContactToGoogle(f) {

  var email = f.find('.jquerycourse-email').val();
  var name = f.find('.jquerycourse-name').val();

  $.ajax({
    url: "https://docs.google.com/forms/d/1SIdmKl-BQDU1xJXvTi4hCecQRMJj32VzCMRAa12RQK0/formResponse",
    data: {
      "entry_1282118087": email,
      "entry_1037433727": name
    },
    type: "POST",
    dataType: "xml",
    statusCode: {
      0: function() {
        window.location.replace("/jquerycourse/thanks");

      },
      200: function() {
        window.location.replace("/jquerycourse/thanks");
      }
    }
  });
}

function validate(f) {

    // Place ID's of all required fields here.
    var required = ["entry_1037433727", "entry_1282118087"];
    // If using an ID other than #email or #error then replace it here
    var email = f.find('.jquerycourse-email');
    var errornotice = $("#error");
    // The text to show up within a field when it is incorrect
    var emptyerror = "Please type your name.";
    var emailerror = "Please type a valid e-mail.";

    //Validate required fields
    for (i=0;i<required.length;i++) {
      //var input = $(form +' #'+required[i]);
      var input = f.find('#'+required[i]);

      if ((input.val() == "") || (input.val() == emptyerror)) {
        input.addClass("needsfilled");
        input.val(emptyerror);
        errornotice.fadeIn(750);
      } else {
        input.removeClass("needsfilled");
      }
    }
    // Validate the e-mail.
    if (!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email.val())) {
      email.addClass("needsfilled");
      email.val(emailerror);
    }

    // Clears any fields in the form when the user clicks on them
    $(":input").focus(function(){
       if ($(this).hasClass("needsfilled") ) {
        $(this).val("");
        $(this).removeClass("needsfilled");
       }
    });

    //if any inputs on the page have the class 'needsfilled' the form will not submit
    if ($(":input").hasClass("needsfilled")) {
      return false;
    } else {
      errornotice.hide();
      return true;
    }


}


// timo, superhussain, tyrel

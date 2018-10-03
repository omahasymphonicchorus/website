var recaptchaKey = "{{ .Site.Params.recaptchaKey }}";
var applicationId = "{{ .Site.Params.squareApplicationID }}";
var locationId = "{{ .Site.Params.squareLocationID }}";
var server = "{{ .Site.Params.backendURL }}";

$(document).ready(function() {
  grecaptcha.ready(function() {
    grecaptcha.execute(recaptchaKey, {
      action: "homepage"
    });
  });

  $(".datepicker-inline *").click(function(e) {
    e.preventDefault();
    e.stopPropagation();
  });
});

function smoothScroll(node, e) {
  $("html").removeClass("nav-open");
  nowuiKit.misc.navbar_menu_visible = 0;
  setTimeout(function() {
    $toggle.removeClass("toggled");
    $("#bodyClick").remove();
  }, 550);
  $("html, body").animate(
    {
      scrollTop: $($(node).data("target")).offset().top
    },
    1000
  );
}

function smoothFade(nodeOut, nodeIn) {
  $(nodeOut).fadeOut();
  $(nodeIn).fadeIn();
}

function submitContactForm(form, event) {
  event.preventDefault();

  grecaptcha.execute(recaptchaKey, { action: "submit" }).then(function(token) {
    $("#g-recaptcha-response").val(token);
    const formData = {};
    const formElements = Array.from(form);
    formElements.map(input => (formData[input.name] = input.value));

    var submitButton = $(form)
      .find("button[type=submit]")
      .first();
    var origSubmitText = $(submitButton).html();
    $(submitButton).prop("disabled", true);
    $(submitButton).html(
      'Sending... <i class="now-ui-icons loader_refresh spin"></i>'
    );
    $(form)
      .find("input[type=text], textarea")
      .prop("disabled", true);
    $.post(server + "/contact", JSON.stringify(formData), null, "json")
      .done(function() {
        $("#submit-fail").remove();
        $(form)
          .find("input[type=text], textarea")
          .val("");
        $(form)
          .find("button[type=submit]")
          .before(
            '<div id="submit-success" class="form-text text-success">Your message has been sent.</div>'
          );
        setTimeout(function() {
          $("#submit-success").remove();
        }, 5000);
      })
      .fail(function(err) {
        console.log(err);
        $(form)
          .find("button[type=submit]")
          .before(
            '<div id="submit-fail" class="form-text text-danger">Message submission failed: ' +
              err.responseJSON.message +
              "</div>"
          );
      })
      .always(function(data) {
        console.log(data);
        $(submitButton).prop("disabled", false);
        $(submitButton).html(origSubmitText);
        $(form)
          .find("input[type=text], textarea")
          .prop("disabled", false);
      });
  });
}

// Set the application ID

// Set the location ID

/*
 * function: requestCardNonce
 *
 * requestCardNonce is triggered when the "Pay with credit card" button is
 * clicked
 *
 * Modifying this function is not required, but can be customized if you
 * wish to take additional action when the form button is clicked.
 */
function requestCardNonce(event) {
  // Don't submit the form until SqPaymentForm returns with a nonce
  event.preventDefault();

  $(".donation-processing>.success").hide();
  $(".donation-processing>.failure").hide();
  $(".donation-processing>.processing").hide();
  $(".donation-processing").show();
  $(".donation-processing>.processing").fadeIn();
  // Request a nonce from the SqPaymentForm object
  paymentForm.requestCardNonce();
}

// Create and initialize a payment form object
var paymentForm = new SqPaymentForm({
  // Initialize the payment form elements
  applicationId: applicationId,
  locationId: locationId,
  inputClass: "sq-input",

  // Customize the CSS for SqPaymentForm iframe elements
  inputStyles: [
    {
      backgroundColor: "transparent",
      boxShadow: "none",
      color: "#2c2c2c",
      fontFamily: "Helvetica Neue, Arial, sans-serif",
      fontWeight: "300",
      fontSize: ".8571em",
      lineHeight: "normal",
      padding: "10px 18px"
    }
  ],

  // Initialize Apple Pay placeholder ID
  applePay: {
    elementId: "sq-apple-pay"
  },

  // Initialize Masterpass placeholder ID
  masterpass: {
    elementId: "sq-masterpass"
  },

  // Initialize the credit card placeholders
  cardNumber: {
    elementId: "sq-card-number",
    placeholder: "•••• •••• •••• ••••"
  },
  cvv: {
    elementId: "sq-cvv",
    placeholder: "CVV"
  },
  expirationDate: {
    elementId: "sq-expiration-date",
    placeholder: "MM/YY"
  },
  postalCode: {
    elementId: "sq-postal-code"
  },

  // SqPaymentForm callback functions
  callbacks: {
    /*
     * callback function: methodsSupported
     * Triggered when: the page is loaded.
     */
    methodsSupported: function(methods) {
      var applePayBtn = document.getElementById("sq-apple-pay");
      var applePayLabel = document.getElementById("sq-apple-pay-label");
      var masterpassBtn = document.getElementById("sq-masterpass");
      var masterpassLabel = document.getElementById("sq-masterpass-label");

      // Only show the button if Apple Pay for Web is enabled
      // Otherwise, display the wallet not enabled message.
      if (methods.applePay === true) {
        $("#payment-type-tabs").append(
          '<li class="nav-item"><a class="nav-link" id="donate-ap-tab" data-toggle="tab" href="#donate-ap">Apple Pay</a></li>'
        );
        applePayBtn.style.display = "inline-block";
      }
      // Only show the button if Masterpass is enabled
      // Otherwise, display the wallet not enabled message.
      if (methods.masterpass === true) {
        $("#payment-type-tabs").append(
          '<li class="nav-item"><a class="nav-link" id="donate-mp-tap" data-toggle="tab" href="#donate-mp">MasterPass</a></li>'
        );
        masterpassBtn.style.display = "inline-block";
      }
    },

    /*
     * callback function: createPaymentRequest
     * Triggered when: a digital wallet payment button is clicked.
     */
    createPaymentRequest: function() {
      return {
        requestShippingAddress: false,
        requestBillingInfo: false,
        countryCode: "US",
        currencyCode: "USD",
        lineItems: [
          {
            label: "Donation",
            amount: $('#donation-amount input[name="amount"]').val(),
            pending: false
          }
        ],
        total: {
          label: "Omaha Symphonic Chorus",
          amount: $('#donation-amount input[name="amount"]').val(),
          pending: false
        }
      };
    },

    /*
     * callback function: validateShippingContact
     * Triggered when: a shipping address is selected/changed in a digital
     *                 wallet UI that supports address selection.
     */
    validateShippingContact: function(contact) {
      var validationErrorObj;
      /* ADD CODE TO SET validationErrorObj IF ERRORS ARE FOUND */
      return validationErrorObj;
    },

    /*
     * callback function: cardNonceResponseReceived
     * Triggered when: SqPaymentForm completes a card nonce request
     */
    cardNonceResponseReceived: function(
      errors,
      nonce,
      cardData,
      billingContact,
      shippingContact
    ) {
      console.log(cardData);
      console.log(billingContact);
      console.log(shippingContact);
      if (errors) {
        $(".donation-processing>.failure>.message").html(
          errors.map(function(error) {
            return error.message + "<br/>";
          })
        );
        smoothFade(
          $(".donation-processing>.processing"),
          $(".donation-processing>.failure")
        );
        return;
      }

      var donationData = {
        amount: $("#donation-amount-field").val(),
        nonce: nonce,
        name: $("#donation-name").val(),
        street: $("#donation-address").val(),
        city: $("#donation-city").val(),
        state: $("#donation-state").val(),
        zip: cardData.billing_postal_code,
        email: $("#donation-email").val(),
        phone: $("#donation-phone").val(),
        note: $("#donation-note").val()
      };

      if(cardData.digital_wallet_type === "NONE") {
        donationData.zip = cardData.billing_postal_code;
      } else {
        donationData.zip = billingContact.postalCode;
      }

      /* validate inputs */
      errs = [];
      if (!validator.isCurrency(donationData.amount)) {
        errs.push("Invalid donation amount.");
      }
      if (validator.isEmpty(donationData.name)) {
        errs.push("Please enter a name.");
      }
      if (validator.isEmpty(donationData.street)) {
        errs.push("Please enter a billing street address.");
      }
      if (validator.isEmpty(donationData.city)) {
        errs.push("Please enter a valid billing city.");
      }
      if (validator.isEmpty(donationData.state)) {
        errs.push("Please enter a valid billing state.");
      }
      if (!validator.isPostalCode(donationData.zip, "US")) {
        errs.push("Please enter a valid billing zip code.");
      }
      if (!validator.isEmail(donationData.email)) {
        errs.push("Please enter a valid email address.");
      }

      if (errs.length) {
        $(".donation-processing>.failure>.message").html(
          errs.map(function(error) {
            return error + "<br/>";
          })
        );
        smoothFade(
          $(".donation-processing>.processing"),
          $(".donation-processing>.failure")
        );
        return;
      }

      $.post(
        server + "/process-donation",
        JSON.stringify(donationData),
        null,
        "json"
      )
        .done(function() {
          $("#donation-amount-field").val(50);
          $("#donation-name").val("");
          $("#donation-address").val("");
          $("#donation-city").val("");
          $("#donation-state").val("");
          $("#donation-email").val("");
          $("#donation-phone").val("");
          $("#donation-note").val("");
          smoothFade(
            $(".donation-processing>.processing"),
            $(".donation-processing>.success")
          );
          setTimeout(function() {
            $(".donation-processing").hide();
            $("#donation-form").modal("hide");
            $("#donation-form").on("hidden.bs.modal", function() {
              $(".donation-processing").hide();
            });
          }, 5000);
        })
        .fail(function(err) {
          const serverError = JSON.parse(err.responseJSON.response.text);
          $(".donation-processing>.failure>.message").html(
            serverError.errors.map(function(error) {
              return error.detail + "<br/>";
            })
          );
          smoothFade(
            $(".donation-processing>.processing"),
            $(".donation-processing>.failure")
          );
        })
        .always(function(data) {});
    },

    /*
     * callback function: unsupportedBrowserDetected
     * Triggered when: the page loads and an unsupported browser is detected
     */
    unsupportedBrowserDetected: function() {
      /* PROVIDE FEEDBACK TO SITE VISITORS */
    },

    /*
     * callback function: inputEventReceived
     * Triggered when: visitors interact with SqPaymentForm iframe elements.
     */
    inputEventReceived: function(inputEvent) {
      switch (inputEvent.eventType) {
        case "focusClassAdded":
          /* HANDLE AS DESIRED */
          break;
        case "focusClassRemoved":
          /* HANDLE AS DESIRED */
          break;
        case "errorClassAdded":
          /* HANDLE AS DESIRED */
          break;
        case "errorClassRemoved":
          /* HANDLE AS DESIRED */
          break;
        case "cardBrandChanged":
          /* HANDLE AS DESIRED */
          break;
        case "postalCodeChanged":
          /* HANDLE AS DESIRED */
          break;
      }
    },

    /*
     * callback function: paymentFormLoaded
     * Triggered when: SqPaymentForm is fully loaded
     */
    paymentFormLoaded: function() {
      /* HANDLE AS DESIRED */
    }
  }
});

$("#donation-form").on("hidden.bs.modal", function(e) {
  paymentForm.recalculateSize();
});

$('input[type="radio"][name="amount-btn"]').on("change", function(e) {
  if (e.target.value === "other") {
    $('#donation-amount input[name="amount"]').val("");
    $('#donation-amount, #donation-amount input[name="amount"]').attr(
      "disabled",
      false
    );
  } else {
    $('#donation-amount input[name="amount"]').val(e.target.value);
    $('#donation-amount, #donation-amount input[name="amount"]').attr(
      "disabled",
      true
    );
  }
});

$("#dismiss-donation-failure").click(function() {
  $(".donation-processing>.failure").hide();
  $(".donation-processing").hide();
});

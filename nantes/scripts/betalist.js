// IMPORTANT: DO NOT HOST THIS FILE ON YOUR OWN SERVER.
// This script is dynamically generated.

var MyBetaList =
{
  // Properties
  isSubmitted: false,
  defaultEmailAddress: 'email@exemple.com',
  referral: null,
  emailRegex: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i,
  url: null,

  init: function()
  {
    // Check if HEAD and BODY are present
    if(document.getElementsByTagName('head').length == 0 || document.getElementsByTagName('body') == 0)
    {
      alert('Please make sure your page has at least a HEAD and BODY element or My Beta List will not work.');
      // @TODO: create HEAD and BODY elements
    }


      MyBetaList.getScript('https://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js', function() { MyBetaList.checkUser(); } );

  },

  checkUser: function()
  {
    // Ensure there's no jQuery conflict
    jQuery.noConflict();

    if(MyBetaList.url == null)
    {
      // Retrieve location href (without the referral parameter)
      if(window.location.href.indexOf('?') != -1)
        MyBetaList.url = window.location.href.substring(0, window.location.href.indexOf('?'));
      else
        MyBetaList.url = window.location.href;
    }

    // Rename myself so the actual widget can be called #MyBetaList (easier for custom CSS)
    jQuery('#MyBetaList').attr('id', 'MyBetaList-js');

    // Check if returning subscriber
    if(false)
    {
      // Show step 2
      MyBetaList.showStep2(MyBetaList.url+'?r=');
    }
    else
    {
      // New subscriber, set up form
      MyBetaList.setupForm();
    }
  },

  showStep2: function()
  {
    // Hide step 1
    jQuery('#MyBetaList-step1').hide();

    // Show step 2
    jQuery('#MyBetaList-step2').show();
  },

  setupForm: function()
  {
    // Retrieve referral code
    MyBetaList.retrieveReferral();

    // Set default email address
    jQuery('#MyBetaList-email').val(MyBetaList.defaultEmailAddress);

    // Empty email field on focus
    jQuery('#MyBetaList-email').live('focus', function(event) {
      if(jQuery('#MyBetaList-email').val() == MyBetaList.defaultEmailAddress)
        jQuery('#MyBetaList-email').val('');
    });

    // Set back default email address on empty blur
    jQuery('#MyBetaList-email').live('blur', function(event) {
      if(jQuery.trim(jQuery('#MyBetaList-email').val()) == '')
        jQuery('#MyBetaList-email').val(MyBetaList.defaultEmailAddress);
    });

    // Handle form submission
    jQuery('#MyBetaList-form').live('submit', function(event) {

      // Prevent actual submission
      event.preventDefault();

      // Only handle a correct submission
      if(
        MyBetaList.isSubmitted ||                                               // check if form hasn't been submitted before
        jQuery('#MyBetaList-email').val() == MyBetaList.defaultEmailAddress ||  // check if it's not the default email address
        jQuery.trim(jQuery('#MyBetaList-email').val()) == '' ||                       // check if email address isn't empty
        !MyBetaList.emailRegex.test(jQuery('#MyBetaList-email').val())           // check if it's indeed a valid email address
      )
      {
        // Don't submit the form
      }
      else
      {
        // Disable form
        MyBetaList.isSubmitted = true;
        jQuery('input', this).attr('disabled', 'disabled');
        jQuery('#MyBetaList-submit').val('Chargement...')

        // Set up JSON paramaters
        params = {
          token:            "2gwo0pcd6",
          referrer_token:   MyBetaList.referral,
          email:            jQuery('#MyBetaList-email').val(),
          location:         MyBetaList.url
        };

        // Send email address
        // @TODO: Use callback? (XSS)
        // jQuery.getJSON('https://my.betali.st/subscribe?callback=?', params, function(data) {
        //   if(data.result)
        //   {
        //     // Show step 2
        //     MyBetaList.showStep2(data.result);
        //   }
        //   else
        //   {
        //     // Something went wrong (e.g. non-existing token)
        //     alert('Whoops. Couldn\'t add new subscriber. Please contact site owner.');
        //   }
        // });
        jQuery.getJSON('https://my.betali.st/subscribe?callback=?', params, function() {});
        setTimeout(function() {
          MyBetaList.showStep2();
        }, 2000);
      }

    });
  },

  // @TODO: Simplify code
  retrieveReferral: function()
  {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
    }

    MyBetaList.referral = vars['r'];
  },

  getScript: function(url, success)
  {
    var script = document.createElement('script');
    script.src = url;

    var head = document.getElementsByTagName('head')[0],
    done = false;

    // Attach handlers for all browsers
    script.onload = script.onreadystatechange = function() {

      if (!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
        done = true;

        // callback function provided as param
        success();

        script.onload = script.onreadystatechange = null;
        head.removeChild(script);
      };
    };
    head.appendChild(script);
  }

};

MyBetaList.init();

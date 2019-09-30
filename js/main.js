(async function($) {
  "use strict";

  // Preloader (if the #preloader div exists)
  $(window).on("load", function() {
    if ($("#preloader").length) {
      $("#preloader")
        .delay(100)
        .fadeOut("slow", function() {
          $(this).remove();
        });
    }
  });

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function() {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  // Initiate the wowjs animation library
  new WOW().init();

  // Header scroll class
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $("#header").addClass("header-scrolled");
    } else {
      $("#header").removeClass("header-scrolled");
    }
  });

  if ($(window).scrollTop() > 100) {
    $("#header").addClass("header-scrolled");
  }

  // Smooth scroll for the navigation and links with .scrollto classes
  $(".main-nav a, .mobile-nav a, .scrollto").on("click", function() {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      if (target.length) {
        var top_space = 0;

        if ($("#header").length) {
          top_space = $("#header").outerHeight();

          if (!$("#header").hasClass("header-scrolled")) {
            top_space = top_space - 40;
          }
        }

        $("html, body").animate(
          {
            scrollTop: target.offset().top - top_space
          },
          1500,
          "easeInOutExpo"
        );

        if ($(this).parents(".main-nav, .mobile-nav").length) {
          $(".main-nav .active, .mobile-nav .active").removeClass("active");
          $(this)
            .closest("li")
            .addClass("active");
        }

        if ($("body").hasClass("mobile-nav-active")) {
          $("body").removeClass("mobile-nav-active");
          $(".mobile-nav-toggle i").toggleClass("fa-times fa-bars");
          $(".mobile-nav-overly").fadeOut();
        }
        return false;
      }
    }
  });

  // Navigation active state on scroll
  var nav_sections = $("section");
  var main_nav = $(".main-nav, .mobile-nav");
  var main_nav_height = $("#header").outerHeight();

  $(window).on("scroll", function() {
    var cur_pos = $(this).scrollTop();

    nav_sections.each(function() {
      var top = $(this).offset().top - main_nav_height,
        bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        main_nav.find("li").removeClass("active");
        main_nav
          .find('a[href="#' + $(this).attr("id") + '"]')
          .parent("li")
          .addClass("active");
      }
    });
  });

  Handlebars.registerHelper("trimString", function(passedString) {
    var theString = passedString.substring(0, 150);
    return new Handlebars.SafeString(theString + "...");
  });
  var source = document.getElementById("event-template").innerHTML;
  var template = Handlebars.compile(source);
  var context = {
    events: [{ title: "My New Post", description: "This is my first post!" }]
  };

  function getEvents() {
    const url =
      "https://www.eventbriteapi.com/v3/organizers/14833371820/events/?order_by=start_asc&status=live&token=VWRIB755IRCY2HEBO6XH";
    const request = new Request(url);
    return fetch(request)
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Something went wrong on api server!");
        }
      })
      .catch(error => {
        console.error(error);
      });
  }
  const data = await getEvents();
  const events = data.events.map(event => {
    return {
      title: event.name.text,
      description: event.description.text,
      url: event.url,
      image: event.logo.original.url
    };
  });
  var html = template({ events });
  $("#services > .container > .row").append(html);
})(jQuery);

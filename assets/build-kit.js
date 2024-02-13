jQuery(document).ready(function () {
  // Product Desktop Tabs
  jQuery("#desktop-tabs a").on("click", function () {
    if (jQuery(this).hasClass("active")) {
      return false;
    }

    let tabId = jQuery(this).attr("href");

    // Tabs active state
    jQuery("#desktop-tabs a").removeClass("active");
    jQuery(this).addClass("active");

    // accordion heading styles
    jQuery("#product-tabs h2").removeClass("active");
    jQuery('#product-tabs h2[data-content-id="' + tabId + '"]').addClass(
      "active"
    );

    // content active state
    jQuery(".tab-content").removeClass("show");
    jQuery(tabId).addClass("show");

    return false;
  });

  if (window.location.hash) {
    var hash = window.location.hash;
    console.log(hash);
    jQuery(".faq-tabs a").removeClass("active");
    jQuery('.faq-tabs a[href="' + hash + '"]').addClass("active");
    jQuery(".faq-listing").hide(0);
    jQuery(hash).show(0);

    $("html, body").animate(
      {
        scrollTop: $(".faq-tabs").offset().top - 100,
      },
      900,
      "swing"
    );
  }

  jQuery(".faq-tabs").on("click", "a", function () {
    jQuery(".faq-tabs a").removeClass("active");
    jQuery(this).addClass("active");
    jQuery(".faq-listing").hide(0);
    jQuery(jQuery(this).attr("href")).show(0);
    history.pushState({}, "", jQuery(this).attr("href"));
    return false;
  });

  // Mobile Accordion
  jQuery("#product-tabs h2").on("click", function () {
    if (jQuery(this).hasClass("active")) {
      return false;
    }
    let tabId = jQuery(this).attr("data-content-id");
    jQuery('#desktop-tabs a[href="' + tabId + '"]').trigger("click");
  });

  if ($("button[name=add]").is(":disabled")) {
    jQuery("span[data-add-to-cart-text]").text(
      jQuery("#selected-stencils .empty").length + " Selections Remaining"
    );
  }
  
// ****************************  Stencil add functionality ***************************************

  jQuery("#stencil-products-listings li").on("click", function () {
    var productName = jQuery(this).data("product-name");
    console.log(productName);
    var stencil = jQuery(this).html();
    var classCheck = $(this).hasClass("selected_stencil")
    console.log(classCheck);
    if (jQuery("#selected-stencils .empty:first").length > 0) {
        jQuery("#selected-stencils .empty:first")
          .append(stencil)
          .removeClass("empty")
          .addClass("active");
        jQuery(this).addClass("selected_stencil");
        jQuery("#selected-stencils-kit input.empty:first")
          .val(productName)
          .removeClass("empty")
          .addClass("active");
        
      	var screenWidth = window.innerWidth;
      
      	if(screenWidth > 1023) {
          if(jQuery("#selected-stencils .empty").length == 3) {
            document.querySelector('.flickity-slider').style.transform = 'translateX(-100%)'
          }
        } else if(screenWidth <= 1023 && screenWidth > 580) {
          if(jQuery("#selected-stencils .empty").length == 4) {
            document.querySelector('.flickity-slider').style.transform = 'translateX(-99.99%)';
            document.querySelector('.flickity-slider .prod-wrap:nth-child(4)').style.transform = 'translateX(300%)';
          } else if(jQuery("#selected-stencils .empty").length == 2) {
            document.querySelector('.flickity-slider').style.transform = 'translateX(-166.65%)'
          }
        } else {
          
          var emptyLength = jQuery("#selected-stencils .empty").length;
          switch (emptyLength) { 

            case 6: 
              document.querySelector('.flickity-slider').style.transform = 'translateX(-100%)'
              break;
            case 5: 
              document.querySelector('.flickity-slider').style.transform = 'translateX(-200%)'
              break;
            case 4: 
              document.querySelector('.flickity-slider').style.transform = 'translateX(-300%)'
              break;
            case 3: 
              document.querySelector('.flickity-slider').style.transform = 'translateX(-400%)'
              break;
            case 2: 
              document.querySelector('.flickity-slider').style.transform = 'translateX(-500%)'
              break;
            case 1: 
              document.querySelector('.flickity-slider').style.transform = 'translateX(-600%)'
              break;
            case 0: 
              document.querySelector('.flickity-slider').style.transform = 'translateX(-700%)'
              break;
            default:
              console.log(jQuery("#selected-stencils .empty").length);
          }
        }
         
    } else {
      alert("You have already selected the maximum stencils.");
    }
        
    if (jQuery("#selected-stencils .empty").length == 0) {
      jQuery("span[data-add-to-cart-text]").text("Add to Cart");
      jQuery("button[name=add]").removeAttr("disabled");
    } else {
      jQuery("button[name=add]").attr("disabled", true);
      jQuery("span[data-add-to-cart-text]").text(
        jQuery("#selected-stencils .empty").length + " Remaining"
      );
    }
    jQuery("#leftCount").text(
      jQuery("#selected-stencils .active").length 
  	);
    return false;
  });

  
  // ****************************  Stencil filter functionality ***************************************
  
  jQuery(document).on("change", "#stencil-kit-filters", function () {
    var selectedValue = jQuery(this).val();
    jQuery("#stencil-products-listings").removeClass().addClass(selectedValue);
  });
  
  jQuery(document).on("click", "#product-filters a", function (e) {
    e.preventDefault();
    var filterName = $(this).data("selected")
    console.log(filterName);
    $("#product-filters a").removeClass();
    $(this).addClass("active");
    $("#stencil-products-listings").removeClass().addClass(filterName);
  });
  
  // ****************************  Stencil remove functionality ***************************************
  
  jQuery(document).on("click", "#selected-stencils button", function () {
    var removeStencilId = jQuery(this).data("stencil-id");
    var prodName = jQuery("#" + removeStencilId).find('span:last-child').text();
    var listElm = $("#stencil-products-listings").find("[data-product-name='"+prodName+"']");                  
                         
    jQuery("#" + removeStencilId)
      .removeClass("active")
      .addClass("empty")
      .find("span")
      .remove();
    jQuery("#final_" + removeStencilId)
      .val("")
      .removeClass("active")
      .addClass("empty");
      
    var prodCheckSelect = $("#selected-stencils .active").find("[data-product='"+prodName+"']");
    console.log(prodCheckSelect.length);  
    
    if(prodCheckSelect.length == 0){
    	listElm.removeClass("selected_stencil");
    }
    
    if (jQuery("#selected-stencils .empty").length == 0) {
      jQuery("span[data-add-to-cart-text]").text("Add to Cart");
      jQuery("button[name=add]").removeAttr("disabled");
    } else {
      jQuery("button[name=add]").attr("disabled", true);
      jQuery("span[data-add-to-cart-text]").text(
        jQuery("#selected-stencils .empty").length + " Remaining"
      );
    }
    jQuery("#leftCount").text(
      jQuery("#selected-stencils .empty").length 
  	);
  });

  jQuery(document).on("click", "#canvas-viewer", function () {
    jQuery("#product-canvas-inner-wrapper").toggle(0);
    var buttonText = jQuery("#product-canvas-inner-wrapper").is(":visible")
      ? "Hide Selections"
      : "View Selections";
    jQuery(this).text(buttonText);
  });
  jQuery(document).on("click", ".add-to-cart-clone", function () {
    jQuery(".product-form").submit();
  });

  /* Add to cart - ends */

  jQuery("form.grid-add-cart-btn").each(function () {
    jQuery(this).on(
      "submit",
      function (evt) {
        evt.preventDefault();
        const variantID = jQuery(this).find("input[name=id]").val();
        $.ajax({
          type: "POST",
          url: "/cart/add.js",
          dataType: "json",
          data: { quantity: 1, id: variantID },
          success: function (response) {
            var currentCount = parseInt(
              $.trim(jQuery("span[data-cart-count]").text())
            );
            currentCount += 1;
            jQuery("span[data-cart-count]").text(currentCount);
            jQuery("#CartCount").removeClass("hide");
            jQuery(".cart-notification[data-variant-id=" + variantID + "]")
              .text("Added")
              .fadeIn(0)
              .delay(3000)
              .fadeOut(0);
          },
          error: function (error) {
            //Report errors
            alert(error);
          },
        });
      }.bind(this)
    ); // form on click ends
  });

  /* Add to cart - ends */
});

document.addEventListener("DOMContentLoaded", function() {
  // header js 
  document.querySelector('.header ul.mega-menu__list.page-width li:first-child .mega_menu_clickable').classList.add('active');

  document.querySelectorAll('.mega_menu_innerClick--active').forEach(function(item) {
    item.addEventListener('click', function() {
      document.querySelectorAll('.mega_menu_clickable').forEach(function(element) {
        element.classList.remove('active');
      });
      this.closest('.mega_menu_clickable').classList.add('active');
    });
  });

  document.querySelectorAll('.menu-drawer__menu li').forEach(function(item) {
    item.addEventListener('click', function() {
      document.querySelectorAll('.menu-drawer__menu li').forEach(function(element) {
        element.classList.remove('current');
      });
      this.classList.add('current');
    });
  });

  // Add Review Box on Collection page
  function addMarketingBanners() {
    var gridBlockAll = document.querySelectorAll('.collection-grid-content .grid-item-block');
    var gridCount = 0;

    gridBlockAll.forEach(function(item) {
      var blockID = item.id;
      var existingBlock = document.querySelector(".collection-grid__items #" + blockID);
      
      if (existingBlock) {
        existingBlock.remove();
      }
    });

    gridBlockAll.forEach(function(item) {
      var blockID = item.id;
      var position = parseInt(item.getAttribute('data-order'));

      if (position == 1) {
        if (document.querySelector(".collection-grid__items .grid-item__index__" + position) === null) {
          document.querySelector(".collection-grid__items .grid__item:last-child").before(item);
        } else {
          document.querySelector(".collection-grid__items .grid-item__index__" + position).before(item);
        }
      } else {
        if (position > 1) {
          position = position - 1;
        }
        if (document.querySelector(".collection-grid__items .grid-item__index__" + position) === null) {
          document.querySelector(".collection-grid__items .grid__item:last-child").after(item);
        } else {
          document.querySelector(".collection-grid__items .grid-item__index__" + position).after(item);
        }
      }

      function equalHeightBlock() {
        var gridElement = document.querySelector('.collection-grid__items .grid-item__index__' + position + ' .grid-product__wrapper__inner');
        if (gridElement) {
          var gridHeight = gridElement.offsetHeight;
          
          document.querySelectorAll('.collection-grid__items .grid__item').forEach(function(element) {
            element.style.height = gridHeight + "px";
          });
        }
      }      

      equalHeightBlock();

      gridCount++;
    });
  }

  addMarketingBanners();

  // FAQ Product Accordion 
  var acc = document.getElementsByClassName("frequently-accordian-btn");
  var currentlyOpenPanel = null;

  for (var i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
      // Remove "active" class from all elements
      for (var j = 0; j < acc.length; j++) {
        acc[j].classList.remove("active");
      }
      this.classList.toggle("active");

      var panel = this.nextElementSibling;

      if (currentlyOpenPanel && currentlyOpenPanel !== panel) {
        currentlyOpenPanel.style.maxHeight = null;
      }
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
        currentlyOpenPanel = null;
        this.classList.remove("active");
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
        currentlyOpenPanel = panel;
      }
    });
  }

  // FAQ Accordion JS 
  var accordionItems = document.querySelectorAll('.tr-accordion-item');

  accordionItems.forEach(function(item) {
    var button = item.querySelector('button');
    var content = item.querySelector('.tr-accordion-content');

    button.addEventListener('click', function() {
      accordionItems.forEach(function(accItem) {
        if (accItem !== item) {
          accItem.classList.remove('active');
          accItem.querySelector('.tr-accordion-content').style.maxHeight = null;
        }
      });

      item.classList.toggle('active');
      if (item.classList.contains('active')) {
        content.style.maxHeight = content.scrollHeight + "px";
      } else {
        content.style.maxHeight = null;
      }
    });
  });

  // Get all elements with the class 'mnt-ac'
  var mntACLinks = document.querySelectorAll('.mnt-ac');

  function removeAllActive() {
    mntACLinks.forEach(function(link) {
      link.classList.remove('active');
    });
  }

  function handleClick(event) {
    event.preventDefault();
    removeAllActive();
    var clickedElement = event.target;
    clickedElement.classList.add('active');
    var targetId = clickedElement.getAttribute('href').substring(1);
    var targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth'
      });
    }
  }

  mntACLinks.forEach(function(link) {
    link.addEventListener('click', handleClick);
  });
});


// Wait for the document to be ready
document.addEventListener('DOMContentLoaded', function() {
  var menuIcon = document.querySelector('.header__icon--menu span');
  var listMenu = document.querySelector('.header .menu-drawer__navigation > .list-menu');
  var firstMenuItem = document.querySelector('.header .menu-drawer__navigation > .list-menu li:first-child');
  var firstMenuItemDiv = document.querySelector('.header .menu-drawer__navigation > .list-menu li:first-child > div');
  var firstMenuItemLink = document.querySelector('.header .menu-drawer__navigation > .list-menu li:first-child .list-menu__item');

  if (menuIcon && listMenu && firstMenuItem && firstMenuItemDiv && firstMenuItemLink) {
    menuIcon.addEventListener('click', function() {
      listMenu.classList.add('submenu-open');
      firstMenuItem.classList.add('current');
      firstMenuItemDiv.classList.add('menu-opening');
      firstMenuItemLink.setAttribute('aria-expanded', 'true');
    });
  }
});

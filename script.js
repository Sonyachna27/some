const allContentBlocks = Array.from(document.querySelectorAll('.stage__container-wrap-content'));
const allStageLinks = Array.from(document.querySelectorAll('.stage__container-wrap-list-item'));
const rightArrow = document.querySelector('.right');
const LeftArrow = document.querySelector('.left');
let currentIndex = 0;
let frontBlockId = "stage-first";
const tabsLinks = document.querySelectorAll('.stage__container-wrap-list-item');
function addTabsActive () {
    tabsLinks.forEach((button, index) => {
      button.addEventListener('click', () => {
        tabsLinks.forEach((otherButton) => {
          otherButton.classList.remove('active');
        });
        button.classList.add('active');
        showContent(button.dataset.name, index);
      });
    });
  }
addTabsActive ();
function updateActiveTab(index) {
   
    tabsLinks.forEach((button, i) => {
        if (i === index) {
            button.classList.add('active'); 
        } else {
            button.classList.remove('active'); 
        }
    });
}

function changeSlide(blockId) {
    allContentBlocks.forEach((block, index) => {
        if (block.getAttribute('id') === blockId) {
            block.style.display = 'flex';
            block.style.opacity = 1;
            currentIndex = index;
        } else {
            block.style.opacity = 0;
            block.style.display = 'none';
        }
    });
    frontBlockId = blockId;
}

function animate(itemName) {
    const duration = 1000;
    const startTimestamp = performance.now();
    
    const item = document.getElementById(itemName);

    function step(timestamp) {
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        item.style.opacity = progress;
        if (progress < 1) {
            requestAnimationFrame(step);
        }
    }
    requestAnimationFrame(step);
}

function slideArrowsClick(direction) {
    let newIndex;
    if (direction === 'left') {
        newIndex = currentIndex === 0 ? allContentBlocks.length - 1 : currentIndex - 1;
    } else {
        newIndex = currentIndex === allContentBlocks.length - 1 ? 0 : currentIndex + 1;
    }
    const newItemName = allContentBlocks[newIndex].getAttribute('id');
    showContent(newItemName, newIndex);
}
function showContent(itemName, index) {
    animate(itemName);
    changeSlide(itemName, index);
    updateActiveTab(index);
}
addTabsActive();
showContent(frontBlockId, 0);





const codingTabs = document.querySelectorAll('.item.has-child');
const codingTabsLink = document.querySelectorAll('.link');
const subMenu = document.querySelectorAll('.coding__container-panel-nav ul li.sub-menu')
function animateCoding(item) {
    const duration = 300;
    const startTimestamp = performance.now();
    const isOpen = item.style.height !== '0px';

    function step(timestamp) {
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentHeight = isOpen ? (1 - progress) * item.scrollHeight : progress * item.scrollHeight;
        item.style.height = currentHeight + 'px';

        if (progress < 1) {
            requestAnimationFrame(step);
        }
    }
    requestAnimationFrame(step);
}
function showAnimation() {
    codingTabs.forEach((button) => {
        button.addEventListener('click', () => {
            const subMenu = button.querySelector('.sub-menu');
           animateCoding(subMenu);
         });
    });
}
showAnimation();

document.addEventListener('DOMContentLoaded', () => {
    const subMenus = document.querySelectorAll('.sub-menu');
    subMenus.forEach(subMenu => {
        const hasActiveItem = subMenu.querySelector('.active-item') !== null;
        if (!hasActiveItem) {
            subMenu.style.height = '0px';  
        }
    });
});

function activeClassLink(){
    const currentURL = window.location.href;
    const currentPage = currentURL.substring(currentURL.lastIndexOf('/') + 1);
   
    codingTabsLink.forEach((activeLink) => {
        const targetBlockId = activeLink.getAttribute('href');
        console.log(currentPage === targetBlockId);
        if (currentPage === targetBlockId) {
            activeLink.parentNode.classList.add('active-item');
        } else {
            activeLink.parentNode.classList.remove('active-item');
        }
    });
}

activeClassLink();













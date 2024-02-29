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


const codingTabs = document.querySelectorAll('.item');
const firstBlock = "coding-1-1";
const contentBlocks = Array.from(document.querySelectorAll('.coding__container-content'));
const codingTabsLink = document.querySelectorAll('.link');

function animateCoding(item, isExpanding) {
    const duration = 300;
    const startTimestamp = performance.now();
    item.style.height = isExpanding ? '0' : item.scrollHeight + 'px';
    function step(timestamp) {
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentHeight = isExpanding ? progress * item.scrollHeight : (1 - progress) * item.scrollHeight;
        item.style.height = currentHeight + 'px';
       
        if (progress < 1) {
            requestAnimationFrame(step);
        }
    }

    requestAnimationFrame(step);
}

function animateCodingContent(targetBlock) {
    const duration = 1000;
    const startTimestamp = performance.now();

    function step(timestamp) {
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        targetBlock.style.opacity = progress;
        if (progress < 1) {
            requestAnimationFrame(step);
        }
    }
    requestAnimationFrame(step);
}

function addCodingTabsActive() {
    codingTabs.forEach((button) => {
        button.addEventListener('click', () => {
            const hasChildItem = button.classList.contains('has-child');
            if (hasChildItem) {
                const submenu = button.querySelector('.sub-menu');
                if (submenu && !event.target.classList.contains('link')) {
                    const isActive = button.classList.contains('active');
                    button.classList.toggle('active', !isActive);
                    animateCoding(submenu, !isActive);
                }
            } else{
                codingTabs.forEach((otherButton) => {
                    otherButton.classList.remove('active-item');
                  });
                button.classList.add('active-item');  
            }
            
        });
    });
}

addCodingTabsActive();



function showCodingContent(firstBlock) {
    const contentBlocks = document.querySelectorAll('.coding__container-content');
    const targetBlock = document.getElementById(firstBlock);

    contentBlocks.forEach((block) => {
        if (block.id === firstBlock) {
            block.style.display = 'block';
            block.style.opacity = 0; 
            animateCodingContent(block);
        } else {
            block.style.display = 'none';
            block.style.opacity = 0; 
        }
    });

    codingTabsLink.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetBlockId = link.getAttribute('href').substring(1);
            const targetBlock = document.getElementById(targetBlockId);

            contentBlocks.forEach((block) => {
                if (block.id === targetBlockId) {
                    block.style.display = 'block';
                    animateCodingContent(block); 
                } else {
                    block.style.display = 'none';
                }
            });
        });
    });
}

showCodingContent(firstBlock);








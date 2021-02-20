
const scrollAnimate= {
    run(){
        window.addEventListener('scroll',() => {
            const heightScroll = pageYOffset;
            this.fixedMenu(heightScroll);
            this.showScrollTopBtn(heightScroll);
            this.menuScroll(heightScroll);
            this.animationPartItem(heightScroll);
        })
    },
    //Method fixed menu when scroll
    fixedMenu(heightScroll){
        const header = document.querySelector('header');
        return heightScroll ? header.classList.add('fixed') : header.classList.remove('fixed');
    },
    // Method show Button to Top affter scroll
    showButton(heightScroll){
        const scrollTopBtn = document.querySelector('.scrollUp');
        const heightScreen = screen.height;
        return heightScroll > heightScreen ? scrollTopBtn.classList.add('showScrollTopBtn') : scrollTopBtn.classList.remove('showScrollTopBtn');
    },

    showScrollTopBtn(heightScroll){
        const scrollTopBtn = document.querySelector('.scrollUp'); //get Class Scroll Up Button
        let heightScreen = screen.height;
        return heightScroll > heightScreen ? scrollTopBtn.classList.add('showScrollTopBtn') : scrollTopBtn.classList.remove('showScrollTopBtn');
    },

    menuScroll(heightScroll){
        const navbarItems = document.querySelectorAll('.navbar__item');
    
        offsetsTop().rangeTops.map((rangeTop, index) => {
            if(heightScroll < navbarItems[0].offsetTop){
                navbarItems[0].classList.add('active');
            }else{
                if(heightScroll >= rangeTop){
                    index >= 1 ? navbarItems[index-1].classList.remove('active') : navbarItems[4].classList.remove('active');
                    return navbarItems[index].classList.add('active');
                }else{
                    return navbarItems[index].classList.remove('active');
                };
            };
        })
    },
    
    animationPartItem(heightScroll){
        //Add Class 'motionX' or 'motionY' in animate Elements
        const getX_MotionItems = document.querySelectorAll('.motionX');
        const getY_MotionItems = document.querySelectorAll('.motionY');

        offsetsTop().rangeTops.map((rangeTop, index) => {
            if(heightScroll > (rangeTop - offsetsTop().offsetParts[index] - 196)){
                switch(index){
                    case 0:
                        addClassScrollX(getX_MotionItems, 0, 1);
                        break;
                    case 1:
                        addScrollY(getY_MotionItems);
                        break;
                    case 2: 
                        removeScrollY(getY_MotionItems);
                        addClassScrollX(getX_MotionItems, 2, 3);
                        break;
                    case 3:
                        addClassScrollX(getX_MotionItems, 4, 5);
                        break;
                    case 4:
                        addClassScrollX(getX_MotionItems, 6, 7);
                        break;
                }
            }
        })
    }
}

start();

function start(){
    scrollAnimate.run();
}

function scrollToTop(){
    window.scrollTo({top: 0, behavior: 'smooth'});
}


function offsetsTop(){
    const section = document.querySelectorAll('section');
    const footer = document.querySelectorAll('footer');
    const bodyChildElements = [...section, ...footer];

    let rangeTops = [];
    let offsetParts = [];

    for (let index = 0; index < bodyChildElements.length; index++) {
        rangeTops[index] = bodyChildElements[index].offsetTop - 196;
        offsetParts[index] = bodyChildElements[index].offsetHeight;
    }
    return {
        rangeTops,
        offsetParts
    }
}

function addClassScrollX(elements, positionLeft, positionRight) {
    // removeClassScrollX(elements);
    elements[positionLeft].classList.add('inMotionLeft');
    elements[positionRight].classList.add('inMotionRight');
}

function removeClassScrollX(elements){
    for (let index = 0; index < elements.length; index++) {
         index % 2 === 0 ? elements[index].classList.remove('inMotionLeft') : elements[index].classList.remove('inMotionRight');    
    }
}

function addScrollY(elements){
    // removeScrollY(elements);
    for (let index = 0; index < elements.length; index++) {
        elements[index].style.animationDelay = index * 0.25 + 's';
        elements[index].classList.add('downMotion');
    }
}

function removeScrollY(elements){
    for (let index = 0; index < elements.length; index++) {
        elements[index].style.animationDelay = 0;
        elements[index].classList.remove('downMotion');
    }
}


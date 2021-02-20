const scrollAnimate = {
    run(){
        window.addEventListener('scroll', () => {
            const heightScroll = pageYOffset;
            this.showButton(heightScroll);
            this.menuAnimation(heightScroll);
            // this.fixedBody();
        })
    },
    
    //click btn to Top => scroll to Top
    scrollToTop(){
        window.scrollTo({top: 0, behavior: 'smooth'});
    },

    // Method show Button to Top affter scroll
    showButton(heightScroll){
        const heightScreen = screen.height;

        domElement.get('.scrollUp').onclick = () =>{
            window.scrollTo({top: 0, behavior: 'smooth'});
        };

        heightScroll > heightScreen ? domElement.add('.scrollUp', 'showScrollTopBtn') : domElement.remove('.scrollUp', 'showScrollTopBtn')
    },

    //Navigation animation
    menuAnimation(heightScroll){
        this.fixedMenu(heightScroll);
        this.changeItemScroll(heightScroll);
    },

    fixedMenu(heightScroll){
        heightScroll ? domElement.add('header', 'fixed') : domElement.remove('header', 'fixed');
    },

    changeItemScroll(heightScroll){
        const navItems = domElement.gets('.navbar__item');
        this.offsetsTop().map((rangeTop, index) => {
            if(heightScroll < this.offsetsTop[0]){
                domElement.add(navItems[0], 'active');
            }else{
                if(heightScroll >= rangeTop){
                    index >= 1 ? navItems[index-1].classList.remove('active') : navItems[4].classList.remove('active');
                    navItems[index].classList.add('active');
                }else{
                    navItems[index].classList.remove('active');
                };
            };
        })
    },

    offsetsTop(){
        const section = domElement.gets('section');
        const rangeTops = [];
        for (let index = 0; index < section.length; index++) {
            rangeTops.push(section[index].offsetTop - 196);
        };
        return rangeTops;
    },

    // fixedBody(){
    //     const body = domElement.get('body');
    //     const open = domElement.get('.mobile__iconBars');
    //     const close = domElement.get('.top__close');

    //     open.onclick = (e) => {
    //         e.preventDefault();
    //         body.style.overflow = 'hidden';
    //     }

    //     close.onclick = (e) => {
    //         e.preventDefault();
    //         body.style.overflow = 'auto';
    //     }
    // }
}

const domElement = {
    get(selector){
        const element = document.querySelector(selector);
        return element;
    },

    gets(selector){
        const elements = document.querySelectorAll(selector);
        return elements;
    },

    //Add class
    add(selector, className){
        const element = this.get(selector);
        element.classList.add(className);
    },

    //Remove Class
    remove(selector, className){
        const element = this.get(selector);
        element.classList.remove(className);
    },

    removes(selector, className){
        const elements = this.gets(selector);
        elements.map(element => {
            this.remove(element, className);
        })
    }
}

scrollAnimate.run();

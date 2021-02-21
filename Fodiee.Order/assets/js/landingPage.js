const scrollAnimate = {
    run(){
        window.addEventListener('scroll', () => {
            const heightScroll = pageYOffset;
            this.showButton(heightScroll);
            this.menuAnimation(heightScroll);
        });
        this.mobileMenu();
        this.runPartsAnimate();
        this.changeItemClick();
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

    //Navigation animate
    menuAnimation(heightScroll){
        this.fixedMenu(heightScroll);
        this.changeItemScroll(heightScroll);
    },

    fixedMenu(heightScroll){
        heightScroll ? domElement.add('header', 'fixed') : domElement.remove('header', 'fixed');
    },

    changeItemScroll(heightScroll){
        const navItems = domElement.gets('.navbar__item');
        const navMobileItems = domElement.gets('.mobile__navbar-item');
        // console.log(this.offsetsTop().rangesHeader);
        this.offsetsTop().rangesHeader.map((rangesHeader, index) => {
            if(heightScroll > rangesHeader){ 
                domElement.removeElements(navItems, 'active');
                domElement.addElement(navItems[index], 'active');

                domElement.removeElements(navMobileItems, 'active');
                domElement.addElement(navMobileItems[index], 'active');
            }
        })
    },

    changeItemClick(){
        const navItems = domElement.gets('.navbar__item');
        const navMobileItems = domElement.gets('.mobile__navbar-item');
        const offsetTop = scrollAnimate.offsetsTop().rangesCenter;

        if(screen.width > 1023){
            for (let index = 0; index < navItems.length; index++) {
                navItems[index].onclick = (e) => {
                    e.preventDefault();
                    window.scrollTo({top: offsetTop[index], behavior: 'smooth'});
                }
            };
        }else{
            for (let index = 0; index < navMobileItems.length; index++) {
                navMobileItems[index].onclick = (e) => {
                    e.preventDefault();
                    this.closeMenu();
                    window.scrollTo({top: offsetTop[index], behavior: 'smooth'});
                }
            };
        }
    },

    offsetsTop(){
        const sections = domElement.gets('section');
        const widthScreen = screen.width;
        const rangeTops = [];
        const rangesHeader = [];
        const rangesCenter = [];

        for (let index = 0; index < sections.length; index++) {
            if(widthScreen < 768){
                rangeTops.push(sections[index].offsetTop - sections[index].offsetHeight) + screen.height;
            }else{
                rangeTops.push(sections[index].offsetTop - sections[index].offsetHeight - 250);
            }
            rangesHeader.push(sections[index].offsetTop - 350);
            rangesCenter.push(sections[index].offsetTop);
        };
        return {
            rangeTops,
            rangesHeader,
            rangesCenter
        };
    },

    mobileMenu(){
        const open = domElement.get('.mobile__iconBars');
        const close = domElement.get('.top__close');
        const overlay = domElement.get('.mobile__overlay');

        open.onclick = (e) => {
            e.preventDefault();
            domElement.add('body', 'fixed');
            domElement.add('.mobile__overlay', 'show');
            domElement.add('.mobile__nav', 'showMobileNav');
            domElement.add('.book', 'hidden');
            domElement.remove('.scrollUp', 'showScrollTopBtn');
        }

        close.onclick = (e) => {
            e.preventDefault();
            this.closeMenu();
        }

        overlay.onclick = (e) => {
            e.preventDefault();
            this.closeMenu();
        }
    },

    closeMenu(){
        domElement.remove('body', 'fixed');
        domElement.remove('.mobile__overlay', 'show');
        domElement.remove('.mobile__nav', 'showMobileNav');
        domElement.remove('.book', 'hidden');
    },

    runPartsAnimate(){
        if(screen.width > 767){
            window.addEventListener("load", this.handlerPartsAnimate);
            window.addEventListener("resize", this.handlerPartsAnimate);
            window.addEventListener("scroll", this.handlerPartsAnimate);
        }
    },

    handlerPartsAnimate(){
        const parts = domElement.gets('section .part');
        const heightScroll = pageYOffset;
        const rangeTops = scrollAnimate.offsetsTop().rangeTops;
    
        for (let i = 0; i < parts.length; i++) {
            const children = parts[i].children; //Lấy các phần tử con của từng phần
            const partChildrens = Array.from(children); // chuyển từ html collection sang array
            
            if(heightScroll >= rangeTops[i]){
                for (let i = 0; i < partChildrens.length; i++) {
                    if(partChildrens.length > 2){
                        partChildrens[0].classList.add('in-down1');
                        partChildrens[1].classList.add('in-down2');
                        partChildrens[2].classList.add('in-down3');
                    }else{
                        partChildrens[0].classList.add('in-left');
                        partChildrens[1].classList.add('in-right');
                    }
                }
            }
    
            if(heightScroll === 0 && i !== 0){
                domElement.removeElements(partChildrens, 'in-left');
                domElement.removeElements(partChildrens, 'in-right');
                domElement.removeElements(partChildrens, 'in-down1');
                domElement.removeElements(partChildrens, 'in-down2');
                domElement.removeElements(partChildrens, 'in-down3');
            }
        }
    },

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
    addElement(element, className){
        element.classList.add(className);
    },

    //Remove Class
    remove(selector, className){
        const element = this.get(selector);
        element.classList.remove(className);
    },

    removeElement(element, className){
        element.classList.remove(className);
    },

    removes(selector, className){
        const elements = this.gets(selector);
        elements.map(element => {
            this.remove(element, className);
        })
    },

    removeElements(elements, className){
        for (let index = 0; index < elements.length; index++) {
            this.removeElement(elements[index], className);
        }
    }
}

scrollAnimate.run();






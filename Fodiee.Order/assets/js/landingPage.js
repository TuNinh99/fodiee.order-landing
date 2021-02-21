const scrollAnimate = {
    run(){
        window.addEventListener('scroll', () => {
            const heightScroll = pageYOffset;
            this.showButton(heightScroll);
            this.menuAnimation(heightScroll);
        });
        this.mobileMenu();
        this.runPartsAnimate();
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
        const navMobileItems = domElement.gets('.mobile__navbar-item');
        this.offsetsTop().ranges.map((rangeTop, index) => {
            if(heightScroll > rangeTop){ 
                domElement.removeElements(navItems, 'active');
                domElement.addElement(navItems[index], 'active');
            }else{

            };
        })
    },

    offsetsTop(){
        const sections = domElement.gets('section');
        const rangeTops = [];
        const ranges = [];

        for (let index = 0; index < sections.length; index++) {
            rangeTops.push(sections[index].offsetTop - sections[index].offsetHeight - 250);
            ranges.push(sections[index].offsetTop);
        };
        return {
            rangeTops: rangeTops,
            ranges: ranges
        };
    },

    mobileMenu(){
        const open = domElement.get('.mobile__iconBars');
        const close = domElement.get('.top__close');

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
            domElement.remove('body', 'fixed');
            domElement.remove('.mobile__overlay', 'show');
            domElement.remove('.mobile__nav', 'showMobileNav');
            domElement.remove('.book', 'hidden');
        }
    },

    runPartsAnimate(){
        window.addEventListener("load", this.handlerPartsAnimate);
        window.addEventListener("resize", this.handlerPartsAnimate);
        window.addEventListener("scroll", this.handlerPartsAnimate);
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


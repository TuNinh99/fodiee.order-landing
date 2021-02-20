function scrollToTop(){
    window.scrollTo({top: 0, behavior: 'smooth'});
}

const view = {
    getElement(selector){
        const element = document.querySelector(selector);
        return element;
    },
    getAllElement(selector){
        const element = document.querySelectorAll(selector);
        return element;
    }
}
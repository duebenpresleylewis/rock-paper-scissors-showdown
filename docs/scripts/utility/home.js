export function linkToHome() {

    const homeLink = document.querySelector('.home-link');
    
    homeLink.addEventListener('click', () => {
        window.location.href = '../index.html';
    });
}
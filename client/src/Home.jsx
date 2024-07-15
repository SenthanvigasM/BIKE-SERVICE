import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './assets/css/styles.css';
import homeImage from './assets/img/main1.jpg';
import aboutImage from './assets/img/main3.jpg';
import ScrollReveal from 'scrollreveal';

function Home() {

    useEffect(() => {
        const showMenu = (toggleId, navId) => {
            const toggle = document.getElementById(toggleId),
                nav = document.getElementById(navId)
            if (toggle && nav) {
                toggle.addEventListener('click', () => {
                    nav.classList.toggle('show-menu')
                })
            }
        }
        showMenu('nav-toggle', 'nav-menu')
        const navLink = document.querySelectorAll('.nav__link')

        function linkAction() {
            const navMenu = document.getElementById('nav-menu')
            navMenu.classList.remove('show-menu')
        }
        navLink.forEach(n => n.addEventListener('click', linkAction))
        const sections = document.querySelectorAll('section[id]')

        function scrollActive() {
            const scrollY = window.pageYOffset

            sections.forEach(current => {
                const sectionHeight = current.offsetHeight
                const sectionTop = current.offsetTop - 50;
                sectionId = current.getAttribute('id')

                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
                } else {
                    document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
                }
            })
        }
        window.addEventListener('scroll', scrollActive)
        function scrollHeader() {
            const nav = document.getElementById('header')
            if (this.scrollY >= 200) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
        }
        window.addEventListener('scroll', scrollHeader)
        function scrollTop() {
            const scrollTop = document.getElementById('scroll-top');
            if (this.scrollY >= 560) scrollTop.classList.add('show-scroll'); else scrollTop.classList.remove('show-scroll')
        }
        window.addEventListener('scroll', scrollTop)

        const sr = ScrollReveal({
            origin: 'top',
            distance: '30px',
            duration: 2000,
            reset: true
        });

        sr.reveal(`.home__data, .home__img,
                    .about__data, .about__img,
                    .services__content, .menu__content,
                    .app__data, .app__img,
                    .contact__data, .contact__button,
                    .footer__content`, {
            interval: 200
        })
    }, []);
    return (
        <div>
            {/* Header */}
            <header className="l-header" id="header">
                <nav className="nav bd-container">
                    <h2 className="nav__logo" style={{ color: '#069C54' }}>BIKE SERVICE</h2>


                    <div className="nav__menu" id="nav-menu">
                        <ul className="nav__list">
                            <li className="nav__item"><a href="#home" className="nav__link active-link">Home</a></li>
                            <li className="nav__item"><a href="#about" className="nav__link">About</a></li>
                            <li className="nav__item"><a href="#footer" className="nav__link">Contact us</a></li>
                            <li className="nav__item"><Link className='nav__link' to={'/login'}>Login</Link></li>

                        </ul>
                    </div>

                    <div className="nav__toggle" id="nav-toggle">
                        <i className='bx bx-menu'></i>
                    </div>
                </nav>
            </header>

            {/* Main Content */}
            <main className="l-main">
                {/* Home section */}
                <section className="home" id="home">
                    <div className="home__container bd-container bd-grid">
                        <div className="home__data">
                            <h1 className="home__title">Greetings!</h1>
                            <h2 className="home__subtitle">Reserve your bike service<br />and ride with confidence!</h2>
                            <Link className='button' to={'/login'}>BOOK NOW!</Link>
                        </div>
                        <img src={homeImage} alt="img" className="home__img" />
                    </div>
                </section>

                {/* About section */}
                <section className="about section bd-container" id="about">
                    <div className="about__container bd-grid">
                        <div className="about__data">
                            <span className="section-subtitle about__initial">About Us</span>
                            <h2 className="section-title about__initial">Your Trusted Bike Service Provider</h2>
                            <p className="about__description">Welcome to our bike service center, where we specialize in providing top-notch solutions for all your bike servicing needs. With a strong focus on quality and customer satisfaction, we ensure your bike is in the best condition for your rides.</p>
                        </div>
                        <img src={aboutImage} alt="Our Bike Service Center" className="about__img" />
                    </div>
                </section>


                {/* More sections can be added here */}
            </main>

            <footer className="footer section bd-container" id='footer'>
    <div className="footer__container bd-grid">
        <div className="footer__content footer__info">
            <h3 className="footer__title">Information</h3>
            <ul>
                <li><a href="#home" className="footer__link">Home</a></li>
                <li><a href="#about" className="footer__link">About</a></li>
                <li><a href="#contact" className="footer__link">Contact us</a></li>
            </ul>
        </div>
        <div className="footer__content footer__address">
            <h3 className="footer__title">Address</h3>
            <ul>
                <li>Bike Service,</li>
                <li>Perundurai road,</li>
                <li>Thindal,</li>
                <li>Erode – 638 012.</li>
            </ul>
        </div>
        <div className="footer__content footer__contact">
            <div className="contact__container bd-grid">
                <div className="contact__data">
                    <h2 className="contact__initial">Contact Us</h2>
                    <p className="contact__description">Have questions or need to schedule a service for your bike? Feel free to reach out to us! We're here to assist you promptly.</p>
                    <p className="contact__description">You can contact us at +1 737-375-2000 or email us at bikeservice@example.com. We look forward to hearing from you!</p>
                </div>
            </div>
        </div>
    </div>
    <p className="footer__copy">&#169; 2024. All right reserved by BIKE SERVICE. Developed by <a href="https://senthanvigasm.netlify.app/" target='new' className="footer__link">SENTHAN VIGAS M</a></p>
</footer>


        </div>
    );
}

export default Home;

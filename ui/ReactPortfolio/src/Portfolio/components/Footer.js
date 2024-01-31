import SocialLink from "./SocialLink"

export default function Footer() {
    return (
        <section className="d-flex flex-column" id="footer">
            <div className="container-fluid p-5 mt-auto">
                <h1 className="text-center font-2 fw-bold">
                    <div className="text-success">Hope you have a great day</div>
                    <div className="text-danger">SAYONARA!</div>
                </h1>
                <div className="row mt-5">
                    <div className="col-md-12 d-flex align-items-center justify-content-space-between">
                        <div className="horizontal-line"></div>
                        <div className="coffee-icon p-4">
                            <i className="fas fa-mug-hot fa-3x"></i>
                        </div>
                        <div className="horizontal-line"></div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <div className="coffee-section">
                            <div className="coffee-text">
                                Wanna buy me a coffee?
                            </div>
                            <div className="social-links-short">
                                <h5 className="fw-bold text-primary mb-2">Why don't you text me & let's talk?</h5>
                                <ul className="grid-container d-flex list justify-content-center p-0">
                                    <SocialLink url="https://m.me/aldrinsaurovsarker" title="Messanger" icon="fab fa-facebook-messenger icon"></SocialLink>
                                    <SocialLink url="https://www.instagram.com/aldrin_saurov_sarker/" title="Instagram" icon="fab fa-instagram icon"></SocialLink>
                                    <SocialLink url="https://www.linkedin.com/in/aldrin-saurov-sarker/" title="LinkedIn" icon="fab fa-linkedin-in icon"></SocialLink>
                                    <SocialLink url="https://api.whatsapp.com/send/?phone=8801642005775&text&type=phone_number&app_absent=0" title="WhatsApp" icon="fab fa-whatsapp icon"></SocialLink>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid bg-dark text-light p-3">
                <div className="row">
                    <div className="col-12 col-md-6">&copy; 2024 Aldrin Saurov Sarker | Personal Portfolio</div>
                    <div className="col-12 col-md-6 text-md-end">Made with React & Flask</div>
                </div>
            </div>

        </section>
    )
}
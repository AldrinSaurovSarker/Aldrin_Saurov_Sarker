import { useState, useEffect } from 'react';
import { getProfileData } from '../../CommonComponents/Api';
import SocialMedia from '../components/SocialMedia';
import UseDarkMode from "./UseDarkMode";

export default function Greetings() {
	const [profile, setProfile] = useState(null);
	const isDarkMode = UseDarkMode();
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getProfileData();
                setProfile(data);
            } catch (error) {
                console.error("Error fetching profile data:", error);
            }
        };
        fetchData();
    }, []);

	if (!profile) {
        return <div>Loading...</div>;
    }

	return (
		<section className="container-fluid greeting-container px-5" id='intro'>
			<div className="row">
				<div className="col-xl-6 d-none d-xl-block">
					<div className="row">
						<div className="col-12 greeting-text">
							<h2 className="greeting-title d-inline-block">
								<b className={`font-7 typing-animation smooth ${isDarkMode ? 'text-warning' : 'text-primary'}`}>Hello world!</b>
							</h2>
							<h1 className={`font-6 display-1 smooth ${isDarkMode ? 'text-light' : 'text-dark'}`}>
								I'm <span className='name text-animate fw-bold'>{profile.name}</span>
							</h1>
							<h4 className='contact d-sm-flex align-items-center d-block font-5 fw-bold'>
								<div className='text-info'>{profile.location}</div>
								<div className='divider mx-4 d-none d-sm-block'></div>
								<a href='mailto:a.saurov2016@gmail.com' className='email'>a.saurov2016@gmail.com</a>
							</h4>
							<div className='greeting-bio text-justify mt-5 font-1'>
								{profile.bio.map((line, index) => (
									<p key={index}>{line}</p>
								))}
							</div>
						</div>
						<div className="col-12">
							<SocialMedia />
						</div>
						<div className="col-12 quote">
							<h2 className='text-info font-2 fw-bold'>"Victory is not always winning the battle... but rising every time you fall"</h2>
							<h3 className='text-secondary ms-auto d-flex align-items-center justify-content-end'>
								<div className='line me-2'></div>
								<div className={`text-uppercase fst-italic font-3 mt-2 text-nowrap flicker smooth ${isDarkMode ? 'text-light' : 'text-dark'}`}>Napoleon Bonaparte</div>
							</h3>
						</div>
					</div>
				</div>

				<div className="col-lg-6 d-xl-none">
					<h2 className="greeting-title d-inline-block">
						<b className='font-7 text-primary typing-animation'>Hello world!</b>
					</h2>
					
					<h1 className={`font-6 display-1 smooth ${isDarkMode ? 'text-light' : 'text-dark'}`}>
						I'm <span className='name text-animate fw-bold'>{profile.name}</span>
					</h1>

					<h4 className='contact d-sm-flex align-items-center d-block'>
						<div className='text-info'>{profile.location}</div>
						<div className='divider mx-4 d-none d-sm-block'></div>
						<a href='mailto:a.saurov2016@gmail.com'>a.saurov2016@gmail.com</a>
					</h4>
					<div className='greeting-bio text-justify mt-5 font-1'>
						{profile.bio.map((line, index) => (
							<p key={index}>{line}</p>
						))}
					</div>
				</div>
				<div className="col-lg-6 d-xl-none mt-auto">
					<div className="row">
						<div className="col-12 greeting-image">
							<img className='img-fluid' src='images/DP.jpg' alt='Display'></img>
						</div>
						<div className="col-12">
							<SocialMedia />
						</div>
					</div>
				</div>
				<div className="col-12 d-xl-none quote">
					<h2 className='text-info font-2 fw-bold py-3'>"Victory is not always winning the battle... but rising every time you fall"</h2>
					<h3 className='text-secondary ms-auto d-flex align-items-center justify-content-end'>
						<div className='line me-2'></div>
						<div className={`text-uppercase fst-italic font-3 mt-2 text-nowrap flicker smooth ${isDarkMode ? 'text-light' : 'text-dark'}`}>Napoleon Bonaparte</div>
					</h3>
				</div>

				<div className="col-xl-6 d-none d-xl-block greeting-image">
					<img className='img-fluid h-100' src='images/DP.jpg' alt='Display'></img>
				</div>
			</div>
		</section>
	);
}

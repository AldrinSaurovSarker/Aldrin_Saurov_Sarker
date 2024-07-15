import { useEffect, useState } from "react";
import SectionTitle from "./SectionTitle";

const ProblemCard = ({ logoSrc, solved, rating, profileLink }) => (
    <div className="col-xl-3 col-lg-4 col-md-6 col-12 mb-4">
        <div className="card h-100">
            <img
                src={logoSrc}
                className="card-img-top card-logo img-fluid"
                alt="Logo"
                style={{ height: '100%' }}
            />
            <div className="card-body">
                <div className="card-content d-lg-flex d-md-grid d-sm-flex">
                    <div className="card-left mt-4">
                        <h6 className="card-title">Solved Problems</h6>
                        <h6 className="card-text text-primary">{solved}</h6>
                    </div>

                    <div className="card-right ms-lg-auto ms-sm-auto ms-md-0 mt-4">
                        <h6 className="card-title text-lg-end">Current Contest Rating</h6>
                        <h6 className="card-text text-primary text-lg-end text-md-start text-sm-end">{rating}</h6>
                    </div>
                </div>
                <a href={profileLink} target="_blank" className="btn btn-primary w-100 mt-4">
                    Visit Profile
                </a>
            </div>
        </div>
    </div>
);

export default function OnlineJudges() {
    const [leetcodeSolvedCount, setLeetcodeSolvedCount] = useState('---');
    const [codeforcesSolvedCount, setCodeforcesSolvedCount] = useState('---');
    const [leetcodeRating, setLeetcodeRating] = useState('---');
    const [codeforcesRating, setCodeforcesRating] = useState('---');

    useEffect(() => {
        // fetch("/api/leetcode")
        //     .then((res) => res.json())
        //     .then((data) => {
        //         setLeetcodeSolvedCount(data.solvedCount);
        //         setLeetcodeRating(data.rating);
        //     });

        fetch("/api/codeforces")
            .then((res) => res.json())
            .then((data) => {
                setCodeforcesSolvedCount(data.solvedCount);
                setCodeforcesRating(data.rating);
            });
    }, []);

    const cardsData = [
        {
            logoSrc: 'images/OnlineJudge/LeetCode.jpg',
            solved: `${leetcodeSolvedCount}`,
            rating: `${leetcodeRating}`,
            profileLink: 'https://leetcode.com/WiNterBoy180204/',
        },
        {
            logoSrc: 'images/OnlineJudge/CodeForces.jpg',
            solved: `${codeforcesSolvedCount}`,
            rating: `${codeforcesRating}`,
            profileLink: 'https://codeforces.com/profile/WiNterBoy180204',
        },
        {
            logoSrc: 'images/OnlineJudge/Beecrowd.jpg',
            solved: 459,
            rating: '---',
            profileLink: 'https://www.beecrowd.com.br/judge/en/profile/220894',
        },
        {
            logoSrc: 'images/OnlineJudge/HackerRank.png',
            solved: '---',
            rating: '---',
            profileLink: 'https://www.hackerrank.com/profile/a_saurov2016',
        }
    ];

    return (
        <section id="online-judge">
            <div className="container-fluid p-5">
                <SectionTitle title='My Online Judge Profiles' details="I have solved over 1500+ problems in various online judges. Although, I haven't participated in many contests." />
                <div className="row">
                    {cardsData.map((card, index) => (
                        <ProblemCard key={index} {...card} />
                    ))}
                </div>
            </div>
        </section>
    );
}

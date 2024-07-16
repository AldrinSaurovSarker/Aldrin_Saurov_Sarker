import { useState, useEffect } from 'react'
import { getSkillData } from './Api'
import SectionTitle from './SectionTitle'
import UseDarkMode from './UseDarkMode'

function SkillItem({ logo, name }) {
    return (
        <div className="mb-3">
            <div className="icon-card">
                <img
                    src={logo}
                    alt={`${name} icon`}
                    loading="lazy"
                    className="skill-icon"
                />
            </div>
            <div className="text-center fw-bold text-info small">{name}</div>
        </div>
    );
}

export default function Skill() {
    const [skillData, setSkillData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getSkillData();
            setSkillData(data);
        };
        fetchData();
    }, [getSkillData]);

    const groupSkillsByType = () => {
        const groupedSkills = {};

        skillData.forEach((skill) => {
            if (!groupedSkills[skill.type]) {
                groupedSkills[skill.type] = [];
            }
            groupedSkills[skill.type].push(skill);
        });

        return groupedSkills;
    };

    const renderSkillItems = (type, skills) => {
        return (
            <div key={type} className='my-5'>
                <h3 className={`skill-header mb-3 smooth ${isDarkMode ? 'text-light' : 'text-dark'}`}>{type}</h3>
                <div className="row">
                    <div className="skills-wrapper d-flex">
                        {skills.map((skill) => (
                            <SkillItem key={skill.name} logo={skill.logo} name={skill.name} />
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    const groupedSkills = groupSkillsByType();
    const isDarkMode = UseDarkMode();

    return (
        <section id="skills">
            <div className="container-fluid p-5">
                <SectionTitle
                    title="Skills"
                    details="I can Ctrl+C, Ctrl+V anything. Other than that, my skills are:"
                />
                <div className="skills-container">
                    {Object.keys(groupedSkills).map((type) =>
                        renderSkillItems(type, groupedSkills[type])
                    )}
                </div>
            </div>
        </section>
    );
}
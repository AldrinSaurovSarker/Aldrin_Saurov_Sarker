import { NODE_HOST } from '../../CommonComponents/Constants'

export const getCertificateData = async () => {
    try {
        const response = await fetch(NODE_HOST + "/api/portfolio/get-certificate-data");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching certificate data:", error);
        return [];
    }
};

export const getContributionData = async () => {
    try {
        const response = await fetch(NODE_HOST + "/api/portfolio/get-contribution-data");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching contribution data:", error);
        return [];
    }
};

export const getEducationData = async () => {
    try {
        const response = await fetch(NODE_HOST + "/api/portfolio/get-education-data");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching education data:", error);
        return [];
    }
};

export const getExperienceData = async () => {
    try {
        const response = await fetch(NODE_HOST + "/api/portfolio/get-experience-data");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching experience data:", error);
        return [];
    }
};

export const getExtraData = async () => {
    try {
        const response = await fetch(NODE_HOST + "/api/portfolio/get-extra-data");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching extra data:", error);
        return [];
    }
};

// export const getOnlineJudgeData = async () => {
//     try {
//         const response = await fetch("http://localhost:5038/api/Portfolio/GetOnlineJudgeData");
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error("Error fetching online judge data:", error);
//         return [];
//     }
// };

export const getProfileData = async () => {
    try {
        const response = await fetch(NODE_HOST + "/api/portfolio/get-profile-data");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching profile data:", error);
        return [];
    }
};

export const getProjectData = async () => {
    try {
        const response = await fetch(NODE_HOST + "/api/portfolio/get-project-data");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching project data:", error);
        return [];
    }
};

export const getResearchData = async () => {
    try {
        const response = await fetch(NODE_HOST + "/api/portfolio/get-research-data");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching research data:", error);
        return [];
    }
};

export const getSectionData = async () => {
    try {
        const response = await fetch(NODE_HOST + "/api/portfolio/get-section-data");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching section data:", error);
        return [];
    }
};

export const getSocialMediaData = async () => {
    try {
        const response = await fetch(NODE_HOST + "/api/portfolio/get-social-media-data");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching social media data:", error);
        return [];
    }
};

export const getSkillData = async () => {
    try {
        const response = await fetch(NODE_HOST + "/api/portfolio/get-skill-data");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching skill data:", error);
        return [];
    }
};
export const getCertificateData = async () => {
    try {
        const response = await fetch("http://localhost:5038/api/Portfolio/GetCertificateData");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching certificate data:", error);
        return [];
    }
};

export const getContributionData = async () => {
    try {
        const response = await fetch("http://localhost:5038/api/Portfolio/GetContributionData");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching contribution data:", error);
        return [];
    }
};

export const getEducationData = async () => {
    try {
        const response = await fetch("http://localhost:5038/api/Portfolio/GetEducationData");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching education data:", error);
        return [];
    }
};

export const getExperienceData = async () => {
    try {
        const response = await fetch("http://localhost:5038/api/Portfolio/GetExperienceData");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching experience data:", error);
        return [];
    }
};

export const getExtraData = async () => {
    try {
        const response = await fetch("http://localhost:5038/api/Portfolio/GetExtraData");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching extra data:", error);
        return [];
    }
};

export const getOnlineJudgeData = async () => {
    try {
        const response = await fetch("http://localhost:5038/api/Portfolio/GetOnlineJudgeData");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching online judge data:", error);
        return [];
    }
};

export const getProfileData = async () => {
    try {
        const response = await fetch("http://localhost:5038/api/Portfolio/GetProfileData");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching profile data:", error);
        return [];
    }
};

export const getProjectData = async () => {
    try {
        const response = await fetch("http://localhost:5038/api/Portfolio/GetProjectData");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching project data:", error);
        return [];
    }
};

export const getResearchData = async () => {
    try {
        const response = await fetch("http://localhost:5038/api/Portfolio/GetResearchData");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching research data:", error);
        return [];
    }
};

export const getSectionData = async () => {
    try {
        const response = await fetch("http://localhost:5038/api/Portfolio/GetSectionData");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching section data:", error);
        return [];
    }
};

export const getSocialMediaData = async () => {
    try {
        const response = await fetch("http://localhost:5038/api/Portfolio/GetSocialMediaData");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching social media data:", error);
        return [];
    }
};

export const getSkillData = async () => {
    try {
        const response = await fetch("http://localhost:5038/api/Portfolio/GetSkillData");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching skill data:", error);
        return [];
    }
};

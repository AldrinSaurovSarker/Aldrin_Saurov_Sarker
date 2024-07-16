app.get('/api/portfolio/get-certificate-data', async (request, response) => {
    try {
        const data = await portfolio_database.collection("Certificate").find({}).toArray();
        response.json(data);
    } catch (error) {
        response.status(500).json({ error: "Internal Server Error" });
    }
});

app.get('/api/Portfolio/GetContributionData', async (request, response) => {
    try {
        const data = await portfolio_database.collection("Contribution").find({}).toArray();
        response.json(data);
    } catch (error) {
        response.status(500).json({ error: "Internal Server Error" });
    }
});

app.get('/api/Portfolio/GetEducationData', async (request, response) => {
    try {
        const data = await portfolio_database.collection("Education").find({}).toArray();
        response.json(data);
    } catch (error) {
        response.status(500).json({ error: "Internal Server Error" });
    }
});

app.get('/api/Portfolio/GetExperienceData', async (request, response) => {
    try {
        const data = await portfolio_database.collection("Experience").find({}).toArray();
        response.json(data);
    } catch (error) {
        response.status(500).json({ error: "Internal Server Error" });
    }
});

app.get('/api/Portfolio/GetExtraData', async (request, response) => {
    try {
        const data = await portfolio_database.collection("Extra").find({}).toArray();
        response.json(data);
    } catch (error) {
        response.status(500).json({ error: "Internal Server Error" });
    }
});

// app.get('/api/Portfolio/GetOnlineJudgeData', async (request, response) => {
//     try {
//         const data = await portfolio_database.collection("OnlineJudge").find({}).toArray();
//         response.json(data);
//     } catch (error) {
//         console.error("Error fetching data from MongoDB:", error);
//         response.status(500).json({ error: "Internal Server Error" });
//     }
// });

app.get('/api/Portfolio/GetProfileData', async (request, response) => {
    try {
        const data = await portfolio_database.collection("Profile").findOne({});
        if (data) {
            response.json(data);
        } else {
            response.status(404).json({ message: "Profile data not found" });
        }
    } catch (error) {
        response.status(500).json({ error: "Internal Server Error" });
    }
});

app.get('/api/Portfolio/GetProjectData', async (request, response) => {
    try {
        const data = await portfolio_database.collection("Project").find({}).toArray();
        response.json(data);
    } catch (error) {
        response.status(500).json({ error: "Internal Server Error" });
    }
});

app.get('/api/Portfolio/GetResearchData', async (request, response) => {
    try {
        const data = await portfolio_database.collection("Research").find({}).toArray();
        response.json(data);
    } catch (error) {
        response.status(500).json({ error: "Internal Server Error" });
    }
});

app.get('/api/Portfolio/GetSectionData', async (request, response) => {
    try {
        const data = await portfolio_database.collection("Section").find({}).toArray();
        response.json(data);
    } catch (error) {
        response.status(500).json({ error: "Internal Server Error" });
    }
});

app.get('/api/Portfolio/GetSkillData', async (request, response) => {
    try {
        const data = await portfolio_database.collection("Skill").find({}).toArray();
        response.json(data);
    } catch (error) {
        response.status(500).json({ error: "Internal Server Error" });
    }
});

app.get('/api/Portfolio/GetSocialMediaData', async (request, response) => {
    try {
        const data = await portfolio_database.collection("SocialMedia").find({}).toArray();
        response.json(data);
    } catch (error) {
        response.status(500).json({ error: "Internal Server Error" });
    }
});

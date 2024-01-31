const express = require("express");
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require("cors");

const app = express();
const port = 5038;

app.use(cors());

const CONNECTION_STRING = "mongodb+srv://Aldrin:HtVV67FzPjXXtw50@aldrinsaurovsarker.83iqu4o.mongodb.net/?retryWrites=true&w=majority";
const PORTFOLIO_DATABASE_NAME = "Portfolio";
const MEMORY_GAME_DATABASE_NAME = "MemoryGame";

let portfolio_database;
let memory_game_database;

const client = new MongoClient(CONNECTION_STRING, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function connectToMongoDB() {
    try {
        await client.connect();
        portfolio_database = client.db(PORTFOLIO_DATABASE_NAME);
        memory_game_database = client.db(MEMORY_GAME_DATABASE_NAME);
        console.log("Connection to MongoDB successful");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Exit the application if the connection fails
    }
}

// Start the server after connecting to MongoDB
connectToMongoDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });
});

// APIs for MongoDB
app.get('/api/Portfolio/GetCertificateData', async (request, response) => {
    try {
        const data = await portfolio_database.collection("Certificate").find({}).toArray();
        response.json(data);
    } catch (error) {
        console.error("Error fetching data from MongoDB:", error);
        response.status(500).json({ error: "Internal Server Error" });
    }
});

app.get('/api/Portfolio/GetContributionData', async (request, response) => {
    try {
        const data = await portfolio_database.collection("Contribution").find({}).toArray();
        response.json(data);
    } catch (error) {
        console.error("Error fetching data from MongoDB:", error);
        response.status(500).json({ error: "Internal Server Error" });
    }
});

app.get('/api/Portfolio/GetEducationData', async (request, response) => {
    try {
        const data = await portfolio_database.collection("Education").find({}).toArray();
        response.json(data);
    } catch (error) {
        console.error("Error fetching data from MongoDB:", error);
        response.status(500).json({ error: "Internal Server Error" });
    }
});

app.get('/api/Portfolio/GetExperienceData', async (request, response) => {
    try {
        const data = await portfolio_database.collection("Experience").find({}).toArray();
        response.json(data);
    } catch (error) {
        console.error("Error fetching data from MongoDB:", error);
        response.status(500).json({ error: "Internal Server Error" });
    }
});

app.get('/api/Portfolio/GetExtraData', async (request, response) => {
    try {
        const data = await portfolio_database.collection("Extra").find({}).toArray();
        response.json(data);
    } catch (error) {
        console.error("Error fetching data from MongoDB:", error);
        response.status(500).json({ error: "Internal Server Error" });
    }
});

app.get('/api/Portfolio/GetOnlineJudgeData', async (request, response) => {
    try {
        const data = await portfolio_database.collection("OnlineJudge").find({}).toArray();
        response.json(data);
    } catch (error) {
        console.error("Error fetching data from MongoDB:", error);
        response.status(500).json({ error: "Internal Server Error" });
    }
});

app.get('/api/Portfolio/GetProfileData', async (request, response) => {
    try {
        const data = await portfolio_database.collection("Profile").findOne({});
        if (data) {
            response.json(data);
        } else {
            response.status(404).json({ message: "Profile data not found" });
        }
    } catch (error) {
        console.error("Error fetching data from MongoDB:", error);
        response.status(500).json({ error: "Internal Server Error" });
    }
});

app.get('/api/Portfolio/GetProjectData', async (request, response) => {
    try {
        const data = await portfolio_database.collection("Project").find({}).toArray();
        response.json(data);
    } catch (error) {
        console.error("Error fetching data from MongoDB:", error);
        response.status(500).json({ error: "Internal Server Error" });
    }
});

app.get('/api/Portfolio/GetResearchData', async (request, response) => {
    try {
        const data = await portfolio_database.collection("Research").find({}).toArray();
        response.json(data);
    } catch (error) {
        console.error("Error fetching data from MongoDB:", error);
        response.status(500).json({ error: "Internal Server Error" });
    }
});

app.get('/api/Portfolio/GetSectionData', async (request, response) => {
    try {
        const data = await portfolio_database.collection("Section").find({}).toArray();
        response.json(data);
    } catch (error) {
        console.error("Error fetching data from MongoDB:", error);
        response.status(500).json({ error: "Internal Server Error" });
    }
});

app.get('/api/Portfolio/GetSkillData', async (request, response) => {
    try {
        const data = await portfolio_database.collection("Skill").find({}).toArray();
        response.json(data);
    } catch (error) {
        console.error("Error fetching data from MongoDB:", error);
        response.status(500).json({ error: "Internal Server Error" });
    }
});

app.get('/api/Portfolio/GetSocialMediaData', async (request, response) => {
    try {
        const data = await portfolio_database.collection("SocialMedia").find({}).toArray();
        response.json(data);
    } catch (error) {
        console.error("Error fetching data from MongoDB:", error);
        response.status(500).json({ error: "Internal Server Error" });
    }
});

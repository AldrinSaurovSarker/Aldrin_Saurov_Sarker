const express = require("express");
const { MongoClient, ServerApiVersion, Code } = require('mongodb');
const cors = require("cors");

const app = express();
const port = 5038;

app.use(cors());
app.use(express.json());

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

app.get('/api/MemoryGame/GetUserData/:email', async (request, response) => {
    const email = request.params.email;

    try {
        const data = await memory_game_database.collection("Score").find({ userId: email }).toArray();
        console.log(data)
        response.json(data)
    } catch (error) {
        console.error("Error fetching data from MongoDB:", error);
        response.status(500).json({ error: "Internal Server Error" });
    }
});

app.delete('/api/MemoryGame/DeleteUserData/:email', async (request, response) => {
    const email = request.params.email;

    try {
        const result = await memory_game_database.collection("Score").deleteMany({ userId: email });
        console.log(`${result.deletedCount} document(s) deleted`);
        response.json({ message: `${result.deletedCount} document(s) deleted` });
    } catch (error) {
        console.error("Error deleting data from MongoDB:", error);
        response.status(500).json({ error: "Internal Server Error" });
    }
});

app.post('/api/MemoryGame/UpdateUserData', async (request, response) => {
    const { userId, difficulty, currentTime, totalFlips, totalMatchedFlips, totalWrongFlips, gameFinished } = request.body;

    try {
        const scoreCollection = memory_game_database.collection("Score");
        const user = await scoreCollection.findOne({ userId: userId, difficulty: difficulty });

        if (user) {
            let bestTime = user.bestTime;
            let lowestFlips = user.lowestFlips

            if (gameFinished === true) {
                if (bestTime) {
                    bestTime = user.bestTime && currentTime < user.bestTime ? currentTime : user.bestTime
                } else {
                    bestTime = currentTime
                }

                if (lowestFlips) {
                    lowestFlips = user.lowestFlips && totalFlips < user.lowestFlips ? totalFlips : user.lowestFlips
                } else {
                    lowestFlips = totalFlips
                }
            }

            const updatedTotalFlips = user.totalFlips + totalFlips;
            const updatedMatchedFlips = (user.totalMatchedFlips ?? 0) + totalMatchedFlips;
            const updatedWrongFlips = (user.totalWrongFlips ?? 0) + totalWrongFlips;

            let updatedCompletedMatches = user.totalCompletedMatches;
            let updatedAbandonedMatches = user.totalAbandonedMatches;

            if (gameFinished === true) {
                updatedCompletedMatches += 1;
            } else {
                updatedAbandonedMatches += 1;
            }

            await scoreCollection.updateOne({ userId: userId },
                {
                    $set: {
                        difficulty: difficulty,
                        bestTime: bestTime,
                        totalMatches: user.totalMatches + 1,
                        totalCompletedMatches: updatedCompletedMatches,
                        totalAbandonedMatches: updatedAbandonedMatches,
                        totalFlips: updatedTotalFlips,
                        totalMatchedFlips: updatedMatchedFlips,
                        totalWrongFlips: updatedWrongFlips,
                        lowestFlips: lowestFlips
                    }
                }
            );

            const updatedUser = await scoreCollection.findOne({ userId: userId });
            response.json(updatedUser);
        } else {
            let bestTime
            let lowestFlips

            if (gameFinished === true) {
                updatedCompletedMatches = 1
                updatedAbandonedMatches = 0
                bestTime = currentTime
                lowestFlips = totalFlips
            } else {
                updatedCompletedMatches = 0
                updatedAbandonedMatches = 1
                bestTime = null
                lowestFlips = null
            }

            const newUser = {
                userId: userId,
                difficulty: difficulty,
                bestTime: bestTime,
                totalMatches: 1,
                totalCompletedMatches: updatedCompletedMatches,
                totalAbandonedMatches: updatedAbandonedMatches,
                totalFlips: totalFlips,
                totalMatchedFlips: totalMatchedFlips,
                totalWrongFlips: totalWrongFlips,
                lowestFlips: totalFlips
            };
            await scoreCollection.insertOne(newUser);
            response.json(newUser);
        }
    } catch (error) {
        console.error("Error updating user data:", error);
        response.status(500).json({ error: "Internal Server Error" });
    }
});

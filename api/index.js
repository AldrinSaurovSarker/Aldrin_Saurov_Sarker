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
app.get('/api/portfolio/get-certificate-data', async (request, response) => {
    try {
        const data = await portfolio_database.collection("Certificate").find({}).toArray();
        response.json(data);
    } catch (error) {
        response.status(500).json({ error: "Internal Server Error" });
    }
});

app.get('/api/portfolio/get-contribution-data', async (request, response) => {
    try {
        const data = await portfolio_database.collection("Contribution").find({}).toArray();
        response.json(data);
    } catch (error) {
        response.status(500).json({ error: "Internal Server Error" });
    }
});

app.get('/api/portfolio/get-education-data', async (request, response) => {
    try {
        const data = await portfolio_database.collection("Education").find({}).toArray();
        response.json(data);
    } catch (error) {
        response.status(500).json({ error: "Internal Server Error" });
    }
});

app.get('/api/portfolio/get-experience-data', async (request, response) => {
    try {
        const data = await portfolio_database.collection("Experience").find({}).toArray();
        response.json(data);
    } catch (error) {
        response.status(500).json({ error: "Internal Server Error" });
    }
});

app.get('/api/portfolio/get-extra-data', async (request, response) => {
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

app.get('/api/portfolio/get-profile-data', async (request, response) => {
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

app.get('/api/portfolio/get-project-data', async (request, response) => {
    try {
        const data = await portfolio_database.collection("Project").find({}).toArray();
        response.json(data);
    } catch (error) {
        response.status(500).json({ error: "Internal Server Error" });
    }
});

app.get('/api/portfolio/get-research-data', async (request, response) => {
    try {
        const data = await portfolio_database.collection("Research").find({}).toArray();
        response.json(data);
    } catch (error) {
        response.status(500).json({ error: "Internal Server Error" });
    }
});

app.get('/api/portfolio/get-section-data', async (request, response) => {
    try {
        const data = await portfolio_database.collection("Section").find({}).toArray();
        response.json(data);
    } catch (error) {
        response.status(500).json({ error: "Internal Server Error" });
    }
});

app.get('/api/portfolio/get-skill-data', async (request, response) => {
    try {
        const data = await portfolio_database.collection("Skill").find({}).toArray();
        response.json(data);
    } catch (error) {
        response.status(500).json({ error: "Internal Server Error" });
    }
});

app.get('/api/portfolio/get-social-media-data', async (request, response) => {
    try {
        const data = await portfolio_database.collection("SocialMedia").find({}).toArray();
        response.json(data);
    } catch (error) {
        response.status(500).json({ error: "Internal Server Error" });
    }
});

app.get('/api/memory-game/get-user-data/:email', async (request, response) => {
    const email = request.params.email;

    try {
        const data = await memory_game_database.collection("Score").find({ userId: email }).toArray();
        response.json(data)
    } catch (error) {
        response.status(500).json({ error: "Internal Server Error" });
    }
});

app.delete('/api/memory-game/delete-user-data/:email', async (request, response) => {
    const email = request.params.email;

    try {
        const result = await memory_game_database.collection("Score").deleteMany({ userId: email });
        response.json({ message: `${result.deletedCount} document(s) deleted` });
    } catch (error) {
        response.status(500).json({ error: "Internal Server Error" });
    }
});

app.post('/api/memory-game/update-user-data', async (request, response) => {
    const { userId, difficulty, currentTime, totalFlips, totalMatchedFlips, totalWrongFlips, gameFinished } = request.body;

    try {
        const scoreCollection = memory_game_database.collection("Score");
        const user = await scoreCollection.findOne({ userId: userId, difficulty: difficulty });

        if (user) {
            if (gameFinished) {
                user.bestTime = user.bestTime ? Math.min(user.bestTime, currentTime) : currentTime;
                user.lowestFlips = user.lowestFlips ? Math.min(user.lowestFlips, totalFlips) : totalFlips;
            }            

            user.totalFlips += totalFlips;
            user.totalMatchedFlips = (user.totalMatchedFlips ?? 0) + totalMatchedFlips;
            user.totalWrongFlips = (user.totalWrongFlips ?? 0) + totalWrongFlips;

            if (gameFinished) {
                user.totalCompletedMatches += 1;
            } else {
                user.totalAbandonedMatches += 1;
            }            

            await scoreCollection.updateOne({ userId: userId },
                {
                    $set: {
                        difficulty: difficulty,
                        bestTime: user.bestTime,
                        totalMatches: user.totalMatches + 1,
                        totalCompletedMatches: user.totalCompletedMatches,
                        totalAbandonedMatches: user.totalAbandonedMatches,
                        totalFlips: user.totalFlips,
                        totalMatchedFlips: user.totalMatchedFlips,
                        totalWrongFlips: user.totalWrongFlips,
                        lowestFlips: user.lowestFlips
                    }
                }
            );
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
                lowestFlips: lowestFlips
            };
            await scoreCollection.insertOne(newUser);
            response.json(newUser);
        }
    } catch (error) {
        response.status(500).json({ error: "Internal Server Error" });
    }
});

app.get('/api/MemoryGame/GetUserData/:email', async (request, response) => {
    const email = request.params.email;

    try {
        const data = await memory_game_database.collection("Score").find({ userId: email }).toArray();
        response.json(data)
    } catch (error) {
        response.status(500).json({ error: "Internal Server Error" });
    }
});

app.delete('/api/MemoryGame/DeleteUserData/:email', async (request, response) => {
    const email = request.params.email;

    try {
        const result = await memory_game_database.collection("Score").deleteMany({ userId: email });
        response.json({ message: `${result.deletedCount} document(s) deleted` });
    } catch (error) {
        response.status(500).json({ error: "Internal Server Error" });
    }
});

app.post('/api/MemoryGame/UpdateUserData', async (request, response) => {
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

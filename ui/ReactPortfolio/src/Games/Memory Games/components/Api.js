import { NODE_HOST } from '../../../CommonComponents/Constants'

export const getUserData = async (email) => {
    try {
        const response = await fetch(NODE_HOST + `/api/memory-game/get-user-data/${email}`)
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching user data:", error);
        return [];
    }
};

export const deleteUserData = async (email) => {
    try {
        const response = await fetch(NODE_HOST + `/api/memory-game/get-user-data/${email}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.error('Failed to delete user data:', response.statusText);
            return null;
        }
    } catch (error) {
        console.error('Error deleting user data:', error);
        return null;
    }
};

export const updateUserData = async (userId, difficulty, timeElapsed, totalFlips, totalMatchedFlips, totalWrongFlips, gameFinished) => {
    try {
        const response = await fetch(NODE_HOST + '/api/memory-game/update-user-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userId,
                difficulty: difficulty,
                currentTime: timeElapsed,
                totalFlips: totalFlips,
                totalMatchedFlips: totalMatchedFlips,
                totalWrongFlips: totalWrongFlips,
                gameFinished: gameFinished
            }),
        });

        const data = await response.json();
        if (response.ok) {
            console.log('User data updated successfully:', data);
        } else {
            console.error('Failed to update user data:', data.error);
        }
    } catch (error) {
        console.error('Error updating user data:', error);
    }
};

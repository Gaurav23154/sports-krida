const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mock data for fallback
const mockMatches = [
  {
    id: 1,
    homeTeam: "Manchester United",
    awayTeam: "Liverpool",
    date: "2024-03-20T19:45:00",
    venue: "Old Trafford"
  },
  {
    id: 2,
    homeTeam: "Arsenal",
    awayTeam: "Chelsea",
    date: "2024-03-21T20:00:00",
    venue: "Emirates Stadium"
  },
  {
    id: 3,
    homeTeam: "Manchester City",
    awayTeam: "Tottenham",
    date: "2024-03-22T15:00:00",
    venue: "Etihad Stadium"
  },
  {
    id: 4,
    homeTeam: "Newcastle",
    awayTeam: "Aston Villa",
    date: "2024-03-23T15:00:00",
    venue: "St James' Park"
  },
  {
    id: 5,
    homeTeam: "West Ham",
    awayTeam: "Brighton",
    date: "2024-03-24T14:00:00",
    venue: "London Stadium"
  }
];

app.get('/api/matches', async (req, res) => {
  try {
    // For now, we'll use mock data since the API requires subscription
    console.log('Returning mock match data');
    res.json(mockMatches);
    
    /* Commented out API call for now
    const response = await axios.get(API_URL, {
      params: {
        league: '39',
        season: '2023',
        next: '10'
      },
      headers: {
        'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
        'x-rapidapi-key': API_KEY
      }
    });

    if (!response.data || !response.data.response) {
      throw new Error('Invalid response format from API');
    }

    const matches = response.data.response.map(match => ({
      id: match.fixture.id,
      homeTeam: match.teams.home.name,
      awayTeam: match.teams.away.name,
      date: match.fixture.date,
      venue: match.fixture.venue.name
    }));

    res.json(matches);
    */
  } catch (error) {
    console.error('Error details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    
    // If API fails, return mock data as fallback
    console.log('API failed, returning mock data');
    res.json(mockMatches);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 
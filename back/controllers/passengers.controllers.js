const mongoose = require('mongoose');

getStatsSexe = async (req, res) => {
    try{
        const c = mongoose.connection.db.collection('passengers');
        const q = await c.aggregate([
            {
            $group: {
                _id: "$Sex",
                count: { $sum: 1 }
            }
            }
        ]).toArray();
        res.json(q);
    }catch (error) {
        res.status(500).json({ error: 'Une erreur est survenue.' });
    }
}

getStatsAge = async (req, res) => {
    try{
        const c = mongoose.connection.db.collection('passengers');
        const q = await c.aggregate([
            {
              $group: {
                _id: {
                  $switch: {
                    branches: [
                      { case: { $lte: ['$Age', 18] }, then: '0-18' },
                      { case: { $lte: ['$Age', 30] }, then: '19-30' },
                      { case: { $lte: ['$Age', 50] }, then: '31-50' },
                      { case: { $gt: ['$Age', 50] }, then: '51+' }
                    ],
                    default: 'Unknown'
                  }
                },
                count: { $sum: 1 }
              }
            }
          ]).toArray();
        res.json(q);
    }catch (error) {
        res.status(500).json({ error: 'Une erreur est survenue.' });
    }
}


getStatsClass = async (req, res) => {
    try{
        const c = mongoose.connection.db.collection('passengers');
        const q = await c.aggregate([
            {
            $group: {
                _id: "$Pclass",
                count: { $sum: 1 }
            }
            }
        ]).toArray();
        res.json(q);
    }catch (error) {
        res.status(500).json({ error: 'Une erreur est survenue.' });
    }
}

module.exports = {getStatsSexe, getStatsAge, getStatsClass}
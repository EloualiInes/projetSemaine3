const mongoose = require('mongoose');

// Count the number of women and men
getStatsSexe = async (req, res) => {
    try {
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
    } catch (error) {
        res.status(500).json({ error: 'Une erreur est survenue.' });
    }
}

// Count the number of people by age group
getStatsAge = async (req, res) => {
    try {
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
    } catch (error) {
        res.status(500).json({ error: 'Une erreur est survenue.' });
    }
}

// Count the number of people by class
getStatsClass = async (req, res) => {
    try {
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
    } catch (error) {
        res.status(500).json({ error: 'Une erreur est survenue.' });
    }
}

//  Count the number of people who survived
getStatsSurvived = async (req, res) => {
    try {
        const c = mongoose.connection.db.collection('passengers');
        const q = await c.aggregate([
            {
                $group: {
                    _id: "$Survived",
                    count: { $sum: 1 }
                }
            }
        ]).toArray();
        res.json(q);
    } catch (error) {
        res.status(500).json({ error: 'Une erreur est survenue.' });
    }
}

// Searches for passengers who match optional criteria
searchPassengers = async (req, res) => {
    const dataTrim = trimObjectValues(req.body);
    try {
        const c = mongoose.connection.db.collection('passengers');
        const matchConditions = {};

        if (dataTrim.nom) {
            const regexName = new RegExp(dataTrim.nom, 'i');
            matchConditions.Name = regexName;
        }
        if (dataTrim.sexe) matchConditions.Sex = dataTrim.sexe;
        if (dataTrim.classe) matchConditions.Pclass = dataTrim.classe;
        if (dataTrim.age) matchConditions.Age = dataTrim.age;
        if (typeof dataTrim.survivant !== 'undefined') matchConditions.Survived = dataTrim.survivant;

        const q = await c.aggregate([
            {
                $match: matchConditions
            }
        ]).toArray();

        res.json(q);
    } catch (error) {
        res.status(500).json({ error: 'Une erreur est survenue.' });
    }
};


module.exports = { getStatsSexe, getStatsAge, getStatsClass, getStatsSurvived, searchPassengers }
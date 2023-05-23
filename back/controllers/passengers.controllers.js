const mongoose = require('mongoose');

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

searchPassengers = async (req, res) => {
    const dataTrim = trimObjectValues(req.body);
    try {
        const c = mongoose.connection.db.collection('passengers');
        let q;
        if(dataTrim.sexe && dataTrim.classe){
            if(dataTrim.age){
                if(dataTrim.nom){
                    const regexName = new RegExp(dataTrim.nom, 'i'); 
                    q = await c.aggregate([
                        {
                            $match: {
                                Name: regexName,
                                Sex: dataTrim.sexe,
                                Pclass: dataTrim.classe,
                                Age: dataTrim.age
                            }
                        }
                    ]).toArray();
                }else{
                    q = await c.aggregate([
                        {
                            $match: {
                                Sex: dataTrim.sexe,
                                Pclass: dataTrim.classe,
                                Age: dataTrim.age
                            }
                        }
                    ]).toArray();
                }
            }else{
                q = await c.aggregate([
                    {
                        $match: {
                            Sex: dataTrim.sexe,
                            Pclass: dataTrim.classe
                        }
                    }
                ]).toArray();
            }
           
        }
        

        res.json(q);
    } catch (error) {
        res.status(500).json({ error: 'Une erreur est survenue.' });
    }
}

module.exports = { getStatsSexe, getStatsAge, getStatsClass, searchPassengers }
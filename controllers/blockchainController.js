const blockchainService = require('../services/blockchainService');

exports.test = (req, res) => {
    res.json({ message: "La ruta blockchain está funcionando" });
};

exports.getBalance = async (req, res) => {
    try {
        const address = req.query.address;
        const balance = await blockchainService.getBalance(address);
        res.json({ balance });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.transferTokens = async (req, res) => {
    try {
        const { from, to, amount, privateKey } = req.body;
        const receipt = await blockchainService.transferTokens(from, to, amount, privateKey);
        res.json({ receipt });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}; 

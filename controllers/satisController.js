const db = require('../db'); 

exports.getSatisKayitlari = async (req, res) => {
    try {
        
        const [satislar] = await db.query("SELECT * FROM sales..."); 
        
        res.render('satis_kayitlari', { satislar: satislar });
    } catch (error) {
        res.send("Hata: " + error.message);
    }
};
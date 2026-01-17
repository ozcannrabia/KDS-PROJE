const express = require('express');
const path = require('path');
const db = require('./db'); // Veritabanı bağlantısı
const app = express();

// 1. GÖRÜNÜM MOTORU AYARLARI
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 2. VERİ OKUMA İZİNLERİ (Form ve JSON için şart)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 3. STATİK DOSYALAR (CSS, Resim vb.)
app.use(express.static(path.join(__dirname, 'public')));

// 4. ROUTER BAĞLANTISI (Sadece 1 Kere Yazılmalı!)
const mainRoutes = require('./routes/index');
app.use('/', mainRoutes);

// 5. GÜVENLİ BAŞLATMA (Veritabanı Testi ile)
async function baslat() {
    try {
        console.log("⏳ Veritabanı kontrol ediliyor...");
        await db.query("SELECT 1"); 
        console.log("✅ Veritabanı Bağlantısı BAŞARILI!");

        // --- YENİ PORT: 3005 (Eski 3001 takılı kalmasın diye) ---
        const PORT = 3005; 
        
        app.listen(PORT, () => {
            console.log(`\n--------------------------------------------------`);
            console.log(`🚀 SUNUCU ÇALIŞIYOR: http://localhost:${PORT}`);
            console.log(`📦 Ürün Analizi:     http://localhost:${PORT}/urun-analizi`);
            console.log(`--------------------------------------------------\n`);
        });

    } catch (error) {
        console.error("❌ HATA: Veritabanına bağlanılamadı. XAMPP açık mı?");
        console.error(error.message);
    }
}

baslat();
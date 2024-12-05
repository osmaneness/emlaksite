const express = require('express');
const { PrismaClient } = require('@prisma/client');
const multer = require('multer');
const dotenv = require('dotenv');
const path = require('path'); 
const cors = require('cors');

dotenv.config();

const prisma = new PrismaClient();
const app = express();
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); 

app.use(cors());
app.use(express.json());

//resimler
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10 // Maksimum dosya boyutu (örneğin, 5MB)
  }
});

// İlan ekleme
app.post('/api/listings', upload.fields([
  { name: 'mainImage', maxCount: 1 },
  { name: 'images', maxCount: 20 }
]), async (req, res) => {
  const { title, price, address, description, rooms, bedrooms, size } = req.body;
  const images = req.files['images'] ? req.files['images'].map(file => file.path) : [];
  const mainImage = req.files.mainImage ? req.files.mainImage[0].path : null;

  try {
    const listing = await prisma.listing.create({
      data: {
        title,
        price: parseInt(price),
        address,
        description,
        rooms: parseInt(rooms),
        bedrooms: parseInt(bedrooms),
        size: parseInt(size),
        mainImage, // Ana resmi kaydet
        images:images
        
      },
    });
    res.status(201).json({ listing });
  } catch (error) {
    console.error('Error creating listing:', error); 
    res.status(500).json({ error: error.message || 'İlan oluşturulurken bir hata oluştu.' }); 
  }
});

// Tüm ilanları getir
app.get('/api/listings', async (req, res) => {
    try {
      const listings = await prisma.listing.findMany(); // Tüm ilanları al
      res.json(listings); // İlanları döndür
    } catch (error) {
      console.error("Error fetching listings:", error); // Hata mesajını konsola yaz
      res.status(500).json({ error: 'Error fetching listings' }); // Hata durumunda mesaj gönder
    }
  });

  app.get('/api/listings/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const listing = await prisma.listing.findUnique({ where: { id: parseInt(id) } });
      if (!listing) {
        return res.status(404).json({ error: 'İlan bulunamadı' });
      }
      res.json(listing);
    } catch (error) {
      console.error("Error fetching listing:", error);
      res.status(500).json({ error: 'İlan getirilirken bir hata oluştu' });
    }
  });
// İlan silme 
app.delete('/api/listings/:id', async (req, res) => {
  const { id } = req.params;
  try {
      // id'ye göre sil
      const deletedListing = await prisma.listing.delete({
          where: { id }, // ID'nin integer olduğundan emin ol
      });
      res.status(200).json({ message: 'İlan başarıyla silindi', deletedListing });
  } catch (error) {
      console.error('Error deleting listing:', error);
      res.status(500).json({ error: 'İlan silinirken bir hata oluştu.' });
  }
});


// Server başlatma
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

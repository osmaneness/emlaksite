const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Tüm ilanları getiren fonksiyon
const getAllListings = async (req, res) => {
  try {
    const listings = await prisma.listing.findMany(); 
    res.json(listings); 
  } catch (error) {
    console.error("Error fetching listings:", error); 
    res.status(500).json({ error: 'Error fetching listings' }); 
  }
};

module.exports = {
  getAllListings,
};
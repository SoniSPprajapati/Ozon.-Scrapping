exports.scrapeOzon = async (req, res) => {
  const { keyword } = req.body;

  if (!keyword) {
    return res.status(400).json({ message: "Keyword is required" });
  }

  // Simulated data — you can later connect real scraper logic
  const sampleData = [
    {
      title: "Himalaya Herbal Toothpaste",
      price: "199₽",
      image: "https://via.placeholder.com/150",
      link: "https://www.ozon.ru/product/sample-himalaya",
    },
    {
      title: "Himalaya Face Wash",
      price: "299₽",
      image: "https://via.placeholder.com/150",
      link: "https://www.ozon.ru/product/sample-himalaya-2",
    },
  ];

  return res.json({ data: sampleData });
};

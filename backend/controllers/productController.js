exports.getAllProducts = (req, res) => {
    const products = [
        {id: 1, name: "Cleanser", price:12 },
        {id: 2, name: "Moisturizer", price: 20},
        {id: 3, name: "Sunscreen", price: 18},
    ];
    res.status(200).json(products);
};
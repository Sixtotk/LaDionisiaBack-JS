const { Product } = require('../db')
const { default: axios } = require("axios");
const { Op } = require("sequelize");

const updateProduct = async (req,res) =>{
  try {
    const { id } = req.params

  const { winery, wine, rating, country, region, image, year, description, type, disabled, featured, onSale, totalSalesCurrent, stock } = req.body

  const productFound = await Product.findByPk(id);

    if(productFound){
        const productUpdated = await productFound.update(
          {
            winery:winery,
            wine:wine,
            rating:rating,
            country:country,
            region:region,
            image:image,
            year:year,
            description:description,
            type:type,
            disabled:disabled,
            featured:featured,
            onSale:onSale,
            totalSalesCurrent:totalSalesCurrent,
            stock:stock
          });
          
        return res.status(200).json(productUpdated)
      }
    
    
  } catch (err) {
    res.status(500).send({ msg: "Server error", error: err.message });
  }
}

const getAllProducts = async (req, res) => {
  try {
    
    let wine = req.query.wine;
    
    if(wine){
      let wineFind = await Product.findAll({
        where: {
          disabled: false, 
          wine: { [Op.iLike]: `%${wine}%`}
        }})
      if(!wineFind.length){
        res.status(404).send('Product not found');
      }else{
        res.status(200).json(wineFind)
      }
     }
    if(!wine){
    let allWinesDb = await Product.findAll({
      where: {
        disabled: false
      },
      attributes: ["id", "type","wine", "winery", "year", "country", "region", "rating", "image","description" ]
    })

      if (!allWinesDb.length){
					let dataWine = await axios.get('https://mediaciones.ar/wine/getall');
					let data = dataWine.data.map(e =>{ 
						return {
            type: e.type,
						wine: e.wine,
						winery: e.winery,
            year: e.year,
						country: e.country,
            region: e.region,
            rating: e.rating,
            image: e.image,
			    }})
					for(let i = 0; i < data.length; i++){
						await Product.create({
              type: data[i].type, 
							wine: data[i].wine,
              winery: data[i].winery,
              year: data[i].year,
              country: data[i].country,
              region: data[i].region,
							rating: data[i].rating,
							image: data[i].image,
							description: "The wineries " + data[i].winery +  " are located in the valleys of the " + data[i].region + " suitable for the cultivation of wine " + data[i].wine + ", producing privileged fruits for the elaboration of a good wine " + data[i].type + " . Made in " + data[i].country + " (DRINKING ALCOHOLIC BEVERAGES IN EXCESS IS HARMFUL)"
						})
					}
					allWinesDb = await Product.findAll({
            where: {
              disabled: false
            },
						attributes: ["id", "type","wine", "winery", "year", "country", "region", "rating", "image","description" ]

					});                 

        
				return res.status(200).json(allWinesDb)
			}
      
			else res.status(200).json(allWinesDb);
    }} catch (err) {
        res.status(500).send({ msg: "Server error", error: err.message });
      }
}

const getProductsById = async (req, res) => {
  try {
    const { id } = req.params
    const productById = await Product.findByPk( id );
    if(!productById) return res.status(400).json("product not found");
    res.status(200).json(productById);
  } catch (err) {
    res.status(500).send({ msg: "Error in the server", error: err.message });
  }
};

const postProduct = async (req, res) => {
  const {
    type,
    wine,
    winery,
    year,
    rating,
    country,
    region,
    image
  } = req.body;

  try {
    if (type && wine && winery && year && rating && country && region && image) {
      const productCreated = await Product.create({
        type,
        wine,
        winery,
        year,
        rating,
        country,
        region,
        image,
        description: "The wineries " + winery +  " are located in the valleys of the " + region + " suitable for the cultivation of wine " + wine + ", producing privileged fruits for the elaboration of a good wine " + type + " . Made in " + country + " (DRINKING ALCOHOLIC BEVERAGES IN EXCESS IS HARMFUL)"
      });
      return res.status(200).json(productCreated);
    } else
      res.status(400).json({ msg: "Some fields are incorrect, try again" });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const getDisabledProducts = async (req, res) => {
  try {
    const disabledProducts = await Product.findAll({
      where: { disabled: true }
    });
    res.status(200).json(disabledProducts);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const getFeatured = async (req, res) => {
  try {
    const featureds = await Product.findAll({ 
      where: {
        featured: true,
        disabled: false  
        
      }});
    res.status(200).json(featureds);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const getBestRated = async (req, res) => {
  try {

    let {from, to} = req.query
    const firstValue = Number(from)
    const secondValue = Number(to)
    const array = [firstValue, secondValue]
    const [f, s] = array

    
    const bestRated = await Product.findAll({

      where: { 
      disabled: false,
      rating: { [Op.between]: [f, s] } 
      }});
    res.status(200).json(bestRated);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const getOnSale = async (req, res) => {
  try {
    const onSale = await Product.findAll({ where: {
      disabled: false, 
      onSale: true 
    }});
    res.status(200).json(onSale);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const getWineTypes = async (req, res) => {
  try {
    const {type} = req.params;
    const foundWineType = await Product.findAll({

      where: { 
        disabled: false,
        type: { [Op.like]: type } 
      }});
    res.status(200).json(foundWineType);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const getWineByCountry = async (req, res) => {
  try {
    const {country} = req.params;
    const wineByCountry = await Product.findAll({
      where: { 
        disabled: false, 
        country: { [Op.like]: country} 
      }});

    res.status(200).json(wineByCountry);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const getWineByRegion = async (req, res) => {
  try {
    const {region} = req.params;
    const wineByregion = await Product.findAll({
      where: { 
        disabled: false,
        region: { [Op.like]: region } 
      }});
    res.status(200).json(wineByregion);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const getWineByYear = async (req, res) => {
  try {
    let {from, to} = req.query;

    const firstValue = Number(from)
    const secondValue = Number(to)
    const array = [firstValue, secondValue]
    const [f, s] = array
    
    const wineYear = await Product.findAll({
      where: {
        disabled: false, 
        year: { [Op.between]: [firstValue, secondValue] } 
      }});
    res.status(200).json(wineYear);
  } catch (err) {
    res.status(500).json(err.message);
  }
};


module.exports = {
  getAllProducts,
  postProduct,
  updateProduct,
  getDisabledProducts,
  getWineTypes,
  getOnSale,
  getBestRated,
  getFeatured,
  getWineByYear,
  getProductsById,
  getWineByCountry,
  getWineByRegion
};
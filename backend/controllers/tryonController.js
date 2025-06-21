const axios = require('axios');
const fs = require('fs');
const path = require('path');
const Product = require('../models/Product');
const importDynamic = new Function('modulePath', 'return import(modulePath)');
const { writeFile  , readFile} = require("fs/promises");
const Replicate = require("replicate");
const replicate = new Replicate();

exports.generateTryOn = async (req, res) => {
  try {
    console.log('req.body:', req.body);
    console.log('req.file:', req.file);
    const productId = req.body.productId;
    if (!productId) {
      return res.status(400).json({ error: 'Missing productId' });
    }
     const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });

   const productImage = product.image;
    const userImagePath = req.file.path;

    const garm_img = await readFile(`./uploads/${productImage}`);
    const user_img = await readFile(userImagePath);
    console.log(product);
const input = {
    garm_img: garm_img,
    human_img: user_img ,
    garment_des: product.name
};
const output = await replicate.run("cuuupid/idm-vton:0513734a452173b8173e907e3a59d19a36266e55b48528559432bd21c7d7e985", { input });
const imagePath = `./uploads/tryone/${product.image}`
await writeFile(imagePath, output);

await Product.findByIdAndUpdate(productId , {
  tryOneImage: product.image
}); 

 res.status(200).json({ message: " updated", product });

  }
catch (error) {
    console.error('Error during virtual try-on:', error);
    res.status(500).json({ error: 'Failed to generate try-on image' });
  }
};

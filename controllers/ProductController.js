const fs = require("fs");
class ProductController {
  static async getAll(req, res) {
    try {
      let products = fs.readFileSync("./products.json", "utf8");
      products = JSON.parse(products);
      res.status(200).json(products);
    } catch {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async add(req, res) {
    try {
      let products = fs.readFileSync("./products.json", "utf8");
      products = JSON.parse(products);
      const { nama, hargaBeli, hargaJual, stok } = req.body;
      const foto = req.file;
      const fotoPath = foto ? foto.path : null;
      let id = products[products.length - 1].id + 1;

      const existingProduct = products.find((product) => product.nama === nama);
      if (existingProduct) {
        return res.status(400).json({ message: "Product name already exists" });
      }
      const newProduct = {
        id,
        nama,
        hargaBeli,
        hargaJual,
        stok,
        fotoPath,
      };

      products.push(newProduct);
      fs.writeFileSync(
        "./products.json",
        JSON.stringify(products, null, 2),
        "utf8"
      );
      res.status(201).json(products);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async delete(req, res) {
    try {
      let products = fs.readFileSync("./products.json", "utf8");
      products = JSON.parse(products);

      const productId = +req.params.id;

      const productIndex = products.findIndex(
        (product) => product.id === productId
      );

      if (productIndex === -1) {
        return res.status(404).json({ message: "Product not found" });
      }

      products.splice(productIndex, 1);

      fs.writeFileSync(
        "./products.json",
        JSON.stringify(products, null, 2),
        "utf8"
      );

      res.status(200).json({
        message: `Delete Successfully at ${productId} `,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  static async update(req, res) {
    try {
      let products = fs.readFileSync("./products.json", "utf8");
      products = JSON.parse(products);

      const productId = +req.params.id;
      const { nama, hargaBeli, hargaJual, stok } = req.body;

      const productIndex = products.findIndex(
        (product) => product.id === productId
      );

      if (productIndex === -1) {
        return res.status(404).json({ message: "Product not found" });
      }

      const foto = req.file;
      let fotoPath = products[productIndex].fotoPath;

      if (foto) {
        fotoPath = foto.path;
      }

      products[productIndex].nama = nama;
      products[productIndex].hargaBeli = hargaBeli;
      products[productIndex].hargaJual = hargaJual;
      products[productIndex].stok = stok;
      products[productIndex].fotoPath = fotoPath; // Update the fotoPath

      fs.writeFileSync(
        "./products.json",
        JSON.stringify(products, null, 2),
        "utf8"
      );

      res.status(200).json(products);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = ProductController;

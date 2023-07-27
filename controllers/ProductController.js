const fs = require("fs");
class ProductController {
  static async getAll(req, res) {
    try {
      // Membaca isi file JSON dan mengubahnya menjadi objek JavaScript
      let products = fs.readFileSync("./products.json", "utf8");
      products = JSON.parse(products);

      // Mendapatkan parameter query dari permintaan HTTP
      const page = parseInt(req.query.page) || 0;
      const limit = parseInt(req.query.limit) || 10;
      const search = req.query.search_query || "";
      const offset = limit * page;

      console.log(search);
      const filteredProducts = products.filter((product) => {
        return product.nama.toLowerCase().includes(search.toLowerCase());
      });

      console.log(filteredProducts)
      const totalRows = filteredProducts.length;
      const totalPage = Math.ceil(totalRows / limit);

      const paginatedProducts = filteredProducts.slice(offset, offset + limit);
      console.log(paginatedProducts);
      res.status(200).json({
        result: paginatedProducts,
        page: page,
        limit: limit,
        totalRows: totalRows,
        totalPage: totalPage,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async add(req, res) {
    try {
      let products = fs.readFileSync("./products.json", "utf8");
      products = JSON.parse(products);
      const { nama, hargaBeli, hargaJual, stok } = req.body;
      const foto = req.file.filename;
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
        foto,
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

      const foto = req.file.filename;
      let fotoPath = products[productIndex].foto;

      if (foto) {
        fotoPath = foto;
      }

      products[productIndex].nama = nama;
      products[productIndex].hargaBeli = hargaBeli;
      products[productIndex].hargaJual = hargaJual;
      products[productIndex].stok = stok;
      products[productIndex].fotoPath = fotoPath;

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

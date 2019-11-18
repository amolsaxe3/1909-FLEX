const Sequelize = require('sequelize');
const { UUID, UUIDV4, STRING, DECIMAL } = Sequelize;
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_products_db');

const idDef = {
  type: UUID,
  primaryKey: true,
  defaultValue: UUIDV4
};

const nameDef = {
  type: STRING,
  unique: true,
  allowNull: false
};
const Product = conn.define('product', {
  id: idDef,
  name: nameDef,
  suggestedPrice: {
    type: DECIMAL,
    allowNull: false
  }
});
const Company = conn.define('company', {
  id: idDef,
  name: nameDef
});

const Offering = conn.define('offering', {
  id: idDef,
  price: {
    type: DECIMAL,
    allowNull: false
  }
});

// Offering.belongsTo(Product);
// Offering.belongsTo(Company);

Product.hasMany(Company);
Company.hasMany(Offering);
Product.hasMany(Offering);

const syncAndSeed = async()=> {
  await conn.sync({ force: true });
  const companies = [
    { name: 'ACME US' },
    { name: 'ACME GLOBAL' },
    { name: 'ACME TRI-STATE' },
  ];
  const products = [
    { name: 'foo', suggestedPrice: 3 },
    { name: 'bar', suggestedPrice: 5 },
    { name: 'bazz', suggestedPrice: 9 },
    { name: 'quq', suggestedPrice: 3 }
  ];
  const [us, global, tri ] = await Promise.all(companies.map(company => Company.create(company)));
  const [foo, bar, bazz ] = await Promise.all(products.map(product => Product.create(product)));

  const offerings = [
    { companyId: us.id, productId: foo.id, price: 2.90 },
    { companyId: global.id, productId: foo.id, price: 2.80 },
    { companyId: global.id, productId: bar.id, price: 4.5 },
    { companyId: tri.id, productId: bazz.id, price: 11 }
  ];

  await Promise.all(offerings.map( offering => Offering.create(offering)));
};


syncAndSeed();

module.exports = {
  syncAndSeed,
  conn,
  models: {
    Product,
    Company,
    Offering
  }
};
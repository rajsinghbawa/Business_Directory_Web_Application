const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const Business = require("./models/Business");
const Product = require("./models/Product");
const FinancialData = require("./models/FinancialData");

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("🌱 Connected to DB for seeding..."))
  .catch(err => console.error(err));

async function seedData() {
  await User.deleteMany({});
  await Business.deleteMany({});
  await Product.deleteMany({});
  await FinancialData.deleteMany({});

  const hashedPassword = await bcrypt.hash("test123", 10);

  const user = await User.create({
    name: "John Doe",
    email: "john@example.com",
    password: hashedPassword,
    role: "user"
  });

  const businessesData = [
    {
      name: "TechCorp",
      email: "tech@corp.com",
      incorporationType: "Corporation",
      description: "A tech innovation company",
      industry: "Technology",
      product: "SaaS Dashboard",
      productDesc: "A cloud-based analytics platform"
    },
    {
      name: "GreenLeaf Farms",
      email: "info@greenleaffarms.com",
      incorporationType: "LLC",
      description: "Organic vegetable farming and distribution",
      industry: "Agriculture",
      product: "Organic Kale",
      productDesc: "Fresh, organic kale bunches"
    },
    {
      name: "HealthFirst Clinic",
      email: "support@healthfirst.com",
      incorporationType: "Non-Profit",
      description: "Community healthcare services",
      industry: "Healthcare",
      product: "Annual Checkup Package",
      productDesc: "Comprehensive medical checkup plan"
    },
    {
      name: "EduSpark",
      email: "contact@eduspark.org",
      incorporationType: "Sole Proprietorship",
      description: "Online education and skill development platform",
      industry: "Education",
      product: "Coding Bootcamp",
      productDesc: "8-week intensive JavaScript course"
    },
    {
      name: "UrbanBites",
      email: "hello@urbanbites.com",
      incorporationType: "Partnership",
      description: "Cloud kitchen and food delivery services",
      industry: "Food & Beverage",
      product: "Meal Subscription Box",
      productDesc: "Weekly curated meal box"
    },
    {
      name: "NovaSolar",
      email: "sales@novasolar.ca",
      incorporationType: "Corporation",
      description: "Renewable energy installation & consultancy",
      industry: "Energy",
      product: "Solar Panel Kit",
      productDesc: "Residential solar power system"
    },
    {
      name: "FitNest",
      email: "team@fitnest.io",
      incorporationType: "LLP",
      description: "Home workout and wellness app",
      industry: "Fitness",
      product: "Premium Subscription",
      productDesc: "Access to all workout programs and diet plans"
    },
    {
      name: "ByteBazaar",
      email: "contact@bytebazaar.dev",
      incorporationType: "Private Limited",
      description: "Custom software and app development services",
      industry: "IT Services",
      product: "E-commerce App",
      productDesc: "Custom-built multi-vendor app"
    },
    {
      name: "AquaPure",
      email: "info@aquapure.ca",
      incorporationType: "Cooperative",
      description: "Sustainable bottled water production",
      industry: "Beverage",
      product: "Spring Water 1L",
      productDesc: "Eco-friendly bottled spring water"
    },
    {
      name: "BloomEvents",
      email: "events@bloomevents.ca",
      incorporationType: "General Partnership",
      description: "Wedding and event planning services",
      industry: "Hospitality",
      product: "Wedding Planning Package",
      productDesc: "Full-service wedding coordination"
    }
  ];

  for (const biz of businessesData) {
    const business = await Business.create({
      name: biz.name,
      email: biz.email,
      password: hashedPassword,
      incorporationType: biz.incorporationType,
      description: biz.description,
      contactDetails: "123-456-7890",
      industry: biz.industry,
      location: "Toronto",
      role: "business"
    });

    await Product.create({
      businessId: business._id,
      name: biz.product,
      description: biz.productDesc,
      price: parseFloat((Math.random() * 100 + 10).toFixed(2)),
      availability: true
    });

    await FinancialData.create({
      businessId: business._id,
      revenueHistory: [
        { year: 2021, revenue: Math.floor(Math.random() * 100000 + 10000) },
        { year: 2022, revenue: Math.floor(Math.random() * 120000 + 15000) },
        { year: 2023, revenue: Math.floor(Math.random() * 150000 + 20000) }
      ],
      CAGR: parseFloat((Math.random() * 0.5).toFixed(2)),
      profitMargin: parseFloat((Math.random() * 0.3).toFixed(2)),
      ROI: parseFloat((Math.random() * 1).toFixed(2)),
      customerRetentionRate: parseFloat((Math.random() * 1).toFixed(2))
    });
  }

  console.log("✅ 10 dummy businesses inserted!");
  process.exit();
}

seedData();

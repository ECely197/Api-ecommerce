import "dotenv/config";
import categoryModel from "../models/ModelCategory.js";
import connectDB from "../config/database.js";

connectDB();

async function categorySeeder() {
  await categoryModel.create(
    {
      name: "Dia de las madres",
      description: "Detalles para regalar en el dia de las madres",
      imgCategory:
        "https://media.istockphoto.com/id/1388697405/es/vector/feliz-d%C3%ADa-de-la-madre-lettering.jpg?s=1024x1024&w=is&k=20&c=Dt2_bV1y-QVLqG_CuMspCq3-L4lRR4QliZCuk8C4AHA=",
    },
    {
      name: "Dia del padre",
      description: "Detalles para regalar en el dia del padre",
      imgCategory:
        "https://i.pinimg.com/736x/d9/76/b0/d976b062dacff915072bc357dc567a75.jpg",
    },
    {
        name: "Dia del amor y la amistad",
        description:"Detalles para regalar el dia del amor y la amistad",
        imgCategory:"https://i.pinimg.com/736x/d7/4d/89/d74d89d88e2b2a1835b65cb1cb13a627.jpg",
    },
    {
        name:"Cumpleaños",
        description:"Detalles para regalar en un cumpleaños",
        imgCategory:"https://i.pinimg.com/736x/5a/f3/7c/5af37c093efd8f6a4c6650cb0a08b933.jpg",
    },
    {
        name:"Dia especial",
        description:"Detalles para regalar en una fecha especial",
        imgCategory:"https://i.pinimg.com/736x/c4/59/01/c459018eab53f5703dea7ad0e927e1b2.jpg",
    }
  );
  console.log("[seeder] category created");
  process.exit(1);
}

categorySeeder();

import mongoose from "mongoose";
import { Question } from "./models/question.model";
import { Sets } from "./models/sets.model";
import { Pdfs } from "./models/pdf.model";
import config from "./config";
import { pdfs, questions, sets } from "./data";
import colors from "colors";
import { Category } from "./models/category.model";
import { category } from "./data/category";

const connectDB = async () => {
  await mongoose.connect(config.app.mongoUri, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useCreateIndex: true,
  });
  console.log("Connected to MongoDb");
};
connectDB();

const importData = async () => {
  try {
    await Question.deleteMany({});
    await Sets.deleteMany({});
    await Pdfs.deleteMany({});
    await Category.deleteMany({});
    const createdPdfs = await Pdfs.insertMany(pdfs);
    const createdCategory = await Category.insertMany(category);
    const newquestions = questions.map((quest, index) => ({
      ...quest,
      category: createdCategory[0]._id,
      sub_category: (createdCategory[0].sub_category[index] as any)._id,
    }));
    const createdQuestions = await Question.insertMany(newquestions);
    const questionsId = createdQuestions.map((question) => question._id);

    const sampleSets = sets.map((set, index) => {
      return { ...set, questions: questionsId };
    });
    const createdSets = await Sets.insertMany(sampleSets);
    console.log(
      colors.green(
        "************************************Data Imported!!***********************************"
      )
    );
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await Question.deleteMany({});
    await Sets.deleteMany({});
    await Pdfs.deleteMany({});
    console.log(
      colors.red(
        "************************************Data Destroyed!!************************************"
      )
    );
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  deleteData();
} else {
  importData();
}

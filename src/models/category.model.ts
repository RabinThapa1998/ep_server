import mongoose, {
  Document,
  Schema,
  Model,
  connect,
  model,
  ObjectId,
} from "mongoose";

interface ICategory {
  subject: string;
  topic: {
    name: string;
  }[];
}
[];
const category: ICategory[] = [
  {
    subject: "Medical",
    topic: [
      { name: "biology" },
      { name: "zoology" },
      { name: "chemistry" },
      { name: "maths" },
    ],
  },
  {
    subject: "Medical",
    topic: [
      { name: "physics" },
      { name: "english" },
      { name: "chemistry" },
      { name: "maths" },
    ],
  },
];

export interface categoryAttrs {
  category?: ICategory[];
}

export interface categoryDoc extends Document, categoryAttrs {
  category: ICategory[];
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface categoryModel extends Model<categoryAttrs> {
  build(attrs: categoryAttrs): categoryDoc;
}

const categorySchema = new Schema<categoryDoc>(
  {
    category: {
      type: [
        {
          subject: String,
          topic: [
            {
              name: String,
            },
          ],
        },
      ],
      default: category,
      required: false,
    },

    active: {
      type: Boolean,
      default: true,
    },
  },

  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.desc;
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

categorySchema.statics.build = (attrs: categoryAttrs) => {
  return new Category(attrs);
};

const Category = model<categoryDoc, categoryModel>("Category", categorySchema);

export { Category };

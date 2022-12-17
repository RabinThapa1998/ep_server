import mongoose, {
  Document,
  Schema,
  Model,
  connect,
  model,
  ObjectId,
} from "mongoose";

interface ISubCategory {
  topic: string;
}

export interface categoryAttrs {
  category: string;
  sub_category: ISubCategory[];
}

export interface categoryDoc extends Document, categoryAttrs {
  category: string;
  sub_category: ISubCategory[];
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
      type: String,
      required: true,
    },
    sub_category: {
      type: [
        {
          topic: String,
        },
      ],
      required: true,
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

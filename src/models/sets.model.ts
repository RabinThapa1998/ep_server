import mongoose, {
  Document,
  Schema,
  Model,
  connect,
  model,
  ObjectId,
} from "mongoose";

export interface setsAttrs {
  name: string;
  questions?: ObjectId[];
}

export interface setsDoc extends Document, setsAttrs {
  name: string;
  questions: ObjectId[];
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface setsModel extends Model<setsAttrs> {
  build(attrs: setsAttrs): setsDoc;
}

const setsSchema = new Schema<setsDoc>(
  {
    name: {
      type: String,
      required: true,
    },
    questions: {
      type: [Schema.Types.ObjectId],
      required: false,
      default: [],
      ref: "Question",
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

//creating a Model corresponding to the doc interface
interface setsModel extends Model<setsAttrs> {
  build(attrs: setsAttrs): setsDoc;
}

setsSchema.statics.build = (attrs: setsAttrs) => {
  return new Sets(attrs);
};

const Sets = model<setsDoc, setsModel>("Sets", setsSchema);

export { Sets };

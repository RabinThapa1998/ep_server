import mongoose, {
  Document,
  Schema,
  Model,
  connect,
  model,
  ObjectId,
} from "mongoose";

export interface pdfAttrs {
  title?: string;
  desc?: string;
  url: string;
}

export interface pdfDoc extends Document, pdfAttrs {
  title: string;
  desc: string;
  url: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface pdfModel extends Model<pdfAttrs> {
  build(attrs: pdfAttrs): pdfDoc;
}

const pdfSchema = new Schema<pdfDoc>(
  {
    title: {
      type: String,
      required: false,
      default: "",
    },
    desc: {
      type: String,
      required: false,
      default: "",
    },
    url: {
      type: String,
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

//creating a Model corresponding to the doc interface
interface pdfModel extends Model<pdfAttrs> {
  build(attrs: pdfAttrs): pdfDoc;
}

pdfSchema.statics.build = (attrs: pdfAttrs) => {
  return new Pdfs(attrs);
};

const Pdfs = model<pdfDoc, pdfModel>("Pdfs", pdfSchema);

export { Pdfs };

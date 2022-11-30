import mongoose, {
  Document,
  Schema,
  Model,
  connect,
  model,
  ObjectId,
} from "mongoose";

export interface questionAttrs {
  question: string;
  options: {
    option: string;
    index: number;
  }[];
  correct: number;
  sets: ObjectId;
  desc: string;
}

export interface questionDoc extends Document, questionAttrs {
  question: string;
  options: {
    index: number;
    option: string;
  }[];
  correct: number;
  sets: ObjectId;
  desc: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface questionModel extends Model<questionAttrs> {
  build(attrs: questionAttrs): questionDoc;
}

const questionSchema = new Schema<questionDoc>(
  {
    question: {
      type: String,
      required: true,
    },
    options: {
      type: [
        {
          option: {
            type: String,

            required: true,
          },
          index: {
            type: Number,
            required: true,
          },
        },
      ],
      required: true,
    },
    correct: {
      type: Number,
      required: true,
    },

    sets: {
      type: Schema.Types.ObjectId,
      ref: "Sets",
      required: true,
    },
    desc: {
      type: String,
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

questionSchema.statics.build = (attrs: questionAttrs) => {
  return new Question(attrs);
};

const Question = model<questionDoc, questionModel>("Question", questionSchema);

export { Question };

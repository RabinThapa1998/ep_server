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
  answers: {
    answer: string;
    id: string;
    correct: boolean;
  }[];
  sets: ObjectId;
}

export interface questionDoc extends Document, questionAttrs {
  question: string;
  answers: {
    answer: string;
    id: string;
    correct: boolean;
  }[];
  sets: ObjectId;
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
    answers: {
      type: [
        {
          answer: {
            type: String,
            required: true,
          },
          id: {
            type: String,
            required: true,
          },
          correct: {
            type: Boolean,
            required: true,
          },
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

questionSchema.statics.build = (attrs: questionAttrs) => {
  return new Question(attrs);
};

const Question = model<questionDoc, questionModel>("Question", questionSchema);

export { Question };

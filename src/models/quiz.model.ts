import mongoose, {
  Document,
  Schema,
  Model,
  connect,
  model,
  ObjectId,
} from "mongoose";

export interface quizAttrs {
  questions: {
    question: string;
    answers: {
      answer: string;
      id: string;
      correct: boolean;
    }[];
  }[];
}

export interface quizDoc extends Document, quizAttrs {
  questions: {
    question: string;
    answers: {
      answer: string;
      id: string;
      correct: boolean;
    }[];
  }[];
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface quizModel extends Model<quizAttrs> {
  build(attrs: quizAttrs): quizDoc;
}

const quizSchema = new Schema<quizDoc>(
  {
    questions: {
      type: [
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

//creating a Model corresponding to the doc interface
interface quizModel extends Model<quizAttrs> {
  build(attrs: quizAttrs): quizDoc;
}

quizSchema.statics.build = (attrs: quizAttrs) => {
  return new Quiz(attrs);
};

const Quiz = model<quizDoc, quizModel>("Quiz", quizSchema);

export { Quiz };

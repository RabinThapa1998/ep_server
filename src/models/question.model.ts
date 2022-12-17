import mongoose, {
  Document,
  Schema,
  Model,
  connect,
  model,
  ObjectId,
} from "mongoose";

enum category {
  Medical = "Medical",
  Engineering = "Engineering",
  Others = "Others",
}

export interface questionAttrs {
  question: string;
  options: {
    option: string;
    index: number;
  }[];
  correct: number;
  sets: ObjectId;
  description?: string;
  category?: ObjectId;
  sub_category?: ObjectId;
}

export interface questionDoc extends Document, questionAttrs {
  question: string;
  options: {
    index: number;
    option: string;
  }[];
  correct: number;
  sets: ObjectId;
  description: string;
  category?: ObjectId;
  sub_category?: ObjectId;
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
    description: {
      type: String,
      required: false,
      default: "",
    },
    category: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    sub_category: {
      type: Schema.Types.ObjectId,
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

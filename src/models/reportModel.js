import mongoose from "mongoose";

const { Schema, model } = mongoose;

function reportSchema() {
const schema = new Schema(
    {
        idReporter: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },

    idReported: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },

    reason: {
        type: String,
        required: true,
        trim: true,
    },

    status: {
        type: String,
        enum: ["pendiente", "advertido", "eliminado", "sancionado"],
        default: "pendiente",
        },
    },
    { timestamps: true },
);

    return model("Report", schema);
}

export const Report = reportSchema();

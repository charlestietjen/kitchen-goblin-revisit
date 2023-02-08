import mongoose, { Schema, Types, model, Document } from "mongoose";

interface IRecipe extends Document {
    name: string,
    shortDescription: string,
    description: string,
    ingredients: [{ name: string, quantity: number }]
    directions: [{ title: string, description: string, imageUrl: string }],
    author: Types.ObjectId
}

const recipeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    shortDescription: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    ingredients: {
        type: Array,
        required: true
    },
    directions: {
        type: Array,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        required: true
    },
});

export const Recipe = mongoose.model<IRecipe>('Recipe', recipeSchema);
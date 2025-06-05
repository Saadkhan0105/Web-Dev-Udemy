import {IndexType, Permission} from "node-appwrite";
import {db, questionCollection} from "../name";
import { databases } from "./config";



export default async function createQuestionCollection(){

    await databases.createCollection(db, questionCollection, questionCollection, [
        Permission.read("any"),
        Permission.read("users"),
        Permission.create("users"),
        Permission.update("users"),
        Permission.delete("users"),
    ])

    console.log(`Collection ${questionCollection} created successfully.`);

    // Creating attributes and Indexes

    await Promise.all([
        databases.createStringAttribute(db, questionCollection, "title", 256, true),
        databases.createStringAttribute(db, questionCollection, "content", 10000, true),
        databases.createStringAttribute(db, questionCollection, "authorId", 50, true),
        databases.createStringAttribute(db, questionCollection, "tags", 50, false, undefined, true),
        databases.createStringAttribute(db, questionCollection, "attachmentId", 50, true),
    ]);

    console.log(`Attributes for collection ${questionCollection} created successfully.`);

    // Creating indexes
/*
    await Promise.all([
        databases.createIndex(
            db,
            questionCollection,
            "title",
            IndexType.Fulltext,
            ["title"],
            ["asc"]
        ),
        databases.createIndex(
            db,
            questionCollection,
            "content",
            IndexType.Fulltext,
            ["content"],
            ["asc"]
        )
    ]);
    */
}
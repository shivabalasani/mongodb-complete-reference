db.createCollection("posts", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["title", "text", "creator", "comments"],
      properties: {
        title: {
          bsonType: "string",
          description: "must be a string and is required"
        },
        text: {
          bsonType: "string",
          description: "must be a string and is required"
        },
        creator: {
          bsonType: "objectId",
          description: "must be an objectid and is required"
        },
        comments: {
          bsonType: "array",
          description: "must be an array and is required",
          items: {
            bsonType: "object",
            required: ["text", "author"],
            properties: {
              text: {
                bsonType: "string",
                description: "must be a string and is required"
              },
              author: {
                bsonType: "objectId",
                description: "must be an objectid and is required"
              }
            }
          }
        }
      }
    }
  }
});

//Valid Insert
db.posts.insertOne({
  title: "My first Post!",
  text: "This is my first post",
  tags: ["new", "tech"],
  creator: ObjectId("5e28b01b4e12e004c851c5ef"),
  comments: [
    { text: "I like this post", author: ObjectId("5e28b01b4e12e004c851c5ef") }
  ]
});

//InValid Insert
db.posts.insertOne({
  title: "My first Post!",
  text: "This is my first post",
  tags: ["new", "tech"],
  creator: ObjectId("5e28b01b4e12e004c851c5ef"),
  comments: [{ text: "I like this post", author: "Invalid" }]
});

WriteError({
  index: 0,
  code: 121,
  errmsg: "Document failed validation",
  op: {
    _id: ObjectId("5e28bb004e12e004c851c5f1"),
    title: "My first Post!",
    text: "This is my first post",
    tags: ["new", "tech"],
    creator: ObjectId("5e28b01b4e12e004c851c5ef"),
    comments: [
      {
        text: "I like this post",
        author: "Invalid"
      }
    ]
  }
});

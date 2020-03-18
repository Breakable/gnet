const AWS = require('aws-sdk');
const BOOKS_TABLE = process.env.BOOKS_TABLE;
const db = new AWS.DynamoDB.DocumentClient();
var failure = function(res, code, message) {
  console.log(message);
  res.status(code).json({ error: message });
};


//get all books
module.exports.getAllBooks = function (req, res) {
  const params = {
    TableName: BOOKS_TABLE,
  };

  db.scan(params, (error, result) => {
    if (error) {
      failure(res, 400, 'Could not get books');
      return;
    }

    if(result.Items) {
      res.json(result.Items);
    }
    else {
      failure(res, 404, 'Books not found');
    }
  });
};

//get one bok
module.exports.getBook = function (req, res) {
  const params = {
    TableName: BOOKS_TABLE,
    Key: {
      bookUuid: req.params.bookUuid,
    },
  };

  db.get(params, (error, result) => {
    if (error) {
      failure(res, 404, 'Could not get book');
    }
    if (result.Item) {
      const {bookUuid, title, author} = result.Item;
      res.json({ bookUuid, title, author });
    } else {
      failure(res, 404, 'Book not found');
    }
  });
};


//update one book
module.exports.updateBook = function (req, res) {
  const { title, author } = req.body;
  if (typeof title !== 'string') {
    failure(res, 400, '"title" must be a string');
    return;
  } else if (typeof author !== 'string') {
    failure(res, 400, '"author" must be a string');
    return;
  }

  const params = {
    TableName: BOOKS_TABLE,
    Key: {
      bookUuid: req.params.bookUuid,
    },
    UpdateExpression: "set title = :t, author=:a",
    ExpressionAttributeValues:{
      ":t":title,
      ":a":author,
    }
  };

  db.update(params, (error) => {
    if (error) {
      failure(res, 400, 'Could not update book');
    } else {
      res.json({title, author});
    }
  });
};

//delete one book
module.exports.deleteBook = function (req, res) {
  const params = {
    TableName: BOOKS_TABLE,
    Key: {
      bookUuid: req.params.bookUuid,
    },
  };

  db.delete(params, (error) => {
    if (error) {
      failure(res, 400, 'Could not delete book');
    } else {
      res.status(200).json({message: "Book deleted"});
    }
  });
};


//add book
module.exports.addBook = function (req, res) {
  const { bookUuid, title, author } = req.body;
  if (typeof bookUuid !== 'string') {
    failure(res, 400, '"bookUuid" must be a string');
    return;
  } else if (typeof title !== 'string') {
    failure(res, 400, '"title" must be a string' );
    return;
  } else if (typeof author !== 'string') {
    failure(res, 400, '"author" must be a string');
    return;
  }

  const params = {
    TableName: BOOKS_TABLE,
    Item: {
      bookUuid: bookUuid,
      title: title,
      author: author
    },
  };

  db.put(params, (error) => {
    if (error) {
      failure(res, 400, 'Could not create book');
      return;
    }
    res.json({ bookUuid, title, author });
  });

};

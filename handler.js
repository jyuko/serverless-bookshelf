import AWS from 'aws-sdk'

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const create = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const body = JSON.parse(event.body);
  body.createdAt = timestamp;
  body.updatedAt = timestamp;

  const params = {
    TableName: 'books',
    Item: body
  };

  dynamoDb.put(params, (error, result) => {
    if (error) {
      console.error(error);
      callback(new Error('Couldn\'t create item.'));
      return;
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify({message: 'Success.'}),
    };
    callback(null, response);
  });
};

export const list = (event, context, callback) => {
  const params = {
    TableName: 'books'
  };

  dynamoDb.scan(params, (error, result) => {
    if (error) {
      console.error(error);
      callback(new Error('Couldn\'t get items.'));
      return;
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Items),
    };
    callback(null, response);
  });
};

export const select = (event, context, callback) => {
  const params = {
    TableName: 'books',
    FilterExpression : "begins_with(volumeInfo.title, :val) or begins_with(volumeInfo.authors[0], :val)",
    ExpressionAttributeValues : {":val" :event.queryStringParameters.q}
  };

  dynamoDb.scan(params, (error, result) => {
    if (error) {
      console.error(error);
      callback(new Error('Couldn\'t get items.'));
      return;
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Items),
    };
    callback(null, response);
  });
};

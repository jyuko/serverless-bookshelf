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

# [WIP]serverless-bookshelf
REST-API for managing books using Serverless Framework.

This application uses the following services.

* Amazon API GateWay
* AWS Lambda
* Amazon Dynamo DB

## Install
```
$ npm install -g serverless
```

```
$ git clone https://github.com/jyuko/serverless-bookshelf
$ cd serverless-bookshelf && npm install
$ serverless deploy
```

## Interface

### POST method
`POST https://{domain}/{stage}/bookshelf`  
Create new item to books DB.

### GET method
`GET https://{domain}/{stage}/bookshelf/{id}`  
Get item with specified id from books DB.

`GET https://{domain}/{stage}/bookshelf/list`  
Scan all items from books DB.

`GET https://{domain}/{stage}/bookshelf?q={query}`  
Scan items matched query-string from books DB.  

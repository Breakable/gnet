#!/bin/sh
export BASE_DOMAIN=https://qi1e2jpsfl.execute-api.us-east-1.amazonaws.com/dev

#create book
echo Create book:
curl --silent -H "Content-Type: application/json" -X POST ${BASE_DOMAIN}/book/add -d '{"bookUuid": "book1", "title": "Best title", "author": "John Smith"}'

#get all books
echo $'\n'Get All Books:
curl --silent -H "Content-Type: application/json" -X GET ${BASE_DOMAIN}/books

#update one book
echo $'\n'Update One Book:
curl --silent -H "Content-Type: application/json" -X POST ${BASE_DOMAIN}/book/book1/update -d '{"bookUuid": "book1", "title": "Best new title", "author": "John Smith"}'

#get one book
echo $'\n'Get One Book:
curl --silent -H "Content-Type: application/json" -X GET ${BASE_DOMAIN}/book/book1

#delete
echo $'\n'Delete Book:
curl --silent -H "Content-Type: application/json" -X POST ${BASE_DOMAIN}/book/book1/delete

#get all books again
echo $'\n'Check books after deletion:
curl --silent -H "Content-Type: application/json" -X GET ${BASE_DOMAIN}/books

> https://medium.com/@webdevmark16/ingesting-real-time-data-into-elasticsearch-with-node-js-a7aa9b5acf8c
> https://www.compose.com/articles/getting-started-with-elasticsearch-and-node/

* Your data should now be ingesting automatically in real-time!

* Create index in Elastic Search (sample)
PUT earthquakes
{
  "mappings": {
    "properties": {
      "location": {
        "type": "geo_point" 
      }
    }
  }
}


** Requirements

* Setting up your Node environment
> First, install Node and npm.

* You'll need npm and the following Node modules for this walkthrough:

> elasticsearch
> get-json

* Install the modules using npm:

> npm install elasticsearch get-json  
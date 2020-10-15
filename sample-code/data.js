require('log-timestamp');
const config = require('../config');
const express = require('express');
const router = express.Router();
const axios = require('axios')
const client = require(config.elasticsearch_path_client);
const URL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson';

//================== Official API Call ==================\\
//router.get('/earthquakes', async function (req, res) { // 
console.log('Loading Application...')
res.json('Running Application...')

//======= Check that Elasticsearch is up and running =======\\
pingElasticsearch = async () => {
    await client.ping(
        function(error,res) {
            if (error) {
                console.error('elasticsearch cluster is down!');
            } else {
                console.log('Elasticsearch Ready');
            }
        }
    );
}

// ====== Get Data From JIRA and then index into Elasticsearch
indexAllDocs = async () => {
    try {
        console.log('Getting Data From Host')
        
        const EARTHQUAKES = await axios.get(`${URL}`,{
            headers: {
                'Content-Type': [
                    'application/json',  
                    'charset=utf-8' 
                ]
            }
        });

        console.log('Data Received!')

        results = EARTHQUAKES.data.features

        console.log('Indexing Data...')

        results.map(async results => (
            earthquakeObject = {
                place: results.properties.place,
                time: results.properties.time,
                tiamp: results.properties.time,
                updmestated: results.properties.updated,
                tz: results.properties.tz,
                url: results.properties.url,
                detail: results.properties.detail,
                felt: results.properties.felt,
                cdi: results.properties.cdi,
                alert: results.properties.alert,
                status: results.properties.status,
                tsunami: results.properties.tsunami,
                sig: results.properties.sig,
                net: results.properties.net,
                code: results.properties.code,
                sources: results.properties.sources,
                nst: results.properties.nst,
                dmin: results.properties.dmin,
                rms: results.properties.rms,
                mag: results.properties.mag,
                magType: results.properties.magType,
                type: results.properties.type//,
                // latitude: results.geometry.coordinates[0],
                // longitude: results.geometry.coordinates[1],
                // location:
                //     { 
                //         lat: results.geometry.coordinates[1],
                //         lon: results.geometry.coordinates[0],
                //     },
                // depth: results.geometry.coordinates[2]
            },

            //Implementar: config.elasticsearch_index_name
            await client.index({ 
                index: 'earthquakes', 
                id: results.id,
                body: earthquakeObject
            }), (err, resp, status) => {
                console.log(resp);
            }
        ));

        if (EARTHQUAKES.data.length) {
            indexAllDocs();
        } else {
            console.log('All Data Has Been Indexed!');
        };
    } catch (err) {
        console.log(err)
    };

    console.log('Preparing For The Next Data Check...');
}
pingElasticsearch()
indexAllDocs()

//Verificar continuamente se há novos dados a cada 2 minutos enquanto adicionamos o método de indexação para Elasticsearch.
setInterval(() => { 
    pingElasticsearch()
    indexAllDocs()
}, 60000);
//});
 
module.exports = router;
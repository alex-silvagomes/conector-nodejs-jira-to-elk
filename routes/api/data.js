'use strict'

require('log-timestamp');
const config = require('../../config');
const express = require('express');
const router = express.Router();
const axios = require('axios')
const client = require(config.elasticsearch_path_client);
const URL = `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson`;

//================== Official API Call ==================\\
router.get('/earthquakes', async function (req, res) {
    console.log('Loading Application...')
    //res.json('Application Running...')

    //======= Check that Elasticsearch is up and running =======\\
    // pingElasticsearch = async () => {
    //     await client.ping(
    //         function(error,res) {
    //             if (error) {
    //                 console.error('elasticsearch cluster is down!');
    //             } else {
    //                 console.log('Elasticsearch Ready');
    //             }
    //         }
    //     );
    // }

    try {
        
        console.log('Getting Data From Host')

        const EARTHQUAKES = await get(`${URL}`,{
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
                type: results.properties.type,
                latitude: results.geometry.coordinates[0],
                longitude: results.geometry.coordinates[1],
                location:
                    { 
                        lat: results.geometry.coordinates[1],
                        lon: results.geometry.coordinates[0],
                    },
                depth: results.geometry.coordinates[2]
            }                
        ));
        
        // Implementar a atualizacao do Index ELK

        // client.index({  
        //     index: 'earthquakes',
        //     id: results.id,
        //     type: 'devops',
        //     body: earthquakeObject
        // },function(err,resp,status) {
        //     console.log(resp);
        // });

        // client.bulk({  
        //     index: 'earthquakes',
        //     type: 'devops',
        //     body: earthquakeObject
        //   },function(err,resp,status) {
        //     console.log(resp);
        // });

        //console.log(results)
        res.json(results)
        

        if (EARTHQUAKES.data.length) {
            //indexAllDocs();
            console.log('More Data!');
        } else {
            console.log('All Data Has Been Indexed!');
        };

        
    } catch (err) {
        console.log(err)
    };

    console.log('Preparing For The Next Data Check...');
});
 
module.exports = router;
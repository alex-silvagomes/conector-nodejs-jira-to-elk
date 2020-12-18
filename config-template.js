
var config = {};

config.debug_mode = false;

// Connector: JIRA
config.jira_log_filename = 'ticket_jira_default.log';
config.jira_host = 'http://192.168.84.64';
config.jira_port = 8085;
config.jira_user = 'm226203';
config.jira_password = 'Inme0920';

config.jira_jira_block_size = 1000;
config.jira_etl =  { 'name': 'tickets',     'jql': 'project=TICKET AND issuetype=Ticket',      'filter_element': 'raw' , 'filter_name': '' };

// Elastic Search configurations
config.elasticsearch_path_client = 'f:\\Desenvolvedor\\conector-pipeline-devops-nodejs\\elasticsearch\\connection\\connection.js'
config.elasticsearch_host = 'localhost'
config.elasticsearch_port = 9200
config.elasticsearch_index_name = 'devops'
config.elasticsearch_type_name = 'analytics'
//Options: "dd-MM-yyyy" or ""
//elasticsearch_index_start_date = "20-09-2019"
config.elasticsearch_index_start_date = ''


// New Feature - conexao com o hub de dados (konkerlabs)
//intervaloListening = 60 //segundos
//intervaloHealth = 300 //segundos
//intervaloExtracao = 30 //segundos

module.exports = config;
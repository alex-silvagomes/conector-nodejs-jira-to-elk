var os = require('os');
if (os.platform() == 'win32') {  
    var chilkat = require('chilkat_node6_win32'); 
} else if (os.platform() == 'linux') {
    if (os.arch() == 'arm') {
        var chilkat = require('chilkat_node6_arm');
    } else if (os.arch() == 'x86') {
        var chilkat = require('chilkat_node6_linux32');
    } else {
        var chilkat = require('chilkat_node6_linux64');
    }
} else if (os.platform() == 'darwin') {
    var chilkat = require('chilkat_node6_macosx');
}

function chilkatExample() {

    var rest = new chilkat.Rest();
    var success;

    //  URL: https://your-domain.atlassian.net/rest/api/2/search?jql=assignee=matt
    var bTls = true;
    var port = 443;
    var bAutoReconnect = true;
    success = rest.Connect("your-domain.atlassian.net",port,bTls,bAutoReconnect);
    if (success !== true) {
        console.log("ConnectFailReason: " + rest.ConnectFailReason);
        console.log(rest.LastErrorText);
        return;
    }

    rest.SetAuthBasic("jira@example.com","JIRA_API_TOKEN");

    rest.AddHeader("Content-Type","application/json");

    var sbResponseBody = new chilkat.StringBuilder();
    success = rest.FullRequestNoBodySb("GET","/rest/api/2/search?jql=assignee=matt",sbResponseBody);
    if (success !== true) {
        console.log(rest.LastErrorText);
        return;
    }

    var respStatusCode = rest.ResponseStatusCode;
    if (respStatusCode >= 400) {
        console.log("Response Status Code = " + respStatusCode);
        console.log("Response Header:");
        console.log(rest.ResponseHeader);
        console.log("Response Body:");
        console.log(sbResponseBody.GetAsString());
        return;
    }

    var jsonResponse = new chilkat.JsonObject();
    jsonResponse.LoadSb(sbResponseBody);

    var expand;
    var startAt;
    var maxResults;
    var total;
    var i;
    var count_i;
    var id;
    var self;
    var key;
    var fieldsIssuetypeSelf;
    var fieldsIssuetypeId;
    var fieldsIssuetypeDescription;
    var fieldsIssuetypeIconUrl;
    var fieldsIssuetypeName;
    var fieldsIssuetypeSubtask;
    var fieldsTimespent;
    var fieldsProjectSelf;
    var fieldsProjectId;
    var fieldsProjectKey;
    var fieldsProjectName;
    var fieldsProjectProjectTypeKey;
    var fieldsProjectAvatarUrls48x48;
    var fieldsProjectAvatarUrls24x24;
    var fieldsProjectAvatarUrls16x16;
    var fieldsProjectAvatarUrls32x32;
    var fieldsProjectProjectCategorySelf;
    var fieldsProjectProjectCategoryId;
    var fieldsProjectProjectCategoryDescription;
    var fieldsProjectProjectCategoryName;
    var fieldsAggregatetimespent;
    var fieldsResolutionSelf;
    var fieldsResolutionId;
    var fieldsResolutionDescription;
    var fieldsResolutionName;
    var fieldsCustomfield_10027;
    var fieldsCustomfield_10028;
    var fieldsCustomfield_10029;
    var fieldsResolutiondate;
    var fieldsWorkratio;
    var fieldsWatchesSelf;
    var fieldsWatchesWatchCount;
    var fieldsWatchesIsWatching;
    var fieldsLastViewed;
    var fieldsCreated;
    var fieldsCustomfield_10022;
    var fieldsPrioritySelf;
    var fieldsPriorityIconUrl;
    var fieldsPriorityName;
    var fieldsPriorityId;
    var fieldsCustomfield_10023;
    var fieldsCustomfield_10024;
    var fieldsCustomfield_10025;
    var fieldsCustomfield_10026;
    var fieldsCustomfield_10017;
    var fieldsCustomfield_10018;
    var fieldsCustomfield_10019;
    var fieldsAggregatetimeoriginalestimate;
    var fieldsTimeestimate;
    var fieldsAssigneeSelf;
    var fieldsAssigneeName;
    var fieldsAssigneeKey;
    var fieldsAssigneeAccountId;
    var fieldsAssigneeEmailAddress;
    var fieldsAssigneeAvatarUrls48x48;
    var fieldsAssigneeAvatarUrls24x24;
    var fieldsAssigneeAvatarUrls16x16;
    var fieldsAssigneeAvatarUrls32x32;
    var fieldsAssigneeDisplayName;
    var fieldsAssigneeActive;
    var fieldsAssigneeTimeZone;
    var fieldsUpdated;
    var fieldsStatusSelf;
    var fieldsStatusDescription;
    var fieldsStatusIconUrl;
    var fieldsStatusName;
    var fieldsStatusId;
    var fieldsStatusStatusCategorySelf;
    var fieldsStatusStatusCategoryId;
    var fieldsStatusStatusCategoryKey;
    var fieldsStatusStatusCategoryColorName;
    var fieldsStatusStatusCategoryName;
    var fieldsTimeoriginalestimate;
    var fieldsDescription;
    var fieldsCustomfield_10011;
    var fieldsCustomfield_10012;
    var fieldsCustomfield_10013;
    var fieldsCustomfield_10014;
    var fieldsCustomfield_10015;
    var fieldsSecurity;
    var fieldsCustomfield_10008;
    var fieldsAggregatetimeestimate;
    var fieldsCustomfield_10009;
    var fieldsSummary;
    var fieldsCreatorSelf;
    var fieldsCreatorName;
    var fieldsCreatorKey;
    var fieldsCreatorAccountId;
    var fieldsCreatorEmailAddress;
    var fieldsCreatorAvatarUrls48x48;
    var fieldsCreatorAvatarUrls24x24;
    var fieldsCreatorAvatarUrls16x16;
    var fieldsCreatorAvatarUrls32x32;
    var fieldsCreatorDisplayName;
    var fieldsCreatorActive;
    var fieldsCreatorTimeZone;
    var fieldsReporterSelf;
    var fieldsReporterName;
    var fieldsReporterKey;
    var fieldsReporterAccountId;
    var fieldsReporterEmailAddress;
    var fieldsReporterAvatarUrls48x48;
    var fieldsReporterAvatarUrls24x24;
    var fieldsReporterAvatarUrls16x16;
    var fieldsReporterAvatarUrls32x32;
    var fieldsReporterDisplayName;
    var fieldsReporterActive;
    var fieldsReporterTimeZone;
    var fieldsAggregateprogressProgress;
    var fieldsAggregateprogressTotal;
    var fieldsCustomfield_10000;
    var fieldsCustomfield_10001;
    var fieldsCustomfield_10002;
    var fieldsCustomfield_10003;
    var fieldsCustomfield_10004;
    var fieldsEnvironment;
    var fieldsDuedate;
    var fieldsProgressProgress;
    var fieldsProgressTotal;
    var fieldsVotesSelf;
    var fieldsVotesVotes;
    var fieldsVotesHasVoted;
    var fieldsIssuetypeAvatarId;
    var fieldsParentId;
    var fieldsParentKey;
    var fieldsParentSelf;
    var fieldsParentFieldsSummary;
    var fieldsParentFieldsStatusSelf;
    var fieldsParentFieldsStatusDescription;
    var fieldsParentFieldsStatusIconUrl;
    var fieldsParentFieldsStatusName;
    var fieldsParentFieldsStatusId;
    var fieldsParentFieldsStatusStatusCategorySelf;
    var fieldsParentFieldsStatusStatusCategoryId;
    var fieldsParentFieldsStatusStatusCategoryKey;
    var fieldsParentFieldsStatusStatusCategoryColorName;
    var fieldsParentFieldsStatusStatusCategoryName;
    var fieldsParentFieldsPrioritySelf;
    var fieldsParentFieldsPriorityIconUrl;
    var fieldsParentFieldsPriorityName;
    var fieldsParentFieldsPriorityId;
    var fieldsParentFieldsIssuetypeSelf;
    var fieldsParentFieldsIssuetypeId;
    var fieldsParentFieldsIssuetypeDescription;
    var fieldsParentFieldsIssuetypeIconUrl;
    var fieldsParentFieldsIssuetypeName;
    var fieldsParentFieldsIssuetypeSubtask;
    var fieldsResolution;
    var j;
    var count_j;
    var name;
    var archived;
    var released;
    var releaseDate;
    var strVal;

    expand = jsonResponse.StringOf("expand");
    startAt = jsonResponse.IntOf("startAt");
    maxResults = jsonResponse.IntOf("maxResults");
    total = jsonResponse.IntOf("total");
    i = 0;
    count_i = jsonResponse.SizeOfArray("issues");
    while (i < count_i) {
        jsonResponse.I = i;
        expand = jsonResponse.StringOf("issues[i].expand");
        id = jsonResponse.StringOf("issues[i].id");
        self = jsonResponse.StringOf("issues[i].self");
        key = jsonResponse.StringOf("issues[i].key");
        fieldsIssuetypeSelf = jsonResponse.StringOf("issues[i].fields.issuetype.self");
        fieldsIssuetypeId = jsonResponse.StringOf("issues[i].fields.issuetype.id");
        fieldsIssuetypeDescription = jsonResponse.StringOf("issues[i].fields.issuetype.description");
        fieldsIssuetypeIconUrl = jsonResponse.StringOf("issues[i].fields.issuetype.iconUrl");
        fieldsIssuetypeName = jsonResponse.StringOf("issues[i].fields.issuetype.name");
        fieldsIssuetypeSubtask = jsonResponse.BoolOf("issues[i].fields.issuetype.subtask");
        fieldsTimespent = jsonResponse.IsNullOf("issues[i].fields.timespent");
        fieldsProjectSelf = jsonResponse.StringOf("issues[i].fields.project.self");
        fieldsProjectId = jsonResponse.StringOf("issues[i].fields.project.id");
        fieldsProjectKey = jsonResponse.StringOf("issues[i].fields.project.key");
        fieldsProjectName = jsonResponse.StringOf("issues[i].fields.project.name");
        fieldsProjectProjectTypeKey = jsonResponse.StringOf("issues[i].fields.project.projectTypeKey");
        fieldsProjectAvatarUrls48x48 = jsonResponse.StringOf("issues[i].fields.project.avatarUrls.48x48");
        fieldsProjectAvatarUrls24x24 = jsonResponse.StringOf("issues[i].fields.project.avatarUrls.24x24");
        fieldsProjectAvatarUrls16x16 = jsonResponse.StringOf("issues[i].fields.project.avatarUrls.16x16");
        fieldsProjectAvatarUrls32x32 = jsonResponse.StringOf("issues[i].fields.project.avatarUrls.32x32");
        fieldsProjectProjectCategorySelf = jsonResponse.StringOf("issues[i].fields.project.projectCategory.self");
        fieldsProjectProjectCategoryId = jsonResponse.StringOf("issues[i].fields.project.projectCategory.id");
        fieldsProjectProjectCategoryDescription = jsonResponse.StringOf("issues[i].fields.project.projectCategory.description");
        fieldsProjectProjectCategoryName = jsonResponse.StringOf("issues[i].fields.project.projectCategory.name");
        fieldsAggregatetimespent = jsonResponse.IsNullOf("issues[i].fields.aggregatetimespent");
        fieldsResolutionSelf = jsonResponse.StringOf("issues[i].fields.resolution.self");
        fieldsResolutionId = jsonResponse.StringOf("issues[i].fields.resolution.id");
        fieldsResolutionDescription = jsonResponse.StringOf("issues[i].fields.resolution.description");
        fieldsResolutionName = jsonResponse.StringOf("issues[i].fields.resolution.name");
        fieldsCustomfield_10027 = jsonResponse.IsNullOf("issues[i].fields.customfield_10027");
        fieldsCustomfield_10028 = jsonResponse.IsNullOf("issues[i].fields.customfield_10028");
        fieldsCustomfield_10029 = jsonResponse.IsNullOf("issues[i].fields.customfield_10029");
        fieldsResolutiondate = jsonResponse.StringOf("issues[i].fields.resolutiondate");
        fieldsWorkratio = jsonResponse.IntOf("issues[i].fields.workratio");
        fieldsWatchesSelf = jsonResponse.StringOf("issues[i].fields.watches.self");
        fieldsWatchesWatchCount = jsonResponse.IntOf("issues[i].fields.watches.watchCount");
        fieldsWatchesIsWatching = jsonResponse.BoolOf("issues[i].fields.watches.isWatching");
        fieldsLastViewed = jsonResponse.StringOf("issues[i].fields.lastViewed");
        fieldsCreated = jsonResponse.StringOf("issues[i].fields.created");
        fieldsCustomfield_10022 = jsonResponse.IsNullOf("issues[i].fields.customfield_10022");
        fieldsPrioritySelf = jsonResponse.StringOf("issues[i].fields.priority.self");
        fieldsPriorityIconUrl = jsonResponse.StringOf("issues[i].fields.priority.iconUrl");
        fieldsPriorityName = jsonResponse.StringOf("issues[i].fields.priority.name");
        fieldsPriorityId = jsonResponse.StringOf("issues[i].fields.priority.id");
        fieldsCustomfield_10023 = jsonResponse.IsNullOf("issues[i].fields.customfield_10023");
        fieldsCustomfield_10024 = jsonResponse.IsNullOf("issues[i].fields.customfield_10024");
        fieldsCustomfield_10025 = jsonResponse.IsNullOf("issues[i].fields.customfield_10025");
        fieldsCustomfield_10026 = jsonResponse.IsNullOf("issues[i].fields.customfield_10026");
        fieldsCustomfield_10017 = jsonResponse.IsNullOf("issues[i].fields.customfield_10017");
        fieldsCustomfield_10018 = jsonResponse.IsNullOf("issues[i].fields.customfield_10018");
        fieldsCustomfield_10019 = jsonResponse.IntOf("issues[i].fields.customfield_10019");
        fieldsAggregatetimeoriginalestimate = jsonResponse.IsNullOf("issues[i].fields.aggregatetimeoriginalestimate");
        fieldsTimeestimate = jsonResponse.IsNullOf("issues[i].fields.timeestimate");
        fieldsAssigneeSelf = jsonResponse.StringOf("issues[i].fields.assignee.self");
        fieldsAssigneeName = jsonResponse.StringOf("issues[i].fields.assignee.name");
        fieldsAssigneeKey = jsonResponse.StringOf("issues[i].fields.assignee.key");
        fieldsAssigneeAccountId = jsonResponse.StringOf("issues[i].fields.assignee.accountId");
        fieldsAssigneeEmailAddress = jsonResponse.StringOf("issues[i].fields.assignee.emailAddress");
        fieldsAssigneeAvatarUrls48x48 = jsonResponse.StringOf("issues[i].fields.assignee.avatarUrls.48x48");
        fieldsAssigneeAvatarUrls24x24 = jsonResponse.StringOf("issues[i].fields.assignee.avatarUrls.24x24");
        fieldsAssigneeAvatarUrls16x16 = jsonResponse.StringOf("issues[i].fields.assignee.avatarUrls.16x16");
        fieldsAssigneeAvatarUrls32x32 = jsonResponse.StringOf("issues[i].fields.assignee.avatarUrls.32x32");
        fieldsAssigneeDisplayName = jsonResponse.StringOf("issues[i].fields.assignee.displayName");
        fieldsAssigneeActive = jsonResponse.BoolOf("issues[i].fields.assignee.active");
        fieldsAssigneeTimeZone = jsonResponse.StringOf("issues[i].fields.assignee.timeZone");
        fieldsUpdated = jsonResponse.StringOf("issues[i].fields.updated");
        fieldsStatusSelf = jsonResponse.StringOf("issues[i].fields.status.self");
        fieldsStatusDescription = jsonResponse.StringOf("issues[i].fields.status.description");
        fieldsStatusIconUrl = jsonResponse.StringOf("issues[i].fields.status.iconUrl");
        fieldsStatusName = jsonResponse.StringOf("issues[i].fields.status.name");
        fieldsStatusId = jsonResponse.StringOf("issues[i].fields.status.id");
        fieldsStatusStatusCategorySelf = jsonResponse.StringOf("issues[i].fields.status.statusCategory.self");
        fieldsStatusStatusCategoryId = jsonResponse.IntOf("issues[i].fields.status.statusCategory.id");
        fieldsStatusStatusCategoryKey = jsonResponse.StringOf("issues[i].fields.status.statusCategory.key");
        fieldsStatusStatusCategoryColorName = jsonResponse.StringOf("issues[i].fields.status.statusCategory.colorName");
        fieldsStatusStatusCategoryName = jsonResponse.StringOf("issues[i].fields.status.statusCategory.name");
        fieldsTimeoriginalestimate = jsonResponse.IsNullOf("issues[i].fields.timeoriginalestimate");
        fieldsDescription = jsonResponse.IsNullOf("issues[i].fields.description");
        fieldsCustomfield_10011 = jsonResponse.StringOf("issues[i].fields.customfield_10011");
        fieldsCustomfield_10012 = jsonResponse.IsNullOf("issues[i].fields.customfield_10012");
        fieldsCustomfield_10013 = jsonResponse.StringOf("issues[i].fields.customfield_10013");
        fieldsCustomfield_10014 = jsonResponse.IsNullOf("issues[i].fields.customfield_10014");
        fieldsCustomfield_10015 = jsonResponse.IsNullOf("issues[i].fields.customfield_10015");
        fieldsSecurity = jsonResponse.IsNullOf("issues[i].fields.security");
        fieldsCustomfield_10008 = jsonResponse.IsNullOf("issues[i].fields.customfield_10008");
        fieldsAggregatetimeestimate = jsonResponse.IsNullOf("issues[i].fields.aggregatetimeestimate");
        fieldsCustomfield_10009 = jsonResponse.IsNullOf("issues[i].fields.customfield_10009");
        fieldsSummary = jsonResponse.StringOf("issues[i].fields.summary");
        fieldsCreatorSelf = jsonResponse.StringOf("issues[i].fields.creator.self");
        fieldsCreatorName = jsonResponse.StringOf("issues[i].fields.creator.name");
        fieldsCreatorKey = jsonResponse.StringOf("issues[i].fields.creator.key");
        fieldsCreatorAccountId = jsonResponse.StringOf("issues[i].fields.creator.accountId");
        fieldsCreatorEmailAddress = jsonResponse.StringOf("issues[i].fields.creator.emailAddress");
        fieldsCreatorAvatarUrls48x48 = jsonResponse.StringOf("issues[i].fields.creator.avatarUrls.48x48");
        fieldsCreatorAvatarUrls24x24 = jsonResponse.StringOf("issues[i].fields.creator.avatarUrls.24x24");
        fieldsCreatorAvatarUrls16x16 = jsonResponse.StringOf("issues[i].fields.creator.avatarUrls.16x16");
        fieldsCreatorAvatarUrls32x32 = jsonResponse.StringOf("issues[i].fields.creator.avatarUrls.32x32");
        fieldsCreatorDisplayName = jsonResponse.StringOf("issues[i].fields.creator.displayName");
        fieldsCreatorActive = jsonResponse.BoolOf("issues[i].fields.creator.active");
        fieldsCreatorTimeZone = jsonResponse.StringOf("issues[i].fields.creator.timeZone");
        fieldsReporterSelf = jsonResponse.StringOf("issues[i].fields.reporter.self");
        fieldsReporterName = jsonResponse.StringOf("issues[i].fields.reporter.name");
        fieldsReporterKey = jsonResponse.StringOf("issues[i].fields.reporter.key");
        fieldsReporterAccountId = jsonResponse.StringOf("issues[i].fields.reporter.accountId");
        fieldsReporterEmailAddress = jsonResponse.StringOf("issues[i].fields.reporter.emailAddress");
        fieldsReporterAvatarUrls48x48 = jsonResponse.StringOf("issues[i].fields.reporter.avatarUrls.48x48");
        fieldsReporterAvatarUrls24x24 = jsonResponse.StringOf("issues[i].fields.reporter.avatarUrls.24x24");
        fieldsReporterAvatarUrls16x16 = jsonResponse.StringOf("issues[i].fields.reporter.avatarUrls.16x16");
        fieldsReporterAvatarUrls32x32 = jsonResponse.StringOf("issues[i].fields.reporter.avatarUrls.32x32");
        fieldsReporterDisplayName = jsonResponse.StringOf("issues[i].fields.reporter.displayName");
        fieldsReporterActive = jsonResponse.BoolOf("issues[i].fields.reporter.active");
        fieldsReporterTimeZone = jsonResponse.StringOf("issues[i].fields.reporter.timeZone");
        fieldsAggregateprogressProgress = jsonResponse.IntOf("issues[i].fields.aggregateprogress.progress");
        fieldsAggregateprogressTotal = jsonResponse.IntOf("issues[i].fields.aggregateprogress.total");
        fieldsCustomfield_10000 = jsonResponse.StringOf("issues[i].fields.customfield_10000");
        fieldsCustomfield_10001 = jsonResponse.IsNullOf("issues[i].fields.customfield_10001");
        fieldsCustomfield_10002 = jsonResponse.IsNullOf("issues[i].fields.customfield_10002");
        fieldsCustomfield_10003 = jsonResponse.IsNullOf("issues[i].fields.customfield_10003");
        fieldsCustomfield_10004 = jsonResponse.IsNullOf("issues[i].fields.customfield_10004");
        fieldsEnvironment = jsonResponse.IsNullOf("issues[i].fields.environment");
        fieldsDuedate = jsonResponse.IsNullOf("issues[i].fields.duedate");
        fieldsProgressProgress = jsonResponse.IntOf("issues[i].fields.progress.progress");
        fieldsProgressTotal = jsonResponse.IntOf("issues[i].fields.progress.total");
        fieldsVotesSelf = jsonResponse.StringOf("issues[i].fields.votes.self");
        fieldsVotesVotes = jsonResponse.IntOf("issues[i].fields.votes.votes");
        fieldsVotesHasVoted = jsonResponse.BoolOf("issues[i].fields.votes.hasVoted");
        fieldsIssuetypeAvatarId = jsonResponse.IntOf("issues[i].fields.issuetype.avatarId");
        fieldsParentId = jsonResponse.StringOf("issues[i].fields.parent.id");
        fieldsParentKey = jsonResponse.StringOf("issues[i].fields.parent.key");
        fieldsParentSelf = jsonResponse.StringOf("issues[i].fields.parent.self");
        fieldsParentFieldsSummary = jsonResponse.StringOf("issues[i].fields.parent.fields.summary");
        fieldsParentFieldsStatusSelf = jsonResponse.StringOf("issues[i].fields.parent.fields.status.self");
        fieldsParentFieldsStatusDescription = jsonResponse.StringOf("issues[i].fields.parent.fields.status.description");
        fieldsParentFieldsStatusIconUrl = jsonResponse.StringOf("issues[i].fields.parent.fields.status.iconUrl");
        fieldsParentFieldsStatusName = jsonResponse.StringOf("issues[i].fields.parent.fields.status.name");
        fieldsParentFieldsStatusId = jsonResponse.StringOf("issues[i].fields.parent.fields.status.id");
        fieldsParentFieldsStatusStatusCategorySelf = jsonResponse.StringOf("issues[i].fields.parent.fields.status.statusCategory.self");
        fieldsParentFieldsStatusStatusCategoryId = jsonResponse.IntOf("issues[i].fields.parent.fields.status.statusCategory.id");
        fieldsParentFieldsStatusStatusCategoryKey = jsonResponse.StringOf("issues[i].fields.parent.fields.status.statusCategory.key");
        fieldsParentFieldsStatusStatusCategoryColorName = jsonResponse.StringOf("issues[i].fields.parent.fields.status.statusCategory.colorName");
        fieldsParentFieldsStatusStatusCategoryName = jsonResponse.StringOf("issues[i].fields.parent.fields.status.statusCategory.name");
        fieldsParentFieldsPrioritySelf = jsonResponse.StringOf("issues[i].fields.parent.fields.priority.self");
        fieldsParentFieldsPriorityIconUrl = jsonResponse.StringOf("issues[i].fields.parent.fields.priority.iconUrl");
        fieldsParentFieldsPriorityName = jsonResponse.StringOf("issues[i].fields.parent.fields.priority.name");
        fieldsParentFieldsPriorityId = jsonResponse.StringOf("issues[i].fields.parent.fields.priority.id");
        fieldsParentFieldsIssuetypeSelf = jsonResponse.StringOf("issues[i].fields.parent.fields.issuetype.self");
        fieldsParentFieldsIssuetypeId = jsonResponse.StringOf("issues[i].fields.parent.fields.issuetype.id");
        fieldsParentFieldsIssuetypeDescription = jsonResponse.StringOf("issues[i].fields.parent.fields.issuetype.description");
        fieldsParentFieldsIssuetypeIconUrl = jsonResponse.StringOf("issues[i].fields.parent.fields.issuetype.iconUrl");
        fieldsParentFieldsIssuetypeName = jsonResponse.StringOf("issues[i].fields.parent.fields.issuetype.name");
        fieldsParentFieldsIssuetypeSubtask = jsonResponse.BoolOf("issues[i].fields.parent.fields.issuetype.subtask");
        fieldsResolution = jsonResponse.IsNullOf("issues[i].fields.resolution");
        j = 0;
        count_j = jsonResponse.SizeOfArray("issues[i].fields.fixVersions");
        while (j < count_j) {
            jsonResponse.J = j;
            self = jsonResponse.StringOf("issues[i].fields.fixVersions[j].self");
            id = jsonResponse.StringOf("issues[i].fields.fixVersions[j].id");
            name = jsonResponse.StringOf("issues[i].fields.fixVersions[j].name");
            archived = jsonResponse.BoolOf("issues[i].fields.fixVersions[j].archived");
            released = jsonResponse.BoolOf("issues[i].fields.fixVersions[j].released");
            releaseDate = jsonResponse.StringOf("issues[i].fields.fixVersions[j].releaseDate");
            j = j+1;
        }

        j = 0;
        count_j = jsonResponse.SizeOfArray("issues[i].fields.labels");
        while (j < count_j) {
            jsonResponse.J = j;
            j = j+1;
        }

        j = 0;
        count_j = jsonResponse.SizeOfArray("issues[i].fields.customfield_10016");
        while (j < count_j) {
            jsonResponse.J = j;
            j = j+1;
        }

        j = 0;
        count_j = jsonResponse.SizeOfArray("issues[i].fields.versions");
        while (j < count_j) {
            jsonResponse.J = j;
            j = j+1;
        }

        j = 0;
        count_j = jsonResponse.SizeOfArray("issues[i].fields.issuelinks");
        while (j < count_j) {
            jsonResponse.J = j;
            j = j+1;
        }

        j = 0;
        count_j = jsonResponse.SizeOfArray("issues[i].fields.components");
        while (j < count_j) {
            jsonResponse.J = j;
            j = j+1;
        }

        j = 0;
        count_j = jsonResponse.SizeOfArray("issues[i].fields.customfield_10010");
        while (j < count_j) {
            jsonResponse.J = j;
            strVal = jsonResponse.StringOf("issues[i].fields.customfield_10010[j]");
            j = j+1;
        }

        j = 0;
        count_j = jsonResponse.SizeOfArray("issues[i].fields.subtasks");
        while (j < count_j) {
            jsonResponse.J = j;
            j = j+1;
        }

        i = i+1;
    }


}

chilkatExample();
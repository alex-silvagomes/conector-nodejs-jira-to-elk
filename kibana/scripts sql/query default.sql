SELECT 
    id as TicketId,
    key as TicketNumber,
    fields.status.name as Status,
    fields.customfield_11801.value as Pipeline,
    fields.customfield_11805 as PacoteChangeman,
    fields.customfield_11807.value as CentroDeCusto,
    fields.customfield_11803.value as TipoMudanca,
    fields.customfield_11800 as RDMNumber,
    fields.customfield_11826.value as InstaladoTU,
    fields.customfield_11828.value as InstaladoNovoTI,
    fields.customfield_11824.value as InstaladoAntigoTI,
    fields.customfield_11827.value as InstaladoTH,
    fields.customfield_11825.value as InstaladoProducao
FROM "tickets-jira*"
WHERE Pipeline = 'PLANEJADA'

SELECT 
    extractDate,
    projectName.name,
    summary,
    id,
    key,
    self,
    created,
    creator.name,
    creator.displayName,
    creator.emailAddress,
    updated,
    fields.Status,
    fields.Pipeline.value,
    fields.PacoteChangeman,
    fields.CentroDeCusto.value,
    fields.TipoMudanca.value,
    fields.RDMNumber,
    fields.NumeroSequenciaPPMC.value,
    fields.Ambiente.value,
    fields.InstaladoTU.value,
    fields.InstaladoTI.value,
    fields.InstaladoAntigoTI.value,
    fields.InstaladoTH.value,
    fields.InstaladoProducao.value,
    metrics.cycle_time_in_minutes
FROM "tickets-jira*"    
            
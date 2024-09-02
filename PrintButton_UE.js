/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */
define(['N/record', 'N/runtime', 'N/url'],
/**
 * @param {record} record
 * @param {runtime} runtime
 */
function(record, runtime, url) {
   
    /**
     * Function definition to be triggered before record is loaded.
     *
     * @param {Object} context
     * @param {Record} context.newRecord - New record
     * @param {string} context.type - Trigger type
     * @param {Form} context.form - Current form
     * @Since 2015.2
     */
    function beforeLoad(context) {
        var LOG_DEBUG = '<< -- Before Load -->>';

        log.debug({
            title: LOG_DEBUG + 'Context Type',
            details: {
                contextType: context.type
            }
        });

        // Only add the button when the record is being viewed
        if (context.type == context.UserEventType.VIEW) {
            var currentRecord = context.newRecord;

            // Retrieve script parameters for Suitelet script and deployment IDs, and custom form ID
            var scriptObj = runtime.getCurrentScript();
            var scriptId = scriptObj.getParameter({
                name: 'custscript_ue_script_id_1'
            });
            var scriptDeploymentId = scriptObj.getParameter({
                name: 'custscript_ue_deployment_id_1'
            });
            var customFormId = scriptObj.getParameter({
                name: 'custscript_ue_cust_form_1'
            });

            var intTranId = currentRecord.id;
            var objForm = context.form;

            // Resolve the Suitelet URL with the required parameters
            var strSuiteletUrl = url.resolveScript({
                scriptId: scriptId,
                deploymentId: scriptDeploymentId,
                returnExternalUrl: false,
                params: {
                    intTranId: intTranId
                }
            });

            // Add a custom button to the form that opens the Suitelet in a new window
            objForm.addButton({
                label: 'Commerical Inv',
                id: 'custpagea_ph_ci_import',
                functionName: "window.open('" + strSuiteletUrl + "','_blank','toolbar=no,scrollbars=yes,resizable=yes,top=50,left=50,width=1000,height=600')"
            });
        }
    }

    return {
        beforeLoad: beforeLoad,
        // beforeSubmit: beforeSubmit,
        // afterSubmit: afterSubmit
    };
    
});

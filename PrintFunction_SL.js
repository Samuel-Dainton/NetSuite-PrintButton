/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 */
define(['N/record', 'N/render', 'N/runtime'],
/**
 * @param {record} record
 * @param {render} render
 * @param {runtime} runtime
 */
function(record, render, runtime) {
   
    /**
     * Definition of the Suitelet script trigger point.
     *
     * @param {Object} context
     * @param {ServerRequest} context.request - Encapsulation of the incoming request
     * @param {ServerResponse} context.response - Encapsulation of the Suitelet response
     * @Since 2015.2
     */
    function onRequest(context) {
        // Retrieve the custom template ID from the script parameters
        var intTemplateId = runtime.getCurrentScript().getParameter({
            name: 'custscript_sl_cust_form_1',
        });

        // Retrieve the transaction ID from the request parameters
        var intTranId = parseInt(context.request.parameters.intTranId);

        // Generate a PDF file for the transaction using the specified template
        var transactionFile = render.transaction({
            entityId: intTranId,
            printMode: render.PrintMode.PDF,
            inCustLocale: false,
            formId: parseInt(intTemplateId)
        });

        // Load the Item Fulfillment record to get the document number
        var ifRecObject = record.load({type: "itemfulfillment", id: intTranId});
        var ifDocNumber = ifRecObject.getValue("tranid");

        // Set the name for the generated PDF file
        transactionFile.name = "Commercial Inv" + "_" + ifDocNumber + ".pdf";

        // Write the generated PDF file to the response
        context.response.writeFile({
            file: transactionFile,
            isInline: true
        });

        try {
            // Additional error handling could go here
        } catch (err) {
            log.debug('Error printing pdf file', err);
            throw err;
        }
    }

    return {
        onRequest: onRequest
    };
    
});

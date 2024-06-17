# NetSuite-PrintButton
A pair of scripts used to create a custom print button, allowing users to print more than one type of document using the information from a record. Such as a commercial invoice and customs declaration from an SO.

To set up the scripts, the following parameters need to be set and records created.

First, you should create your Advanced PDF Template. 
Once done, create a copy of the transaction form that the PDF will be pulling its information from i.e. Sales Order, Packing Slip or Invoice.
On this copy, ensure that you select the PDF Template you want to use as the default Print Template.
Optionally but recommended, make the record inactive so it doesn't appear as an option to use for your users.
Once saved, keep a record of the internal id.

Back to the scripts, you want to set up the Print Function before the Print Button.
On the deployment parameter for the Function Script, set the Template ID to the one you just saved of the Transaction Form.

On the button script deployment, set the parameters as follows:
Custom Form_# should again be the internal id of the transaction form.
Deployment ID_# should be the id of the print functions deployment.
SL ID_# should be the id of the print function scipt itself.



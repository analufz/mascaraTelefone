/**
* @NApiVersion  2.x
* @NScriptType  ClientScript
* @NModuleScope SameAccount
*/

define(['N/log', 'require', 'exports'],

/**
* @param {log} log
*/

function(log, require, exports) {

    /**
    * Function to be executed when field is changed.
    * @param {Object} scriptContext
    * @param {Record} scriptContext.currentRecord - Current form record
    * @param {string} scriptContext.sublistId     - Sublist name
    * @param {string} scriptContext.fieldId       - Field name
    * @param {number} scriptContext.lineNum       - Line number. Will be undefined if not a sublist or matrix field
    * @param {number} scriptContext.columnNum     - Line number. Will be undefined if not a matrix field
    * @since 2015.2
    */

    function fieldChanged(scriptContext) {
        var fieldId = scriptContext.fieldId;

        if(fieldId == 'phone') {
            var employee = scriptContext.currentRecord;
            var telefone = employee.getValue({fieldId: 'phone'});
            var mascarar_telefone = exports.mascaraTelefone(telefone);
            employee.setValue({
                fieldId: 'phone',
                value: mascarar_telefone,
                ignoreFieldChange: true
            });
        }
    }
    exports.fieldChanged = fieldChanged;

    function mascaraTelefone (telefone) {
        var transformar_telefone_em_numeros = telefone.replace(/\D/g, "");
        if (transformar_telefone_em_numeros.length > 10) {
            return transformar_telefone_em_numeros.slice(0, 11)
                .replace(/(\d{2})(\d)/, "($1) $2")
                .replace(/(\d{5})(\d{4})/, "$1-$2");  
        }
        return transformar_telefone_em_numeros.replace(/(\d{2})(\d)/, "($1) $2")
            .replace(/(\d{4})(\d)/, "$1-$2");
    };

    
    exports.mascaraTelefone = mascaraTelefone;
    
});

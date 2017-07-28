CKEDITOR.dialog.add( 'insertdetectorDialog', function( editor ) {
    return {
        title: 'Detecting insertHtml',
        minWidth: 400,
        minHeight: 200,
        contents: [
            {
                id: 'tab-basic',
                elements: [
                    {
                        type: 'text',
                        id: 'rawHtml',
                        label: 'Enter html to be inserted here: ',
                        validate: CKEDITOR.dialog.validate.notEmpty( "Field field cannot be empty." )
                    }
                ]
            }
        ],
        onOk: function() {
            var dialog = this;

            var enteredHtml = dialog.getValueOf('tab-basic', 'rawHtml');

            editor.on('afterInsertHtml', function() { 
                console.log("afterInsertHtml was fired");
            });

            editor.insertHtml( '<p>' + enteredHtml + '</p>' );
        }
    };
});
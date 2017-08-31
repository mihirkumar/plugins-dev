CKEDITOR.plugins.add( 'insertdetector', {
    icons: 'insertdetector',
    init: function( editor ) {
        editor.addCommand( 'insertdetector', new CKEDITOR.dialogCommand( 'insertdetectorDialog' ) );
        editor.ui.addButton( 'Insertdetector', {
            label: 'Test',
            command: 'insertdetector',
            toolbar: 'insert'
        });

        CKEDITOR.dialog.add( 'insertdetectorDialog', this.path + 'dialogs/insertdetector.js' );
    }
});

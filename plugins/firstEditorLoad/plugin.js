CKEDITOR.plugins.add( 'firstEditorLoad', {
  init: function (editor) {
    var firstEditorLoadCmd = 'firstEditorLoad';

    CKEDITOR.dialog.add( firstEditorLoadCmd, this.path + 'dialog/first_editor_load.js' );

    editor.addCommand ( firstEditorLoadCmd, new CKEDITOR.dialogCommand ( firstEditorLoadCmd ) );

    editor.execCommand ('firstEditorLoad');
  }
});

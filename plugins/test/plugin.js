CKEDITOR.plugins.add( 'blockformat', {
  requires: 'a11yfirst,blockquote,codesnippet,menubutton',

  lang: 'en,en-au,en-ca,en-gb',

  init: function( editor ) {
    if ( editor.blockless )
      return;

    var config = editor.config,
        items = {};

    // Menuitem commands
    var blockquoteCmd = 'blockquote';
    var codesnippetCmd = 'codeSnippet';
    var helpCmd = 'blockformatHelp';

    // Change behavior of menubutton with text label
    CKEDITOR.plugins.get( 'a11yfirst' ).overrideButtonSetState();

    items.blockquote = {
      label: lang.blockquoteLabel,
      group: 'blockformatMain',
      order: 0,
      onClick: function () {
        editor.execCommand( blockquoteCmd );
      }
    };

    items.codesnippet = {
      label: lang.codesnippetLabel,
      group: 'blockformatMain',
      order: 1,
      onClick: function () {
        editor.execCommand( codesnippetCmd );
      }
    };

    // Initialize menu groups
    editor.addMenuGroup( 'blockformatMain', 1 );
    // editor.addMenuGroup( 'other' );
    editor.addMenuItems( items );

    editor.ui.add( 'BlockFormat', CKEDITOR.UI_MENUBUTTON, {
      label: lang.label,
      toolbar: 'blockformat',
      allowedContent: 'blockquote; pre; code(language-*)',
      onMenu: function() {
        var activeItems = {};
        activeItems.blockquote = CKEDITOR.TRISTATE_OFF;
        activeItems.codesnippet = CKEDITOR.TRISTATE_OFF;
        return activeItems;
      }
    } ); // END ui.add

  } // END init

} );

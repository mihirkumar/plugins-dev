/**
 * @license Copyright (c) 2003-2016, CKSource - Jon Gunderson, Nicholas Hoyt and Mihir Kumar. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.dialog.add( 'emptyLinkDisplayText', function( editor, data) {
  var lang = editor.lang.a11yfirst;

  return {
    title: lang.dialogTitleLinkEmptyDisplayText,
    minWidth: 500,
    minHeight: 300,
    onOk: function(){
    	editor.a11yfirst.lastEmptyLinkDisplayTextValue = this.getValueOf('general', 'radioButtonSelection');

    	if (editor.a11yfirst.lastEmptyLinkDisplayTextValue === 'useUrlAsDisplayText'){
    		editor.a11yfirst.linkDisplayText.setValue(editor.a11yfirst.linkDisplayUrl);
    	}
    	
    	editor.a11yfirst.linkDisplayText.focus();
    },
    contents: [
      {
        id : 'general',
        label : 'Settings',
        elements :
        [
          {
            type : 'html',
            html : lang.msgEmptyLinkDisplayText  
          },
          {
            type: 'radio',
            id: 'radioButtonSelection',
            items: [ [ lang.labelAddText, 'addDisplayText' ], [ lang.labelUseUrl, 'useUrlAsDisplayText' ] ],
            'default': 'addDisplayText'
          }
        ]
      }   
    ],

    buttons: [ CKEDITOR.dialog.okButton ]
  };
} );

/**
 * @license Copyright (c) 2003-2016, CKSource - Jon Gunderson, Nicholas Hoyt and Mihir Kumar. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.dialog.add( 'emptyLinkDisplayText', function( editor ) {
  var lang = editor.lang.a11yfirst;

  return {
    title: lang.dialogTitleLinkEmptyDisplayText,
    minWidth: 500,
    minHeight: 300,
    onShow: function (event) {
      console.log('onShow: ' + event.data);
      this.data = event.data;
    },
    onOK: function() {
      console.log('onOK: ' + this.data);
    },
    contents: [
      {
        id : 'general',
        label : 'Settings',
        elements :
        [
          {
            type : 'html',
            html : 'WARNING! This dialog is for empty link display text.'    
          }
        ]
      }    
    ],

    buttons: [ CKEDITOR.dialog.okButton ]
  };
} );

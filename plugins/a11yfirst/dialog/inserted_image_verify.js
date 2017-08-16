/**
 * @license Copyright (c) 2003-2016, CKSource - Jon Gunderson, Nicholas Hoyt and Mihir Kumar. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.dialog.add( 'altTextVerify', function( editor, data) {
  var lang = editor.lang.a11yfirst;

  return {
    title: lang.dialogTitleImageVerify,
    minWidth: 500,
    minHeight: 300,
    onOk: function(){
      var verifyAltText = this.getValueOf('general', 'verifyAltTextField');
      if (editor.a11yfirst.lastWarningImageAltText !== verifyAltText) {
        alert('The alt text has been changed. Press "Cancel" to go back and change alt text.');
        return false;
      }

      else {
        CKEDITOR.dialog.getCurrent().hide();
        editor.a11yfirst.imageDialog.click('ok');
      }
    },
    onShow: function(){
      this.setValueOf('general', 'altTextField', editor.a11yfirst.lastWarningImageAltText);
      var newMsg = lang.msgInsertImageVerify;
      document.getElementById('message').innerHTML = newMsg;
    },
    contents: [
      {
        id : 'general',
        label : 'Settings',
        elements :
        [
          {
            type : 'html',
            html : '<div id="message"></div>'
          },
          {
            type: 'radio',
            id: 'radioButtonSelection',
            items: [ [ lang.labelDecorativeImageWarning, 'useBadAltText' ], [ lang.labelInformativeImageWarning, 'correctAltText' ] ],
            'default': 'correctAltText'
          },
          {
            id: 'verifyAltTextField',
            label: 'Alt text',
            type: 'text'
          }
        ]
      }
    ],
  };
} );

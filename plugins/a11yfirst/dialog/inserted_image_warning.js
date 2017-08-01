/**
 * @license Copyright (c) 2003-2016, CKSource - Jon Gunderson, Nicholas Hoyt and Mihir Kumar. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.dialog.add( 'altTextWarning', function( editor, data) {
  var lang = editor.lang.a11yfirst;

  return {
    title: lang.dialogTitleImageAltText,
    minWidth: 500,
    minHeight: 300,
    onOk: function(){

      editor.a11yfirst.lastWarningImageAltText = this.getValueOf('general', 'altTextField');
      editor.execCommand('altTextVerify');
      // if (editor.a11yfirst.lastEmptyImageAltText === 'useEmptyAltText'){
      //   // fire ok
      //   CKEDITOR.dialog.getCurrent().hide();
      //   editor.a11yfirst.imageDialog.click('ok');
      // }
      
      // else {
      //   editor.a11yfirst.imageAltText.focus();
      // }
    },
    onShow: function(){
      var newMsg = lang.msgInsertImageWarning;
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
            id: 'altTextField',
            label: 'Alt text',
            type: 'text'
          }
        ]
      }   
    ],
  };
} );

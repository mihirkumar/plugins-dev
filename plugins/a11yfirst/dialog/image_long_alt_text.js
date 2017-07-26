/**
 * @license Copyright (c) 2003-2016, CKSource - Jon Gunderson, Nicholas Hoyt and Mihir Kumar. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.dialog.add( 'longAltText', function( editor, data) {
  var lang = editor.lang.a11yfirst;

  return {
    title: lang.dialogTitleImageAltText,
    minWidth: 500,
    minHeight: 300,
    onOk: function(){

      editor.a11yfirst.lastLongImageAltTextValue = this.getValueOf('general', 'radioButtonSelection');

      if (editor.a11yfirst.lastLongImageAltTextValue === 'useLongAltText'){
        // fire ok
        CKEDITOR.dialog.getCurrent().hide();
        editor.a11yfirst.imageDialog.click('ok');
      }
      
      else {
        editor.a11yfirst.imageAltText.focus();
      }
      
    },
    onShow: function(){
      var newMsg = lang.msgLongImageAltText;
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
            items: [ [ lang.labelShortenAltText, 'shortenAltText' ], [ lang.labelUseLongAltText, 'useLongAltText' ] ],
            'default': 'shortenAltText'
          }
        ]
      }   
    ],
  };
} );

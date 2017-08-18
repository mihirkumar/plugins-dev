/**
 * @license Copyright (c) 2003-2016, CKSource - Jon Gunderson, Nicholas Hoyt and Mihir Kumar. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.dialog.add( 'emptyAltText', function( editor, data) {
  var lang = editor.lang.a11yfirst;

  return {
    title: lang.dialogTitleImageAltText,
    minWidth: 500,
    minHeight: 300,
    onOk: function(){

      // editor.a11yfirst.lastEmptyImageAltTextValue = this.getValueOf('general', 'radioButtonSelection');

      //if (editor.a11yfirst.lastEmptyImageAltTextValue === 'useEmptyAltText'){
        // fire ok
      CKEDITOR.dialog.getCurrent().hide();

      editor.a11yfirst.lastEmptyImageAltTextValue = this.getValueOf('general', 'radioButtonSelection');

      editor.a11yfirst.imageData.setAttribute("alt", this.getValueOf('general', 'newAltText'));

      // editor.a11yfirst.imageDialog.click('ok');
      //}

      // else {
      //   editor.a11yfirst.imageAltText.focus();
      // }

    },
    onShow: function(){
      var newMsg = lang.msgEmptyImageAltText;
      document.getElementById('message').innerHTML = newMsg;
    },
    onLoad: function() {
      var radioButton = this.getContentElement('general', 'radioButtonSelection');
      var newAltText =   this.getContentElement('general', 'newAltText');

      // newAltText.disable();
      console.log(radioButton);

      radioButton.on('isChanged', function(){
        console.log('hey');
        console.log(this.getValueOf('general', 'radioButtonSelection'));
        if (newAltText.getValue() === 'addAltText') {
          newAltText.enable();
        }
      });
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
            items: [ [ lang.labelDecorativeImageWarning, 'useEmptyAltText' ], [ lang.labelInformativeImageWarning, 'addAltText' ] ],
            'default': 'useEmptyAltText'
          },
          {
            type: 'text',
            id: 'newAltText'
          }
        ]
      }
    ],
  };
} );

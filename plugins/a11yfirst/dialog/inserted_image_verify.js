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
      editor.a11yfirst.imageData.setAttribute("alt", this.getValueOf('general', 'newAltText'));

      var radioButton = this.getContentElement('general', 'radioButtonSelection');

      radioButton.removeAllListeners();
      // if (editor.a11yfirst.lastWarningImageAltText !== verifyAltText) {
      //   alert('The alt text has been changed. Press "Cancel" to go back and change alt text.');
      //   return false;
      // }
      //
      // else {
      //   CKEDITOR.dialog.getCurrent().hide();
      //   editor.a11yfirst.imageDialog.click('ok');
      // }
    },
    onShow: function(){
      // this.setValueOf('general', 'altTextField', editor.a11yfirst.lastWarningImageAltText);
      var newMsg = lang.msgInsertImageVerify;
      document.getElementById('message').innerHTML = newMsg;

      var radioButton = this.getContentElement('general', 'radioButtonSelection');
      var radioButtonValue = radioButton.getValue();
      var newAltText = this.getContentElement('general', 'newAltText');

      /*
        Function to disable/enable the alt text field
        depending on the selected radio button
      */
      function setAltTextState() {
        radioButtonValue = radioButton.getValue();

        if (radioButtonValue === 'useBadAltText')
          newAltText.disable();
        else if (radioButtonValue === 'correctAltText')
          newAltText.enable();
      }

      /*
        Setting alt text state at dialog load
      */
      setAltTextState();

      /*
        Adding native javascript listener to detect clicks
        for ease in detecting changing values of the radio button
      */
      document.getElementById(radioButton.domId).addEventListener('change', setAltTextState);
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
            id: 'newAltText',
            type: 'text',
            'default': editor.a11yfirst.imageAltText.getValue()
          }
        ]
      }
    ],
  };
} );

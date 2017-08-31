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
    onShow: function(){
      var newMsg = lang.msgEmptyImageAltText;
      document.getElementById('message').innerHTML = newMsg;

      editor.a11yfirst.lastEmptyImageAltTextValue = 'useEmptyAltText';

      var radioButton = this.getContentElement('general', 'radioButtonSelection');
      var radioButtonValue = radioButton.getValue();
      var newAltText = this.getContentElement('general', 'newAltText');

      /*
        Function to disable/enable the alt text field
        depending on the selected radio button
      */
      function setAltTextState() {
        radioButtonValue = radioButton.getValue();

        if (radioButtonValue === 'useEmptyAltText')
          newAltText.disable();
        else if (radioButtonValue === 'addAltText')
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
    }
  };
} );

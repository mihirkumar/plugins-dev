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
      editor.a11yfirst.imageData.setAttribute("alt", this.getValueOf('general', 'newAltText'));

      var radioButton = this.getContentElement('general', 'radioButtonSelection');

      radioButton.removeAllListeners();

      // CKEDITOR.dialog.getCurrent().hide();
      // CKEDITOR.dialog.getCurrent().click('ok');

      // editor.a11yfirst.lastEmptyImageAltTextValue = this.getValueOf('general', 'radioButtonSelection');



      // editor.a11yfirst.imageDialog.click('ok');
      //}

      // else {
      //   editor.a11yfirst.imageAltText.focus();
      // }

    },
    onShow: function(){
      var newMsg = lang.msgEmptyImageAltText;
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
            id: 'newAltText',
            controlStyle: 'width: 25em'
            // label: 'New Alt Text: '
            // labelLayout: 'horizontal',
            // widths: [10, 50]
          }
        ]
      }
    ],
  };
} );

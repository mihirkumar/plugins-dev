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

      editor.a11yfirst.imageAltText.setValue(this.getValueOf('general', 'newAltText'));

      editor.a11yfirst.lastLongImageAltTextValue = 'useLongAltText';

      var radioButton = this.getContentElement('general', 'radioButtonSelection');

      radioButton.removeAllListeners();

      /*
        Image alt text verification dialog box trigger
        has been commented out below.
        Uncomment it if you wish to enable functionality
      */
      // console.log(radioButton.getValue());
      // if (radioButton.getValue() === 'verifyLongAltText'){
      //   editor.execCommand('altTextVerify');
      // }
    },
    onShow: function(){
      var newMsg = lang.msgLongImageAltText;
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

        if (radioButtonValue === 'useLongAltText' || radioButtonValue === 'verifyLongAltText')
          newAltText.disable();
        else if (radioButtonValue === 'shortenAltText')
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
            items: [ [ lang.labelShortenAltText, 'shortenAltText' ], [ lang.labelUseLongAltText, 'useLongAltText' ], [lang.labelVerifyLongAltText, 'verifyLongAltText'] ],
            'default': 'useLongAltText'
          },
          {
            type: 'text',
            id: 'newAltText',
            'default': editor.a11yfirst.imageAltText.getValue()
          }
        ]
      }
    ],
  };
} );

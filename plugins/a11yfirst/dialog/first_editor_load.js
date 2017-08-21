/**
 * @license Copyright (c) 2003-2016, CKSource - Jon Gunderson, Nicholas Hoyt and Mihir Kumar. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.dialog.add( 'firstEditorLoad', function( editor, data) {
  var lang = editor.lang.a11yfirst;

  return {
    title: 'First time load!',
    minWidth: 500,
    minHeight: 300,
    onOk: function () {
      // check if the dont show me again box is checked, if yes
      // then make a cookie
      var checkboxValue = this.getValueOf('general', 'showOrNot');

      if (checkboxValue === true){
        document.cookie = "doNotShow = true; expires = Thu, 01 Jan 1970 00:00:00 UTC;";
      }

      console.log(document.cookie);
    },
    onShow: function () {
      console.log('onShow function');
    },
    contents: [
      {
        id : 'general',
        elements :
        [
          {
            type: 'html',
            html: 'This is the first time you have loaded CKEditor!'
          },
          {
            type: 'checkbox',
            id: 'showOrNot',
            label: 'Do not show me this again'
          }
        ]
      }
    ],
  };
});

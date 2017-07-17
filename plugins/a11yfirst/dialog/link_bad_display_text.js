/**
 * @license Copyright (c) 2003-2016, CKSource - Jon Gunderson, Nicholas Hoyt and Mihir Kumar. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.dialog.add( 'badLinkDisplayText', function( editor, data) {
  var lang = editor.lang.a11yfirst;

  return {
    title: lang.dialogTitleLinkEmptyDisplayText,
    minWidth: 500,
    minHeight: 300,
    onOk: function(){
      editor.a11yfirst.lastBadLinkDisplayTextValue = this.getValueOf('general', 'radioButtonSelection');

      console.log(editor.a11yfirst.lastBadLinkDisplayTextValue);

      if (editor.a11yfirst.lastBadLinkDisplayTextValue === 'useCurrentDisplayText'){
        //fire ok
        
        //editor.a11yfirst.linkDialog.focus();

        CKEDITOR.dialog.getCurrent().hide();

        editor.a11yfirst.linkDialog.click('ok');

      }
      
      else {
        editor.a11yfirst.linkDisplayText.focus();
      }
      
    },
    onShow: function(){
      var newMsg = lang.msgBadLinkDisplayText.replace("%s", editor.a11yfirst.linkDisplayText.getValue());
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
            items: [ [ lang.labelImproveLinkText, 'improveDisplayText' ], [ lang.labelUseCurrentLinkText, 'useCurrentDisplayText' ] ],
            'default': 'improveDisplayText'
          }
        ]
      }   
    ],
  };
} );

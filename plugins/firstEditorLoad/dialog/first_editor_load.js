CKEDITOR.dialog.add( 'firstEditorLoad', function( editor, data ) {
  return {
    title: 'First time load!',
    onOk: function () {
      // check if the dont show me again box is checked, if yes
      // then make a cookie
      console.log(this.getValueOf('general', 'showOrNot'));
    },
    onShow: function () {
      var newMsg = lang.msgEmptyImageAltText;
      document.getElementById('message').innerHTML = newMsg;
      console.log('hey');
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
} );

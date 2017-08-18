/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.plugins.add( 'a11yfirst', {
  lang: 'en,en-au,en-ca,en-gb',
  init: function ( editor ) {

    // Pull request: Add template and method in plugins/listblock/plugin.js
    var listSeparator = CKEDITOR.addTemplate( 'panel-list-separator',
      '<div id="{id}" role="separator" style="border-bottom: 1px solid #d1d1d1"></div>' );

    CKEDITOR.ui.listBlock.prototype.addSeparator = function () {
      this._.close();
      var id = CKEDITOR.tools.getNextId();
      this._.pendingHtml.push( listSeparator.output( { id: id } ) );
    };

    // Pull request: Add method in plugins/richcombo/plugin.js
    CKEDITOR.ui.richCombo.prototype.addSeparator = function () {
      this._.list.addSeparator();
    };

    var emptyLinkDisplayTextCmd = 'emptyLinkDisplayText';
    CKEDITOR.dialog.add( emptyLinkDisplayTextCmd, this.path + 'dialog/link_empty_display_text.js' );
    editor.addCommand( emptyLinkDisplayTextCmd, new CKEDITOR.dialogCommand( emptyLinkDisplayTextCmd ) );

    var badLinkDisplayTextCmd = 'badLinkDisplayText';
    CKEDITOR.dialog.add( badLinkDisplayTextCmd, this.path + 'dialog/link_bad_display_text.js' );
    editor.addCommand( badLinkDisplayTextCmd, new CKEDITOR.dialogCommand( badLinkDisplayTextCmd ) );

    var emptyAltTextCmd = 'emptyAltText';
    CKEDITOR.dialog.add( emptyAltTextCmd, this.path + 'dialog/image_empty_alt_text.js' );
    editor.addCommand( emptyAltTextCmd, new CKEDITOR.dialogCommand( emptyAltTextCmd ) );

    var longAltTextCmd = 'longAltText';
    CKEDITOR.dialog.add( longAltTextCmd, this.path + 'dialog/image_long_alt_text.js' );
    editor.addCommand( longAltTextCmd, new CKEDITOR.dialogCommand( longAltTextCmd ) );

    var badAltTextCmd = 'badAltText';
    CKEDITOR.dialog.add( badAltTextCmd, this.path + 'dialog/image_bad_alt_text.js' );
    editor.addCommand( badAltTextCmd, new CKEDITOR.dialogCommand( badAltTextCmd ) );

    var altTextWarningCmd = 'altTextWarning';
    CKEDITOR.dialog.add( altTextWarningCmd, this.path + 'dialog/inserted_image_warning.js' );
    editor.addCommand( altTextWarningCmd, new CKEDITOR.dialogCommand( altTextWarningCmd ) );

    var altTextVerifyCmd = 'altTextVerify';
    CKEDITOR.dialog.add( altTextVerifyCmd, this.path + 'dialog/inserted_image_verify.js' );
    editor.addCommand( altTextVerifyCmd, new CKEDITOR.dialogCommand( altTextVerifyCmd ) );

    editor.on('insertElement', function(event) {
      editor.a11yfirst.imageData = event.data;
      var altText = editor.a11yfirst.imageData.getAttribute("alt");
      var lang = editor.lang.a11yfirst;
      var flag = false;

      if (altText === null) {
        // command for no alt text
        flag = true;
      }

      else if (altText === "") {
        // command for empty alt text
        editor.execCommand('emptyAltText');
        if (editor.a11yfirst.lastEmptyImageAltTextValue === 'addAltText') {
          editor.a11yfirst.imageData.setAttribute("alt", editor.a11yfirst.newAltTextValue);
        }
        flag = true;
      }

      else if (altText.length > 100 ) {
        editor.execCommand('longAltText');
        flag = true;
      }

      var badAltText = editor.lang.a11yfirst.badImageAltText;

      if (editor.a11yfirst.lastBadImageAltTextValue !== 'useBadAltText'){

        for (var i = 0; i < badAltText.length; i++) {

          if (altText.toLowerCase().endsWith(badAltText[i])) {
            editor.execCommand('badAltText');
            flag = true;
            // return false;
          }
        }
      }
      else {
        editor.a11yfirst.lastBadImageAltTextValue = undefined;
      }

      // console.log(editor.a11yfirst.imageData.getAttribute("xyz"));
    });

    // For accessibility purposes, defining a namespace to use global variables for appropriate empty display text validation
    // If the editor.a11yfirst namespace isn't defined, define one
    if (!editor.a11yfirst) {
      editor.a11yfirst = {};
    }

  },

  overrideButtonSetState: function () {
    // Pull request: Remove else clause from setState in plugins/button/plugin.js
    CKEDITOR.ui.button.prototype.setState = function ( state ) {
      if ( this._.state == state )
        return false;

      this._.state = state;

      var element = CKEDITOR.document.getById( this._.id );

      if ( element ) {
        element.setState( state, 'cke_button' );

        state == CKEDITOR.TRISTATE_DISABLED ?
          element.setAttribute( 'aria-disabled', true ) :
          element.removeAttribute( 'aria-disabled' );

        if ( !this.hasArrow ) {
          // Note: aria-pressed attribute should not be added to menuButton instances. (#11331)
          state == CKEDITOR.TRISTATE_ON ?
            element.setAttribute( 'aria-pressed', true ) :
            element.removeAttribute( 'aria-pressed' );
        }
        // Do not update button label by appending (Selected)
        /*
        else {
          var newLabel = state == CKEDITOR.TRISTATE_ON ?
            this._.editor.lang.button.selectedLabel.replace( /%1/g, this.label ) : this.label;
          CKEDITOR.document.getById( this._.id + '_label' ).setText( newLabel );
        }
        */

        return true;
      }
      else {
        return false;
      }
    };
  }
});

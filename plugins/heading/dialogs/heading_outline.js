/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.dialog.add( 'headingOutline', function( editor ) {
  var lang = editor.lang.heading;

  var myEditor = editor;

  function htmlBanner(content) {
    return '<h2 style="white-space: normal; font-weight: bold; margin-top: 0em; font-size: 135%">' + content + '</h2>';
  }

  function htmlTOC(hlist, index, level) {

    var html = '';

    if (index < hlist.length) {

      var h = hlist[index];

      if (h.level == level) {
        html = '<li style="margin-left: ' + level + 'em;">' + h.name + ' (level ' + h.level + ', subsections: ' + h.subsections + ', error: ' + h.nestingError + ', parent: ' + (h.parent ? h.parent.name : 'none') +')</li>';
        html += htmlTOC(hlist, (index+1), level);
      }
      else {
        if (h.level > level) {
          html = '<li><ol>';
          html += htmlTOC(hlist, index, (level+1));
          html += '</li></ol>';
        }
        else {
          html += htmlTOC(hlist, index, (level-1));                
        }
      }
    }
    return html;

  } // end htmlTOC

  function htmlOutline(hlist) {

    function th(content, style) {
      if (typeof style !== 'string') style='';
      return '<th style="font-weight: bold; padding: 0.25em; ' + style + '">' + content + '</th>';
    }

    function td(content, style) {
      if (typeof style !== 'string') style='';
      return '<td style="padding: 0.25em; ' + style + '">' + content + '</td>';
    }

    var html = '<table style="margin: 0; padding: 0; margin-bottom: 1em;">';

    html += '<thead><tr>';
    html += th('Headings', 'width: 20em');
    html += th('Level', 'text-align: right');
    html += th('Subsections', 'text-align: right');
//    html += th('ckElement', 'text-align: right');
    html += th('Comments', 'padding-left: 0.5em');
    html += '</tr></thead>';

    html += '<tbody>';
    for (let index = 0; index < hlist.length; index++) {
      var h = hlist[index];
      var left = (h.level - 1) + 0.25;
      html += '<tr>';
      html += td(h.name, 'padding-left: ' + left + 'em;');
      html += td(h.level, 'text-align: right');
      html += td((h.subsections ? h.subsections : ''), 'text-align: right');
//      html += td(h.ckElement.getText(), 'text-align: right');
      if (h.nestingError) {
        html += td('Nesting error', 'color: red; padding-left: 0.5em');
      } else {
        if (h.subsections === 1) {
          html += td('Typically more than one subsection', 'color: #CC6600; padding-left: 0.5em');              
        }
      }
      html += '</tr>';
    }
    html += '</tbody>'

    html += '</table>';

    return html;
  } // end htmlOutline

  function htmlOptionsTOC() {

    html = '';
    html += '<fieldset>';
    html += '<legend>Include heading Levels</legend>';
    html += '<label><input type="radio" checked name="toc_options" value="none">None (Default)</label><br/>';
    html += '<label><input type="radio" name="toc_options" value="level2">Level 1 and 2</label><br/>';
    html += '<label><input type="radio" name="toc_options" value="level3">Level 1, 2 and 3</label><br/>';
    html += '<label><input type="radio" name="toc_options" value="level4">Level 1, 2, 3 and 4</label><br/>';
    html += '<label><input type="radio" name="toc_options" value="level5">Level 1, 2, 3, 4 and 5</label><br/>';
    html += '<label><input type="radio" name="toc_options" value="level6">Level 1, 2, 3, 4, 5 and 6</label><br/>';
    html += '</fieldset>';

    return html;
  } // end htmlOptionsTOC


  function htmlPreviewTOC(hlist, level) {

    function th(content, style) {
      if (typeof style !== 'string') style='';
      return '<th style="font-weight: bold; padding: 0.25em; ' + style + '">' + content + '</th>';
    }

    function td(content, style) {
      if (typeof style !== 'string') style='';
      return '<td style="padding: 0.25em; ' + style + '">' + content + '</td>';
    }

    var html = '<table style="margin: 0; padding: 0" role="presentation">';
    html += '<tr>';
    html += th('Table of Contents Preview', 'width: 20em');
    html += '</tr>';

    for (let index = 0; index < hlist.length; index++) {
      var h = hlist[index];
      var left = (h.level - 1) + 0.25;

      if (h.level <= level ) {
        html += '<tr>';
        html += td(h.name, 'padding-left: ' + left + 'em;');
        html += '</tr>';
      }
    }

    html += '</tbody>'
    html += '</table>';

    return html;
  } // end htmlPreviewTOC

  function fixHeadingNesting(hlist) {

    if (hlist[0].level > 2) {
      hlist[0].level = 2;
    }

    for(let i = 1; i < hlist.length; i++) {
 
      if (hlist[i].parent && (hlist[i].level > (hlist[i].parent.level+1))) {
        hlist[i].level = hlist[i].parent.level+1;
        hlist[i].nestingError = false;
      }
    }

    for (let i = 0; i < hlist.length; i++) {
      hlist[i].subsections = 0;
    }

    for (let i = 0; i < hlist.length; i++) {
      if (hlist[i].parent) {
        hlist[i].parent.subsections += 1;
      }  
    }

  } // end fixHeadingNesting
 
  function getHeadingList(element) {

    var lastHeadingInfo = false;
    var lastHeadingInfoByLevel = [false, false, false, false, false, false, false];

    function nextHeading(element) {

        var headingInfo = false;

        var e = element;

        if ( typeof element.getName !== 'function' ) return;

        var tagName = element.getName();

        switch ( tagName ) {
          case 'h1':
            headingInfo = { name: element.getText(), level: 1, subsections: 0, nestingError: false, parent: false, ckElement: e};
            break;

          case 'h2':
            headingInfo = { name: element.getText(), level: 2, subsections: 0, nestingError: false, parent: false, ckElement: e};
            break;

          case 'h3':
            headingInfo = { name: element.getText(), level: 3, subsections: 0, nestingError: false, parent: false, ckElement: e};
            break;

          case 'h4':
            headingInfo = { name: element.getText(), level: 4, subsections: 0, nestingError: false, parent: false, ckElement: e};
            break;

          case 'h5':
            headingInfo = { name: element.getText(), level: 5, subsections: 0, nestingError: false, parent: false, ckElement: e};
            break;

          case 'h6':
            headingInfo = { name: element.getText(), level: 6, subsections: 0, nestingError: false, parent: false, ckElement: e};
            break;

          default:
            break;  
        }

        if (headingInfo) {
          
          if (lastHeadingInfo && (headingInfo.level > (lastHeadingInfo.level + 1))) {
            headingInfo.nestingError = true;
          }

          if (lastHeadingInfoByLevel[headingInfo.level-1]) {
            lastHeadingInfoByLevel[headingInfo.level-1].subsections += 1;
            headingInfo.parent = lastHeadingInfoByLevel[headingInfo.level-1];
          }
          else {
            // do this if heading nesting error
            for(let i = headingInfo.level-2; i >= 0; i--) {
              if (lastHeadingInfoByLevel[i]) {
                headingInfo.parent = lastHeadingInfoByLevel[i];
                break;
              }
            }

            if (!headingInfo.parent && hlist[0]) {
              headingInfo.parent = hlist[0];
            }
          }

          hlist.push(headingInfo);

          lastHeadingInfo = headingInfo;
          lastHeadingInfoByLevel[headingInfo.level] = headingInfo;

          for(let i = headingInfo.level+1; i < 6; i++) {
            lastHeadingInfoByLevel[i] = false;
          }
        }


        var children = element.getChildren();
        var count = children.count();

        for ( var i = 0; i < count; i++ ) {
          nextHeading( children.getItem( i ));
        }
      } // end nextHeading

    var hlist = [];

    nextHeading(element);

    return hlist;

  } // end getHeadingList

  function updateDialog(hlist) {

    var outline_banner = document.getElementById('outlineBanner');
    outline_banner.innerHTML = htmlBanner(lang.outlineBanner);

    var outline = document.getElementById('headingOutlineSelect');
    outline.innerHTML = htmlOutline(hlist);

    var toc_banner = document.getElementById('tocBanner');
    toc_banner.innerHTML = htmlBanner(lang.tocBanner);

    var toc_options = document.getElementById('tocOptions');
    toc_options.innerHTML = htmlOptionsTOC();

    var toc_preview = document.getElementById('tocPreview');
    toc_preview.innerHTML = htmlPreviewTOC(hlist, 3);

  }

  var headingList = getHeadingList(myEditor.document.getBody());

  return {
    title: lang.outlineLabel,
    minWidth: 500,
    minHeight: 300,
    onShow: function( event ) {

      headingList = getHeadingList(myEditor.document.getBody());

      updateDialog(headingList);

    },
    onOk: function() {
      myEditor.fire( 'saveSnapshot' );

      for(let i = 0; i < headingList.length; i++) {
        var newName = 'h' + headingList[i].level;
        var elem = headingList[i].ckElement;

        if (elem.getName() !== newName) {
          elem.renameNode(newName);
        }
      }
    },

    contents: [
      {
        id: 'tab1',
        label: 'Outline',
        title: 'List of section headings in the document',
        expand: true,
        padding: 1,
        elements: [{
            type: 'html',
            html: '<div><div id="outlineBanner"></div><ol id="headingOutlineSelect"></ol></div>'
          },
          {
            type: 'button',
            label: lang.labelFixNestingErrors,
            onClick: function() {
              fixHeadingNesting(headingList);
              updateDialog(headingList)
            }
          }
        ],
      },
      {
        id: 'tab2',
        label: 'Insert TOC',
        title: 'Insert a table of contents in the page',
        expand: true,
        padding: 0,
        elements: [{
            type: 'html',
            html: '<div><div id="tocBanner"></div></div>'
          },
          {
            type: 'hbox',
            widths: [ '30%', '70%' ],
            children: [
              {
                type: 'html',
                html: '<div><div id="tocOptions" style="border: gray 1px dashed"></div></div>'
              },
              {
                type: 'html',
                html: '<div><div id="tocPreview" style="border: gray 1px dashed"></div></div>'
              }
            ]
          }
        ]
      }
    ]  
  };
} );

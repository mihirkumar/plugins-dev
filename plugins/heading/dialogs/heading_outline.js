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

  function deleteToc() {

    var toc = myEditor.document.findOne('div#a11yFirstToc');

    if (toc) {
      toc.remove();
    }

    var target = myEditor.document.findOne('a.a11yFirstTocItem');

    while (target) {
      target.remove();
      target = myEditor.document.findOne('a.a11yFirstTocItem');
    }

  }

  function htmlToc(hlist, maxLevel) {

    var count, html;

    function setItemId(item) {

      var id = "a11yFirstToc" + count;
      var target = CKEDITOR.dom.element.createFromHtml( '<a class="a11yFirstTocItem" id="' + id + '"></a>' );

      item.ckElement.append(target);

      count += 1;

      return id;
    }

    function nextTocItem(index, level) {
      var html = '';

      if (index < hlist.length) {

        var h = hlist[index];

        if (h.level <= maxLevel) {
          var id = setItemId(h);

          if (h.level == level) {
            html = '<li><a href="#' + id + '">' + h.name  +'</a></li>';
            html += nextTocItem((index+1), level);
          }
          else {
            if (h.level > level) {
              html = '<ol>';
              html += nextTocItem(index, (level+1));
            }
            else {
              html += '</ol>';
              html += nextTocItem(index, (level-1));                
            }
          }
        }
        else {
          html += nextTocItem((index+1), level); 
        }
      }

      return html;

    }

    html = '<div id="a11yFirstToc"><h2 class="a11yFirstToc">' + lang.tocTitle + '</h2><ol>';

    count = 1;

    html += nextTocItem(0, 2);

    html += '</ol></div>';

    return html;

  } // end htmlTOC

  function htmlOutline(hlist) {

    function th(content, style, title) {
      if (typeof style !== 'string') style='';
      style += '; font-size: 110%';

      if (typeof title !== 'string') title='';

      if (title.length) {
        return '<th style="' + style + '" title="' + title + '">' + content + '</th>';        
      }
      else {
        return '<th style="' + style + '">' + content + '</th>';        
      }
    }

    function td(content, style) {
      if (typeof style !== 'string') style='';
      return '<td style="' + style + '">' + content + '</td>';
    }

    var html = '<table style="margin: 0; padding: 0; margin-bottom: 1em; margin-top: 0.5em;">';

    html += '<thead style="display:table; width:100%; table-layout:fixed;"><tr>';
    html += th('Headings', 'text-align: left;');
    html += th('Level', 'text-align: right; padding-right: 1em; width: 4em;', 'Heading Level');
    html += th('Comments', 'text-align: left');
    html += '</tr></thead>';

    html += '<tbody style="max-height: 200px; display: block; overflow-y: scroll; border: 1px solid #AAAAAA;">';
    for (let index = 0; index < hlist.length; index++) {
      var h = hlist[index];
      var left = (h.level - 1) + 0.25;

      if (index % 2) {
        html += '<tr style="display:table; width:100%; table-layout:fixed;">';
      }
      else {
        html += '<tr style="display:table; width:100%; table-layout:fixed; background-color: #EEEEEE;">';
      }

      html += td(h.name, 'padding-left: ' + left + 'em;');
      html += td(h.level, 'text-align: right; padding-right: 0.25em; width: 4em;');        
      if (h.nestingError) {
        html += td('Nesting error', 'color: red; padding-left: 1em;');
      } else {
        if (h.subsections === 1) {
          html += td('Typically more than one subsection', 'color: #CC6600; padding-left: 1em;');              
        }
        else {
          html += td('', '');              
        }
      }

      html += '</tr>';
    }
    html += '</tbody>'

    html += '</table>';

    return html;
  } // end htmlOutline


  function updateNestingErrors(hlist) {

    var errors = 0;
    var color = 'black';
    var html = lang.noNestingErrors;
    var nestingErrors = document.getElementById('nestingErrors');
    var fixNestingErrors = document.getElementById('fixNestingErrors');


    for (let index = 0; index < hlist.length; index++) {
      if (hlist[index].nestingError) {
        errors += 1;
      } 
    }  

    if (errors > 1) {
      html = errors + lang.nestingErrors;
      color = 'red';
    }
    else {
      if (errors === 1) {
        html = lang.nestingError;
        color = 'red';
      }
    }

    console.log('fixNestingErrors: ' + fixNestingErrors)

    nestingErrors.innerHTML = html;
    nestingErrors.style.color = color;

    return errors;
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
        var flag = element.hasClass('a11yFirstToc');

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

        if (headingInfo && !flag) {
          
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

    var outlineBanner = document.getElementById('outlineBanner');
    outlineBanner.innerHTML = htmlBanner(lang.outlineBanner);

    var outline = document.getElementById('headingOutlineSelect');
    outline.innerHTML = htmlOutline(hlist);

    updateNestingErrors(hlist);

    var toc_banner = document.getElementById('tocBanner');
    toc_banner.innerHTML = htmlBanner(lang.tocBanner);

    var toc_options = document.getElementById('tocOptions');
    toc_options.innerHTML = htmlOptionsTOC();

    var toc_preview = document.getElementById('tocPreview');
    toc_preview.innerHTML = htmlPreviewTOC(hlist, 3);

  }

  var headingList = getHeadingList(myEditor.document.getBody());

  var tocLevel = 3;

  return {
    title: lang.outlineLabel,
    minWidth: 500,
    minHeight: 300,
    onLoad: function( event ) {
      console.log('onload: ' + typeof event.data);
    },

    onShow: function( event ) {

      headingList = getHeadingList(myEditor.document.getBody());

      updateDialog(headingList);

    },
    onOk: function() {
      myEditor.fire( 'saveSnapshot' );

      for(let i = 0; i < headingList.length; i++) {
        var newName = 'h' + headingList[i].level;
        var elem = headingList[i].ckElement;

        console.log(elem.getName() + ': ' + elem.getText() + ' id:' + elem.getId());

        if (elem.getName() !== newName) {
          elem.renameNode(newName);
        }
      }

      if (tocLevel > 0) {

        deleteToc();

        var elem = myEditor.document.getBody().getFirst();
        var toc = CKEDITOR.dom.element.createFromHtml( htmlToc(headingList, tocLevel) );

        if (elem) {
          elem.insertBeforeMe(toc);        
        }
        else {
          myEditor.document.getBody().appendHtml(toc)
        }


      }
      else {
        // remove A11yTOC from document if it exists
      }

    },

    contents: [
      {
        id: 'tab1',
        label: 'Outline',
        title: 'List of section headings in the document',
        expand: true,
        padding: 1,
        elements: [
          {  
            type: 'html',
            html: '<div><div id="outlineBanner"></div><ol id="headingOutlineSelect"></ol></div>'
          },   
          {
            type: 'hbox',
            widths: [ '84%', '20%' ],
            children: [
              {
                type: 'text',
                id: 'headingText',
                label: lang.headingTextLabel,
                setup: function() {
                  this.enable();

                },
                commit: function( data ) {

                }
              },
              {
                type: 'select',
                id: 'headingLevel',
                label: lang.headingLevelLabel,
                items: [ [ lang.level_h1 ], [ lang.level_h2 ], [ lang.level_h3 ], [ lang.level_h4 ], [ lang.level_h5 ], [ lang.level_h6 ] ],
                'default': lang.level_h2,
                onChange: function( api ) {
                    // this = CKEDITOR.ui.dialog.select
                    alert( 'Current value: ' + this.getValue() );
                }
              }
            ]  
          },
          {
            type: 'button',
            label: lang.headingUpdateLabel,
            onClick: function() {
            }  
          },
          {
            type: 'html',
            html: '<div><div style="white-space: normal; margin-top: 0em; color: red; font-size: 100%; margin-top: 1.5em;" id="nestingErrors"></div></div>'
          },
          {
            type: 'button',
            id: 'fixNestingErrors',
            label: lang.fixNestingErrorsLabel,
            disabled: true,
            onClick: function() {
              fixHeadingNesting(headingList);
              updateDialog(headingList);
              updateNestingErrors(headingList);
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

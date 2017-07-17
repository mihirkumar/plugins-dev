/**
 * @license Copyright (c) 2017, CKSource - Nick Hoyt, Jon Gunderson. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */
// Register a block snippets definition set named "default".
CKEDITOR.addBlockSnippets( 'default', {

	// The block snippets definitions array.
	blockSnippets: [ {
		id: 'citation',
		label: 'Citation',
		description: 'Insert a bibliographic citation.',
		html: '<div>Citation</div>'
	},
	{
		id: 'event',
		label: 'Event',
		description: 'Insert a preformatted event block.',
		html: '<table cellspacing="0" cellpadding="0" style="width:100%" border="0">' +
			'<tr>' +
				'<td style="width:50%">' +
					'<h3>Title 1</h3>' +
				'</td>' +
				'<td></td>' +
				'<td style="width:50%">' +
					'<h3>Title 2</h3>' +
				'</td>' +
			'</tr>' +
			'<tr>' +
				'<td>' +
					'Text 1' +
				'</td>' +
				'<td></td>' +
				'<td>' +
					'Text 2' +
				'</td>' +
			'</tr>' +
			'</table>' +
			'<p>' +
			'More text goes here.' +
			'</p>'
	}
 ]
} );

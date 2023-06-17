CKEDITOR.plugins.add( 'testPlugin', {
    init: function( editor ) {
        editor.addCommand( 'insertTestText', {
            exec: function( editor ) {
                editor.insertHtml( 'Test successful!' );
            }
        });
        editor.ui.addButton( 'TestPlugin', {
            label: 'Insert Test Text',
            command: 'insertTestText',
            toolbar: 'insert'
        });
    }
});

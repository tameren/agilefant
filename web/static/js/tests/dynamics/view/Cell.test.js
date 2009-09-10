$(document).ready(function() { 
	module("Dynamics: DynamicTableCell", {
		setup: function() {
			this.mockControl = new MockControl();
			this.mockRow = this.mockControl.createMock(DynamicTableRow);
			this.cellConfig = this.mockControl.createMock(DynamicTableColumnConfiguration);
			this.oldTableEditors = TableEditors;
	}, teardown: function() {
			this.mockControl.verify();
			TableEditors = this.oldTableEditors;
		}
	});
	
	test("initialize width and class set", function() {
	  this.cellConfig.expects().hasDelayedRender().andReturn(false);
		this.cellConfig.expects().getWidth().andReturn("10%");
		this.cellConfig.expects().getWidth().andReturn("10%");
		this.cellConfig.expects().getMinWidth().andReturn("150");
		this.cellConfig.expects().getMinWidth().andReturn("150");
		this.cellConfig.expects().isFullWidth().andReturn(null);
		this.cellConfig.expects().getCssClass().andReturn("testClass");
		this.cellConfig.expects().getCssClass().andReturn("testClass");
		this.cellConfig.expects().isVisible().andReturn(true);
		this.cellConfig.expects().isDragHandle().andReturn(true);
		this.cellConfig.expects().isEditable().andReturn(false);
		this.cellConfig.expects().getDoubleClickCallback().andReturn(null);
		this.cellConfig.expects().getSubViewFactory().andReturn(null);
		var testable = new DynamicTableCell(this.mockRow, this.cellConfig);

		same(testable.getElement().css("width"), "10%", "Width correct");
		same(testable.getElement().attr("min-width"), "150px", "Min-width correct");
		same(testable.getElement().css("clear"), "none", "Clear correct");
		ok(testable.getElement().hasClass("testClass"), "Css class correct");
    ok(testable.getElement().hasClass(DynamicTable.cssClasses.dragHandle), "Is drag handle");
	});
	test("initialize width and class not set", function() {
	   this.cellConfig.expects().hasDelayedRender().andReturn(false);
		this.cellConfig.expects().getWidth().andReturn(null);
		this.cellConfig.expects().getMinWidth().andReturn(null);
		this.cellConfig.expects().isFullWidth().andReturn(true);
		this.cellConfig.expects().getCssClass().andReturn("");
    this.cellConfig.expects().isVisible().andReturn(true);
    this.cellConfig.expects().isDragHandle().andReturn(false);
    this.cellConfig.expects().isEditable().andReturn(false);
    this.cellConfig.expects().getDoubleClickCallback().andReturn(null);
    this.cellConfig.expects().getSubViewFactory().andReturn(null);

		var testable = new DynamicTableCell(this.mockRow, this.cellConfig);

		same(testable.getElement().css("width"), "auto", "Width correct");
		same(testable.getElement().attr("min-width"), undefined, "Min-width correct");
		same(testable.getElement().css("clear"), "left", "Clear correct");
		ok(!testable.getElement().hasClass("testClass"), "Css class correct");
	});
	
	 test("initialize editable cell", function() {
	    this.cellConfig.expects().hasDelayedRender().andReturn(false);
	    this.cellConfig.expects().getWidth().andReturn(null);
	    this.cellConfig.expects().getMinWidth().andReturn(null);
	    this.cellConfig.expects().isFullWidth().andReturn(true);
	    this.cellConfig.expects().getCssClass().andReturn("");
	    this.cellConfig.expects().isVisible().andReturn(true);
	    this.cellConfig.expects().isDragHandle().andReturn(false);
	    this.cellConfig.expects().isEditable().andReturn(true);
	    this.cellConfig.expects().getSubViewFactory().andReturn(null);

	    var testable = new DynamicTableCell(this.mockRow, this.cellConfig);
	    var openEditCalled = 0;
	    testable.openEditor = function() {
	      openEditCalled++;
	    };
	    testable.getElement().dblclick();
	    equals(openEditCalled, 1, "Open edit called once");
	  });
	 
	 test("open editor", function() {
	   var me = this;
     
	   var editorOpt = {
         editor: "foo"
     };
	    this.cellConfig.expects().hasDelayedRender().andReturn(false);
	   this.cellConfig.expects().getWidth().andReturn(null);
     this.cellConfig.expects().getMinWidth().andReturn(null);
     this.cellConfig.expects().isFullWidth().andReturn(true);
     this.cellConfig.expects().getCssClass().andReturn("");
     this.cellConfig.expects().isVisible().andReturn(true);
     this.cellConfig.expects().isDragHandle().andReturn(false);
     this.cellConfig.expects().isEditable().andReturn(false);
     this.cellConfig.expects().getDoubleClickCallback().andReturn(null);
     this.cellConfig.expects().getSubViewFactory().andReturn(null);
     this.cellConfig.expects().getEditOptions().andReturn(editorOpt);
     this.cellConfig.expects().getEditableCallback().andReturn(function() { return true; });
     
     this.mockRow.expects().getController().andReturn(window);
     
     var testable = new DynamicTableCell(this.mockRow, this.cellConfig);

	   var editorsOld = TableEditors;
	   TableEditors = {};

	   var fooEditorCalled = 0;
	   TableEditors.foo = function(row, cell, conf) {
	     fooEditorCalled++;
	     same(row, me.mockRow, "Correct row passed to editor"); 
	     same(conf, editorOpt, "Correct configuration passed");
	     same(cell, testable, "Correct cell passed");
	   };
	   
     var getEditorCalled = 0;
     TableEditors.getEditorClassByName = function(editorName) {
       getEditorCalled++;
       same(editorName, "foo", "Correct editor requested");
       return TableEditors.foo;
     };
	   
          
	   testable.openEditor();
	   testable.openEditor();
	   equals(getEditorCalled, 1, "Get Editor called once.");
	   equals(fooEditorCalled, 1, "Editor constructor called once");
	   
	   
	 });
	 
   test("render with sub view", function() {
     var me = this;
     this.cellConfig.expects().hasDelayedRender().andReturn(false);
     this.cellConfig.expects().getWidth().andReturn(null);
     this.cellConfig.expects().getMinWidth().andReturn(null);
     this.cellConfig.expects().isFullWidth().andReturn(true);
     this.cellConfig.expects().getCssClass().andReturn("");
     this.cellConfig.expects().isVisible().andReturn(true);
     this.cellConfig.expects().isDragHandle().andReturn(false);
     this.cellConfig.expects().isEditable().andReturn(false);
     this.cellConfig.expects().getDoubleClickCallback().andReturn(null);

     
     var mockView = this.mockControl.createMock(ViewPart);
     
     this.cellConfig.expects().getSubViewFactory().andReturn(function(view, model){
       return mockView;
     });
     this.mockRow.expects().getModel().andReturn(null);
     this.mockRow.expects().getController().andReturn(window);
     
     this.mockRow.expects().getModel().andReturn(null);
     this.cellConfig.expects().getGetter().andReturn(null);
     this.cellConfig.expects().getDecorator().andReturn(null);
     
     mockView.expects().render();
     
     var testable = new DynamicTableCell(this.mockRow, this.cellConfig);
     testable.render();
     ok(true, "Mock test");
   });
});
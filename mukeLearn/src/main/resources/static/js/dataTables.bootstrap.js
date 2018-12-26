/*! DataTables Bootstrap integration
 * ©2011-2014 SpryMedia Ltd - datatables.net/license
 */

/**
 * DataTables integration for Bootstrap 3. This requires Bootstrap 3 and
 * DataTables 1.10 or newer.
 *
 * This file sets the defaults and adds options to DataTables to style its
 * controls using Bootstrap. See http://datatables.net/manual/styling/bootstrap
 * for further information.
 */
(function(window, document, undefined){

var factory = function( $, DataTable ) {
"use strict";
/* Set the defaults for DataTables initialisation */
$.extend( true, DataTable.defaults, {
  dom:
    //"<'row'<'col-xs-6'l><'col-xs-6'f>r>"+
    "t"+
   // "<'row'<'col-xs-6'p><'col-xs-6'i>>",
   "<'row'<'col-xs-12'p>>",
  renderer: 'bootstrap',
  bAutoWidth: true,
//  bServerSide: true,
  fnDrawCallback:function(){
	  if($('[data-toggle="tooltip"]').tooltip){
		  $('[data-toggle="tooltip"]').tooltip();
	  }
  },
  sPaginationType : "full_numbers",
	oLanguage : {
		"sProcessing" : "正在加载中......",
		"sLengthMenu" : "每页显示 _MENU_ 条记录",
		"sZeroRecords" : "没有数据",
		"sEmptyTable" : "表中无数据存在！",
		"sInfo" : "当前显示 _START_ 到 _END_ 条，共 _TOTAL_ 条记录",
		"sInfoEmpty" : "显示0到0条记录",
		"sInfoFiltered" : "数据表中共为 _MAX_ 条记录",
		"sSearch" : "搜索",
		"oPaginate" : {
			"sFirst" : "<i class=\"icon-angle-double-left\">",
			"sPrevious" : "<i class=\"icon-angle-left\">",
			"sNext" : "<i class=\"icon-angle-right\"  >",
			"sLast" : "<i class=\"icon-angle-double-right\">"
		}
	}
} );


/* cell toolTip */
//$.extend(DataTable.defaults.column, {
//	bSortable:false,
//	fnCreatedCell:function(nTd, sData, oData, iRow, iCol){
//		var cellWidth = $(this.fnSettings().aoColumns[iCol].nTh).width();
//		var cellText = $(nTd).text();
//		if(cellText){
////			var length = cellText.length;
////			var cellTextLength = 14 * length;
//			var font = "";
//			var cellTextLength = getCurrentStrWidth(cellText,font);
//			if(cellTextLength>cellWidth){
//				if($(nTd).children().length == 0){
//					var textSpan = $("<span></span>");
//					textSpan.text(cellText);
//					textSpan.width(cellWidth);
//					textSpan.addClass("toolTipCell");
//					textSpan.attr("data-toggle","tooltip");
//					textSpan.attr("title",cellText);
//					$(nTd).empty();
//					$(nTd).append(textSpan);
//				}else if($(nTd).find("a").length >0){
//					$(nTd).find("a").width(cellWidth);
//					$(nTd).find("a").addClass("toolTipCell");
//					$(nTd).find("a").attr("data-toggle","tooltip");
//					$(nTd).find("a").attr("title",cellText);
//				}
//			}
//		}
//	}
//} );

function getCurrentStrWidth(text, font) {
    var currentObj = $('<pre>').hide().appendTo(document.body);
    $(currentObj).html(text).css('font', font);
    var width = currentObj.width();
    currentObj.remove();
    return width;
}


/* Default class modification */
$.extend( DataTable.ext.classes, {
  sTable:        "dataTable table-hover",
  sWrapper:      "dataTables_wrapper form-inline dt-bootstrap",
  sFilterInput:  "form-control input-sm",
  sLengthSelect: "form-control input-sm"
} );




/* Bgootstrap paging button renderer */
DataTable.ext.renderer.pageButton.bootstrap = function ( settings, host, idx, buttons, page, pages ) {
  var api     = new DataTable.Api( settings );
  var classes = settings.oClasses;
  var lang    = settings.oLanguage.oPaginate;
  var btnDisplay, btnClass;
  var attach = function( container, buttons ) {
    var i, ien, node, button;
    var clickHandler = function ( e ) {
      e.preventDefault();
      if ( e.data.action !== 'ellipsis' ) {
//    	  bindRpc(e.data.action);
       api.page( e.data.action ).draw( false );
      }
    };

    for ( i=0, ien=buttons.length ; i<ien ; i++ ) {
      button = buttons[i];

      if ( $.isArray( button ) ) {
        attach( container, button );
      }
      else {
        btnDisplay = '';
        btnClass = '';

        switch ( button ) {
          case 'ellipsis':
            btnDisplay = '&hellip;';
            btnClass = 'disabled';
            break;

          case 'first':
            btnDisplay = lang.sFirst;
            btnClass = button + (page > 0 ?
              '' : ' disabled');
            break;

          case 'previous':
            btnDisplay = lang.sPrevious;
            btnClass = button + (page > 0 ?
              '' : ' disabled');
            break;

          case 'next':
            btnDisplay = lang.sNext;
            btnClass = button + (page < pages-1 ?
              '' : ' disabled');
            break;

          case 'last':
            btnDisplay = lang.sLast;
            btnClass = button + (page < pages-1 ?
              '' : ' disabled');
            break;
          default:
            btnDisplay = button + 1;
            btnClass = page === button ?
              'active' : '';
            break;
        }

        if ( btnDisplay ) {
          node = $('<li>', {
              'class': classes.sPageButton+' '+btnClass,
              'aria-controls': settings.sTableId,
              'tabindex': settings.iTabIndex,
              'id': idx === 0 && typeof button === 'string' ?
                settings.sTableId +'_'+ button :
                null
            } )
            .append( $('<a>', {
                'href': '#'
              } )
              .html( btnDisplay )
            )
            .appendTo( container );
			settings.oApi._fnBindAction(
					node, {action: button}, clickHandler
				  );
          
        }
      }
    }
	 
  };
  $(host).css({
	width:"100%"
  });
  attach(
    $(host).empty().html('<ul class="pagination"/>').children('ul'),
    buttons
  );    
	//var pageDiv = $("<div class='jump'><span class='jump_text'><button aria-controls=\""+settings.sTableId+"\" class=\"goBtn btn btn-primary btn-xs\">GO</button></span><span class='jump_text'>页</span><span class='jump_text'><input  class=\"pageNum form-control2 \"></input></span><span class='jump_text'>共"+pages+"页，"+settings.fnRecordsDisplay()+"条。跳到</span></div>");
    var pageDiv = $("<div class='jump'><span class='jump_text' style='padding-right:14px'>共"+settings.fnRecordsDisplay()+"条</span></div>");
	var goButtonDiv =  $("<div class='jump' ><span class='jump_text'><button  aria-controls=\""+settings.sTableId+"\" style='margin-top:-5px'class=\"goBtn btn btn-default btn-xs\">前往</button></span><span class='jump_text' style='padding-right:10px'>页</span><span class='jump_text'><input id='igotopage' style='width:38px;margin-top: -5px;' class=\"pageNum form-control \"></input></span><span class='jump_text' style='padding-left:10px'>跳至</span></div>");
	var goBtn = $(".goBtn",goButtonDiv);
	var pageNum = $(".pageNum",goButtonDiv);
	pageNum.val(page+1);
	settings.oApi._fnBindAction(
		goBtn, {action: pageNum}, function(e){
			e.preventDefault();
			api.page( Number(pageNum.val())-1).draw( false);
		}
	);
	goButtonDiv.prependTo($(host));
	pageDiv.appendTo($(host));
	
};


/*
 * TableTools Bootstrap compatibility
 * Required TableTools 2.1+
 */
if ( DataTable.TableTools ) {
  // Set the classes that TableTools uses to something suitable for Bootstrap
  $.extend( true, DataTable.TableTools.classes, {
    "container": "DTTT btn-group",
    "buttons": {
      "normal": "btn btn-default",
      "disabled": "disabled"
    },
    "collection": {
      "container": "DTTT_dropdown dropdown-menu",
      "buttons": {
        "normal": "",
        "disabled": "disabled"
      }
    },
    "print": {
      "info": "DTTT_print_info modal"
    },
    "select": {
      "row": "active"
    }
  } );

  // Have the collection use a bootstrap compatible drop down
  $.extend( true, DataTable.TableTools.DEFAULTS.oTags, {
    "collection": {
      "container": "ul",
      "button": "li",
      "liner": "a"
    }
  } );
}

}; // /factory


// Define as an AMD module if possible
if ( typeof define === 'function' && define.amd ) {
  define( ['jquery', 'datatables'], factory );
}
else if ( typeof exports === 'object' ) {
    // Node/CommonJS
    factory( require('jquery'), require('datatables') );
}
else if ( jQuery ) {
  // Otherwise simply initialise as normal, stopping multiple evaluation
  factory( jQuery, jQuery.fn.dataTable );
}


})(window, document);
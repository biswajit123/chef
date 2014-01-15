// Floating notification start
Ext.notification = function(){
	var msgCt;
	function createBox(t, s){
		return ['<div class="msg">',
		'<div class="x-box-tl"><div class="x-box-tr"><div class="x-box-tc"></div></div></div>',
		'<div class="x-box-ml"><div class="x-box-mr"><div class="x-box-mc"><h3>', t, '</h3>', s, '</div></div></div>',
		'<div class="x-box-bl"><div class="x-box-br"><div class="x-box-bc"></div></div></div>',
		'</div>'].join('');
	}
	return {
		msg : function(title, format){
			if(!msgCt){
				msgCt = Ext.core.DomHelper.insertFirst(document.body, {id:'msg-div'}, true);
			}

			Ext.Element = msgCt;
			msgCt = Ext.Element;
			msgCt.alignTo(document, 't-t');
			var s = Ext.String.format.apply(String, Array.prototype.slice.call(arguments, 1));
			var m = Ext.core.DomHelper.append(msgCt, {html:createBox(title, s)}, true);
			m.slideIn('t').pause(1000).ghost("t", {remove:true});
		},

		init : function(){
			var lb = Ext.get('lib-bar');
			if(lb){
				lb.show();
			}
		}
	};
}();
// Floating notification end

Ext.onReady(function() {

	var SR = {};
	SR.searchTextField = '';
	
	SR.searchTextField = new Ext.form.field.Text({
		id: 'tf',
		width: 250,
		cls: 'searchPanel',
		style: {
			fontSize: '14px',
			paddingLeft: '2px',
			width: '100%'
		},
		params: {
			cmd: 'searchText'
		},
		emptyText: 'Search...',
		enableKeyEvents: true,
		listeners: {
			keyup: function () {

				// make server request after some time - let people finish typing their keyword
				clearTimeout(search_timeout_id);
				search_timeout_id = setTimeout(function () {					
					gridPanelSearchLogic();
				}, 500);
			}}
	});
	
	// from-date and to-date textfields
	var fromDateTxt = new Ext.form.TextField({
		emptyText : 'From Date',
		readOnly : true,
		width : 90
	});
	var toDateTxt = new Ext.form.TextField({
		emptyText : 'To Date',
		readOnly : true,
		width : 90
	});
	var now = new Date();
	var lastMonDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate() + 1);
	var search_timeout_id = 0; //timeout for sending request while searching.
	var dateFormat = 'M d Y';

	fromDateTxt.setValue(Ext.Date.format(lastMonDate, dateFormat));
	toDateTxt.setValue(Ext.Date.format(now, dateFormat));

	var smartDateComboBox = Ext.create('Ext.form.ComboBox', {
		queryMode: 'local',
		width : 100,
		store: new Ext.data.ArrayStore({
			autoDestroy: true,
			forceSelection: true,
			fields: ['value', 'name'],
			data: [
					['TODAY',      'Today'],
					['YESTERDAY',  'Yesterday'],
					['THIS WEEK',  'This Week'],
					['LAST WEEK',  'Last Week'],
					['THIS MONTH', 'This Month'],
					['LAST MONTH', 'Last Month'],
					['3 MONTHS',   '3 Months'],
					['6 MONTHS',   '6 Months'],
					['THIS YEAR',  'This Year'],
					['LAST YEAR',  'Last Year']
				]
		}),
		displayField: 'name',
		valueField: 'value',
		triggerAction: 'all',
		editable: false,
		emptyText : 'Select Date',
		style: {
			fontSize: '14px',
			paddingLeft: '2px'
		},
		forceSelection: true,
		listeners: {
			select: function () {
				var fromDate,toDate,
					dateValue = this.value;				

				switch (dateValue){

					case 'TODAY':
					fromDate = now;
					toDate 	 = now;
					break;

					case 'YESTERDAY':
					fromDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
					toDate 	 = now;
					break;

					case 'THIS WEEK':
					fromDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - (now.getDay() - 1));
					toDate 	 = now;
					break;

					case 'LAST WEEK':
					fromDate = new Date(now.getFullYear(), now.getMonth(), (now.getDate() - (now.getDay() - 1) - 7));
					toDate   = new Date(now.getFullYear(), now.getMonth(), (now.getDate() - (now.getDay() - 1) - 1));
					break;

					case 'THIS MONTH':
					fromDate = new Date(now.getFullYear(), now.getMonth(), 1);
					toDate 	 = now;
					break;

					case 'LAST MONTH':
					fromDate = new Date(now.getFullYear(), now.getMonth()-1, 1);
					toDate   = new Date(now.getFullYear(), now.getMonth(), 0);
					break;

					case '3 MONTHS':
					fromDate = new Date(now.getFullYear(), now.getMonth()-2, 1);
					toDate 	 = now;
					break;

					case '6 MONTHS':
					fromDate = new Date(now.getFullYear(), now.getMonth()-5, 1);
					toDate 	 = now;
					break;

					case 'THIS YEAR':
					fromDate = new Date(now.getFullYear(), 0, 1);
					toDate 	 = now;
					break;

					case 'LAST YEAR':
					fromDate = new Date(now.getFullYear() - 1, 0, 1);
					toDate 	 = new Date(now.getFullYear(), 0 , 0);
					break;

					default:
					fromDate = new Date(now.getFullYear(), now.getMonth(), 1);
					toDate 	 = now;
					break;
				}

				fromDateTxt.setValue(Ext.Date.format(fromDate, dateFormat));
				toDateTxt.setValue(Ext.Date.format(toDate, dateFormat));

				loadGridStore();
				lineGraphStoreLoad(0);
			}
		}
	});
	
	// store for graph
	var lineGraphStore = Ext.create('Ext.data.Store', {
		id : 'lineGraphStore',
		autoLoad : false,
		fields : [ {
			name : 'period',
			type : 'string'
		}, {
			name : 'sales',
			type : 'float'
		}

		],
		params : {
			fromDate : fromDateTxt.getValue(),
			toDate : toDateTxt.getValue(),
			start : 0,
			cmd : 'getData'
		},
		proxy : {
			type : 'ajax',
			url : jsonURL, // url that will load data with respect to start and
			reader : {
				type : 'json',
				totalProperty : 'totalCount'
				,root : 'items'
			},
			//this will be used in place of BaseParams of extjs 3
			//Extra parameters that will be included on every request which will help us if we use pagination.
			extraParams :{
				searchText: SR.searchTextField.getValue()
			}
		}
	});

	lineGraphStore.on('load',
			function() {
				if (lineGraphStore.getTotalCount() == 0) {
					Ext.notification.msg('Info','No sales found');
				} else {
				}
			});

	// store for graph function
	var lineGraphStoreLoad = function(id) {
		lineGraphStore.load({
			params : {
				fromDate  : fromDateTxt.getValue(),
				toDate    : toDateTxt.getValue(),
				searchText: SR.searchTextField.getValue(),
				start 	  : 0,
				id 		  : id,
				cmd 	  : 'getData'
			}
		});
	};

	// grid store
	var gridStore = Ext.create('Ext.data.Store', {
		id : 'gridStore',
		autoLoad : false,
		fields : [ {
			name : 'id',
			type : 'int'
		}, {
			name : 'products',
			type : 'string'
		},{
			name : 'category',
			type : 'string'
		}, {
			name : 'sales',
			type : 'float'
		}],
		proxy : {
			type : 'ajax',
			url : jsonURL, // url that will load data with respect to start and
			reader : {
				type : 'json',
				totalProperty : 'gridTotalCount'
				,root : 'gridItems'
			}
		},
		params : {
			fromDate : fromDateTxt.getValue(),
			toDate : toDateTxt.getValue(),
			start : 0,
			cmd : 'gridGetData'
		},
		extraParams :{
			searchText: SR.searchTextField.getValue()
		},
		listeners : {
			load : function() {				
				var model = gridPanel.getSelectionModel();
				
				if (this.getTotalCount() != 0) {
					model.select(0);
				}
			}
		}
	});

	// create a grid that will list the dataset items.
	var gridPanel = Ext.create('Ext.grid.Panel', {
		autoScroll : true,
		columnLines : true,
		flex : 2,
		store : gridStore,
		columns : [
		{
			text : 'Products',
			width : 200,
			flex : 1.5,
			sortable : true,
			dataIndex : 'products'
		}, {
			text : 'Category',
			width : 150,
			flex : 1,
			sortable : true,
			dataIndex : 'category'
		},{
			text : 'Sales',
			width : 150,
			flex : 0.5,
			align : 'right',
			sortable : true,
			xtype : 'numbercolumn',
			format : '0.00',
			dataIndex : 'sales'
		} ],

		listeners : {
			selectionchange : function(model, records) {
				if (records[0] != undefined) {
					var selectedId = records[0].data.id;
					lineGraphStoreLoad(selectedId);
				}
			}
		}
	});

	var fromDateMenu = new Ext.menu.DatePicker({
		handler : function(dp, date) {
			smartDateComboBox.reset();
			fromDateTxt.setValue(Ext.Date.format(date, dateFormat));
			loadGridStore();
			lineGraphStoreLoad(0);
		},
		maxDate : now
	});

	var toDateMenu = new Ext.menu.DatePicker({
		handler : function(dp, date) {
			smartDateComboBox.reset();
			toDateTxt.setValue(Ext.Date.format(date, dateFormat));
			loadGridStore();
			lineGraphStoreLoad(0);
		},
		maxDate : now
	});	
	
	var gridPanelSearchLogic = function () {

		var o = {
			url : jsonURL,
			method: 'get',
			callback: function (options, success, response) {
				var myJsonObj = Ext.decode(response.responseText);
				if (true !== success) {
					Ext.notification.msg('Failed',response.responseText);
					return;
				}
				try {

					var records_cnt = myJsonObj.totalCount;
					if (records_cnt == 0){
						myJsonObj.items = '';
					}

					loadGridStore();
					lineGraphStoreLoad(0);
					
				} catch (e) {
					return;
				}
			},
			scope: this,
			params: {
				cmd: 'gridGetData',
				searchText: SR.searchTextField.getValue(),
				fromDate: fromDateTxt.getValue(),
				toDate: toDateTxt.getValue(),
				start: 0
			}
		};
		Ext.Ajax.request(o);
	};	
	
	var loadGridStore = function() {
		gridStore.load({
			params : {
				fromDate : fromDateTxt.getValue(),
				toDate : toDateTxt.getValue(),
				start : 0,
				searchText: SR.searchTextField.getValue(),
				cmd : 'gridGetData'
			}
		});
	};

	// create a bar series to be at the top of the panel.
	var barChart = Ext.create('Ext.chart.Chart', {
		id : 'barchart',
		flex : 1,
		margin : '10 5 0 0',
		cls: 'bar-chart',
		height : 300,
		width: 150,
		insetPadding: 10,
		shadow : false,
		animate : true,
		resize : false,
		store : lineGraphStore,
		params : {
			fromDate : fromDateTxt.getValue(),
			toDate : toDateTxt.getValue(),
			start : 0,
			cmd : 'getData'
		},
		axes : [{
			type : 'Numeric',
			position : 'left',
			fields : [ 'sales' ],
			label : {
				font : '10px Lucida Grande'
			},
			minimum : 0
		}, {
			type : 'Category',
			position : 'bottom',
			label : {
				font : '10px Lucida Grande'
			},
			fields : [ 'period' ]
		} ],
		series : [ {
			type : 'line',
			smooth : true,
			highlight: {
                size: 7,
                radius: 7
            },
			axis : 'left',
			highlight : true,
			style : {
				fill : '#456d9f'
			},
			highlightCfg : {
				fill : '#000'
			},
			markerConfig : {
				color : '#D7E3F2',
				type : 'circle',
				size : 4,
				radius : 2
			},
			tips : {
				trackMouse : true,
				width : 100,
				renderer : function(storeItem, item) {
					var toolTipText = '';
						toolTipText = storeItem.data['sales'] + '<br\> ' + storeItem.data['period'];
					this.setTitle(toolTipText);
				}
			},
			listeners : {
				'itemmouseup' : function(item) {
					// code to select the grid data on click of the graph.
				}
			},
			xField : [ 'period' ],
			yField : [ 'sales' ]
		} ]
	});
	// disable highlighting by default.
	barChart.series.get(0).highlight = true;

	var gridForm = Ext.create('Ext.form.Panel', {
		tbar : [ '<b>Sales</b>', {
			xtype : 'tbspacer'
		}, {
			text : 'From:'
		}, fromDateTxt, {
			icon : imgURL + 'calendar.gif',
			menu : fromDateMenu
		}, {
			text : 'To:'
		}, toDateTxt, {
			icon : imgURL + 'calendar.gif',
			menu : toDateMenu
		},smartDateComboBox, '',SR.searchTextField,{ icon: imgURL + 'search.png' }, 
		'->', {
			text : '',
			icon : imgURL + 'refresh.gif',
			tooltip : 'Reload',
			scope : this,
			id : 'reload',
			listeners : {
				click : function() {
					loadGridStore();
				}
			}
		} ],
		height : 400,
		layout : {
			type : 'hbox',
			align : 'stretch'
		},

		items : [ gridPanel, {
			layout : {
				type : 'hbox',
				align : 'stretch'
			},
			flex : 3,
			border : false,
			bodyStyle : 'background-color: transparent',

			items : [ {
				flex : 1,
				layout : {
					type : 'hbox',
					align : 'fit'
				},
				items : [ barChart ]
			} ]
		} ],
		renderTo : 'smart-reporter'
	});
	loadGridStore();
	lineGraphStoreLoad(0);
});
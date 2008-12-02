//
// new SortingTable( 'my_table', {
//   zebra: true,     // Stripe the table, also on initialize
//   details: false   // Has details every other row
// });
//
// The above were the defaults.  The regexes in load_conversions test a cell
// begin sorted for a match, then use that conversion for all elements on that
// column.
//
// Requires mootools Class, Array, Function, Element, Element.Selectors,
// Element.Event, and you should probably get Window.DomReady if you're smart.
//

var SortingTable = new Class({

  removeAltClassRe: new RegExp('(^|\\s)alt(?:\\s|$)'),

  initialize: function( table, options ) {
    this.options = $merge({
      zebra: true,
      details: false
    }, options);
    
    this.table = $(table);
    
    this.tbody = $(this.table.getElementsByTagName('tbody')[0]);
    if (this.options.zebra) {
      SortingTable.stripe_table( this.tbody.getElementsByTagName( 'tr' ) );
    }

    this.headers = new Hash;
    var thead = $(this.table.getElementsByTagName('thead')[0]);
    $each(thead.getElementsByTagName('tr')[0].getElementsByTagName('th'), function( header, index ) {
      var header = $(header);
      this.headers.set( header.getText(), { column: index } );
      header.addEvent( 'mousedown', function(evt){
        var evt = new Event(evt);
        this.sort_by_header( evt.target.getText() );
      }.bind( this ) );
    }.bind( this ) );

    this.load_conversions();
  },

  sort_by_header: function( header_text ){
    this.rows = new Array;
    var trs = $A(this.tbody.getElementsByTagName( 'tr' ));
    while ( row = trs.shift() ) {
      row = { row: row.remove() };
      if ( this.options.details ) {
        row.detail = trs.shift().remove();
      }
      this.rows.unshift( row );
    }
    
    var header = this.headers.get( header_text );
    if ( this.sort_column >= 0 && this.sort_column == header.column ) {
      // They were pulled off in reverse
    } else {
      this.sort_column = header.column;
      if (header.conversion_function) {
        this.conversion_function = header.conversion_function;
      } else {
        this.conversion_function = false;
        this.rows.some(function(row){
          var to_match = $(row.row.getElementsByTagName('td')[this.sort_column]).getText();
          if (to_match == ''){ return false }
          this.conversions.some(function(conversion){
            if (conversion.matcher.test( to_match )){
              this.conversion_function = conversion.conversion_function;
              return true;
            }
            return false;
          }.bind( this ));
          if (this.conversion_function){ return true; }
          return false;
        }.bind( this ));
        header.conversion_function = this.conversion_function.bind( this );
        this.headers.set( header_text, header );
      }
      this.rows.each(function(row){
        row.compare_value = this.conversion_function( row );
        row.toString = function(){ return this.compare_value }
      }.bind( this ));
      this.rows.sort();
    }

    var index = 0;
    while ( row = this.rows.shift() ) {
      row.row.injectInside( this.tbody );
      if (row.detail){ row.detail.injectInside( this.tbody ) };
      if ( this.options.zebra ) {
        row.row.className = row.row.className.replace( this.removeAltClassRe, '$1').clean();
        if (row.detail){
          row.detail.className = row.detail.className.replace( this.removeAltClassRe, '$1').clean();
        }
        if ( ( index % 2 ) == 0 ) {
          row.row.addClass( 'alt' );
          if (row.detail){ row.detail.addClass( 'alt' ); }
        }
      }
      index++;
    }
    this.rows = false;
  },

  load_conversions: function() {
    this.conversions = $A([
      // YYYY-MM-DD, YYYY-m-d
      { matcher: /\d{4}-\d{1,2}-\d{1,2}/,
        conversion_function: function( row ) {
          var cell = $(row.row.getElementsByTagName('td')[this.sort_column]).getText();
          var re = /(\d{4})-(\d{1,2})-(\d{1,2})/;
          cell = re.exec( cell );
          return new Date(parseInt(cell[1]), parseInt(cell[2], 10) - 1, parseInt(cell[3], 10));
        }
      },
      // Numbers
      { matcher: /^\d+$/,
        conversion_function: function( row ) {
          var cell = $(row.row.getElementsByTagName('td')[this.sort_column]).getText();
          return '00000000000000000000000000000000'.substr(0,32-cell.length).concat(cell);
        }
      },
      // Fallback 
      { matcher: /.*/,
        conversion_function: function( row ) {
          return $(row.row.getElementsByTagName('td')[this.sort_column]).getText();
        }
      }
    ]);
  }

});

SortingTable.stripe_table = function ( tr_elements  ) {
  var counter = 0;
  $$( tr_elements ).each( function( tr ) {
    if ( tr.style.display != 'none' && !tr.hasClass('collapsed') ) {
      counter++;
    }
    tr.className = tr.className.replace( this.removeAltClassRe, '$1').clean();
    if ( !(( counter % 2 ) == 0) ) {
      tr.addClass( 'alt' );   
    }
  }.bind( this ));
}

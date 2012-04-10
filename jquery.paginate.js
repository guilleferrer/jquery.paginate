(function($) {
    /**
     * How to use this plugin :
     * 
     * <ul id="mylist">
     * </ul>
     * 
     * <script type=text/javascript>
     * 
     * $('#mylist').paginate('remoteUrl');
     * 
     * </script>
     * 
     * Will create a button that , when clicked, will get the next page of the list
     */
    $.fn.paginate = function (url, options) {

        var _url, $list_el, _opts, _defaultOptions, $button, _init, _init_button, _set_content;

        if(url == undefined ){
            throw 'You need to define a URL in order to use the paginator';
        }
        _url = url;
    
        // Default Options:
        _defaultOptions = {
            action: 'append', // you can also use replace
            current_page: 0,
            page_size: 10,
            nr_pages: undefined,
            data: {}, // extra data to be sent to the server ( e.g. filtering data )
            button_id: 'paginator_button',
            locale: {
                get_next: 'Ver más',
                no_more_data: 'No hay más datos'
            }
        };
    
        // Options, defined? otherwise, empty obj
        options = options || {};
    
        // Final options, merged default and comming
        _opts = $.extend(_defaultOptions, options);
    
    
        // Initializes the button
        _init_button= function () {
            // Initialize ( draw button )
            if($(_opts.button_id).length)
            {
                $button = $(_opts.button_id);
            } else {
                $button = $('<button id="' + _opts.button_id + '" >' + _opts.locale.get_next + '</button>');
                $list_el.append($button);
            }
    
            // Events for the button button
            $button.on('click', $.fn.paginate.getNextPage);
	
        };
    
        // This does the Ajax request
        $.fn.paginate.getNextPage= function () {
            // Get current page and increment it
            _opts.current_page += 1;
            $.post(_url, {
                page : _opts.current_page
            }, _set_content)
        },
    
        // Sets the content in the  dom, depending on the opts.action strategy
        _set_content = function (data, textStatus, jqXHR) {
            var result = $.parseJSON(data);
            if(result.count != _opts.page_size){
                $button.remove();
                $list_el.append('<span class="paginator_no_more_data">'+_opts.locale.no_more_data  + '</span>');
            }
            if(_opts.action == 'append'){
                $button.before(result.list);
            } else if (_opts.action == 'replace') {
                $list_el.html(result.list);
            }
        };

        return this.each(function() {
            // Do something to each item
            $list_el = $(this);
            if(_opts.nr_pages != undefined && _opts.nr_pages === 0){
                // Do not do anything ( do not event show the paginator button )
                return;
            }
            
            // Initializes the button
            _init_button();
        });
        
    };

})(jQuery);
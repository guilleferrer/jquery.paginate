$(function(){
    

    module("Passing parameters");
    test("Paginate without Url throws an exception", function() {
        
        raises(function(){
            // Throws an exception
            $('#nonexistingelement').paginate()
        });

        
    //        ok( true, "this test is fine" );
    //        var value = "hello";
    //        equal( value, "hello", "We expect value to be hello" );
    });

    module("Button creation");
    test("button creation", function() {
        $('#mylist').paginate('myUrl')
        ok( $('#paginator_button').length , "button created" );
        
    });
    
    test(' button creation by options', function () {
        $('#mylist').paginate('myUrl', {
            button_id : 'miboton'
        })
        ok( $('#miboton').length , "button created" );
    });
    
    test('do not paginate if nr_pages = 0', function () {
        $('#mylist').paginate('myUrl', {
            nr_pages : 0
        })
        equal( $('#paginator_button').length, 0, "do not create the paginator button if the number of pages is 0" );
    });

    module("Getting pages");
    test('calling the server', function () {
        // 
        $.mockjax({
            url: 'myurl',
            responseTime: 750,
            responseText: {
                count: 1,
                list: 'second page list'
            }
        });
        
        $('#mylist').paginate('myurl', {
            button_id : 'miboton'
        });
        
        $('#miboton').click();
        ok(true, 'it is true')
    // click the button
        
    
    });

});
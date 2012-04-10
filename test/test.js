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
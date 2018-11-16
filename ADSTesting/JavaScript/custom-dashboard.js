$(document).ready(function ()
{

    collapsibleTree();
    $('.btn-search-bar').on('click', function ()
    {
        console.log($(this).find('i').attr('class'));
        $(this).find('i').toggleClass('fa-times-circle');
        $(this).closest('.searchbar-top').find('.search-bar').toggle();
        $(this).closest('.searchbar-top').find('.form-control').focus();
    });
    $('.user-drop-panel').click(function ()
    {
        $('.dashboard-top-right ul li ul').slideToggle(300);
    })

    if ($(window).width() >= 768)
    {

        $('#hide-menu').click(function ()
        {
            $('.dashboard-left-panel').animate({ marginLeft: -258 + 'px' }, 500);
            $('.dashboard-right-panel').animate({ marginLeft: 0 + 'px' }, 500);
            $('#show-menu').css('display', 'block');
            $('#hide-menu').css('display', 'none');
        })

        $('#show-menu').click(function ()
        {
            $('.dashboard-left-panel').animate({ marginLeft: 0 + 'px' }, 500);
            // $('.dashboard-right-panel').animate({paddingLeft : 258 +'px'},500);
            $('#show-menu').css('display', 'none');
            $('#hide-menu').css('display', 'block');
        })


    }
    //// 


    if ($(window).width() <= 767)
    {

        $('#hide-menu').click(function ()
        {
            $('.dashboard-left-panel').animate({ left: 0 + 'px' }, 500);
            $('.dashboard-right-panel').animate({ paddingLeft: 0 + 'px' }, 500);
            $('#show-menu').css('display', 'block');
            $('#hide-menu').css('display', 'none');
        })
        $('#show-menu').click(function ()
        {
            $('.dashboard-left-panel').animate({ left: -258 + 'px' }, 500);
            $('.dashboard-right-panel').animate({ paddingLeft: 0 + 'px' }, 500);
            $('#show-menu').css('display', 'none');
            $('#hide-menu').css('display', 'block');
        })


    }

    $('#btnLogout').click(function ()
    {
        if (confirm("Are you sure, you want to logout?"))
        {
            $.ajax({
                type: "POST",
                url: "Default.aspx/Logout",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data)
                {
                    window.location.href = data.d;
                },

                error: function () { alert("Ajax Error"); }
            });
        }
    });


    //this script will be working on for loop
    //only loop part be care............

    ///////////////////////////////////////////


    containerHeight();

    $('a[data-toggle="tab"]').on('hidden.bs.tab', function (e)
    {
        containerHeight();
    })


});

$(window).resize(function ()
{
    containerHeight();
});

function collapsibleTree()
{
    $('.collapsible-tree li').find('a').on('click', function (e)
    {
        e.stopPropagation();

        $(this).parent('li').children('ul').slideToggle("slow", function ()
        {
            $(this).parent('li').toggleClass('active');
        });


        // if($(this).parent('li').hasClass('main-parent')){
        // 	 //$('.main-parent').find('ul').hide();
        // 	 //$(this).parent('li').children('ul').slideToggle();
        // 	//alert('asd');

        // }else{
        // 	$(this).parent('li').children('ul').slideToggle();
        // }
        return false;
    })
}

function containerHeight()
{
    var docHeight = $(document).height();
    // var rightPaneHeight = $('.dashboard-right-panel').height();
    var headerHeight = $('#header-dashboard').height();
    var footerHeight = $('#footer-dashboard').height();
    var leftPaneHeight = docHeight - (headerHeight + footerHeight + 8);
    $('.dashboard-left-panel').css('height', leftPaneHeight + "px");
    $('.dashboard-right-panel').css('height', leftPaneHeight + "px");
    //$('#main-container').css('min-height', leftPaneHeight - 30 + "px");
    //$('#iframeContainer').css('height', leftPaneHeight + "px");
}

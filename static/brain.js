
function setUpListeners(weekId){
    function $pid(pid, query){
        return $(query + '*[data-pid="' + pid + '"]');
    }

    $('.vote').click(function (){
        var $this = $(this);
        if (!$this.hasClass("clickable")){
            return;
        }
        $this.toggleClass("True");
    });
    $('.save').click(function (){
        var $this = $(this);
        var pid = $this.data('pid');
        var event_ids = [];
        $pid(pid, '.vote.True').each(function (){
            var $elm = $(this);
            event_ids.push($elm.data('event'));
        });
        var data = {
            "new_name": $pid(pid, '.name-edit').val(),
            "event_ids": event_ids
        };
        $.ajax({
            url: '/event/' + weekId + '/participant/' + pid,
            type: 'PUT',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data),
        }).done(function (data){
            location.reload();
        }).fail(function (data){
            alert('something broke');
        });
    });
    // todo add DELETE ajax

    function updateView(pid, canEdit){
        if (canEdit){
            $pid(pid, '.name-view').hide();
            $pid(pid, '.name-edit').show();
            $pid(pid, '.edit').hide();
            $pid(pid, '.save').show();
            $pid(pid, '.vote').addClass('clickable');
        } else {
            $pid(pid, '.name-view').show();
            $pid(pid, '.name-edit').hide();
            $pid(pid, '.edit').show();
            $pid(pid, '.save').hide();
            $pid(pid, '.vote').removeClass('clickable');
        }
    }

    $('.edit').click(function (){
        var $this = $(this);
        var pid = $this.data('pid');
        updateView(pid, true);
    });

    $('.name-edit').each(function (){
        var $this = $(this);
        var pid = $this.data('pid');
        var canEdit = $this.val() == "";
        updateView(pid, canEdit);
    });
}

Class("ItemController", {
  isa: Controller,
  
  after: {
    initialize : function() {
      this.enable_drag_n_drop();
    }
  },
  
  methods: {
    enable_drag_n_drop : function (){
      $('ul.dnd').sortable({
          connectWith: 'ul.dnd', 
          dropOnEmpty: true, 
          tolerance: 'pointer',
          beforeStop: function(event, ui){
              // this = source, ui.item.parent() = ziel
            var column = ui.item.parent();
            var limit = 0;
            var super_target = false;
            var super_column = false;
            if(column.parents(".super_column").length == 1){
              super_column = column.parents(".super_column:first");
              limit = parseInt(super_column.attr('limit'));
              super_target = true;
            }else{
              limit = parseInt(column.attr('limit'));
            }
            if(super_target){
              if(super_column.attr('id') != $(this).parents(".super_column:first").attr('id') && limit > 0 && ($('li', super_column).length > (limit + 1)))
                return false;
            }else{
              if(limit > 0 && column.children().length > (limit + 1))
                return false;
            }
          },
          stop: function(event, ui){
            var el = ui.item
            var parent = $(el).parent();
            var index = parent.children().index(el) + 1;
            jQuery.post(parent.attr('href'), 
              {
                'index': index,
                'target_lane_id': parent.attr('id'),
                'id': el.attr('id')
              }
            );
          }
      });
    }
  }
});
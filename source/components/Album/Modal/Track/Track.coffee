Component.Album.Modal.new 'Track', App.Views.TrackShow,
  events:
    'click .action-menu-button': 'showActionMenu'
    'click .add-to-collection':  'add_to_collection'
    'click .add-to-queue':       'add_to_queue'
    'click':                     'play_now'
    'dragstart':                 'dragstart'

  showActionMenu: (event) ->
    event.stopPropagation()

    isInCollection = @model.get('isInCollection')
    offset = $(event.target).offset()

    new Component.ActionMenu
      y: offset.top - $(window).scrollTop()
      x: offset.left - $(window).scrollLeft()
      items: [
        ['Play Now',               this.play_now]
        ['Play Next',              this.playNext]
        ['Add to Queue',           this.add_to_queue]
        ['Add to Collection',      this.add_to_collection,    !isInCollection]
        ['Remove from Collection', this.removeFromCollection, isInCollection]
      ]

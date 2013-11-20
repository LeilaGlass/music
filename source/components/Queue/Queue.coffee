Component.new 'Queue',
  el: "#queue"

  events:
    mouseenter: 'onMouseEnter'
    mouseleave: 'onMouseLeave'

  initialize: ->
    @listenTo @model.tracks, "reset",                @render
    @listenTo @model.tracks, "add",                  @add
    @listenTo @model,        "change:current_track", @render_current_track

  render: ->
    @$el.html @template()
    @model.tracks.each (track) =>
      @add track
    @render_current_track()

    this

  add: (track, queue, options) ->
    $el       = new Component.Queue.Track(model: track).render().$el
    index     = @model.tracks.indexOf(track)
    $children = @$el.children()
    $el.insertBefore $children[index]

  render_current_track: ->
    $("#current-track").removeAttr("id")
    @model.get('current_track')?.trigger("current")
    this

  onMouseEnter: ->
    $(document.body).css('overflow', 'hidden')

  onMouseLeave: ->
    $(document.body).css('overflow', '')
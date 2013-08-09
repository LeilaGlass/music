#= require ./artwork
#= require ./item

class App.Models.Album extends App.Models.Item
  method: 'get'
  initialize: ->
    @artwork          = new App.Models.Artwork(icon: @get('icon'))
    @track_list       = new App.Collections.TrackList
    @track_list.album = this

    @listenTo this, 'change:icon', ->
      @artwork = new App.Models.Artwork(icon: @get('icon'))

    @compute 'query', ->
      @clean(@get('name') + @get('artist'))
